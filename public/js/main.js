// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
}

// // Initialize Firebase Authentication and Firestore
const auth = getAuth(app);

// // Example Firebase Authentication usage
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("No user signed in");
  }
});



// Generic function to add questions to any Firestore collection
const addQuestionsToCollection = async (dbRef, collectionName, questions) => {
  try {
    // Loop through each question object and add it to the specified collection
    for (const questionObj of questions) {
      await addDoc(collection(dbRef, collectionName), questionObj);
    }
    console.log(`Questions added successfully to ${collectionName} collection!`);
  } catch (error) {
    console.error(`Error adding questions to ${collectionName} collection: `, error);
  }
};


const quizQuestions = [
  {
    question: "What is the name of the first chapter in *Harry Potter and the Philosopher's Stone*?",
    choices: [
      "The Boy Who Lived",
      "The Vanishing Glass",
      "The Keeper of the Keys",
      "The Forbidden Forest"
    ],
    correctAnswer: "The Boy Who Lived"
  },
  {
    question: "What kind of creature is Hagrid’s pet, Norbert?",
    choices: [
      "A unicorn",
      "A centaur",
      "A dragon",
      "A hippogriff"
    ],
    correctAnswer: "A dragon"
  },
  {
    question: "Which house does Harry Potter get sorted into at Hogwarts?",
    choices: [
      "Hufflepuff",
      "Ravenclaw",
      "Slytherin",
      "Gryffindor"
    ],
    correctAnswer: "Gryffindor"
  },
  {
    question: "What is the name of the three-headed dog that guards the trapdoor leading to the Philosopher's Stone?",
    choices: [
      "Fang",
      "Fluffy",
      "Fawkes",
      "Buckbeak"
    ],
    correctAnswer: "Fluffy"
  },
  {
    question: "Which broomstick does Harry receive for his first year at Hogwarts?",
    choices: [
      "Nimbus 2000",
      "Firebolt",
      "Cleansweep Seven",
      "Comet Two-Sixty"
    ],
    correctAnswer: "Nimbus 2000"
  }
];



const db = getFirestore(app);

// addQuestionsToCollection(db, 'questions', quizQuestions);


// Select elements
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const submitButton = document.getElementById("submit-answer");
const nextButton = document.getElementById("next-question");
const resultText = document.getElementById("result");

let correctAnswer = ""; // Store the correct answer

// Function to fetch a random question from Firestore
async function fetchRandomQuestion() {
  const questionsRef = collection(db, "questions");
  const snapshot = await getDocs(query(questionsRef));

  const questions = snapshot.docs.map((doc) => doc.data());

  // Randomly pick a question
  const randomIndex = Math.floor(Math.random() * questions.length);
  const questionData = questions[randomIndex];

  return questionData;
}

// Function to display the question and choices
async function displayQuestion() {
  // Clear previous result and disable buttons
  resultText.textContent = "";
  nextButton.disabled = true;
  submitButton.disabled = true;
  choicesContainer.innerHTML = ""; // Clear previous choices

  const questionData = await fetchRandomQuestion();

  questionContainer.textContent = questionData.question;

  // Create buttons for each choice
  questionData.choices.forEach((choice) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.classList.add("choice-button");

    // Add click event to each choice
    choiceButton.addEventListener("click", () => {
      // Clear selection from other buttons
      document.querySelectorAll(".choice-button").forEach((btn) => {
        btn.disabled = false;
        btn.classList.remove("selected");
      });
      // Mark this button as selected and disable it
      choiceButton.classList.add("selected");
      choiceButton.disabled = true;
      submitButton.disabled = false;
      correctAnswer = questionData.correctAnswer; // Store the correct answer
    });

    choicesContainer.appendChild(choiceButton);
  });
}

// Function to handle answer submission
submitButton.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".selected").textContent;
  if (selectedChoice === correctAnswer) {
    resultText.textContent = "Correct!";
    resultText.style.color = "green";
  } else {
    resultText.textContent = "Wrong! Try again.";
    resultText.style.color = "red";
  }

  submitButton.disabled = true; // Disable the submit button after submitting
  nextButton.disabled = false;  // Enable the next question button
});

// Function to load the next question
nextButton.addEventListener("click", () => {
  displayQuestion();  // Load the next random question
  nextButton.disabled = true; // Disable "Next Question" button until next submission
});

// Load a new question when the page is loaded
window.onload = displayQuestion;