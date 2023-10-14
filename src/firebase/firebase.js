import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; // Обратите внимание, что я добавил "GoogleAuthProvider" сюда.

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "quizmentor-1a50c.firebaseapp.com",
  projectId: "quizmentor-1a50c",
  storageBucket: "quizmentor-1a50c.appspot.com",
  messagingSenderId: "721847974737",
  appId: "1:721847974737:web:a4d06a7f8cd5d825fab170",
  measurementId: "G-SYGG5979YS"
};

const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider(); // Создание экземпляра GoogleAuthProvider
const analytics = getAnalytics(app);

export { app, getAuth, googleAuthProvider };
