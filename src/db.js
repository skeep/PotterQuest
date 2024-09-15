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

export default pool;
