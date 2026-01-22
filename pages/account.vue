<template>
  <div style="background: #111; color: white; min-height: 100vh; font-family: sans-serif; display: flex; align-items: center; justify-content: center; padding: 20px;">
    <div style="background: #222; padding: 30px; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <h2 style="margin-top: 0;">DeepAI Account</h2>
      <p style="color: #888;">Logge dich ein, um fortzufahren.</p>
      
      <input v-model="email" type="email" placeholder="Email" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 6px; border: 1px solid #444; background: #333; color: white; box-sizing: border-box;">
      <input v-model="password" type="password" placeholder="Passwort" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 6px; border: 1px solid #444; background: #333; color: white; box-sizing: border-box;">
      
      <div style="display: flex; gap: 10px; margin-top: 10px;">
        <button @click="login" style="flex: 1; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">Login</button>
        <button @click="register" style="flex: 1; padding: 12px; background: #444; color: white; border: none; border-radius: 6px; cursor: pointer;">Registrieren</button>
      </div>
      
      <p v-if="errorMsg" style="color: #ef4444; margin-top: 15px; font-size: 14px;">{{ errorMsg }}</p>
      <div style="margin-top: 20px; text-align: center;">
        <NuxtLink to="/" style="color: #888; text-decoration: none; font-size: 14px;">← Zurück zum Chat</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
const { $auth } = useNuxtApp();
const email = ref("");
const password = ref("");
const errorMsg = ref("");

const login = async () => {
  errorMsg.value = "";
  try {
    await signInWithEmailAndPassword($auth, email.value, password.value);
    navigateTo('/'); // Nach Login zur Startseite
  } catch (e) {
    errorMsg.value = "Fehler: Account nicht gefunden oder Passwort falsch.";
  }
};

const register = async () => {
  errorMsg.value = "";
  try {
    await createUserWithEmailAndPassword($auth, email.value, password.value);
    alert("Account erstellt! Du bist jetzt eingeloggt.");
    navigateTo('/');
  } catch (e) {
    errorMsg.value = "Fehler: " + e.message;
  }
};
</script>
