// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb4zj2j7DEZmJ5UGcf1X1Su8k-uUldQpg",
  authDomain: "ortho-3d717.firebaseapp.com",
  projectId: "ortho-3d717",
  storageBucket: "ortho-3d717.firebasestorage.app",
  messagingSenderId: "608190009608",
  appId: "1:608190009608:web:36301c7c54dbb0cbc25cbd",
  measurementId: "G-V87RJMFJYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Database instances
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics conditionally (safeguards SSR / non-browser environments)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics fallback
  });
}

export { app, auth, db, analytics };
export default app;
