// src/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

// Your Firebase configuration - REPLACE WITH YOUR OWN CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAHYNHRuRKcpRtksRqx6OId-ODBGtyjVwI",
  authDomain: "login-9e6a3.firebaseapp.com",
  projectId: "login-9e6a3",
  storageBucket: "login-9e6a3.firebasestorage.app",
  messagingSenderId: "976105222256",
  appId: "1:976105222256:web:8b217080e4ad367fec04b5",
  measurementId: "G-PY1MNJFPS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Google Provider
const googleProvider = new GoogleAuthProvider();

// Add scopes for additional permissions
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Force account selection every time
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || ''
      }
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state observer
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };