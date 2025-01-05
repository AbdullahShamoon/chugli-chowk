// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider , getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chugli-chowk.firebaseapp.com",
  projectId: "chugli-chowk",
  storageBucket: "chugli-chowk.firebasestorage.app",
  messagingSenderId: "321582084755",
  appId: "1:321582084755:web:0e8bee088a353dad2d9366"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);