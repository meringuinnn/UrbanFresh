import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbJn_KtfyWKJKPEbk4l5bRcBTv1ea7Kfg",
  authDomain: "urban-fresh-app-40ad1.firebaseapp.com",
  projectId: "urban-fresh-app-40ad1",
  storageBucket: "urban-fresh-app-40ad1.appspot.com",
  messagingSenderId: "62947803808",
  appId: "1:62947803808:web:f48df679133384de99bfc5"
};
  
  // Initialize Firebase
  export const FIREBASE_APP = initializeApp(firebaseConfig);
  export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
  export const  STORAGE = getStorage(FIREBASE_APP);