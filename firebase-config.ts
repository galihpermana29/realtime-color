import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCLVsUuNGvD3uopOAKj0dfhdZUuPHRMYBg",
  authDomain: "chat-bcate.firebaseapp.com",
  projectId: "chat-bcate",
  storageBucket: "chat-bcate.appspot.com",
  messagingSenderId: "376888134493",
  appId: "1:376888134493:web:627df6fc356b496e9fb6b4",
  measurementId: "G-3HEDKYN3J3",
};

export const app = initializeApp(config);
export const db = getFirestore();
