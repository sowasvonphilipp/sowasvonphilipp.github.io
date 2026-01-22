.tos-row {
  margin: 10px 0 0 0;
  font-size: 0.98rem;
  color: #23272e;
  display: flex;
  align-items: center;
}
.tos-label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.tos-checkbox {
  margin-right: 8px;
}
.mfa-status {
  display: inline-block;
  margin-left: 10px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 0.98rem;
}
.mfa-on {
  background: #22c55e22;
  color: #22c55e;
  border: 1.5px solid #22c55e;
}
.mfa-off {
  background: #ef444422;
  color: #ef4444;
  border: 1.5px solid #ef4444;
}
.profile-pic-preview {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 12px;
  box-shadow: 0 2px 8px #0c89e322;
  border: 2px solid #0c89e3;
}
.profile-card {
  margin-top: 18px;
}
.code-card {
  margin-top: 18px;
}
<template>
  <div class="account-bg">
    <div class="account-container">
      <div v-if="loading" class="account-loading">Account wird geladen...</div>
      <div v-else-if="user">
        <!-- Modern Top Bar -->
        <div class="account-topbar">
          <div class="account-title-bar">
            <div class="account-logo"><ShieldCheckIcon class="sidebar-icon" /></div>
            <div class="account-title-main">DeepAI Account</div>
          </div>
          <div class="account-userbar">
            <div class="user-avatar-lg">{{ user.email.charAt(0).toUpperCase() }}</div>
            <div class="user-info">
              <div class="user-email-main">{{ user.email }}</div>
              <div class="user-id-main">ID: {{ user.uid }}</div>
            </div>
            <button class="logout-btn topbar-logout" @click="handleLogout">Abmelden</button>
          </div>
        </div>
        <div v-if="accountSuspended" class="account-suspended">
          <span class="suspended-icon">⛔</span>
          <div>
            <h3>Account gesperrt</h3>
            <p>Dein Account wurde vorübergehend gesperrt.<br>Bitte kontaktiere den Support für weitere Informationen.</p>
          </div>
        </div>
        <div v-else class="dashboard-advanced">
          <!-- Improved Sidebar -->
          <aside class="sidebar sidebar-advanced">
            <div class="sidebar-title">Navigation</div>
            <ul class="sidebar-list">
              <li :class="{active: activeTab==='dashboard'}" @click="activeTab='dashboard'">
                <HomeIcon class="sidebar-icon" /> <span>Dashboard</span>
              </li>
              <li :class="{active: activeTab==='security'}" @click="activeTab='security'">
                <ShieldCheckIcon class="sidebar-icon" /> <span>Sicherheit</span>
              </li>
              <li :class="{active: activeTab==='code'}" @click="activeTab='code'">
                <GiftIcon class="sidebar-icon" /> <span>Code einlösen</span>
              </li>
              <li :class="{active: activeTab==='cookies'}" @click="activeTab='cookies'">
                <Cog6ToothIcon class="sidebar-icon" /> <span>Cookies & Einstellungen</span>
              </li>
              <li :class="{active: activeTab==='support'}" @click="activeTab='support'">
                <LifebuoyIcon class="sidebar-icon" /> <span>Support</span>
              </li>
              <li :class="{active: activeTab==='sessions'}" @click="activeTab='sessions'">
                <UserGroupIcon class="sidebar-icon" /> <span>Sitzungen</span>
              </li>
              <li :class="{active: activeTab==='delete'}" @click="activeTab='delete'">
                <TrashIcon class="sidebar-icon" /> <span>Account löschen</span>
              </li>
            </ul>
          </aside>
          <section class="dashboard-content dashboard-content-advanced">
            <!-- Tab Panels: must be adjacent for v-if/v-else-if -->
            <template v-if="activeTab==='dashboard'">
              <div class="dashboard-row dashboard-row-advanced">
                <div class="dashboard-card user-card user-card-advanced">
                  <div class="user-avatar-xl">{{ user.email.charAt(0).toUpperCase() }}</div>
                  <div>
                    <div class="user-email-xl">{{ user.email }}</div>
                    <div class="user-id-xl">ID: {{ user.uid }}</div>
                  </div>
                </div>
                <div class="dashboard-card stats-card stats-card-advanced">
                  <div class="stats-title">Nutzung</div>
                  <div class="stats-row"><span>Anfragen:</span> <span>∞</span></div>
                  <div class="stats-row"><span>Bilder generiert:</span> <span>∞</span></div>
                  <div class="stats-row"><span>Letzter Login:</span> <span>{{ user.metadata?.lastSignInTime || '-' }}</span></div>
                </div>
                <div class="dashboard-card status-card status-card-advanced">
                  <div class="status-title">Status</div>
                  <div class="status-value status-ok">Aktiv</div>
                </div>
              </div>
              <div class="dashboard-row dashboard-row-advanced">
                <div class="dashboard-card quick-actions-card">
                  <div class="quick-actions-title">Schnellaktionen</div>
                  <button class="quick-action-btn" @click="activeTab='security'">Passwort ändern</button>
                  <button class="quick-action-btn" @click="activeTab='delete'">Account löschen</button>
                  <button class="quick-action-btn" @click="activeTab='sessions'">Sitzungen anzeigen</button>
                </div>
                <div class="dashboard-card support-card support-card-advanced">
                  <div class="support-title">Support</div>
                  <div class="support-row">Bei Fragen: <a href="mailto:support@deepai.de">support@deepai.de</a></div>
                  <div class="support-row">FAQ: <a href="/faq">Häufige Fragen</a></div>
                </div>
              </div>
            </template>
            <template v-else-if="activeTab==='security'">
              <div class="dashboard-card security-card security-card-advanced">
                <div class="settings-title">Sicherheit & Account</div>
                <div class="settings-row">
                  <button class="pw-reset-btn" @click="showPwResetModal = true">Passwort zurücksetzen</button>
                </div>
                <div class="settings-row">
                  <input v-model="newEmail" type="email" placeholder="Neue E-Mail" class="login-input" />
                  <button class="pw-reset-btn" @click="handleChangeEmail">E-Mail ändern</button>
                </div>
                <!-- Password and 2FA only once, advanced polish -->
                <div class="settings-row">
                  <input v-model="oldPassword" type="password" placeholder="Aktuelles Passwort" class="login-input" autocomplete="current-password" />
                  <input v-model="newPassword" type="password" placeholder="Neues Passwort" class="login-input" autocomplete="new-password" />
                  <input v-model="confirmPassword" type="password" placeholder="Neues Passwort bestätigen" class="login-input" autocomplete="new-password" />
                  <button class="pw-reset-btn" @click="handleChangePassword">Passwort ändern</button>
                  <span v-if="passwordChangeMsg" class="settings-saved-msg">{{ passwordChangeMsg }}</span>
                </div>
                <div class="settings-row">
                  <b>2-Faktor-Authentifizierung (2FA):</b>
                  <span v-if="mfaEnabled" class="mfa-status mfa-on">Aktiviert</span>
                  <span v-else class="mfa-status mfa-off">Nicht aktiviert</span>
                  <button class="pw-reset-btn" v-if="!mfaEnabled" @click="startMfaSetup">2FA aktivieren</button>
                  <button class="pw-reset-btn" v-if="mfaEnabled" @click="disableMfa">2FA deaktivieren</button>
                  <span v-if="mfaMsg" class="settings-saved-msg">{{ mfaMsg }}</span>
                  <div v-if="showMfaSetup">
                    <input v-model="mfaPhone" type="tel" placeholder="Handynummer für 2FA (z.B. +49123456789)" class="login-input" />
                    <button class="pw-reset-btn" @click="verifyMfaPhone">Code anfordern</button>
                  </div>
                  <div v-if="showMfaVerify">
                    <input v-model="mfaCode" type="text" placeholder="2FA Code eingeben" class="login-input" />
                    <button class="pw-reset-btn" @click="confirmMfaCode">2FA bestätigen</button>
                  </div>
                </div>
                <div v-if="pwResetMsg" class="settings-saved-msg">{{ pwResetMsg }}</div>
                <div v-if="emailChangeMsg" class="settings-saved-msg">{{ emailChangeMsg }}</div>
                <div v-if="passwordChangeMsg" class="settings-saved-msg">{{ passwordChangeMsg }}</div>
              </div>
              <div class="dashboard-card profile-card security-card-advanced">
                <div class="settings-title">Profil bearbeiten</div>
                <div class="settings-row">
                  <input v-model="profileName" type="text" placeholder="Name" class="login-input" />
                  <input v-model="profileAge" type="number" min="0" max="120" placeholder="Alter (ab 18)" class="login-input" style="max-width:120px;" />
                  <span v-if="profileAge && profileAge < 18" style="color:#ef4444;font-weight:700;">Du musst mindestens 18 sein!</span>
                </div>
                <div class="settings-row">
                  <input type="file" @change="onProfilePicChange" accept="image/*" />
                  <img v-if="profilePicUrl" :src="profilePicUrl" class="profile-pic-preview" />
                </div>
                <button class="settings-save-btn" @click="saveProfile" :disabled="profileAge && profileAge < 18">Profil speichern</button>
                <div v-if="profileMsg" class="settings-saved-msg">{{ profileMsg }}</div>
              </div>
            </template>
            <template v-else-if="activeTab==='code'">
              <div class="dashboard-card code-card security-card-advanced">
                <div class="settings-title">Code einlösen</div>
                <div class="settings-row">
                  <input v-model="redeemCode" type="text" placeholder="Code eingeben" class="login-input" />
                  <button class="pw-reset-btn" @click="redeemUserCode">Code einlösen</button>
                </div>
                <div v-if="codeStatus" class="settings-saved-msg">{{ codeStatus }}</div>
              </div>
            </template>
            <template v-else-if="activeTab==='cookies'">
              <div class="dashboard-card settings-card settings-card-advanced">
                <div class="settings-title">Cookies & Einstellungen</div>
                <div class="settings-row">
                  <label><input type="checkbox" v-model="cookiePrefs.analytics"> Analytics Cookies erlauben</label>
                </div>
                <div class="settings-row">
                  <label><input type="checkbox" v-model="cookiePrefs.marketing"> Marketing Cookies erlauben</label>
                </div>
                <div class="settings-row">
                  <label><input type="checkbox" v-model="cookiePrefs.necessary" disabled checked> Notwendige Cookies</label>
                </div>
                <button class="settings-save-btn" @click="saveCookies">Einstellungen speichern</button>
                <div v-if="cookieSaved" class="settings-saved-msg">Gespeichert!</div>
              </div>
            </template>
            <template v-else-if="activeTab==='support'">
              <div class="dashboard-card support-card support-card-advanced">
                <div class="support-title">Support</div>
                <div class="support-row">Bei Fragen: <a href="mailto:support@deepai.de">support@deepai.de</a></div>
                <div class="support-row">FAQ: <a href="/faq">Häufige Fragen</a></div>
              </div>
            </template>
            <template v-else-if="activeTab==='sessions'">
              <div class="dashboard-card sessions-card">
                <div class="settings-title">Aktive Sitzungen</div>
                <div class="settings-row">
                  <b>Aktuelle Sitzung:</b>
                  <ul style="margin: 8px 0 0 0; padding-left: 18px;">
                    <li><b>Browser:</b> {{ browserUserAgent }}</li>
                    <li><b>IP:</b> <span v-if="sessionIp">{{ sessionIp }}</span><span v-else>Lädt...</span></li>
                    <li><b>Letzter Login:</b> {{ user.metadata?.lastSignInTime || '-' }}</li>
                  </ul>
                </div>
                <div class="settings-row">
                  <button class="quick-action-btn" @click="handleLogout">Nur diese Sitzung abmelden</button>
                  <button class="quick-action-btn" @click="handleLogoutEverywhere">Alle Sitzungen abmelden (Logout Everywhere)</button>
                </div>
                <div v-if="logoutEverywhereMsg" class="settings-saved-msg">{{ logoutEverywhereMsg }}</div>
              </div>
            </template>
            <template v-else-if="activeTab==='delete'">
              <div class="dashboard-card delete-card">
                <div class="settings-title">Account löschen</div>
                <div class="settings-row">Achtung: Das Löschen deines Accounts ist unwiderruflich!</div>
                <button class="delete-btn" @click="showDeleteModal = true">Account unwiderruflich löschen</button>
                <div v-if="deleteMsg" class="settings-saved-msg">{{ deleteMsg }}</div>
              </div>
            </template>
          </section>
        </div>
        <!-- Password Reset Modal -->
        <div v-if="showPwResetModal" class="modal-overlay">
          <div class="modal-card">
            <div class="modal-title">Passwort zurücksetzen</div>
            <div class="modal-content">Möchtest du wirklich eine Passwort-Reset E-Mail an <b>{{ user.email }}</b> senden?</div>
            <div class="modal-actions">
              <button class="modal-btn" @click="handlePasswordResetModal">Ja, senden</button>
              <button class="modal-btn cancel" @click="showPwResetModal = false">Abbrechen</button>
            </div>
          </div>
        </div>
        <!-- Delete Account Modal -->
        <div v-if="showDeleteModal" class="modal-overlay">
          <div class="modal-card">
            <div class="modal-title">Account löschen</div>
            <div class="modal-content">Bist du sicher, dass du deinen Account <b>unwiderruflich</b> löschen möchtest?</div>
            <div class="modal-actions">
              <button class="modal-btn delete" @click="handleDeleteAccount">Ja, löschen</button>
              <button class="modal-btn cancel" @click="showDeleteModal = false">Abbrechen</button>
            </div>
          </div>
        </div>
      </div>
      <!-- ...existing login form for not logged in... -->
      <div v-else class="login-form improved-login-form">
        <div class="login-card">
          <h3 class="login-title">Willkommen zurück!</h3>
          <p class="login-hint">Bitte melde dich an oder registriere dich.</p>
          <input v-model="email" type="email" placeholder="E-Mail-Adresse" class="login-input" autocomplete="username email">
          <input v-model="password" type="password" placeholder="Passwort" class="login-input" autocomplete="current-password">
          <div class="login-btn-row">
            <button @click="handleLogin" class="login-btn primary" :disabled="loginDisabled">Login</button>
            <button @click="handleRegister" class="login-btn" :disabled="loginDisabled || !acceptedTos || (profileAge && profileAge < 18)">Registrieren</button>
          </div>
          <div class="tos-row">
            <label class="tos-label">
              <input type="checkbox" v-model="acceptedTos" class="tos-checkbox" />
              Ich akzeptiere die <a href="/tos" target="_blank">Nutzungsbedingungen</a> und <a href="/datenschutz" target="_blank">Datenschutz</a>.
            </label>
          </div>
          const acceptedTos = ref(false);
          <button class="pw-reset-btn login-reset-btn" @click="handleLoginPasswordReset" :disabled="loginDisabled">Passwort vergessen?</button>
          <button class="google-btn" @click="handleGoogleLogin" :disabled="loginDisabled">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/500px-Google_%22G%22_logo.svg.png" alt="Google Logo" class="google-logo" />
            <span>Mit Google anmelden</span>
          </button>
          <div id="recaptcha-container" style="margin: 18px 0 0 0;"></div>
          <div v-if="loginPwResetMsg" class="settings-saved-msg">{{ loginPwResetMsg }}</div>
            <div v-if="loginDisabled" class="rate-limit-msg">Zu viele Versuche. Bitte warte {{ rateLimitWait }}s ...</div>
          </div>
          </div>
          <div v-if="!user" class="login-hint">Noch keinen Account? Drücke auf "Registrieren"</div>
      <div v-if="errorMsg" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-title">Fehler</div>
          <div class="modal-content">{{ errorMsg }}</div>
          <div class="modal-actions">
            <button class="modal-btn" @click="errorMsg = ''">Schließen</button>
          </div>
        </div>
      </div>
      <div class="back-link">
        <NuxtLink to="/">← Zurück zur Homepage</NuxtLink>
      </div>

    
    </div>
  </div>
