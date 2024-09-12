const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to handle favicon requests (ignore it)
app.get('/favicon.ico', (req, res) => res.status(204));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Route: Add Question Page
app.get('/add', (req, res) => {
  res.render('add-question', { title: 'Add New Questions' });
});

// Route: Show Questions Page
app.get('/q', (req, res) => {
  res.render('show-question', { title: 'Show Question' });
});

// Handle other routes
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;