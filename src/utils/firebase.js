// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI97dblfyj6D0Lt0eshNvqnYBwpG0jXkE",
  authDomain: "netflix-gpt-1f5f7.firebaseapp.com",
  projectId: "netflix-gpt-1f5f7",
  storageBucket: "netflix-gpt-1f5f7.appspot.com",
  messagingSenderId: "588552794678",
  appId: "1:588552794678:web:162c6d9f1e54115a041e97",
  measurementId: "G-52FEGPY7PW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
