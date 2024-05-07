import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz6uNxIcYQhfejA_1jSe26g4xLZNKcSVg",
  authDomain: "lendo-no-vagao-cd6e5.firebaseapp.com",
  projectId: "lendo-no-vagao-cd6e5",
  storageBucket: "lendo-no-vagao-cd6e5.appspot.com",
  messagingSenderId: "675340162383",
  appId: "1:675340162383:web:f3dcb064f7264c3a03213a",
  measurementId: "G-9NE38976PL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const userRef = collection(db, 'users')

export default app ;