import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// ⚠️  Replace these values with your own Firebase project config.
// Go to: Firebase Console → Project Settings → Your Apps → SDK setup & configuration
const firebaseConfig = {
  apiKey: "AIzaSyClMnKVwb63TvnneJ0hA9Las2LcMcLwLrw",
  authDomain: "froler.firebaseapp.com",
  projectId: "froler",
  storageBucket: "froler.firebasestorage.app",
  messagingSenderId: "4541172773",
  appId: "1:4541172773:web:c31a682999c9d3e9d503cc",
  measurementId: "G-2RYQT2Q6V1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
