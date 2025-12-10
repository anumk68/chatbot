import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider  } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCF_v2HRlOgXYESvCPGz3KeTj6G8X0_z0w",
  authDomain: "digichat-23c78.firebaseapp.com",
  projectId: "digichat-23c78",
  storageBucket: "digichat-23c78.firebasestorage.app",
  messagingSenderId: "174383613620",
  appId: "1:174383613620:web:470cf5a5eb1b5345edb9e1",
  measurementId: "G-X28N2XFSRX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const facebookProvider  = new FacebookAuthProvider();
