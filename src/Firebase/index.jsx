import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

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
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore


export { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, analytics, db };



