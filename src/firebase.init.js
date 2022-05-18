// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDp8AgmVQ_2zRLSYDVEPuZB7X2zFrjuDzk",
  authDomain: "todo-tusar.firebaseapp.com",
  projectId: "todo-tusar",
  storageBucket: "todo-tusar.appspot.com",
  messagingSenderId: "651821423567",
  appId: "1:651821423567:web:9733e2c0a0e7cdaff2d0ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 