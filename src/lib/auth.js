import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign in with email and password
export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Create a new account
export function registerWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Sign in with Google (Popup)
export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// Sign out
export function logout() {
  return signOut(auth);
}
