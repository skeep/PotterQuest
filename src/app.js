// src/app.js
import express from 'express';
// import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
import { quizRoutes } from './routes.js';


// Manually define __dirname since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve the game page
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'game.html'));
});

// Serve the congratulations page
app.get('/congrats', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'congrats.html'));
});

// Use routes from routes.js
app.use('/api', quizRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
