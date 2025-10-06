import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";// ✅ add this

const firebaseConfig = {
  apiKey: "AIzaSyDJV3bDpdFZxY1a_iempjIUP_FoAKROSko",
  authDomain: "carnazaisland-82009.firebaseapp.com",
  projectId: "carnazaisland-82009",
  storageBucket: "carnazaisland-82009.firebasestorage.app",
  messagingSenderId: "97027397306",
  appId: "1:97027397306:web:a4b4f4356f3150dd769483"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore initialized
export const storage = getStorage(app);
// Export both so you can use them anywhere
export { auth, db };
//