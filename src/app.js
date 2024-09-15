// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import { quizRoutes } from './routes.js';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use routes from routes.js
app.use('/api', quizRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