</template>

<script setup>
// Map Firebase Auth errors to user-friendly German messages
function getAuthErrorMessage(error) {
  const code = error.code || error.message || '';
  if (typeof code !== 'string') return 'Unbekannter Fehler.';
  if (code.includes('auth/invalid-email')) return 'Ungültige E-Mail-Adresse.';
  if (code.includes('auth/user-disabled')) return 'Account deaktiviert.';
  if (code.includes('auth/user-not-found')) return 'Kein Account mit dieser E-Mail gefunden.';
  if (code.includes('auth/wrong-password')) return 'Falsches Passwort.';
  if (code.includes('auth/too-many-requests')) return 'Zu viele Versuche. Bitte warte kurz.';
  if (code.includes('auth/email-already-in-use')) return 'E-Mail wird bereits verwendet.';
  if (code.includes('auth/weak-password')) return 'Passwort ist zu schwach.';
  if (code.includes('auth/missing-password')) return 'Bitte Passwort eingeben.';
  if (code.includes('auth/network-request-failed')) return 'Netzwerkfehler. Prüfe deine Verbindung.';
  if (code.includes('auth/popup-closed-by-user')) return 'Anmeldefenster wurde geschlossen.';
  if (code.includes('auth/popup-blocked')) return 'Anmeldefenster wurde blockiert.';
  if (code.includes('auth/requires-recent-login')) return 'Bitte melde dich erneut an.';
  if (code.includes('auth/invalid-credential')) return 'Ungültige Anmeldedaten.';
  if (code.includes('auth/invalid-verification-code')) return 'Ungültiger Bestätigungscode.';
  if (code.includes('auth/invalid-verification-id')) return 'Ungültige Verifizierungs-ID.';
  if (code.includes('auth/expired-action-code')) return 'Der Link ist abgelaufen.';
  if (code.includes('auth/invalid-action-code')) return 'Ungültiger Link.';
  if (code.includes('auth/account-exists-with-different-credential')) return 'Account existiert mit anderem Login.';
  if (code.includes('auth/operation-not-allowed')) return 'Anmeldeart nicht erlaubt.';
  if (code.includes('auth/invalid-login-credentials')) return 'Nicht gültige Nutzerdaten.';
  return 'Fehler: ' + (error.message || code);
}
const profileName = ref("");
const profileAge = ref("");
const profilePicUrl = ref("");
const profileMsg = ref("");

