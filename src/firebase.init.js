// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPHNZhkLtJePm8INZo6RfSZJLb1LSU88Q",
    authDomain: "gpu-point.firebaseapp.com",
    projectId: "gpu-point",
    storageBucket: "gpu-point.appspot.com",
    messagingSenderId: "853210324526",
    appId: "1:853210324526:web:3225c4ce6993407ea949bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 