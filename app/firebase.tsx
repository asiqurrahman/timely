// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import {
  connectStorageEmulator,
  FirebaseStorage,
  getStorage,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy9kGFrkhmepiHYlKYrl84dOdYcc6KgXA",
  authDomain: "postcard-bc985.firebaseapp.com",
  projectId: "postcard-bc985",
  storageBucket: "postcard-bc985.appspot.com",
  messagingSenderId: "791046908441",
  appId: "1:791046908441:web:ceef7c384ae531ed395888",
  measurementId: "G-JNC0VPCYXP",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const userAuth = getAuth(app);
export const firestore = getFirestore(app);

if (
  typeof window !== "undefined" &&
  window.location.hostname === "localhost" &&
  process.env.NODE_ENV === "development"
) {
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectAuthEmulator(userAuth, "http://localhost:9099", {
    disableWarnings: true,
  });
  // connectStorageEmulator(storage, "localhost", 9199);
}
