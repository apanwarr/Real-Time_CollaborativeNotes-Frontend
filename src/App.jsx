import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import HomePage from './components/HomePage';
import NoteEditor from './components/NoteEditor';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/note/:noteId" element={<NoteEditor />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;