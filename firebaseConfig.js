// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAT-wnvP78y5It68QPwFmynuRgvTyQcoYc",
  authDomain: "lythuyetreact.firebaseapp.com",
  projectId: "lythuyetreact",
  storageBucket: "lythuyetreact.appspot.com",
  messagingSenderId: "889745089570",
  appId: "1:889745089570:web:0eeb6f5f054a629bced67b",
  databaseURL:
    "https://lythuyetreact-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Authentication và Realtime Database
const auth = getAuth(app);
const db = getDatabase(app);

// Log để kiểm tra
console.log(
  "Firebase được khởi tạo với databaseURL:",
  firebaseConfig.databaseURL
);

export { auth, db };
