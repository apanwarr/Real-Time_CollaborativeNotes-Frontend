import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';
import './NoteEditor.css';

const NoteEditor = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { socket, connected } = useSocket();
  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [lastSaved, setLastSaved] = useState(null);
  const [saving, setSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const lastContentRef = useRef('');
  const lastTitleRef = useRef('');

  const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

  const fetchNote = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes/${noteId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Note not found');
        } else {
          setError('Failed to load note');
        }
        return;
      }

      const noteData = await response.json();
      setNote(noteData);
      lastContentRef.current = noteData.content;
      lastTitleRef.current = noteData.title;
      setLastSaved(new Date(noteData.updatedAt));
      setError(null);
    } catch (err) {
      console.error('Error fetching note:', err);
      setError('Failed to load note');
    } finally {
      setLoading(false);
    }
  }, [noteId, API_URL]);

  const saveNote = useCallback(async (title, content, isAutoSave = false) => {
    if (!isAutoSave) setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        setLastSaved(new Date(updatedNote.updatedAt));
        lastContentRef.current = content;
        lastTitleRef.current = title;
      }
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      if (!isAutoSave) setSaving(false);
    }
  }, [noteId, API_URL]);

  const debouncedSave = useCallback((title, content) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (title !== lastTitleRef.current || content !== lastContentRef.current) {
        saveNote(title, content, true);
      }
    }, 2000); 
  }, [saveNote]);

  const handleContentChange = useCallback((e) => {
    const newContent = e.target.value;
    setNote(prev => ({ ...prev, content: newContent }));
    
    if (socket && connected) {
      socket.emit('note_update', {
        noteId,
        content: newContent
      });
    }

    debouncedSave(note?.title || '', newContent);
  }, [socket, connected, noteId, note?.title, debouncedSave]);

  const handleTitleChange = useCallback((e) => {
    const newTitle = e.target.value;
    setNote(prev => ({ ...prev, title: newTitle }));
    
    if (socket && connected) {
      socket.emit('note_update', {
        noteId,
        title: newTitle
      });
    }

    debouncedSave(newTitle, note?.content || '');
  }, [socket, connected, noteId, note?.content, debouncedSave]);

  useEffect(() => {
    if (!socket) return;

    const handleNoteUpdate = (data) => {
      if (data.noteId === noteId && data.source === 'realtime') {
        setNote(prev => ({
          ...prev,
          title: data.title !== undefined ? data.title : prev.title,
          content: data.content !== undefined ? data.content : prev.content,
          updatedAt: data.updatedAt
        }));
        
        if (data.updatedAt) {
          setLastSaved(new Date(data.updatedAt));
        }
      }
    };

    const handleActiveUsers = (users) => {
      setActiveUsers(users);
    };

    const handleSocketError = (error) => {
      console.error('Socket error:', error);
      setError('Connection error: ' + error);
    };

    socket.on('note_update', handleNoteUpdate);
    socket.on('active_users', handleActiveUsers);
    socket.on('error', handleSocketError);

    socket.emit('join_note', noteId);

    return () => {
      socket.off('note_update', handleNoteUpdate);
      socket.off('active_users', handleActiveUsers);
      socket.off('error', handleSocketError);
    };
  }, [socket, noteId]);

  useEffect(() => {
    if (connected) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('disconnected');
    }
  }, [connected]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Note URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy URL:', error);
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Note URL copied to clipboard!');
    }
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="editor-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading note...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="editor-error">
        <div className="error-icon">⚠️</div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="note-editor">
      <header className="editor-header">
        <div className="header-left">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back
          </button>
          <input
            ref={titleRef}
            type="text"
            value={note?.title || ''}
            onChange={handleTitleChange}
            className="title-input"
            placeholder="Untitled Note"
          />
        </div>
        
        <div className="header-right">
          <div className="status-info">
            <div className={`connection-status ${connectionStatus}`}>
              <span className="status-dot"></span>
              {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </div>
            
            {activeUsers.length > 0 && (
              <div className="active-users">
                <span className="users-icon">👥</span>
                <span className="users-count">{activeUsers.length}</span>
              </div>
            )}

            {lastSaved && (
              <div className="last-saved">
                {saving ? 'Saving...' : `Saved at ${formatTime(lastSaved)}`}
              </div>
            )}
          </div>

          <button onClick={copyUrl} className="share-btn">
            🔗 Share
          </button>
        </div>
      </header>

      <main className="editor-main">
        <textarea
          ref={contentRef}
          value={note?.content || ''}
          onChange={handleContentChange}
          className="content-textarea"
          placeholder="Start typing your note here... Changes will be synced in real-time!"
          spellCheck="true"
        />
      </main>

      <footer className="editor-footer">
        <div className="footer-info">
          <span className="note-id">Note ID: {noteId}</span>
          <span className="separator">•</span>
          <span className="word-count">
            {note?.content ? note.content.split(/\s+/).filter(word => word.length > 0).length : 0} words
          </span>
          <span className="separator">•</span>
          <span className="char-count">
            {note?.content ? note.content.length : 0} characters
          </span>
        </div>
      </footer>
    </div>
  );
};

export default NoteEditor;