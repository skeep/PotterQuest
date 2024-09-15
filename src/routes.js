// src/routes.js
import express from 'express';
import { getQuestions } from '../routes/questions.js';


// Create an Express router
const router = express.Router();

// Route to fetch quiz questions
router.get('/questions', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;  // Default to 5 questions
  const bookId = req.query.bookId || 'all';  // Default to 'all'
  const chapterId = req.query.chapterId || 'all';  // Default to 'all'
  
  try {
    const questions = await getQuestions(limit, bookId, chapterId);  // Fetch questions based on parameters
    res.json(questions); // Send questions as JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

export { router as quizRoutes };
