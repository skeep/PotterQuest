
import pool from '../db.js';

// Function to validate the submitted answer
export const submitAnswer = async (questionId, submittedAnswer) => {
    const { rows } = await pool.query('SELECT correct_answer FROM questions WHERE question_id = $1', [questionId]);
    
    if (rows.length === 0) {
      return { error: 'Question not found' };
    }
  
    const correctAnswer = rows[0].correct_answer;
    return {
      correct: submittedAnswer === correctAnswer,
    };
  };