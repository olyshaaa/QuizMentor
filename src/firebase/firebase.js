import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvatN7NNEbE3MZyvtdSXpBdZcchMBVuyM",
  authDomain: "quizmentor-1fe6b.firebaseapp.com",
  projectId: "quizmentor-1fe6b",
  storageBucket: "quizmentor-1fe6b.appspot.com",
  messagingSenderId: "1055203056090",
  appId: "1:1055203056090:web:53cf19f6acf92e3c2f88e3",
  measurementId: "G-SFKQS4H5TP"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { app, auth }