
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmrLCekGPczq8VpIqP8xs9WVb20XvhzIE",
  authDomain: "mytracker-844e5.firebaseapp.com",
  projectId: "mytracker-844e5",
  storageBucket: "mytracker-844e5.appspot.com",
  messagingSenderId: "1078458749781",
  appId: "1:1078458749781:web:4f98adb1288d9ce25d55dc"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }