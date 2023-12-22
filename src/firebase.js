import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB8mr0bc2Smj2ypJEp8-XZ3tPWbBiyu-LY",
  authDomain: "curd-operation-firebase-d64bf.firebaseapp.com",
  projectId: "curd-operation-firebase-d64bf",
  storageBucket: "curd-operation-firebase-d64bf.appspot.com",
  messagingSenderId: "840515090014",
  appId: "1:840515090014:web:3f2bbdb5736d75c66d26cf"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);