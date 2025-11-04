// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAfzcOOW-mjRum3XvVtvcad_h-YhKcOOl0",
  authDomain: "e-commerce-f5f75.firebaseapp.com",
  projectId: "e-commerce-f5f75",
  storageBucket: "e-commerce-f5f75.appspot.com", // ✅ Corrected
  messagingSenderId: "498678861712",
  appId: "1:498678861712:web:d8f9e775559e3a171a6d15",
  measurementId: "G-59ZM1REN41"
};

// ✅ Initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Auth + Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
