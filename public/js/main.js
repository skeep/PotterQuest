// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

if(app) {
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

const db = getFirestore(app);

// Example Firestore usage: Adding data to Firestore
addDoc(collection(db, "users"), {
  name: "Harry Potter",
  house: "Gryffindor",
  points: 100
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});