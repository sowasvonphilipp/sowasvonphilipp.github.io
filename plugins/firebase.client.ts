import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyDfm_vzaQK6X2dZmil5DxCPS6Psqsre4Mo",
    authDomain: "deepai-a2fda.firebaseapp.com",
    projectId: "deepai-a2fda",
    storageBucket: "deepai-a2fda.firebasestorage.app",
    messagingSenderId: "410655333947",
    appId: "1:410655333947:web:96ca758ec94f086720061e"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return {
    provide: {
      auth: auth
    }
  };
});
