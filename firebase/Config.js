import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCuQIYpOzGvX01oywgHwNq9Hggr-q9Y1FQ",
  authDomain: "chat-125cc.firebaseapp.com",
  projectId: "chat-125cc",
  storageBucket: "chat-125cc.appspot.com",
  messagingSenderId: "68463550988",
  appId: "1:68463550988:web:ef8d9136d97870490b0429",
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = "messages";

export { 
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    MESSAGES
};