// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDnZ-KAdWPV3Y6kSIIL8f2d7ZdfMOQ8Uz8",
    authDomain: "ayurvedhic-remedies.firebaseapp.com",
    projectId: "ayurvedhic-remedies",
    storageBucket: "ayurvedhic-remedies.firebasestorage.app",
    messagingSenderId: "113109838673",
    appId: "1:113109838673:web:e9f74f976ad64ba90ac170",
    measurementId: "G-RQ3HWB47G7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
