// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDi6A2XND9JclJMkwqi8DXAjCQ578WXTfM",
  authDomain: "chatapp-1ce09.firebaseapp.com",
  projectId: "chatapp-1ce09",
  storageBucket: "chatapp-1ce09.appspot.com",
  messagingSenderId: "172995407178",
  appId: "1:172995407178:web:9f1de3f332555fa76e25b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();










