// utils/score.js

// Function to determine score based on difficulty
export const determineScore = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 25;
      case 'medium':
        return 50;
      case 'hard':
        return 100;
      default:
        return 0;
    }
  };
  