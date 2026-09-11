import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase must not be initialized at module scope: this app is statically
// exported, so every page (including /_not-found) imports this module while
// being prerendered on the server during `next build`, where the
// NEXT_PUBLIC_FIREBASE_* env vars are not available. Initializing lazily,
// on first access from the browser, avoids crashing the build.
let firebaseApp: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let storageInstance: FirebaseStorage | undefined;

function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return firebaseApp;
}

export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }
  return authInstance;
}

export function getFirebaseDb(): Firestore {
  if (!dbInstance) {
    dbInstance = getFirestore(getFirebaseApp());
  }
  return dbInstance;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storageInstance) {
    storageInstance = getStorage(getFirebaseApp());
  }
  return storageInstance;
}
