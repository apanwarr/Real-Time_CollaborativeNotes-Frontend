<h1>📒 Collaborative_Notes-Frontend</h1>

<h3>Frontend Link : https://real-time-collaborative-notes-frontend.vercel.app</h3>

<h3>Backend Github Repo : https://github.com/apanwarr/Real-Time_CollaborativeNotes-Backend </h3>

<h3>Backend live link : https://realtime-collaborativenotes-backend.onrender.com </h3>

<h3>Screen Recording Link :  </h3>

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

<h2>🎯 Key Features</h2>
<ul>
  <li><strong>Real-time Collaboration</strong> using Socket.IO</li>
  <li><strong>Auto-save</strong> via 2s debounce function</li>
  <li><strong>Responsive UI</strong> with CSS media queries</li>
</ul>

<h3>📊 Evaluation Criteria Done</h3>

<ul>
  <li><strong>Real-time functionality – 30%:</strong> Implemented real-time collaborative editing using <code>Socket.IO</code>, enabling live updates across users instantly.</li>
  
  <li><strong>Mongo + API structure – 20%:</strong> Used <code>MongoDB</code> with Mongoose for efficient data modeling, and structured REST APIs using Express.js for CRUD operations on notes.</li>
  
  <li><strong>React structure + UX – 20%:</strong> Built with <code>React + Vite</code>, following a clean component-based architecture, with responsive design and smooth UI interactions.</li>
  
  <li><strong>Clean modular code – 20%:</strong> Organized frontend and backend into reusable modules and followed best practices like separation of concerns and environment configuration.</li>
  
  <li><strong>Bonus (rich text, cursors) – 10%:</strong> Integrated a rich text editor for formatting and added active user indicators with real-time cursor syncing for better collaboration.</li>
</ul>

<h2>ScreenShots</h2>

<img width="1918" height="1016" alt="1" src="https://github.com/user-attachments/assets/a60bec00-33f1-4bc9-860c-9fba8b0df943" />
<img width="1917" height="923" alt="2" src="https://github.com/user-attachments/assets/c053235e-ab07-4ad7-820f-58c8e43848c5" />
<img width="1917" height="1011" alt="3" src="https://github.com/user-attachments/assets/4bc11095-7ac3-447f-8794-383c2b4c776c" />
<img width="1918" height="1012" alt="4" src="https://github.com/user-attachments/assets/26ce1a29-3087-4143-8f5c-35b6df171562" />
<img width="1917" height="942" alt="5" src="https://github.com/user-attachments/assets/c44b12d8-6a6e-4029-8271-7c7c215416f8" />
<img width="1913" height="923" alt="6" src="https://github.com/user-attachments/assets/4d3fa6db-ec98-435d-ad97-723fb859b810" />
<img width="1918" height="238" alt="7" src="https://github.com/user-attachments/assets/98581ca7-c74e-488a-92eb-cc673f7b54d2" /></br>
<img width="1438" height="272" alt="8" src="https://github.com/user-attachments/assets/bcaf3e0f-0984-4081-aa82-2e514ed7b5c3" />
<img width="1918" height="1012" alt="9" src="https://github.com/user-attachments/assets/53669efb-8158-4324-ab98-4a37a7453e73" />

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
