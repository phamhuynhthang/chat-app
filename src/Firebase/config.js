import firebase from "firebase/app";

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyAAmBbnfi7IjbQfmi9arrGumSD5xUp_FOM",
    authDomain: "fun-chat-5f527.firebaseapp.com",
    projectId: "fun-chat-5f527",
    storageBucket: "fun-chat-5f527.appspot.com",
    messagingSenderId: "157555686085",
    appId: "1:157555686085:web:191075b3f4f45c5e644eac",
    measurementId: "G-R1P1M466XL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;