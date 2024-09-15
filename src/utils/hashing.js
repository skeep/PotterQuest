// utils/hashing.js
import crypto from 'crypto';

// Function to hash a given answer using SHA-256
export const hashAnswer = (answer) => {
  return crypto.createHash('sha256').update(answer).digest('hex');
};
