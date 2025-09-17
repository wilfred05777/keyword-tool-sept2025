// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Your Firebase config (from Firebase Console -> Project Settings)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Simple test function
export async function testFirestoreConnection() {
  try {
    const ref = doc(db, "test", "ping");
    await setDoc(ref, { status: "ok", ts: Date.now() });
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data();
    } else {
      return { error: "No data found" };
    }
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}
