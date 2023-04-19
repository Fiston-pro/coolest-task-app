// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPRctdRnv_gM914OpW9OTvfgORZuDlOwE",
  authDomain: "todoapp-3c79e.firebaseapp.com",
  projectId: "todoapp-3c79e",
  storageBucket: "todoapp-3c79e.appspot.com",
  messagingSenderId: "45118636043",
  appId: "1:45118636043:web:e549048bf5686fe16fc70e",
  measurementId: "G-EWLWSRDXQP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
