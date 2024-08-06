import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCJYyfQVVEqC-UDPv7HKtBlvmhjGUOXGNE",
  authDomain: "adri-s-shop.firebaseapp.com",
  projectId: "adri-s-shop",
  storageBucket: "adri-s-shop.appspot.com",
  messagingSenderId: "42724334430",
  appId: "1:42724334430:web:6b59a8a56606bf4aa10dcf",
  measurementId: "G-53N90DB6G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

// Initialize Google Analytics only if window is defined
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, db };
