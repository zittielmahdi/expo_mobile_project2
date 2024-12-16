// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{Firestore, getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8XxQouy6Qfmh_S6EMavWi9P4yANHLuI0",
  authDomain: "reactfb-9be56.firebaseapp.com",
  projectId: "reactfb-9be56",
  storageBucket: "reactfb-9be56.appspot.com",
  messagingSenderId: "75058720",
  appId: "1:75058720:web:124b988645636478e57645"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB=getFirestore(app);
export const AUTH=getAuth(app)