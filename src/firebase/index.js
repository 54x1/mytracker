
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCmrLCekGPczq8VpIqP8xs9WVb20XvhzIE",
  authDomain: "mytracker-844e5.firebaseapp.com",
  projectId: "mytracker-844e5",
  storageBucket: "mytracker-844e5.appspot.com",
  messagingSenderId: "1078458749781",
  appId: "1:1078458749781:web:4f98adb1288d9ce25d55dc"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const itemsColRef = collection(db, "items");
const auth = getAuth(app)

const getCurrentUser = () => new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, user => {
        unsub()
        resolve(user)
    }, reject)
})

export {getCurrentUser, auth }
export default itemsColRef;