onMounted(() => {
  if (user.value) {
    profileName.value = user.value.displayName || "";
    profilePicUrl.value = user.value.photoURL || "";
    // Try to load age from localStorage or user metadata (custom claims if used)
    const storedAge = localStorage.getItem('deepai_profile_age_' + user.value.uid);
    if (storedAge) profileAge.value = storedAge;
  }
});

function onProfilePicChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    profilePicUrl.value = ev.target.result;
  };
  reader.readAsDataURL(file);
}

async function saveProfile() {
  profileMsg.value = "";
  if (!profileName.value || !profileAge.value) {
    profileMsg.value = "Bitte Name und Alter angeben.";
    return;
  }
  if (profileAge.value < 18) {
    profileMsg.value = "Du musst mindestens 18 sein!";
    return;
  }
  try {
    await user.value.updateProfile({
      displayName: profileName.value,
      photoURL: profilePicUrl.value || null
    });
    localStorage.setItem('deepai_profile_age_' + user.value.uid, profileAge.value);
    profileMsg.value = "Profil gespeichert!";
  } catch (e) {
    profileMsg.value = "Fehler beim Speichern: " + (e.message || e);
  }
}
import { HomeIcon, ShieldCheckIcon, KeyIcon, Cog6ToothIcon, LifebuoyIcon, UserGroupIcon, TrashIcon, ArrowLeftOnRectangleIcon, GiftIcon } from '@heroicons/vue/24/outline';
import { PhoneAuthProvider, multiFactor } from "firebase/auth";
const mfaEnabled = ref(false);
const mfaMsg = ref("");
const showMfaSetup = ref(false);
const showMfaVerify = ref(false);
const mfaPhone = ref("");
const mfaCode = ref("");
let mfaVerificationId = "";
onMounted(() => {
  if (user.value && user.value.multiFactor && user.value.multiFactor.enrolledFactors.length > 0) {
    mfaEnabled.value = true;
  } else {
    mfaEnabled.value = false;
  }
});
function startMfaSetup() {
  showMfaSetup.value = true;
  showMfaVerify.value = false;
  mfaMsg.value = "";
}
async function verifyMfaPhone() {
  mfaMsg.value = "";
  if (!mfaPhone.value) {
    mfaMsg.value = "Bitte Handynummer eingeben.";
    return;
  }
  try {
    const recaptchaVerifier = new window.grecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
    const provider = new PhoneAuthProvider(auth);
    mfaVerificationId = await provider.verifyPhoneNumber(mfaPhone.value, recaptchaVerifier);
    showMfaVerify.value = true;
    showMfaSetup.value = false;
    mfaMsg.value = "Code gesendet!";
  } catch (e) {
    mfaMsg.value = "Fehler: " + (e.message || e);
  }
}
async function confirmMfaCode() {
  mfaMsg.value = "";
  try {
    const cred = PhoneAuthProvider.credential(mfaVerificationId, mfaCode.value);
    await multiFactor(user.value).enroll(cred, 'Telefon');
    mfaEnabled.value = true;
    showMfaVerify.value = false;
    mfaMsg.value = "2FA aktiviert!";
  } catch (e) {
    mfaMsg.value = "Fehler: " + (e.message || e);
  }
}
async function disableMfa() {
  mfaMsg.value = "";
  try {
    const factors = user.value.multiFactor.enrolledFactors;
    if (factors.length > 0) {
      await multiFactor(user.value).unenroll(factors[0]);
      mfaEnabled.value = false;
      mfaMsg.value = "2FA deaktiviert.";
    }
  } catch (e) {
    mfaMsg.value = "Fehler: " + (e.message || e);
  }
}
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const passwordChangeMsg = ref("");
async function handleChangePassword() {
  passwordChangeMsg.value = "";
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordChangeMsg.value = "Bitte alle Felder ausfüllen.";
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordChangeMsg.value = "Neue Passwörter stimmen nicht überein.";
    return;
  }
  try {
    // Re-authenticate user with old password
    const credential = window.firebase && window.firebase.auth ? window.firebase.auth.EmailAuthProvider.credential(user.value.email, oldPassword.value) : null;
    if (!credential) {
      // fallback for modular SDK
      const { EmailAuthProvider, reauthenticateWithCredential } = await import('firebase/auth');
      const cred = EmailAuthProvider.credential(user.value.email, oldPassword.value);
      await reauthenticateWithCredential(user.value, cred);
    } else {
      await user.value.reauthenticateWithCredential(credential);
    }
    await user.value.updatePassword(newPassword.value);
    passwordChangeMsg.value = "Passwort geändert!";
    oldPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  } catch (e) {
    passwordChangeMsg.value = "Fehler beim Ändern: " + (e.message || e);
  }
}
import { ref, onMounted, watch, computed } from "vue";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";

