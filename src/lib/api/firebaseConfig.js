// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBybeE6cj49n1mmtaPyrw4mrYbCJOxZ3s",
  authDomain: "study-record-8766a.firebaseapp.com",
  projectId: "study-record-8766a",
  storageBucket: "study-record-8766a.appspot.com",
  messagingSenderId: "824086349645",
  appId: "1:824086349645:web:5fc930b7452c9e8a6c9904",
  measurementId: "G-JCVZGNNLNS"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = firebase.storage();