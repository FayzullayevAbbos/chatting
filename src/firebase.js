import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBiJHbQU3fF3AFOCt2hNGn3ToumEg9oJuA",
  authDomain: "chat-app-768f5.firebaseapp.com",
  projectId: "chat-app-768f5",
  storageBucket: "chat-app-768f5.appspot.com",
  messagingSenderId: "1086479030292",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
