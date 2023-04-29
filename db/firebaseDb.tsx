import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 
  
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "cryptonomize-59f4f.firebaseapp.com",
  projectId: "cryptonomize-59f4f",
  storageBucket: "cryptonomize-59f4f.appspot.com",
  messagingSenderId: "103572793689",
  appId: "1:103572793689:web:757f1aa5f434b75cac8448",
}
// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const myAuth = () => getAuth(app);
const myStorage = () => getStorage(app);
const myDb = () => getFirestore(app);

export const auth = myAuth();
export const storage = myStorage();
export const db = myDb();
