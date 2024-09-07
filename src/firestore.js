// import { getFirestore, collection, addDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getFirestore} from "firebase/firestore";


export function initializeFirestore(app) {
  return getFirestore(app);
}
