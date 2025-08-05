<h1>📒 Collaborative_Notes-Frontend</h1>

<h3>Frontend Link : https://real-time-collaborative-notes-frontend.vercel.app</h3>

<h3>Backend Github Repo : https://github.com/apanwarr/Real-Time_CollaborativeNotes-Backend </h3>

<h3>Backend live link : https://realtime-collaborativenotes-backend.onrender.com </h3>

<p>A modern React frontend for real-time collaborative note-taking, built with Vite.</p>

<h2>🚀 Features</h2>
<ul>
  <li>Real-time Collaboration - Live editing with multiple users</li>
  <li>Responsive Design - Works on all devices</li>
  <li>Auto-save - Saves every 2 seconds automatically</li>
  <li>Live Status - WebSocket connection & active users</li>
  <li>Modern UI - Clean and smooth design</li>
  <li>Share URLs - Copy & share notes with links</li>
  <li>Word/Character Count - Live stats</li>
  <li>Recent Notes - Quick access to recent notes</li>
</ul>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li>React 18 + Hooks</li>
  <li>Vite for fast builds</li>
  <li>React Router</li>
  <li>Socket.IO Client</li>
  <li>Context API for state</li>
  <li>Modern CSS (Grid/Flexbox)</li>
</ul>

<h2>📁 Project Structure</h2>
<pre><code>frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── contexts/
│   ├── App.jsx
│   ├── main.jsx
└── vite.config.js
</code></pre>

<h2>⚙️ Setup</h2>
<pre><code># 1. Clone and install
git clone &lt;https://github.com/apanwarr/Real-Time_Collaborative_Notes.git&gt;
cd frontend
npm install

# 2. Create .env file
VITE_SERVER_URL=<ur>

# 3. Start Dev Server
npm run dev

# 4. Build
npm run build
</code></pre>

<h3>📊 Evaluation Criteria</h3>

<ul>
  <li><strong>Real-time functionality – 30%:</strong> Implemented real-time collaborative editing using <code>Socket.IO</code>, enabling live updates across users instantly.</li>
  
  <li><strong>Mongo + API structure – 20%:</strong> Used <code>MongoDB</code> with Mongoose for efficient data modeling, and structured REST APIs using Express.js for CRUD operations on notes.</li>
  
  <li><strong>React structure + UX – 20%:</strong> Built with <code>React + Vite</code>, following a clean component-based architecture, with responsive design and smooth UI interactions.</li>
  
  <li><strong>Clean modular code – 20%:</strong> Organized frontend and backend into reusable modules and followed best practices like separation of concerns and environment configuration.</li>
  
  <li><strong>Bonus (rich text, cursors) – 10%:</strong> Integrated a rich text editor for formatting and added active user indicators with real-time cursor syncing for better collaboration.</li>
</ul>



<h2>🎯 Key Features</h2>
<ul>
  <li><strong>Real-time Collaboration</strong> using Socket.IO</li>
  <li><strong>Auto-save</strong> via 2s debounce function</li>
  <li><strong>Responsive UI</strong> with CSS media queries</li>
</ul>

<h2>🚀 Deployment</h2>
<ul>
  <li>Verce</li>
  <li>Set <code>VITE_SERVER_URL</code> in dashboard</li>
</ul>

<h2>📱 Responsive Design</h2>
<ul>
  <li>Mobile-first CSS</li>
  <li>Breakpoints: &lt;480px, &lt;768px, &lt;968px</li>
  <li>Touch targets, swipe support</li>
</ul>