// Firebase direkt hier drin konfigurieren
const firebaseConfig = {
  apiKey: "AIzaSyDfm_vzaQK6X2dZmil5DxCPS6Psqsre4Mo",
  authDomain: "deepai-a2fda.firebaseapp.com",
  projectId: "deepai-a2fda",
  storageBucket: "deepai-a2fda.firebasestorage.app",
  messagingSenderId: "410655333947",
  appId: "1:410655333947:web:96ca758ec94f086720061e"
};

const activeTab = ref('dashboard');
const cookiePrefs = ref({ analytics: false, marketing: false, necessary: true });
const cookieSaved = ref(false);
const pwResetMsg = ref("");
const emailChangeMsg = ref("");
const deleteMsg = ref("");
const showPwResetModal = ref(false);
const showDeleteModal = ref(false);
const newEmail = ref("");
const loginPwResetMsg = ref("");
const loginDisabled = ref(false);
const rateLimitWait = ref(0);
const rememberMe = ref(true);
const recaptchaVerified = ref(false);
let recaptchaWidgetId = null;

// Sessions tab state
const sessionIp = ref("");
const logoutEverywhereMsg = ref("");
const browserUserAgent = computed(() => typeof window !== "undefined" ? window.navigator.userAgent : "");

async function handleLoginPasswordReset() {
  loginPwResetMsg.value = "";
  if (!email.value) {
    loginPwResetMsg.value = "Bitte gib deine E-Mail ein.";
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email.value);
    loginPwResetMsg.value = "Passwort-Reset E-Mail gesendet!";
  } catch (e) {
    loginPwResetMsg.value = "Fehler beim Senden: " + e.message;
  }
}

