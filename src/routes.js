// src/routes.js
import express from 'express';
import { getQuestions, submitAnswer } from './db.js';

// Create an Express router
const router = express.Router();

// Route to fetch quiz questions (randomized choices)
router.get('/questions', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;  // Default to 5 if no limit is provided
  try {
    const questions = await getQuestions(limit);
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

// Route to submit an answer for validation
router.post('/submit', async (req, res) => {
  const { questionId, submittedAnswer } = req.body;
  try {
    const result = await submitAnswer(questionId, submittedAnswer);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error validating answer' });
  }
});

export { router as quizRoutes };
