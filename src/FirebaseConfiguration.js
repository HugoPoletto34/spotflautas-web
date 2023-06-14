import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import env from "react-dotenv";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: env.REACT_APP_API_KEY,
  authDomain: env.REACT_APP_AUTH_DOMAIN,
  projectId: env.REACT_APP_PROJECT_ID,
  storageBucket: env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_APP_ID,
  measurementId: env.REACT_APP_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;