function saveCookies() {
  try {
    localStorage.setItem('deepai_cookie_prefs', JSON.stringify(cookiePrefs.value));
    cookieSaved.value = true;
    setTimeout(() => { cookieSaved.value = false }, 1200);
  } catch (e) {
    cookieSaved.value = false;
  }
}

onMounted(() => {
  // Load cookie prefs from localStorage
  try {
    const stored = localStorage.getItem('deepai_cookie_prefs');
    if (stored) {
      const parsed = JSON.parse(stored);
      cookiePrefs.value = { ...cookiePrefs.value, ...parsed };
    }
  } catch {}
});


async function handlePasswordReset() {
  pwResetMsg.value = "";
  if (!user.value?.email) {
    pwResetMsg.value = "Keine E-Mail gefunden.";
    return;
  }
  try {
    await sendPasswordResetEmail(auth, user.value.email);
    pwResetMsg.value = "Passwort-Reset E-Mail gesendet!";
  } catch (e) {
    pwResetMsg.value = "Fehler beim Senden: " + e.message;
  }
}

async function handlePasswordResetModal() {
  await handlePasswordReset();
  showPwResetModal.value = false;
}

async function handleChangeEmail() {
  emailChangeMsg.value = "";
  if (!newEmail.value) {
    emailChangeMsg.value = "Bitte gib eine neue E-Mail ein.";
    return;
  }
  try {
    await user.value.updateEmail(newEmail.value);
    emailChangeMsg.value = "E-Mail geändert!";
    newEmail.value = "";
  } catch (e) {
    emailChangeMsg.value = "Fehler beim Ändern: " + (e.message || e);
  }
}

async function handleDeleteAccount() {
  deleteMsg.value = "";
  try {
    await user.value.delete();
    deleteMsg.value = "Account gelöscht.";
    showDeleteModal.value = false;
    setTimeout(() => { window.location.reload(); }, 1200);
  } catch (e) {
    deleteMsg.value = "Fehler beim Löschen: " + (e.message || e);
  }
}

const user = ref(null);
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const loading = ref(true);

// Simulate account suspension for demo (replace with real logic)
const accountSuspended = ref(false); // set to true to test suspended state

// Add missing refs for rate limiting
const loginAttempts = ref(0);
const lastAttempt = ref(0);

let auth;

// Get public IP for session info
onMounted(async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    sessionIp.value = data.ip;
  } catch {}
});

// Logout everywhere (Firebase: force refresh token, user must re-login everywhere)
async function handleLogoutEverywhere() {
  logoutEverywhereMsg.value = "";
  try {
    await auth.signOut();
    // Optionally, force token revocation via Firebase Admin SDK (not possible client-side)
    logoutEverywhereMsg.value = "Du wurdest überall abgemeldet.";
    setTimeout(() => { window.location.reload(); }, 1200);
  } catch (e) {
    logoutEverywhereMsg.value = "Fehler: " + (e.message || e);
  }
}

onMounted(() => {
  // Initialisiere Firebase nur im Browser
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    // Simulate: if email contains 'suspend', mark as suspended
    if (currentUser && currentUser.email && currentUser.email.includes('suspend')) {
      accountSuspended.value = true;
    } else {
      accountSuspended.value = false;
    }
    loading.value = false;
  });
});


let recaptchaScriptLoaded = false;
let recaptchaAlreadyRendered = false;
function renderRecaptcha(force = false) {
  const container = document.getElementById('recaptcha-container');
  if (!container) return;
  // Prevent double rendering error
  if (window.grecaptcha && typeof window.grecaptcha.getResponse === 'function') {
    // If already rendered, reset instead of rendering again
    if (recaptchaAlreadyRendered && recaptchaWidgetId !== null) {
      window.grecaptcha.reset(recaptchaWidgetId);
      recaptchaVerified.value = false;
      return;
    }
  }
  // Only re-render if not already present or forced
  if (force || !container.querySelector('iframe')) {
    container.innerHTML = '';
    if (window.grecaptcha) {
      recaptchaWidgetId = window.grecaptcha.render('recaptcha-container', {
        sitekey: '6LcNI1MsAAAAAFWhOHnZHt7PUPIJxImC-BeKw3Ow',
        callback: () => { recaptchaVerified.value = true; },
        'expired-callback': () => { recaptchaVerified.value = false; }
      });
      recaptchaAlreadyRendered = true;
    }
  }
}

