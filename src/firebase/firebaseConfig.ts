// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5BbWsZjMQSnNAy0nmosvQcd84Q128XlQ",
  authDomain: "makanan-tanah-air.firebaseapp.com",
  projectId: "makanan-tanah-air",
  storageBucket: "makanan-tanah-air.appspot.com",
  messagingSenderId: "1022560440700",
  appId: "1:1022560440700:web:c1de34b380b054a31b14f9",
  measurementId: "G-EBP6KPKTYM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, app };

// const firebaseConfig = {
//   apiKey: "AIzaSyC5BbWsZjMQSnNAy0nmosvQcd84Q128XlQ",
//   authDomain: "makanan-tanah-air.firebaseapp.com",
//   projectId: "makanan-tanah-air",
//   storageBucket: "makanan-tanah-air.appspot.com",
//   messagingSenderId: "1022560440700",
//   appId: "1:1022560440700:web:c1de34b380b054a31b14f9",
//   measurementId: "G-EBP6KPKTYM",
// };
