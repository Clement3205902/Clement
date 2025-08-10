// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

function initializeFirebase() {
  try {
    if (!app) {
      // Validate that we have required config
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error('Firebase configuration is incomplete. Some features may not work.');
        throw new Error('Firebase configuration missing');
      }
      app = initializeApp(firebaseConfig);
    }
    if (!auth && app) {
      auth = getAuth(app);
    }
    if (!db && app) {
      db = getFirestore(app);
    }
    return { app, auth, db };
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    return { app: null, auth: null, db: null };
  }
}

// Export lazy getters with error handling
export function getFirebaseAuth() {
  const firebase = initializeFirebase();
  if (!firebase.auth) {
    throw new Error('Firebase Auth is not available. Check your configuration.');
  }
  return firebase.auth;
}

export function getFirebaseDB() {
  const firebase = initializeFirebase();
  if (!firebase.db) {
    throw new Error('Firebase Firestore is not available. Check your configuration.');
  }
  return firebase.db;
}

export function getFirebaseApp() {
  const firebase = initializeFirebase();
  if (!firebase.app) {
    throw new Error('Firebase App is not available. Check your configuration.');
  }
  return firebase.app;
}

// Safe getters that return null instead of throwing
export function getFirebaseAuthSafe() {
  const firebase = initializeFirebase();
  return firebase.auth;
}

export function getFirebaseDBSafe() {
  const firebase = initializeFirebase();
  return firebase.db;
}

// For backward compatibility
export { getFirebaseAuth as auth, getFirebaseDB as db };
export default getFirebaseApp;