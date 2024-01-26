// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ5O3HsOiluAwCCKhOMI_S4Qr-TrFIfJs",
  authDomain: "netflixgpt-495ed.firebaseapp.com",
  projectId: "netflixgpt-495ed",
  storageBucket: "netflixgpt-495ed.appspot.com",
  messagingSenderId: "101480675089",
  appId: "1:101480675089:web:d3fa4efa0ac81d40993eb0",
  measurementId: "G-B6Q07SXD7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();