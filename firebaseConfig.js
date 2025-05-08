// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAT-wnvP78y5It68QPwFmynuRgvTyQcoYc",
  authDomain: "lythuyetreact.firebaseapp.com",
  projectId: "lythuyetreact",
  storageBucket: "lythuyetreact.appspot.com",
  messagingSenderId: "889745089570",
  appId: "1:889745089570:web:0eeb6f5f054a629bced67b",
  databaseURL: "https://lythuyetreact-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
