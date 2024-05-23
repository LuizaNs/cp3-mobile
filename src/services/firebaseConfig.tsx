import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjCKnITPPFyka2DyWOtIi-oUdDmd4MK6U",
  authDomain: "mobile-cp3.firebaseapp.com",
  projectId: "mobile-cp3",
  storageBucket: "mobile-cp3.appspot.com",
  messagingSenderId: "610135258617",
  appId: "1:610135258617:web:61ce8ad4be6ff4cf017928"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{app,db,getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc}