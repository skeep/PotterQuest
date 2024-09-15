
# Harry Potter Quiz Game - Modular Express.js API

This is a modularized **Harry Potter Quiz Game** backend built with **Node.js** and **Express.js**. The project fetches quiz questions from a PostgreSQL database, randomizes the answers, hashes the correct answer, and returns the data as an API. The project is modular, with separate route handling, utility functions, and database connection logic.

## Features

- Fetch quiz questions with random answers
- Ensure the correct answer is always included and hashed
- Handle dynamic parameters for book and chapter filtering
- Modular architecture for better maintainability and scalability

## Project Structure

```
.
├── app.js                # Main application entry point
├── db.js                 # Database connection configuration
├── routes.js             # Main route handler
├── routes/
│   ├── questions.js      # Fetch quiz questions route logic
│   └── submitAnswer.js   # Handle answer submission and validation
└── utils/
    ├── hashing.js        # Utility for hashing answers
    └── score.js          # Utility for calculating question score
```

## Prerequisites

- **Node.js** (v12.x or higher)
- **PostgreSQL** database

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/harry-potter-quiz-api.git
    cd harry-potter-quiz-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your PostgreSQL database and configure the environment variables in a `.env` file:
    ```env
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=your_db_name
    ```

4. Create the necessary tables in your PostgreSQL database:

    ```sql
    CREATE TABLE questions (
      question_id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      choices TEXT[] NOT NULL,
      correct_answer TEXT NOT NULL,
      difficulty VARCHAR(10) NOT NULL,
      book_id INT,
      chapter_id INT
    );
    ```

## Running the Application

To start the Express.js application:

```bash
npm start
```

By default, the server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Fetch Quiz Questions

```bash
GET /api/questions?limit=5&bookId=1&chapterId=3
```

- **limit**: Number of questions to fetch (default is 5).
- **bookId**: Optional book filter (default is all books).
- **chapterId**: Optional chapter filter (default is all chapters).

### Submit Answer

```bash
POST /api/submit
```

- Submit the user's answer and validate it against the correct hashed answer.

## Utilities

- **Hashing**: Correct answers are hashed using SHA-256 before being sent to the client.
- **Score Calculation**: The score is dynamically calculated based on the difficulty level of the question:
  - Easy: 25 points
  - Medium: 50 points
  - Hard: 100 points

## Development

To run the application in development mode using `nodemon`, run:

```bash
npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
