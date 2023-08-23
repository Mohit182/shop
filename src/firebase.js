// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb_Dgj6LugIuye4pUPadBquWVTlpvxawQ",
  authDomain: "shop-70ab1.firebaseapp.com",
  projectId: "shop-70ab1",
  storageBucket: "shop-70ab1.appspot.com",
  messagingSenderId: "893528190698",
  appId: "1:893528190698:web:c16f6a4b8a8cb2d4f4f193",
  measurementId: "G-34EBKDZV09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const analytics = getAnalytics(app);

export { db, auth };