// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { initializeFirestore } from './firestore.js';

console.log('init')

// Import page-specific modules
import { initShowQuestion } from './showQuestion.js';
import { initAddQuestion } from './addQuestion.js';

const firebaseConfig = {
  apiKey: "AIzaSyB5Rx69Nptehsa4ChVQRMP9Gs9Zbapgaq4",
  authDomain: "potterquest-2daca.firebaseapp.com",
  projectId: "potterquest-2daca",
  storageBucket: "potterquest-2daca.appspot.com",
  messagingSenderId: "342991508537",
  appId: "1:342991508537:web:631604cbcdf99245c3a9e8",
  measurementId: "G-3ME6P63THP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (app) {
  console.log('app initiated');
} else {
  console.log('app not init');
}

// Initialize Firestore
const db = initializeFirestore(app);

// Detect which page is being loaded and call the respective module
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === 'show-question') {
    initShowQuestion(db);
  } else if (page === 'add-question') {
    initAddQuestion(db);
  }
});
