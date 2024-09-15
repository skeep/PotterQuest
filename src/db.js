// src/db.js
import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'potterquest_user',
  host: process.env.DB_HOST || 'potterquest_user.8znIjUFDQNqklCe8Ai7QWLyFwWhOfcv4@dpg-crhjjkd6l47c73der0pg-a.singapore-postgres.render.com',
  database: process.env.DB_NAME || 'potterquest',
  password: process.env.DB_PASSWORD || '8znIjUFDQNqklCe8Ai7QWLyFwWhOfcv4',
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false,
  }
});

// Function to get random questions with 4 random choices, including the correct one
export const getQuestions = async (limit = 5) => {
  // console.log( process.env);
  // console.log(pool);
  const { rows } = await pool.query(`
    SELECT question_id, question, choices, correct_answer, book_id, chapter_number, difficulty
    FROM questions
    ORDER BY RANDOM() LIMIT $1;
  `, [limit]);
  // For each question, randomize and ensure correct answer is included
  const questions = rows.map(row => {
    let randomizedChoices = row.choices.sort(() => 0.5 - Math.random()).slice(0, 3); // Get 3 random choices

    // Ensure the correct answer is part of the choices
    if (!randomizedChoices.includes(row.correct_answer)) {
      randomizedChoices.push(row.correct_answer); // Add correct answer if it's not included
    }

    // Randomize the final set of 4 choices again to mix the correct answer with others
    randomizedChoices = randomizedChoices.sort(() => 0.5 - Math.random());

    return {
      questionId: row.question_id,
      question: row.question,
      choices: randomizedChoices,
      correctAnswer: row.correct_answer, // Not sent to client but used for validation on submit
      bookId: row.book_id,
      chapterNumber: row.chapter_number,
      difficulty: row.difficulty,
    };
  });

  return questions;
};


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