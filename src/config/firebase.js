import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSrlwHbuQAU5SDfW1HKKgNhlf0fSpe_YQ",
  authDomain: "fir-course-163b8.firebaseapp.com",
  projectId: "fir-course-163b8",
  storageBucket: "fir-course-163b8.appspot.com",
  messagingSenderId: "69091779002",
  appId: "1:69091779002:web:c66ea4cbe35f3e72e37d83",
  measurementId: "G-GTJXQTTGND"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)
