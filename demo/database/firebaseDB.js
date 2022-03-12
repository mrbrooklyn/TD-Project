// Import the functions you need from the SDKs you need
//import auth from '@react-native-firebase/auth';
//import * as firebase from "firebase";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVNI3pLTMr6zS4OYcPvZt0swPZ4jI49B4",
  authDomain: "modular-granite-335504.firebaseapp.com",
  projectId: "modular-granite-335504",
  storageBucket: "modular-granite-335504.appspot.com",
  messagingSenderId: "368487909269",
  appId: "1:368487909269:web:5cba9be2453bbdb356189c",
  measurementId: "G-HBZ3VZXWFD"
};

// Initialize Firebase

{/*let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
export { auth };*/}

const app = initializeApp(firebaseConfig)

export { app }
export const auth = getAuth(app)
export const db = getFirestore(app)


