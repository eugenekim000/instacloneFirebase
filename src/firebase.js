import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAuGGzwRyFnvygUq99v_-fSKxhfPT9mvv0",
  authDomain: "instagram-clone-firebase-ef88b.firebaseapp.com",
  databaseURL: "https://instagram-clone-firebase-ef88b.firebaseio.com",
  projectId: "instagram-clone-firebase-ef88b",
  storageBucket: "instagram-clone-firebase-ef88b.appspot.com",
  messagingSenderId: "453077762156",
  appId: "1:453077762156:web:8bd72c8220ce878dc7d849",
  measurementId: "G-540HJB0J3B",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
