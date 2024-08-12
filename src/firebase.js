// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCppx9Nu2NDG6GouypuSwzIZnnDxdjJuo4",
  authDomain: "Personal-Finance-App.firebaseapp.com",
  projectId: "personal-finance-tracker-46586",
  storageBucket: "personal-finance-tracker-46586.appspot.com",
  messagingSenderId: "223419369929",
  appId: "1:223419369929:web:a66ba0d8ae4d25be398018",
  measurementId: "G-7W6GTLN1VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
