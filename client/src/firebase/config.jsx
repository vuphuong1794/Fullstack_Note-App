// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFqFAsTFQ4B3hWjk3JorbV9MBnKgXzll0",
  authDomain: "note-app-69eb2.firebaseapp.com",
  projectId: "note-app-69eb2",
  storageBucket: "note-app-69eb2.appspot.com",
  messagingSenderId: "949176476768",
  appId: "1:949176476768:web:2be036fee1558474304f05",
  measurementId: "G-79CDTTJ2XG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
