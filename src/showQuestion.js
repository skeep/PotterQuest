// import { getDocs, collection, query } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { collection, getDocs, query } from "firebase/firestore";


// Function to initialize the quiz display page
export function initShowQuestion(db) {
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
}


