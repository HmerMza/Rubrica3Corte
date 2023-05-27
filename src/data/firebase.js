import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6hZsmsUQ9pcfjyV0Q70JeGny84fzcgMY",
  authDomain: "rubrica-3-5ac55.firebaseapp.com",
  projectId: "rubrica-3-5ac55",
  storageBucket: "rubrica-3-5ac55.appspot.com",
  messagingSenderId: "1023954151083",
  appId: "1:1023954151083:web:76ba6042530924217fb9ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