function loadRecaptchaScript() {
  if (window.grecaptcha) {
    renderRecaptcha(true);
    return;
  }
  if (recaptchaScriptLoaded) return;
  recaptchaScriptLoaded = true;
  window.onRecaptchaLoad = () => renderRecaptcha(true);
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

onMounted(() => {
  loadRecaptchaScript();
  setTimeout(() => renderRecaptcha(true), 500); // Fallback in case script loads late
});

// Re-render reCAPTCHA if login form is shown again or user logs out
watch(() => user.value, (val) => {
  if (!val) setTimeout(() => renderRecaptcha(true), 100);
});

// Make sure checkRateLimit is defined before handleGoogleLogin
function checkRateLimit() {
  const now = Date.now();
  if (loginAttempts.value >= 3 && now - lastAttempt.value < 10000) {
    loginDisabled.value = true;
    rateLimitWait.value = Math.ceil((10000 - (now - lastAttempt.value)) / 1000);
    setTimeout(() => {
      loginAttempts.value = 0;
      loginDisabled.value = false;
      rateLimitWait.value = 10;
    }, 10000 - (now - lastAttempt.value));
    return true;
  }
  return false;
}

const handleGoogleLogin = async () => {
  errorMsg.value = "";
  if (!recaptchaVerified.value) {
    errorMsg.value = "Bitte bestätige das reCAPTCHA.";
    return;
  }
  if (checkRateLimit()) return;
  loginAttempts.value++;
  lastAttempt.value = Date.now();
  try {
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : browserSessionPersistence);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    loginAttempts.value = 0;
    navigateTo('/');
  } catch (e) {
    errorMsg.value = getAuthErrorMessage(e);
  }
};

// Update handleLogin and handleRegister to use setPersistence
const handleLogin = async () => {
  errorMsg.value = "";
  if (!recaptchaVerified.value) {
    errorMsg.value = "Bitte bestätige das reCAPTCHA.";
    return;
  }
  if (checkRateLimit()) return;
  loginAttempts.value++;
  lastAttempt.value = Date.now();
  try {
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginAttempts.value = 0;
    navigateTo('/');
  } catch (e) {
    errorMsg.value = getAuthErrorMessage(e);
  }
};

const handleRegister = async () => {
  errorMsg.value = "";
  if (!recaptchaVerified.value) {
    errorMsg.value = "Bitte bestätige das reCAPTCHA.";
    return;
  }
  if (checkRateLimit()) return;
  loginAttempts.value++;
  lastAttempt.value = Date.now();
  try {
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : browserSessionPersistence);
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    loginAttempts.value = 0;
    alert("Account erstellt!");
    navigateTo('/');
  } catch (e) {
    errorMsg.value = getAuthErrorMessage(e);
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    user.value = null;
  } catch (e) {
    errorMsg.value = "Abmelden fehlgeschlagen.";
  }
};
</script>

