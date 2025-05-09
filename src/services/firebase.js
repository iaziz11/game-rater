import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "video-game-proje.firebaseapp.com",
  projectId: "video-game-proje",
  storageBucket: "video-game-proje.firebasestorage.app",
  messagingSenderId: "1075517470636",
  appId: "1:1075517470636:web:5c9cf54e8491a4a3dc6c09",
  measurementId: "G-3SNV61Y3SF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
