// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore import

// 👇 apna Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAfzcOOW-mjRum3XvVtvcad_h-YhKcOOl0",
  authDomain: "e-commerce-f5f75.firebaseapp.com",
  projectId: "e-commerce-f5f75",
  storageBucket: "e-commerce-f5f75.firebasestorage.app",
  messagingSenderId: "498678861712",
  appId: "1:498678861712:web:d8f9e775559e3a171a6d15",
  measurementId: "G-59ZM1REN41"
};

// ✅ Duplicate initialization se bachne ke liye check karo
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Auth + Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();




// ✅ Sab exports
export { app, auth, googleProvider };