<style scoped>
.sidebar-icon {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  vertical-align: middle;
  color: #0c89e3;
}
.account-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #0c89e3 0%, #23272e 100%);
  color: #23272e;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
}
.account-container {
  background: linear-gradient(120deg, #f5f7fa 0%, #e3f2fd 100%);
  border-radius: 22px;
  box-shadow: 0 8px 32px 0 rgba(12,137,227,0.18), 0 1.5px 8px #0c89e322;
  padding: 0 0 28px 0;
  max-width: 1100px;
  width: 100%;
  margin: 0 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 700px;
  overflow: hidden;
}

.account-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  padding: 0 38px;
  border-radius: 22px 22px 0 0;
  min-height: 74px;
  box-shadow: 0 2px 12px #0c89e322;
}
.account-title-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}
.account-logo {
  font-size: 2.2rem;
  background: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0c89e322;
}
.account-title-main {
  font-size: 2.1rem;
  font-weight: 900;
  color: #23272e;
  letter-spacing: 0.5px;
}
.account-userbar {
  display: flex;
  align-items: center;
  gap: 18px;
}
.user-avatar-lg {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  font-size: 2.1rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0c89e355;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.user-email-main {
  font-weight: 800;
  color: #0c89e3;
  font-size: 1.13rem;
}
.user-id-main {
  font-size: 0.98rem;
  color: #888;
}
.topbar-logout {
  width: auto;
  padding: 12px 28px;
  background: linear-gradient(90deg, #ef4444 0%, #f7e017 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 900;
  font-size: 1.08rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #ef444422;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
}
.topbar-logout:hover {
  background: linear-gradient(90deg, #f7e017 0%, #ef4444 100%);
  transform: scale(1.04) rotate(-2deg);
}

.sidebar-advanced {
  background: linear-gradient(120deg, #e3f2fd 0%, #f5f7fa 100%);
  border-radius: 18px 0 0 18px;
  box-shadow: 2px 0 12px #0c89e322;
  padding: 32px 0 18px 0;
  min-height: 540px;
}
.sidebar-list li {
  border-radius: 8px 0 0 8px;
  margin-bottom: 6px;
  font-size: 1.08rem;
}
.sidebar-list li.active, .sidebar-list li:hover {
  background: linear-gradient(90deg, #f7e017 0%, #e3f2fd 100%);
  color: #0c89e3;
  border-left: 6px solid #0c89e3;
  font-weight: 900;
}
.dashboard-content-advanced {
  padding: 32px 0 0 0;
}
.dashboard-row-advanced {
  gap: 28px;
  margin-bottom: 28px;
}
.user-card-advanced {
  flex-direction: row;
  align-items: center;
  gap: 18px;
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  box-shadow: 0 2px 12px #0c89e355;
}
.user-avatar-xl {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fff;
  color: #0c89e3;
  font-size: 2.3rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0c89e355;
}
.user-email-xl {
  font-weight: 900;
  color: #fff;
  font-size: 1.18rem;
}
.user-id-xl {
  font-size: 1.01rem;
  color: #f7e017;
}
.stats-card-advanced {
  background: linear-gradient(120deg, #f5f7fa 0%, #e3f2fd 100%);
  color: #23272e;
  box-shadow: 0 2px 12px #0c89e322;
}
.status-card-advanced {
  background: linear-gradient(120deg, #e3f2fd 0%, #f5f7fa 100%);
  color: #22c55e;
  box-shadow: 0 2px 12px #22c55e22;
}
.quick-actions-card {
  background: linear-gradient(120deg, #fff 0%, #e3f2fd 100%);
  color: #23272e;
  box-shadow: 0 2px 12px #0c89e322;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.quick-actions-title {
  font-weight: 900;
  color: #0c89e3;
  font-size: 1.12rem;
  margin-bottom: 10px;
}
.quick-action-btn {
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 11px 22px;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  margin-bottom: 6px;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 2px 8px #0c89e322;
}
.quick-action-btn:hover {
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
  color: #23272e;
  transform: scale(1.04);
}
.support-card-advanced {
  background: linear-gradient(120deg, #f5f7fa 0%, #fff 100%);
  color: #23272e;
  box-shadow: 0 2px 12px #0c89e322;
}
.security-card-advanced, .settings-card-advanced, .sessions-card, .delete-card {
  background: linear-gradient(120deg, #fff 0%, #e3f2fd 100%);
  color: #23272e;
  box-shadow: 0 2px 12px #0c89e322;
  border-radius: 14px;
  padding: 28px 24px 18px 24px;
  margin: 0 auto 18px auto;
  max-width: 420px;
}
.delete-btn {
  background: linear-gradient(90deg, #ef4444 0%, #f7e017 100%);
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 13px 28px;
  font-weight: 900;
  font-size: 1.08rem;
  cursor: pointer;
  margin-top: 18px;
  box-shadow: 0 2px 8px #ef444422;
  transition: background 0.18s, color 0.18s, transform 0.18s;
}
.delete-btn:hover {
  background: linear-gradient(90deg, #f7e017 0%, #ef4444 100%);
  color: #ef4444;
  transform: scale(1.04);
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 62, 80, 0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px #0c89e322;
  padding: 38px 32px 28px 32px;
  min-width: 320px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.modal-title {
  font-size: 1.3rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 18px;
}
.modal-content {
  color: #23272e;
  font-size: 1.08rem;
  margin-bottom: 22px;
}
.modal-actions {
  display: flex;
  gap: 14px;
  justify-content: flex-end;
}
.modal-btn {
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 11px 22px;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 2px 8px #0c89e322;
}
.modal-btn.cancel {
  background: #e5e7eb;
  color: #0c89e3;
}
.modal-btn.delete {
  background: linear-gradient(90deg, #ef4444 0%, #f7e017 100%);
  color: #fff;
}
.modal-btn:hover {
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
  color: #23272e;
  transform: scale(1.04);
}
.modal-btn.cancel:hover {
  background: #0c89e3;
  color: #fff;
}
.modal-btn.delete:hover {
  background: linear-gradient(90deg, #f7e017 0%, #ef4444 100%);
  color: #ef4444;
}
.account-main {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0;
}
.sidebar {
  width: 220px;
  background: #f5f7fa;
  border-radius: 14px 0 0 14px;
  box-shadow: 2px 0 12px rgba(12,137,227,0.07);
  padding: 28px 0 18px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-right: 24px;
  min-height: 540px;
}
.sidebar-title {
  font-weight: 900;
  color: #0c89e3;
  font-size: 1.1rem;
  margin-bottom: 18px;
  text-align: center;
}
.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
}
.sidebar-list li {
  padding: 13px 24px;
  cursor: pointer;
  color: #23272e;
  font-weight: 700;
  border-left: 4px solid transparent;
  transition: background 0.15s, border 0.15s, color 0.15s;
}
.sidebar-list li.active, .sidebar-list li:hover {
  background: #e3f2fd;
  color: #0c89e3;
  border-left: 4px solid #0c89e3;
}
.sidebar-logout {
  margin-top: auto;
  background: #ef4444;
  color: #fff;
  border-radius: 0 0 12px 12px;
  font-size: 1rem;
  font-weight: 800;
  padding: 13px 0;
  border: none;
  cursor: pointer;
  transition: background 0.18s;
}
.sidebar-logout:hover {
  background: #b91c1c;
}
.dashboard-advanced {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.dashboard-content {
  flex: 1;
  padding: 0 0 0 0;
  min-width: 0;
}
.settings-card, .security-card {
  min-width: 320px;
  max-width: 420px;
  margin: 0 auto;
}
.settings-title {
  font-weight: 900;
  color: #0c89e3;
  font-size: 1.15rem;
  margin-bottom: 18px;
}
.settings-row {
  margin-bottom: 14px;
  font-size: 1.05rem;
  color: #23272e;
}
.settings-save-btn {
  background: #0c89e3;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 11px 22px;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.18s;
}
.settings-save-btn:hover {
  background: #f7e017;
  color: #23272e;
}
.settings-saved-msg {
  color: #22c55e;
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 700;
}
.pw-reset-btn {
  background: #f7e017;
  color: #23272e;
  border: none;
  border-radius: 7px;
  padding: 11px 22px;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.18s;
}
.login-reset-btn {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 1rem;
  background: #e5e7eb;
  color: #0c89e3;
  border: 1.5px solid #dbeafe;
  font-weight: 700;
}
.login-reset-btn:hover {
  background: #0c89e3;
  color: #fff;
  border: 1.5px solid #0c89e3;
}
.pw-reset-btn:hover {
  background: #0c89e3;
  color: #fff;
}
.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  color: #23272e;
  border: 1.5px solid #dbeafe;
  border-radius: 7px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  margin-top: 12px;
  margin-bottom: 8px;
  padding: 12px 0;
  transition: background 0.18s, border 0.18s;
}
.google-btn:hover:not(:disabled) {
  background: #f5f7fa;
  border: 1.5px solid #0c89e3;
}
.google-logo {
  width: 22px;
  height: 22px;
  display: inline-block;
  vertical-align: middle;
}
.dark .sidebar {
  background: #181c20;
  color: #f5f5f5;
  box-shadow: 2px 0 12px #0c89e355;
}
.dark .sidebar-list li {
  color: #f5f5f5;
}
.dark .sidebar-list li.active, .dark .sidebar-list li:hover {
  background: #23272e;
  color: #f7e017;
  border-left: 4px solid #f7e017;
}
.dark .settings-card, .dark .security-card {
  background: #23272e;
  color: #f5f5f5;
}
.dark .settings-title {
  color: #f7e017;
}
.dark .settings-save-btn {
  background: #f7e017;
  color: #23272e;
}
.dark .settings-save-btn:hover {
  background: #0c89e3;
  color: #fff;
}
.dark .pw-reset-btn {
  background: #0c89e3;
  color: #fff;
}
.dark .pw-reset-btn:hover {
  background: #f7e017;
  color: #23272e;
}
.account-title {
  font-size: 2rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 28px;
  text-align: left;
}
.account-loading {
  text-align: center;
  padding: 32px 0;
  font-size: 1.1rem;
  color: #888;
}
.dashboard {
  margin-bottom: 18px;
}
.dashboard-row {
  display: flex;
  gap: 18px;
  margin-bottom: 18px;
}
.dashboard-card {
  background: #f5f7fa;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(12,137,227,0.07);
  padding: 18px 18px 14px 18px;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-card {
  flex-direction: row;
  align-items: center;
  gap: 14px;
}
.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  font-size: 1.7rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0c89e355;
}
.user-email {
  font-weight: 700;
  color: #0c89e3;
  font-size: 1.08rem;
}
.user-id {
  font-size: 0.92rem;
  color: #888;
}
.stats-title, .status-title, .support-title {
  font-weight: 700;
  color: #23272e;
  margin-bottom: 8px;
  font-size: 1.05rem;
}
.stats-row, .support-row {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 4px;
  width: 100%;
}
.status-value {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 2px;
}
.status-ok {
  color: #22c55e;
}
.status-suspended {
  color: #ef4444;
}
.account-suspended {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  background: #fff6f6;
  border: 2px solid #ef4444;
  border-radius: 14px;
  padding: 22px 18px;
  margin-bottom: 24px;
  color: #ef4444;
  box-shadow: 0 2px 12px #ef444422;
}
.suspended-icon {
  font-size: 2.2rem;
  margin-right: 8px;
}
.logout-btn {
  width: 100%;
  padding: 13px;
  background: linear-gradient(90deg, #ef4444 0%, #f7e017 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 800;
  font-size: 1.08rem;
  margin-top: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px #ef444422;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #f7e017 0%, #ef4444 100%);
  transform: scale(1.04) rotate(-2deg);
}
.login-form {
  margin-top: 10px;
}
.improved-login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 480px;
}
.login-card {
  background: #f5f7fa;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(12,137,227,0.10);
  padding: 38px 32px 28px 32px;
  max-width: 370px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.login-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 8px;
  text-align: left;
}
.login-hint {
  color: #888;
  text-align: left;
  margin-bottom: 20px;
  font-size: 1.08rem;
}
.login-input {
  width: 100%;
  padding: 13px;
  margin-bottom: 12px;
  border-radius: 7px;
  border: 1.5px solid #dbeafe;
  background: #fff;
  color: #23272e;
  font-size: 1.05rem;
  box-sizing: border-box;
  transition: border 0.18s;
}
.login-input:focus {
  border: 1.5px solid #0c89e3;
  outline: none;
}
.login-btn-row {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}
.login-btn {
  flex: 1;
  padding: 13px;
  background: #e5e7eb;
  color: #23272e;
  border: none;
  border-radius: 7px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.login-btn.primary {
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
}
.login-btn.primary:hover {
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
}
.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.login-btn:hover:not(:disabled) {
  background: #dbeafe;
  color: #0c89e3;
}
.recaptcha-container {
  margin: 16px 0;
  display: flex;
  justify-content: center;
}
.remember-me-label {
  font-size: 0.95rem;
  color: #23272e;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.remember-me-checkbox {
  margin-right: 8px;
}
.google-login-btn {
  background: #4285f4;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;
  border: none;
  border-radius: 7px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.18s;
}
.google-login-btn:hover {
  background: #357ae8;
}
.google-logo {
  width: 22px;
  height: 22px;
  display: inline-block;
  vertical-align: middle;
}
.rate-limit-msg {
  color: #ef4444;
  font-size: 0.98rem;
  margin-top: 8px;
  text-align: center;
}
.error-msg {
  color: #ef4444;
  margin-top: 15px;
  font-size: 14px;
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  padding: 10px;
  border-radius: 6px;
}
.back-link {
  margin-top: 25px;
  text-align: center;
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
}
.back-link a {
  color: #0c89e3;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
}
.back-link a:hover {
  text-decoration: underline;
}
.dark .account-container {
  background: #23272e;
  color: #f5f5f5;
}
.dark .dashboard-card {
  background: #181c20;
  color: #f5f5f5;
}
.dark .user-email {
  color: #f7e017;
}
.dark .login-input {
  background: #23272e;
  color: #f5f5f5;
  border: 1.5px solid #23272e;
}
.dark .login-input:focus {
  border: 1.5px solid #f7e017;
}
.dark .login-btn {
  background: #23272e;
  color: #f7e017;
}
.dark .login-btn.primary {
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
  color: #23272e;
}
.dark .login-btn.primary:hover {
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #f7e017;
}
.dark .login-btn:hover {
  background: #0c89e3;
  color: #f7e017;
}
.dark .back-link {
  border-top: 1px solid #23272e;
}
.dark .back-link a {
  color: #f7e017;
}
</style>