import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfm_vzaQK6X2dZmil5DxCPS6Psqsre4Mo",
  authDomain: "deepai-a2fda.firebaseapp.com",
  projectId: "deepai-a2fda",
  storageBucket: "deepai-a2fda.appspot.com",
  messagingSenderId: "410655333947",
  appId: "1:410655333947:web:96ca758ec94f086720061e"
};

export const initFirebase = () => {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const auth = getAuth(app);
  return { app, auth };
};
