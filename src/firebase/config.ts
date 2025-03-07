import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Replace these with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBcplBAxLmLEQtazU3L1cfzgkqKWxAWlhI",
  authDomain: "wordpuzzles-392dc.firebaseapp.com",
  projectId: "wordpuzzles-392dc",
  storageBucket: "wordpuzzles-392dc.firebasestorage.app",
  messagingSenderId: "126591410766",
  appId: "1:126591410766:web:a6cfa93a4fe130a452591f",
  measurementId: "G-D15VD1763F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 