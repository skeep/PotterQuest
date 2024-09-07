// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { collection, addDoc } from "firebase/firestore";

// Function to initialize the "Add Question" page
export function initAddQuestion(db) {
    const form = document.getElementById("question-form");
    const questionDataInput = document.getElementById("question-data");
    const statusMessage = document.getElementById("status-message");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Parse the text input as a JavaScript array of questions
        let questionArray;
        try {
            questionArray = JSON.parse(questionDataInput.value);
            if (!Array.isArray(questionArray)) {
                throw new Error("Input is not an array");
            }
        } catch (error) {
            statusMessage.textContent = "Invalid JSON format or not an array. Please correct.";
            statusMessage.style.color = "red";
            return;
        }

        // Iterate over each question in the array and add it to Firestore
        try {
            for (const question of questionArray) {
                await addDoc(collection(db, "questions"), question);
            }

            // Display success message after all questions are added
            statusMessage.textContent = `Successfully added ${questionArray.length} questions!`;
            statusMessage.style.color = "green";

            // Clear the form
            questionDataInput.value = "";
        } catch (error) {
            console.error("Error adding questions:", error);
            statusMessage.textContent = "Error adding questions. Try again.";
            statusMessage.style.color = "red";
        }
    });
}