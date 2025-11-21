import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
// IMPORTANT: Replace these with your actual Firebase config
// Go to https://console.firebase.google.com/ to create a project and get your config
const firebaseConfig = {
  apiKey: "AIzaSyBOx-ebrFJGrYzZlvbFJ1v3FDl1mnBH5RE",
  authDomain: "virtualshop-630e3.firebaseapp.com",
  projectId: "virtualshop-630e3",
  storageBucket: "virtualshop-630e3.firebasestorage.app",
  messagingSenderId: "349940900146",
  appId: "1:349940900146:web:be188fbf8057f78bcb372b",
  measurementId: "G-8RCYFZB94R"

  
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account' // Always show account selection
});
