import { initializeApp } from "firebase/app";

// sign in and log out
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  // import from firebase authentication service

// CRUD
import { getFirestore } from 'firebase/firestore';

// storage
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB4YWL-7wSYJxg5rmG0c48cqDd_me_L1JQ",
  authDomain: "fir-practice-17519.firebaseapp.com",
  projectId: "fir-practice-17519",
  storageBucket: "fir-practice-17519.appspot.com",
  messagingSenderId: "310231291950",
  appId: "1:310231291950:web:d8964efb21f5058f4b27bf"
};


const app = initializeApp(firebaseConfig);  // Initialize Firebase

// sign in and log out
export const auth = getAuth(app);  
export const googleProvider = new GoogleAuthProvider();

// CRUD
export const db = getFirestore(app);

// storage
export const storage = getStorage(app);