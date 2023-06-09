// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm1vKu9KNBW04zhI5exY5LCdB-D0gGYSM",
  authDomain: "film-demo-19943.firebaseapp.com",
  projectId: "film-demo-19943",
  storageBucket: "film-demo-19943.appspot.com",
  messagingSenderId: "125232536281",
  appId: "1:125232536281:web:b2af0a327be9cf3f49fcc8",
  measurementId: "G-00W4H2N3FD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);