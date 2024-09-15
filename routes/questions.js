// routes/questions.js
import pool from '../src/db.js';
import { hashAnswer } from '../utils/hashing.js';
import { determineScore } from '../utils/score.js';

// Function to fetch additional incorrect choices from the database
const fetchAdditionalChoices = async (limit = 3) => {
  const { rows } = await pool.query(`
    SELECT unnest(choices) as choice
    FROM questions
    WHERE correct_answer NOT IN (unnest(choices))
    LIMIT $1
  `, [limit]);

  return rows.map(row => row.choice);
};

// Function to get random questions with 3 incorrect choices and 1 correct choice
export const getQuestions = async (limit = 5, bookId = 'all', chapterId = 'all') => {
  let query = `
    SELECT question_id, question, choices, correct_answer, difficulty
    FROM questions
  `;
  
  // Build query conditions based on bookId and chapterId
  const conditions = [];
  if (bookId !== 'all') {
    conditions.push(`book_id = $2`);
  }
  if (chapterId !== 'all' && bookId !== 'all') {
    conditions.push(`chapter_id = $3`);
  }
  
  // If there are any conditions, append them to the query
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ` ORDER BY RANDOM() LIMIT $1`;

  // Set up parameters for the query
  const params = [limit];
  if (bookId !== 'all') {
    params.push(bookId);
  }
  if (chapterId !== 'all' && bookId !== 'all') {
    params.push(chapterId);
  }

  const { rows } = await pool.query(query, params);

  // For each question, randomize and ensure correct answer is included
  const questions = await Promise.all(rows.map(async row => {
    let incorrectChoices = row.choices.sort(() => 0.5 - Math.random()); // Randomize incorrect choices

    // If there are less than 3 incorrect choices, fetch more from the database
    if (incorrectChoices.length < 3) {
      const additionalChoices = await fetchAdditionalChoices(3 - incorrectChoices.length);
      incorrectChoices = incorrectChoices.concat(additionalChoices);
    }

    // Limit incorrect choices to 3
    incorrectChoices = incorrectChoices.slice(0, 3);

    // Ensure the correct answer is part of the choices
    incorrectChoices.push(row.correct_answer);  // Add correct answer

    // Randomize the final set of 4 choices again to mix the correct answer with others
    incorrectChoices = incorrectChoices.sort(() => 0.5 - Math.random());

    // Hash the correct answer
    const hashedCorrectAnswer = hashAnswer(row.correct_answer);

    // Determine the score based on difficulty
    const score = determineScore(row.difficulty);

    return {
      questionId: row.question_id,
      question: row.question,
      choices: incorrectChoices,  // Exactly 4 randomized choices including the correct one
      hashedCorrectAnswer: hashedCorrectAnswer, // Hashed correct answer
      score: score,  // Score based on difficulty
      difficulty: row.difficulty,
    };
  }));

  return questions;
};
