/**
 * Production Server
 * 
 * Serves the built static site in production mode
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9090;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../../public')));

// Fallback to index.html for SPA routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Chinese route (/zh_CN)
app.get('/zh_CN', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zh_CN/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Production server running at http://localhost:${PORT}`);
  console.log(`Open your browser to view the site.`);
});
