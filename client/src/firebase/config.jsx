import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAFqFAsTFQ4B3hWjk3JorbV9MBnKgXzll0",
  authDomain: "note-app-69eb2.firebaseapp.com",
  projectId: "note-app-69eb2",
  storageBucket: "note-app-69eb2.appspot.com",
  messagingSenderId: "949176476768",
  appId: "1:949176476768:web:2be036fee1558474304f05",
  measurementId: "G-79CDTTJ2XG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
