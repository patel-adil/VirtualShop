import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
// Your VirtualShop Firebase project configuration
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
let firebaseApp;
let auth;
let googleProvider;

try {
  // Initialize Firebase App
  firebaseApp = initializeApp(firebaseConfig);
  
  // Initialize Firebase Auth
  auth = getAuth(firebaseApp);
  
  // Configure Google Provider
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account' // Always show account selection
  });
  
  // Verify connection
  console.log('✅ Firebase connected successfully!');
  console.log('📦 Project:', firebaseConfig.projectId);
  console.log('🔐 Auth Domain:', firebaseConfig.authDomain);
  
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Export Firebase services
export { auth, googleProvider, firebaseApp };

// Connection test function (optional - for debugging)
export const testFirebaseConnection = () => {
  try {
    if (auth && firebaseApp) {
      console.log('✅ Firebase is connected and ready!');
      return true;
    } else {
      console.error('❌ Firebase is not properly initialized');
      return false;
    }
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};
