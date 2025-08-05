import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentNotes, setRecentNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchRecentNotes();
  }, []);

  const fetchRecentNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes`);
      if (response.ok) {
        const notes = await response.json();
        setRecentNotes(notes);
      }
    } catch (error) {
      console.error('Error fetching recent notes:', error);
    } finally {
      setLoadingNotes(false);
    }
  };

  const createNote = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a note title');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (response.ok) {
        const note = await response.json();
        navigate(`/note/${note._id}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create note');
      }
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openNote = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">📝</span>
            Collaborative Notes
          </h1>
          <p className="subtitle">Create and edit notes together in real-time</p>
        </header>

        <div className="main-content">
          <div className="create-section">
            <form onSubmit={createNote} className="create-form">
              <div className="input-group">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className="title-input"
                  maxLength={100}
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="create-btn"
                  disabled={loading || !title.trim()}
                >
                  {loading ? (
                    <span className="loading-spinner">⏳</span>
                  ) : (
                    '+ Create Note'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="recent-section">
            <h2 className="section-title">Recent Notes</h2>
            
            {loadingNotes ? (
              <div className="loading-state">
                <div className="loading-spinner">⏳</div>
                <p>Loading notes...</p>
              </div>
            ) : recentNotes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <p>No notes yet. Create your first collaborative note!</p>
              </div>
            ) : (
              <div className="notes-grid">
                {recentNotes.map((note) => (
                  <div
                    key={note._id}
                    className="note-card"
                    onClick={() => openNote(note._id)}
                  >
                    <h3 className="note-title">{note.title}</h3>
                    <div className="note-meta">
                      <span className="note-date">
                        Last updated {formatDate(note.updatedAt)}
                      </span>
                    </div>
                    <div className="note-actions">
                      <span className="open-icon">→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="footer">
          <p>💡 Share the note URL with others to collaborate in real-time</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;