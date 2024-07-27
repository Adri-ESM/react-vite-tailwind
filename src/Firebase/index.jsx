// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
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

export { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup, analytics };