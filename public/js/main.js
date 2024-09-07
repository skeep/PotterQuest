// Firebase configuration
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
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication and get a reference to the service
  const auth = firebase.auth();
  
  // Initialize Cloud Firestore and get a reference to the service
  const db = firebase.firestore();
  
  // Example Firebase Authentication usage
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User is signed in:", user.email);
    } else {
      console.log("No user signed in");
    }
  });
  
  // Example Firestore usage: Adding data to Firestore
  db.collection("users").add({
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
  