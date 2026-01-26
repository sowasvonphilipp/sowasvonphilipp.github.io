
<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, 
  createUserWithEmailAndPassword, sendPasswordResetEmail, 
  GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence 
} from 'firebase/auth';
import { 
  getFirestore, collection, query, onSnapshot, orderBy, 
  addDoc, serverTimestamp, doc, updateDoc, getDocs, limit, 
  setDoc, getDoc 
} from 'firebase/firestore';

// Icons
import { 
  ExclamationTriangleIcon, ShieldCheckIcon, Cog6ToothIcon, 
  HomeIcon, ArrowLeftOnRectangleIcon, UserIcon, BellIcon as GlockIcon 
} from '@heroicons/vue/24/outline';
const firebaseConfig = {
  apiKey: "AIzaSyDfm_vzaQK6X2dZmil5DxCPS6Psqsre4Mo",
  authDomain: "deepai-a2fda.firebaseapp.com",
  projectId: "deepai-a2fda",
  storageBucket: "deepai-a2fda.appspot.com",
  messagingSenderId: "410655333947",
  appId: "1:410655333947:web:96ca758ec94f086720061e"
};

// --- Display Name Modal State & Logic ---
const showUserNameChangeModal = ref(false);
const showDisplayNameConfirm = ref(false);
const newDisplayName = ref('');
const displayNameError = ref('');
const displayNameCooldownActive = ref(false);
const displayNameCooldownLeft = ref(0);
let cooldownInterval = null;
const DISPLAY_NAME_COOLDOWN = 100; // seconds

// --- Phone Number Modal State & Logic ---
const showPhoneNumberChangeModal = ref(false);
const showPhoneNumberConfirm = ref(false);
const newPhoneNumber = ref('');
const phoneNumberError = ref('');
const phoneNumberCooldownActive = ref(false);
const phoneNumberCooldownLeft = ref(0);

let phoneCooldownInterval = null;
const PHONE_NUMBER_COOLDOWN = 100; // seconds

function getPhoneNumberCooldownLeft() {
  const lastChange = localStorage.getItem('phoneNumberLastChange');
  if (lastChange) {
    const last = new Date(lastChange).getTime();
    const now = Date.now();
    const diff = Math.floor((now - last) / 1000);
    const left = PHONE_NUMBER_COOLDOWN - diff;
    return left > 0 ? left : 0;
  }
  return 0;
}

function startPhoneNumberCooldownTimer() {
  clearPhoneNumberCooldownTimer();
  phoneNumberCooldownLeft.value = getPhoneNumberCooldownLeft();
  phoneNumberCooldownActive.value = phoneNumberCooldownLeft.value > 0;
  if (phoneNumberCooldownActive.value) {
    phoneCooldownInterval = setInterval(() => {
      phoneNumberCooldownLeft.value = getPhoneNumberCooldownLeft();
      phoneNumberCooldownActive.value = phoneNumberCooldownLeft.value > 0;
      if (!phoneNumberCooldownActive.value) {
        clearPhoneNumberCooldownTimer();
      }
    }, 1000);
  }
}

function clearPhoneNumberCooldownTimer() {
  if (phoneCooldownInterval) {
    clearInterval(phoneCooldownInterval);
    phoneCooldownInterval = null;
  }
}

function onTryChangePhoneNumber() {
  phoneNumberError.value = '';
  newPhoneNumber.value = '';
  showPhoneNumberConfirm.value = false;
  const left = getPhoneNumberCooldownLeft();
  if (left > 0) {
    phoneNumberCooldownActive.value = true;
    phoneNumberCooldownLeft.value = left;
    startPhoneNumberCooldownTimer();
    return;
  }
  phoneNumberCooldownActive.value = false;
  phoneNumberCooldownLeft.value = 0;
  showPhoneNumberChangeModal.value = true;
}

function closePhoneNumberModal() {
  showPhoneNumberChangeModal.value = false;
  showPhoneNumberConfirm.value = false;
  phoneNumberError.value = '';
}

async function changePhoneNumber() {
  phoneNumberError.value = '';
  const number = newPhoneNumber.value.trim();
  if (!number) {
    phoneNumberError.value = 'Bitte gib eine Telefonnummer ein.';
    return;
  }
  // Optional: Add more validation (e.g. regex for phone numbers)
  // Save to Firestore
  try {
    userProfile.value.phoneNumber = number;
    if (accountId.value) {
      await setDoc(doc(db, 'users', accountId.value), { phoneNumber: number }, { merge: true });
    }
    // Set cooldown
    localStorage.setItem('phoneNumberLastChange', new Date().toISOString());
    startPhoneNumberCooldownTimer();
    showPhoneNumberChangeModal.value = false;
    showPhoneNumberConfirm.value = false;
  } catch (e) {
    phoneNumberError.value = 'Fehler beim Speichern: ' + (e.message || e);
  }
}

// Start/cleanup cooldown timer on mount/unmount
onMounted(() => {
  startPhoneNumberCooldownTimer();
});
onUnmounted(() => {
  clearPhoneNumberCooldownTimer();
});

function getDisplayNameCooldownLeft() {
  const lastChange = localStorage.getItem('displayNameLastChange');
  if (lastChange) {
    const last = new Date(lastChange).getTime();
    const now = Date.now();
    const diff = Math.floor((now - last) / 1000);
    const left = DISPLAY_NAME_COOLDOWN - diff;
    return left > 0 ? left : 0;
  }
  return 0;
}

function startDisplayNameCooldownTimer() {
  clearDisplayNameCooldownTimer();
  displayNameCooldownLeft.value = getDisplayNameCooldownLeft();
  displayNameCooldownActive.value = displayNameCooldownLeft.value > 0;
  if (displayNameCooldownActive.value) {
    cooldownInterval = setInterval(() => {
      displayNameCooldownLeft.value = getDisplayNameCooldownLeft();
      displayNameCooldownActive.value = displayNameCooldownLeft.value > 0;
      if (!displayNameCooldownActive.value) {
        clearDisplayNameCooldownTimer();
      }
    }, 1000);
  }
}

function clearDisplayNameCooldownTimer() {
  if (cooldownInterval) {
    clearInterval(cooldownInterval);
    cooldownInterval = null;
  }
}

function onTryChangeDisplayName() {
  displayNameError.value = '';
  newDisplayName.value = '';
  showDisplayNameConfirm.value = false;
  const left = getDisplayNameCooldownLeft();
  if (left > 0) {
    displayNameCooldownActive.value = true;
    displayNameCooldownLeft.value = left;
    startDisplayNameCooldownTimer();
    return;
  }
  displayNameCooldownActive.value = false;
  displayNameCooldownLeft.value = 0;
  showUserNameChangeModal.value = true;
}

function closeDisplayNameModal() {
  showUserNameChangeModal.value = false;
  showDisplayNameConfirm.value = false;
  displayNameError.value = '';
}

async function changeDisplayName() {
  displayNameError.value = '';
  const name = newDisplayName.value.trim();
  if (!name) {
    displayNameError.value = 'Bitte gib einen Anzeigenamen ein.';
    return;
  }
  if (name.length < 3 || name.length > 24) {
    displayNameError.value = 'Anzeigename muss zwischen 3 und 24 Zeichen lang sein.';
    return;
  }
  // Optional: Add more validation (e.g. no special chars)
  // Save to Firestore
  try {
    userProfile.value.displayName = name;
    if (accountId.value) {
      await setDoc(doc(db, 'users', accountId.value), { displayName: name }, { merge: true });
    }
    // Set cooldown
    localStorage.setItem('displayNameLastChange', new Date().toISOString());
    startDisplayNameCooldownTimer();
    showUserNameChangeModal.value = false;
    showDisplayNameConfirm.value = false;
  } catch (e) {
    displayNameError.value = 'Fehler beim Speichern: ' + (e.message || e);
  }
}

// Start/cleanup cooldown timer on mount/unmount
onMounted(() => {
  startDisplayNameCooldownTimer();
});
onUnmounted(() => {
  clearDisplayNameCooldownTimer();
});

let app;
// --- Computed: realAge and ageGroup logic (CLEANED) ---
const realAge = computed(() => {
  if (!userProfile.value.birthday) return '';
  const birth = new Date(userProfile.value.birthday);
  const todayDate = new Date();
  let age = todayDate.getFullYear() - birth.getFullYear();
  const m = todayDate.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && todayDate.getDate() < birth.getDate())) {
    age--;
  }
  return age;
});

const ageGroup = computed(() => {
  const ageNum = realAge.value;
  if (ageNum === '' || isNaN(ageNum)) return '';
  if (ageNum < 18) return 'Kind';
  if (!userProfile.value.ageVerified) return 'Kind';
  if (ageNum < 60) return 'Erwachsen';
  return 'Senior';
});
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
const db = getFirestore(app);
const auth = getAuth(app);

const userProfile = ref({
  ageVerified: false,
  badge: '',
  permission: '',
  displayName: '',
  multiFactor: false,
  birthday: '',
  registrationIp: '',
  lastDevice: '',
  lastLoginIp: '',
  lastBrowser: '',
  lastOs: '',
  adminNote: '',
  country: '',
  city: '',
  language: '',
  timezone: '',
  userAgent: '',
  lastActivity: '',
  phoneNumber: '',
  age: null,
  kindermodus: false,
  bildPreferenz: '',
  aiCustomInstructions: '',
});
const aiInstructionsLoading = ref(false);
async function saveAICustomInstructions(newText) {
  if (!accountId.value) return;
  aiInstructionsLoading.value = true;
  userProfile.value.aiCustomInstructions = newText;
  try {
    await setDoc(doc(db, 'users', accountId.value), { aiCustomInstructions: newText }, { merge: true });
    await fetchUserProfile(accountId.value);
  } catch (e) {
    showGlobalError('Fehler beim Speichern der AI-Info: ' + (e.message || e));
  }
  aiInstructionsLoading.value = false;
}
// FIX: Remove undefined 'data' usage (was causing ReferenceError)
// if ('aiCustomInstructions' in data) userProfile.value.aiCustomInstructions = data.aiCustomInstructions;

const bildPreferenzOptions = [
  'Realistisch',
  'Cartoon',
  'Anime',
  'Surrealistisch',
  'Fantasie',
  'Minimalistisch',
  'Vintage',
  'Futuristisch',
];
const textPreferenzOptions = [
  'Kurz und bündig',
  'Detailliert',
  'Technisch',
  'Einfach erklärt',
  'Humorvoll',
  'Förmlich',
  'Inspirierend',
  'Überzeugend',
];
const bildPreferenzLoading = ref(false);
async function saveBildPreferenz(newPref) {
  if (!accountId.value) return;
  bildPreferenzLoading.value = true;
  userProfile.value.bildPreferenz = newPref;
  try {
    await setDoc(doc(db, 'users', accountId.value), { bildPreferenz: newPref }, { merge: true });
    await fetchUserProfile(accountId.value);
  } catch (e) {
    showGlobalError('Fehler beim Speichern der Bild-Präferenz: ' + (e.message || e));
  }
  bildPreferenzLoading.value = false;
}

// --- Text Präferenz Loading & Save Logic ---
const textPreferenzLoading = ref(false);
async function saveTextPreferenz(newPref) {
  if (!accountId.value) return;
  textPreferenzLoading.value = true;
  userProfile.value.textPreferenz = newPref;
  try {
    await setDoc(doc(db, 'users', accountId.value), { textPreferenz: newPref }, { merge: true });
    await fetchUserProfile(accountId.value);
  } catch (e) {
    showGlobalError('Fehler beim Speichern der Text-Präferenz: ' + (e.message || e));
  }
  textPreferenzLoading.value = false;
}

const showBirthdayModal = ref(false);
const birthdayInput = ref("");
const birthdayError = ref("");

// Expose birthday modal logic to template
defineExpose({
  openBirthdayModal,
  showBirthdayModal,
  birthdayInput,
  birthdayError,
  submitBirthday
});
const today = new Date().toISOString().split('T')[0];

function openBirthdayModal() {
  birthdayInput.value = "";
  birthdayError.value = "";
  showBirthdayModal.value = true;
}

function calculateAge(birthdayStr) {
  if (!birthdayStr) return 0;
  const birth = new Date(birthdayStr);
  const todayDate = new Date();
  let age = todayDate.getFullYear() - birth.getFullYear();
  const m = todayDate.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && todayDate.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

async function submitBirthday() {
  birthdayError.value = "";
  if (!birthdayInput.value) {
    birthdayError.value = "Bitte Geburtsdatum eingeben.";
    return;
  }
  const age = calculateAge(birthdayInput.value);
  userProfile.value.birthday = birthdayInput.value;
  userProfile.value.age = age;
  // If under 18, verification is always true and kindermodus is enabled
  if (age < 18) {
    userProfile.value.ageVerified = true;
    userProfile.value.kindermodus = true;
  } else {
    userProfile.value.ageVerified = false;
    userProfile.value.kindermodus = false;
  }
  showBirthdayModal.value = false;
  if (accountId.value) {
    await setDoc(doc(db, 'users', accountId.value), {
      birthday: birthdayInput.value,
      age: age,
      ageVerified: age < 18 ? true : false,
      kindermodus: age < 18 ? true : false
    }, { merge: true });
    await fetchUserProfile(accountId.value);
  }
}
// Helpers for browser/OS/language/timezone
const browserInfo = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unbekannt';
const osInfo = typeof navigator !== 'undefined' ? (navigator.platform || 'Unbekannt') : 'Unbekannt';
const languageInfo = typeof navigator !== 'undefined' ? (navigator.language || 'Unbekannt') : 'Unbekannt';
const timezoneInfo = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Unbekannt';

// Firestore: Load user profile (all info)
async function fetchUserProfile(uid) {
  try {
    // Timeout helper
    const timeout = (promise, ms = 8000) => {
      return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
      ]);
    };
    const userDoc = await timeout(getDoc(doc(db, 'users', uid)));
    if (userDoc.exists()) {
      const data = userDoc.data();
      for (const key in userProfile.value) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          userProfile.value[key] = data[key];
        }
      }
      // Always update age if present in db
      if ('age' in data) userProfile.value.age = data.age;
      if ('birthday' in data) userProfile.value.birthday = data.birthday;
      if ('kindermodus' in data) userProfile.value.kindermodus = data.kindermodus;
      if ('bildPreferenz' in data) userProfile.value.bildPreferenz = data.bildPreferenz;
      // Set accountStatus if present
      if (data.status && statusScale.some(s => s.key === data.status)) {
        accountStatus.value = data.status;
      }
    } else {
      // Nur ein neues Profil anlegen, wenn wirklich noch keines existiert,
      // aber KEINE Werte aus userProfile.value überschreiben!
      await setDoc(doc(db, 'users', uid), {}, { merge: true });
    }
  } catch (e) {
    if (e && e.message === 'Timeout') {
      showGlobalError('Timeout beim Laden des Profils. Bitte versuche es erneut.');
    } else {
      showGlobalError('Fehler beim Laden des Profils: ' + (e.message || e));
    }
  }
}

// Firestore: Save user profile (all info, no undefined)
function cleanProfileForFirestore(profile) {
  const cleaned = {};
  for (const key in profile) {
    if (profile[key] === undefined) {
      // Set multiFactor to false, others to empty string
      cleaned[key] = key === 'multiFactor' ? false : '';
    } else {
      cleaned[key] = profile[key];
    }
  }
  // Ensure multiFactor is always boolean
  if (typeof cleaned.multiFactor !== 'boolean') cleaned.multiFactor = false;
  return cleaned;
}
async function saveUserProfile(uid) {
  try {
    await setDoc(doc(db, 'users', uid), cleanProfileForFirestore(userProfile.value), { merge: true });
  } catch (e) {
    showGlobalError('Fehler beim Speichern des Profils: ' + (e.message || e));
  }
}

// On login/register, update Firestore with latest info and log security events
async function updateUserProfileOnLogin(uid) {
  // Try to get IP address (best effort, public API)
  let ip = '';
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    ip = data.ip;
  } catch {}
  userProfile.value.lastLoginIp = ip;
  userProfile.value.lastDevice = osInfo;
  userProfile.value.lastBrowser = browserInfo;
  userProfile.value.language = languageInfo;
  userProfile.value.timezone = timezoneInfo;
  userProfile.value.userAgent = browserInfo;
  userProfile.value.lastActivity = new Date().toISOString();
  // Optionally: country/city via geo API (not always available)
  try {
    const geoRes = await fetch('https://ipapi.co/json/');
    const geo = await geoRes.json();
    userProfile.value.country = geo.country_name || '';
    userProfile.value.city = geo.city || '';
  } catch {}
  // Only update login-related fields, not the whole profile!
  const updateFields = {
    lastLoginIp: userProfile.value.lastLoginIp,
    lastDevice: userProfile.value.lastDevice,
    lastBrowser: userProfile.value.lastBrowser,
    language: userProfile.value.language,
    timezone: userProfile.value.timezone,
    userAgent: userProfile.value.userAgent,
    lastActivity: userProfile.value.lastActivity,
    country: userProfile.value.country,
    city: userProfile.value.city,
  };
  try {
    await setDoc(doc(db, 'users', uid), updateFields, { merge: true });
  } catch (e) {
    showGlobalError('Fehler beim Speichern des Profils: ' + (e.message || e));
  }

  // --- Security Data Collections ---
  const logContext = {
    uid,
    ip,
    device: osInfo,
    browser: browserInfo,
    language: languageInfo,
    timezone: timezoneInfo,
    userAgent: browserInfo,
    country: userProfile.value.country,
    city: userProfile.value.city,
    mfa: userProfile.value.multiFactor,
    timestamp: serverTimestamp(),
    event: 'login',
    profile: { ...userProfile.value },
    meta: {
      lastLogin: new Date().toISOString(),
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      screen: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
      platform: osInfo,
      browser: browserInfo,
      userAgent: browserInfo,
      appVersion: typeof navigator !== 'undefined' ? navigator.appVersion : '',
      vendor: typeof navigator !== 'undefined' ? navigator.vendor : '',
      createdAt: accountCreatedAt.value,
      lastSignIn: accountLastLogin.value,
      provider: accountProvider.value,
      sessions: accountSessions.value,
      today: new Date().toISOString().split('T')[0],
    }
  };
  try { await addDoc(collection(db, 'logins'), logContext); } catch {}
  try { await addDoc(collection(db, 'devices'), logContext); } catch {}
  try { await addDoc(collection(db, 'ips'), logContext); } catch {}
  try { await addDoc(collection(db, 'sessions'), logContext); } catch {}
  try { await addDoc(collection(db, 'actions'), { ...logContext, action: 'login' }); } catch {}
  if (userProfile.value.multiFactor) {
    try { await addDoc(collection(db, 'mfa_events'), { ...logContext, event: 'mfa_login' }); } catch {}
  }
  // 7. Suspicious activity collection (placeholder, can be expanded)
  // Example: log if login from new country/city
  // (expand with more logic as needed)
  // 8. Password changes, etc. (add similar logic in relevant places)
}

// --- Main logic (merged from below) ---
const showErrorPopup = ref(false);
const globalErrorMsg = ref("");
const accountSuspended = ref(false);
const showSuspendedCloseError = ref(false);
function showGlobalError(msg) {
  globalErrorMsg.value = msg;
  showErrorPopup.value = true;
}
function onTryCloseSuspended() {
  showSuspendedCloseError.value = true;
  setTimeout(() => { showSuspendedCloseError.value = false; }, 2500);
}
const sidebarItems = [
  { key: 'dashboard', label: 'Übersicht', icon: HomeIcon },
  { key: 'account', label: 'Account', icon: UserIcon },

  { key: 'benachrichtigungen', label: 'Benachrichtigungen', icon: GlockIcon },
  { key: "inhalte", label: "Inhalte", icon: ShieldCheckIcon },
  {key: "datenschutz", label:"Datenschutz", icon: ExclamationTriangleIcon},
  { key: 'logout', label: 'Abmelden', icon: ArrowLeftOnRectangleIcon }
];
// Altersgruppe Firestore Integration removed: now only computed ageGroup is used.
const activeSidebar = ref('dashboard');
const isLoggedIn = ref(false);
const email = ref("");
const password = ref("");
const errorMsg = ref("");
const userEmail = ref("");
const accountCreatedAt = ref("");
const accountLastLogin = ref("");
const accountId = ref("");
const accountVerified = ref(false);
const accountProvider = ref("");
const accountSessions = ref(1); // Simuliert
const activeTab = ref('login');
const rememberMe = ref(true);
if (typeof window !== 'undefined' && localStorage.getItem('rememberMe') !== null) {
  rememberMe.value = localStorage.getItem('rememberMe') === 'true';
}
watch(rememberMe, (val) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('rememberMe', val ? 'true' : 'false');
  }
});
const showForgotPw = ref(false);
const forgotEmail = ref("");
const pwResetMsg = ref("");
const pwResetCooldown = ref(0);
let pwResetInterval = null;
const PW_RESET_COOLDOWN = 600; // 10 minutes in seconds
const showPassword = ref(false);
const passwordRevealError = ref("");
// WICHTIG: Stelle sicher, dass der Pfad zu deiner firebaseConfig stimmt!
// import { db, auth } from '@/plugins/firebase'; 



// Falls du activeSidebar von außen als Prop bekommst oder global nutzt:
const props = defineProps(['activeSidebar']); 

const notifications = ref([]);
const currentUserId = ref(null);
let unsubscribe = null;



const formatTime = (ts) => {
  if (!ts || !ts.toDate) return 'Gerade eben';
  return ts.toDate().toLocaleString('de-DE', { hour: '2-digit', minute: '2-digit' });
};

const markAsRead = async (notificationId) => {
  try {
    const path = `benachrichtigungen/${currentUserId.value}/user_benachrichtigungen/${notificationId}`;
    await updateDoc(doc(db, path), { read: true });
  } catch (e) {
    console.error("Fehler beim Markieren:", e);
  }
};

const listenToNotifications = (userId) => {
  const path = `benachrichtigungen/${userId}/user_benachrichtigungen`;
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));

  unsubscribe = onSnapshot(q, (snapshot) => {
    notifications.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }, (error) => {
    console.error("Firebase Snapshot Fehler:", error);
  });
};

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUserId.value = user.uid;
      // Erst prüfen ob Willkommens-Nachricht nötig
      const path = `benachrichtigungen/${user.uid}/user_benachrichtigungen`;
      const snap = await getDocs(query(collection(db, path), limit(1)));
      
      if (snap.empty) {
        await addDoc(collection(db, path), {
          icon: '🎉', author: 'System', title: 'Willkommen zu deinem Account!',
          message: '{username} herzlich willkommen bei DeepAI! Dein Account ist startklar.', footer: 'DeepAI Team',
          createdAt: serverTimestamp(), read: false
        });
      }
      listenToNotifications(user.uid);
    }
  });
});

onUnmounted(() => { if (unsubscribe) unsubscribe(); });

onMounted(() => {
  // Ersetze 'USER_ABC_123' mit der ID des aktuell eingeloggten Users
  if (currentUserId.value) {
    listenToNotifications(currentUserId.value);
  }
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
function getPwResetCooldownLeft() {
  const last = localStorage.getItem('pwResetLast');
  if (last) {
    const lastTime = new Date(last).getTime();
    const now = Date.now();
    const diff = Math.floor((now - lastTime) / 1000);
    const left = PW_RESET_COOLDOWN - diff;
    return left > 0 ? left : 0;
  }
  return 0;
}
function updatePwResetCooldown() {
  pwResetCooldown.value = getPwResetCooldownLeft();
}
function startPwResetCooldownTimer() {
  clearPwResetCooldownTimer();
  updatePwResetCooldown();
  pwResetInterval = setInterval(() => {
    updatePwResetCooldown();
    if (pwResetCooldown.value <= 0) {
      clearPwResetCooldownTimer();
    }
  }, 1000);
}
function clearPwResetCooldownTimer() {
  if (pwResetInterval) {
    clearInterval(pwResetInterval);
    pwResetInterval = null;
  }
}
onMounted(() => {
  updatePwResetCooldown();
  startPwResetCooldownTimer();
});
onUnmounted(() => {
  clearPwResetCooldownTimer();
});
const regEmail = ref("");
const regPassword = ref("");
const regPasswordConfirm = ref("");
const agreeTos = ref(false);
const showEmailHint = ref(false);
onAuthStateChanged(auth, async (user) => {
  if (user) {
    isLoggedIn.value = true;
    userEmail.value = user.email;
    accountCreatedAt.value = user.metadata && user.metadata.creationTime
      ? new Date(user.metadata.creationTime).toLocaleString()
      : '';
    accountLastLogin.value = user.metadata && user.metadata.lastSignInTime
      ? new Date(user.metadata.lastSignInTime).toLocaleString()
      : '';
    accountId.value = user.uid;
    accountVerified.value = user.emailVerified;
    accountProvider.value = user.providerData && user.providerData.length > 0 ? user.providerData[0].providerId : '';
    // Multi-factor
    userProfile.value.multiFactor = user.multiFactor && user.multiFactor.enrolledFactors && user.multiFactor.enrolledFactors.length > 0;
    if (typeof window !== 'undefined') {
      let sessions = parseInt(localStorage.getItem('accountSessions') || '1', 10);
      if (user.metadata && user.metadata.lastSignInTime && user.metadata.lastSignInTime === user.metadata.creationTime) {
        sessions = 1;
      } else {
        sessions += 1;
      }
      localStorage.setItem('accountSessions', sessions.toString());
      accountSessions.value = sessions;
    }
    // --- FIX: fetch profile first, then update ---
    await fetchUserProfile(user.uid);
    await updateUserProfileOnLogin(user.uid);
  } else {
    isLoggedIn.value = false;
    userEmail.value = "";
    accountCreatedAt.value = "";
    accountLastLogin.value = "";
    accountId.value = "";
    accountVerified.value = false;
    accountProvider.value = "";
    accountSessions.value = 1;
    userProfile.value = {
      ageVerified: false,
      badge: '',
      permission: '',
      displayName: '',
      multiFactor: false,
      birthday: '',
      registrationIp: '',
      lastDevice: '',
      lastLoginIp: '',
      lastBrowser: '',
      lastOs: '',
      adminNote: '',
      country: '',
      city: '',
      language: '',
      timezone: '',
      userAgent: '',
      lastActivity: '',
      phoneNumber: '', 
      age: null,
    };
  }
});
function renderRecaptcha(containerId) {
  if (window.grecaptcha) {
    window.grecaptcha.render(containerId, {
      sitekey: '6LcNI1MsAAAAAFWhOHnZHt7PUPIJxImC-BeKw3Ow',
      callback: () => {},
      'expired-callback': () => {}
    });
  }
}
function loadRecaptchaScript() {
  if (window.grecaptcha) {
    renderRecaptcha('recaptcha-container');
    renderRecaptcha('recaptcha-container-register');
    return;
  }
  if (document.getElementById('recaptcha-script')) return;
  const script = document.createElement('script');
  script.id = 'recaptcha-script';
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  window.onRecaptchaLoad = () => {
    renderRecaptcha('recaptcha-container');
    renderRecaptcha('recaptcha-container-register');
  };
}
onMounted(async () => {
  loadRecaptchaScript();
  setTimeout(() => {
    renderRecaptcha('recaptcha-container');
    renderRecaptcha('recaptcha-container-register');
  }, 500);
  try {
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : undefined);
  } catch (e) {}
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      userEmail.value = user.email;
      accountCreatedAt.value = user.metadata && user.metadata.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString()
        : '';
      accountSuspended.value = user.email && user.email.includes('suspend');
    } else {
      isLoggedIn.value = false;
      userEmail.value = "";
      accountCreatedAt.value = "";
      accountSuspended.value = false;
    }
  });
});
async function login() {
  errorMsg.value = "";
  try {
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : undefined);
    const userCred = await signInWithEmailAndPassword(auth, email.value, password.value);
    // After login, update profile and log
    if (userCred && userCred.user) {
      await updateUserProfileOnLogin(userCred.user.uid);
      await fetchUserProfile(userCred.user.uid);
    }
  } catch (e) {
    showGlobalError(getAuthErrorMessage(e));
    errorMsg.value = "";
  }
}
async function loginWithGoogle() {
  errorMsg.value = "";
  try {
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : undefined);
    const provider = new GoogleAuthProvider();
    const userCred = await signInWithPopup(auth, provider);
    if (userCred && userCred.user) {
      await updateUserProfileOnLogin(userCred.user.uid);
      await fetchUserProfile(userCred.user.uid);
    }
  } catch (e) {
    showGlobalError(getAuthErrorMessage(e));
    errorMsg.value = "";
  }
}
async function register() {
  errorMsg.value = "";
  if (!agreeTos.value) {
    showGlobalError('Bitte stimme den Nutzungsbedingungen und Datenschutz zu.');
    errorMsg.value = "";
    return;
  }
  if (regPassword.value !== regPasswordConfirm.value) {
    showGlobalError('Passwörter stimmen nicht überein.');
    errorMsg.value = "";
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, regEmail.value, regPassword.value);
  } catch (e) {
    showGlobalError(getAuthErrorMessage(e));
    errorMsg.value = "";
  }
}
async function registerWithGoogle() {
  errorMsg.value = "";
  if (!agreeTos.value) {
    showGlobalError('Bitte stimme den Nutzungsbedingungen und Datenschutz zu.');
    errorMsg.value = "";
    return;
  }
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (e) {
    showGlobalError(getAuthErrorMessage(e));
    errorMsg.value = "";
  }
}
async function sendPasswordReset() {
  pwResetMsg.value = "";
  updatePwResetCooldown();
  if (pwResetCooldown.value > 0) {
    pwResetMsg.value = `Bitte warte noch ${pwResetCooldown.value} Sekunden bevor du erneut zurücksetzen kannst.`;
    return;
  }
  let emailToReset = "";
  if (isLoggedIn.value && userEmail.value) {
    emailToReset = userEmail.value;
  } else {
    emailToReset = forgotEmail.value;
  }
  if (!emailToReset) {
    pwResetMsg.value = "Bitte gib eine E-Mail-Adresse ein, um das Passwort zurückzusetzen.";
    return;
  }
  try {
    await sendPasswordResetEmail(auth, emailToReset);
    pwResetMsg.value = "E-Mail zum Zurücksetzen gesendet!";
    localStorage.setItem('pwResetLast', new Date().toISOString());
    updatePwResetCooldown();
    startPwResetCooldownTimer();
  } catch (e) {
    pwResetMsg.value = getAuthErrorMessage(e);
  }
}
async function logout() {
  await signOut(auth);
  // Reset all relevant state
  isLoggedIn.value = false;
  userEmail.value = "";
  accountCreatedAt.value = "";
  accountLastLogin.value = "";
  accountId.value = "";
  accountVerified.value = false;
  accountProvider.value = "";
  accountSessions.value = 1;
  // Optionally: clear userProfile
  userProfile.value = {
    ageVerified: false,
    badge: '',
    permission: '',
    displayName: '',
    multiFactor: false,
    birthday: '',
    registrationIp: '',
    lastDevice: '',
    lastLoginIp: '',
    lastBrowser: '',
    lastOs: '',
    adminNote: '',
    country: '',
    city: '',
    language: '',
    timezone: '',
    userAgent: '',
    lastActivity: '',
    phoneNumber: '',
    age: null,
    kindermodus: false,
    bildPreferenz: '',
    aiCustomInstructions: '',
  };
  // Redirect to login tab and dashboard
  activeTab.value = 'login';
  activeSidebar.value = 'dashboard';
  // For mobile: close sidebar
  sidebarMobileOpen.value = false;
  // Optionally: scroll to top
  if (typeof window !== 'undefined') window.scrollTo(0, 0);
}
function getAuthErrorMessage(error) {
  const code = error.code || error.message || '';
  if (typeof code !== 'string') return `Unbekannter Fehler. ${error}`;
  if (code.includes('auth/invalid-email')) return 'Ungültige E-Mail-Adresse.';
  if (code.includes('auth/user-disabled')) return 'Account von System Administrator deaktiviert. Bei Fragen kontaktiere einen Administrator.';
  if (code.includes('auth/user-not-found')) return 'Kein Account mit dieser E-Mail gefunden.';
  if (code.includes('auth/wrong-password')) return 'Falsches Passwort.';
  if (code.includes('auth/too-many-requests')) return 'Zu viele Versuche. Bitte warte kurz.';
  if (code.includes('auth/email-already-in-use')) return 'E-Mail wird bereits verwendet.';
  if (code.includes('auth/weak-password')) return 'Passwort ist zu schwach.';
  if (code.includes('auth/missing-password')) return 'Bitte Passwort eingeben.';
  if (code.includes('auth/network-request-failed')) return 'Netzwerkfehler. Prüfe deine Verbindung.';
  if (code.includes('auth/popup-closed-by-user')) return 'Anmeldefenster geschlossen.';
  if (code.includes('auth/popup-blocked')) return 'Anmeldefenster blockiert.';
  if (code.includes('auth/requires-recent-login')) return 'Bitte melde dich erneut an.';
  if (code.includes('auth/invalid-credential')) return 'Ungültige Anmeldedaten.';
  if (code.includes('auth/operation-not-allowed')) return 'Anmeldeart nicht erlaubt.';
  return 'Fehler: ' + (error.message || code);
}
// Example modal state
const showPasswordModal = ref(false)
const show2FAModal = ref(false)

const sidebarMobileOpen = ref(false);
const isDesktop = ref(true);

function handleResize() {
  isDesktop.value = window.innerWidth >= 900;
  if (isDesktop.value) sidebarMobileOpen.value = false;
}
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// --- Example image spoiler logic ---
const hideImagesByDefault = ref(false);
const exampleImageRevealed = ref(false);

function saveHideImagesSetting() {
  localStorage.setItem('hideImagesByDefault', hideImagesByDefault.value ? '1' : '0');
}
function loadHideImagesSetting() {
  const val = localStorage.getItem('hideImagesByDefault');
  hideImagesByDefault.value = val === '1';
}
onMounted(() => { loadHideImagesSetting(); });
watch(hideImagesByDefault, saveHideImagesSetting);
function toggleExampleImage() {
  if (hideImagesByDefault.value && !exampleImageRevealed.value) {
    exampleImageRevealed.value = true;
  }
}


</script>
<template>
  <div v-if="showErrorPopup" class="global-error-popup">
    <div class="global-error-content">
      <ExclamationTriangleIcon class="error-icon" />
      <span>{{ globalErrorMsg }}</span>
      <button class="close-error-btn" @click="showErrorPopup=false">×</button>
    </div>
  </div>
  <div v-if="accountSuspended" class="suspended-modal-overlay">
    <div class="suspended-modal-card">
      <div class="suspended-modal-title">
        <ExclamationTriangleIcon class="error-icon" />
        Account gesperrt
      </div>
      <div class="suspended-modal-content">
        Dein Account wurde vorübergehend gesperrt.<br>Bitte kontaktiere den Support für weitere Informationen.<br>
        <span v-if="showSuspendedCloseError" class="suspended-close-error"><ExclamationTriangleIcon class="error-icon" /> Du kannst dieses Fenster nicht schließen.</span>
      </div>
      <button class="modal-btn cancel" @click="onTryCloseSuspended">Schließen</button>
    </div>
  </div>
  <div class="account-bg">
    <div class="account-container-wide">
      <div class="account-title-bar">
        <h1 class="account-title">DeepAI Konto</h1>
      </div>
      <div v-if="!isLoggedIn" class="auth-card redesigned-auth-card">


        <div class="login-hint redesigned-login-hint">
          <span class="login-hint-title redesigned-login-title">Willkommen bei DeepAI!</span>
          <span class="login-hint-desc redesigned-login-desc">Melde dich an oder registriere dich, um alle Funktionen zu nutzen.<br>Deine Daten sind sicher und werden vertraulich behandelt.</span>
        </div>
        <div class="tabs redesigned-tabs">
          <button :class="{active: activeTab==='login'}" @click="activeTab='login'">Login</button>
          <button :class="{active: activeTab==='register'}" @click="activeTab='register'">Registrieren</button>
        </div>
        <div v-if="activeTab==='login'">
          <form @submit.prevent="login" class="form login-form redesigned-form">
            <input v-model="email" type="email" placeholder="E-Mail" required class="redesigned-input" />
            <input v-model="password" type="password" placeholder="Passwort" required class="redesigned-input" />
            <div class="form-row redesigned-form-row">
              <label><input type="checkbox" v-model="rememberMe" /> Angemeldet bleiben</label>
            </div>
            <div class="form-row redesigned-form-row">
              <div id="recaptcha-container"></div>
            </div>
            <button type="submit" class="primary-btn login-btn redesigned-btn">Login</button>
            <div class="login-or redesigned-or">oder</div>
            <button type="button" class="google-btn login-google-btn redesigned-google-btn" @click="loginWithGoogle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/960px-Google_Favicon_2025.svg.png" alt="Google Logo" class="google-logo-img redesigned-google-logo" /> Mit Google anmelden
            </button>
            <button type="button" class="link-btn forgot-btn redesigned-link-btn" @click="showForgotPw=true">Passwort vergessen?</button>
            <div v-if="errorMsg && !showErrorPopup" class="error-popup redesigned-error">{{ errorMsg }}</div>
          </form>
        </div>
        <div v-if="activeTab==='register'">
          <form @submit.prevent="register" class="form redesigned-form">
            <input v-model="regEmail" type="email" placeholder="E-Mail" required class="redesigned-input" />
            <input v-model="regPassword" type="password" placeholder="Passwort" required class="redesigned-input" />
            <input v-model="regPasswordConfirm" type="password" placeholder="Passwort bestätigen" required class="redesigned-input" />
            <div class="form-row redesigned-form-row">
              <label><input type="checkbox" v-model="agreeTos" /> Ich stimme den <a href="/tos" target="_blank">Nutzungsbedingungen</a> und <a href="/datenschutz" target="_blank">Datenschutz</a> zu</label>
            </div>
            <div class="form-row redesigned-form-row">
              <div id="recaptcha-container-register"></div>
            </div>
            <button type="submit" class="primary-btn redesigned-btn">Registrieren</button>
            <div class="redesigned-or">───────────────oder────────────────</div>
            <button type="button" class="google-btn redesigned-google-btn" @click="registerWithGoogle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/960px-Google_Favicon_2025.svg.png" alt="Google Logo" class="redesigned-google-logo" /> Mit Google registrieren
            </button>
            <div v-if="errorMsg && !showErrorPopup" class="error-popup redesigned-error">{{ errorMsg }}</div>
          </form>
        </div>
        <div v-if="showForgotPw" class="modal-overlay redesigned-modal-overlay">
          <div class="modal-card redesigned-modal-card">
            <div class="modal-title redesigned-modal-title">Passwort zurücksetzen</div>
            <div class="form-row redesigned-form-row">
              <input v-model="forgotEmail" type="email" placeholder="E-Mail für Passwort-Zurücksetzung" required class="redesigned-input" />
            </div>
            <button class="primary-btn redesigned-btn" @click="sendPasswordReset">Senden</button>
            <button class="modal-btn cancel redesigned-btn" @click="showForgotPw=false">Abbrechen</button>
            <div v-if="pwResetMsg" class="info-popup redesigned-info">{{ pwResetMsg }}</div>
          </div>
        </div>
      </div>
      <div v-else class="account-main-full">
        <!-- Responsive Sidebar -->
        <nav :class="['sidebar-nav', { 'sidebar-mobile': sidebarMobileOpen }]" v-if="!sidebarMobileOpen || isDesktop">
          <div class="sidebar-title">Navigation</div>
          <ul class="sidebar-list">
            <li v-for="item in sidebarItems" :key="item.key" :class="{active: activeSidebar===item.key}" @click="() => { activeSidebar = item.key; if (!isDesktop) sidebarMobileOpen = false; }">
              <span class="sidebar-icon"><component :is="item.icon" /></span>
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </nav>
        <!-- Hamburger for mobile -->
        <button class="sidebar-toggle" @click="sidebarMobileOpen = !sidebarMobileOpen" v-if="!isDesktop">
          <span :class="sidebarMobileOpen ? 'open' : ''">☰</span>
        </button>
        <div class="account-content-full">
          <!-- Only one tab content visible at a time -->
          <div v-if="activeSidebar === 'dashboard'">
    <div class="willkommen-text">
      <h2>Willkommen, {{ userEmail }}</h2>
      <p>Hier findest du die wichtigsten Informationen zu deinem Konto.</p>
    </div>
    <div class="account-details-grid">
      <div v-for="(value, key) in userProfile.value" :key="key" class="account-detail-card">
        <h3><span class="icon">🔎</span> {{ key }}</h3>
        <p>{{ value && typeof value === 'string' ? value : (value === true ? 'Ja' : value === false ? 'Nein' : (value || '—')) }}</p>
      </div>
      <div class="account-detail-card main-info">
        <h3><span class="icon">🆔</span> Account ID</h3>
        <p>{{ typeof accountId === 'string' ? accountId : 'unbekannt' }}</p>
      </div>
      <div class="account-detail-card">
        <h3><span class="icon">📧</span> E-Mail</h3>
        <p>{{ userEmail }}</p>
      </div>
      <div class="account-detail-card">
        <h3><span class="icon">✅</span> Verifiziert</h3>
        <p>{{ accountVerified ? 'Ja' : 'Nein' }}</p>
      </div>
    </div>
          </div>



<div v-if="activeSidebar === 'account'">
  <div class="nickname-container" style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: #fff; border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
    <p>
      Dein Anzeigename: <strong>{{ userProfile?.displayName || 'Nicht gesetzt' }}</strong>
    </p>
    <button class="primary-btn" @click="onTryChangeDisplayName" :disabled="displayNameCooldownActive">
      Anzeigename ändern
      <span v-if="displayNameCooldownActive" style="margin-left:8px;color:#ef4444;font-weight:700;">
        (noch {{ displayNameCooldownLeft }}s)
      </span>
    </button>
    <div v-if="showUserNameChangeModal" class="modal-overlay">
      <div class="modal-card" style="max-width: 420px; width: 100%; box-shadow: 0 8px 32px #0c89e355;">
        <div class="modal-title" style="text-align:center;">Anzeigename ändern</div>
        <div v-if="!showDisplayNameConfirm">
          <div class="form-row" style="margin-bottom: 18px;">
        <input v-model="newDisplayName" type="text" placeholder="Neuer Anzeigename" required style="width:100%;" />
          </div>
          <button class="primary-btn" style="margin-bottom:10px;" @click="showDisplayNameConfirm = true">Weiter</button>
          <button class="modal-btn cancel" @click="closeDisplayNameModal">Abbrechen</button>
          <div v-if="displayNameError" class="error-popup" style="margin-top:14px;">{{ displayNameError }}</div>
        </div>
        <div v-else>
          <div style="margin-bottom:18px; text-align:center;">
        <strong>Achtung:</strong> Du kannst deinen Anzeigenamen nur alle 100 Sekunden ändern.<br>
        Bist du sicher, dass du deinen Namen auf <strong>{{ newDisplayName }}</strong> ändern möchtest?
          </div>
          <button class="primary-btn" style="margin-bottom:10px;" @click="changeDisplayName">Ja, ändern</button>
          <button class="modal-btn cancel" @click="showDisplayNameConfirm = false">Zurück</button>
          <div v-if="displayNameError" class="error-popup" style="margin-top:14px;">{{ displayNameError }}</div>
        </div>
      </div>
    </div>
    <div v-if="displayNameCooldownActive && !showUserNameChangeModal" class="info-popup" style="margin-top:18px;">
      Du kannst deinen Anzeigenamen erst wieder in {{ displayNameCooldownLeft }} Sekunde<span v-if="displayNameCooldownLeft !== 1">n</span> ändern.
    </div>
  </div>

  <div class="email-container" style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: #fff; border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
    <h3 style="margin-bottom: 8px; color: #0c89e3; font-weight: 900;">E-Mail-Adresse</h3>
    <p style="font-size: 1.08rem;">Deine registrierte E-Mail-Adresse ist: <strong>{{ userEmail }}</strong></p>
    <button
      class="primary-btn"
      style="margin-top: 10px;"
      @mouseenter="showEmailHint = true"
      @mouseleave="showEmailHint = false"
      disabled
    >
      E-Mail-Adresse ändern
    </button>
    <span
      v-if="showEmailHint"
      class="email-hint-tooltip"
      style="left: 50%; top: 110%;"
    >
      Bitte kontaktiere einen Systemadministrator um deine E-Mail zu ändern.
    </span>
  </div>

  <!-- Account Status Box -->
  <div class="account-status-box"
    style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: #fff; border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
    <h3 style="margin-bottom: 8px; color: #0c89e3; font-weight: 900;">Account Status</h3>
    <div>
      <span>Status: </span>
      <span :class="accountSuspended ? 'status-no' : 'status-yes'">
        {{ accountSuspended ? 'Gesperrt' : 'Aktiv' }}
      </span>
    </div>
    <div>
      <span>Account erstellt am: </span>
      <span>{{ accountCreatedAt }}</span>
    </div>
    <div>
      <span>Letzte Anmeldung: </span>
      <span>{{ accountLastLogin }}</span>
    </div>
    <div v-if="userProfile?.birthday">
      <span>Geburtsdatum: </span>
      <span>{{ userProfile.birthday }}</span>
    </div>
    <div v-if="userProfile?.age">
      <span>Alter: </span>
      <span>{{ realAge }}</span>
    </div>
    <div v-if="userProfile?.birthday">
      <span>Altersverifizierung: </span>
      <span :class="userProfile.ageVerified ? 'status-yes' : 'status-no'">
        {{ userProfile.ageVerified ? 'Verifiziert' : 'Unverifiziert (bitte Systemadministrator kontaktieren)' }}
      </span>
    </div>
    <button class="primary-btn" style="margin-top:18px;" @click="openBirthdayModal">Geburtsdatum eingeben/ändern</button>
  </div>

  <div v-if="showBirthdayModal" class="modal-overlay">
    <div class="modal-card" style="max-width: 420px; width: 100%; box-shadow: 0 8px 32px #0c89e355;">
      <div class="modal-title" style="text-align:center;">Geburtsdatum eingeben</div>
      <div class="form-row" style="margin-bottom: 18px;">
        <input v-model="birthdayInput" type="date" :max="today" required style="width:100%;" />
      </div>
      <button class="primary-btn" style="margin-bottom:10px;" @click="submitBirthday">Speichern</button>
      <button class="modal-btn cancel" @click="showBirthdayModal=false">Abbrechen</button>
      <div v-if="birthdayError" class="error-popup" style="margin-top:14px;">{{ birthdayError }}</div>
    </div>
  </div>

  <!-- Telefonnummer Box (separate container) -->
  <div class="telefonnummer-box"
    style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: #fff; border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
    <h3 style="margin-bottom: 8px; color: #0c89e3; font-weight: 900;">Telefonnummer</h3>
    <p style="font-size: 1.08rem;">
      Deine registrierte Telefonnummer ist: <strong>{{ userProfile?.phoneNumber || 'Nicht gesetzt' }}</strong>
    </p>
    <button
      class="primary-btn"
      style="margin-top: 10px;"
      @click="onTryChangePhoneNumber"
      :disabled="phoneNumberCooldownActive"
    >
      Telefonnummer {{ userProfile?.phoneNumber ? 'ändern' : 'hinzufügen' }}
      <span v-if="phoneNumberCooldownActive" style="margin-left:8px;color:#ef4444;font-weight:700;">
        (noch {{ phoneNumberCooldownLeft }}s)
      </span>
    </button>
    <div v-if="showPhoneNumberChangeModal" class="modal-overlay">
      <div class="modal-card" style="max-width: 420px; width: 100%; box-shadow: 0 8px 32px #0c89e355;">
        <div class="modal-title" style="text-align:center;">Telefonnummer {{ userProfile?.phoneNumber ? 'ändern' : 'hinzufügen' }}</div>
        <div v-if="!showPhoneNumberConfirm">
          <div class="form-row" style="margin-bottom: 18px;">
            <input v-model="newPhoneNumber" type="tel" placeholder="Neue Telefonnummer" required style="width:100%;" />
          </div>
          <button class="primary-btn" style="margin-bottom:10px;" @click="showPhoneNumberConfirm = true">Weiter</button>
          <button class="modal-btn cancel" @click="closePhoneNumberModal">Abbrechen</button>
          <div v-if="phoneNumberError" class="error-popup" style="margin-top:14px;">{{ phoneNumberError }}</div>
        </div>
        <div v-else>
          <div style="margin-bottom:18px; text-align:center;">
            <strong>Achtung:</strong> Du kannst deine Telefonnummer nur alle 100 Sekunden ändern.<br>
            Bist du sicher, dass du deine Telefonnummer auf <strong>{{ newPhoneNumber }}</strong> ändern möchtest?
          </div>
          <button class="primary-btn" style="margin-bottom:10px;" @click="changePhoneNumber">Ja, ändern</button>
          <button class="modal-btn cancel" @click="showPhoneNumberConfirm = false">Zurück</button>
          <div v-if="phoneNumberError" class="error-popup" style="margin-top:14px;">{{ phoneNumberError }}</div>
        </div>
      </div>
    </div>
    <div v-if="phoneNumberCooldownActive && !showPhoneNumberChangeModal" class="info-popup" style="margin-top:18px;">
      Du kannst deine Telefonnummer erst wieder in {{ phoneNumberCooldownLeft }} Sekunde<span v-if="phoneNumberCooldownLeft !== 1">n</span> ändern.
    </div>

  </div>

  <!-- Passwort Box (separate container, improved layout) -->
  <div class="password-container"
    style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: #fff; border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
    <h3 style="margin-bottom: 8px; color: #0c89e3; font-weight: 900;">Passwort zurücksetzen</h3>
    <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;">
      <label style="font-size: 1.08rem; text-align:center; width:100%;">
        Aktuelles Passwort: FEHLER | Passwort konnte nicht geladen werden.
      </label>
      <div style="width:100%; height:1px; background:#e5e7eb; margin:8px 0;">
    </div>
    <p style="font-size: 1.08rem; text-align:center;">
      Du möchtest dein Passwort ändern? Klicke auf den Button unten.<br>
      Die E-Mail wird an deine registrierte Adresse <strong>{{ userEmail }}</strong> gesendet.
    </p>
    <button class="primary-btn"
      :disabled="pwResetCooldown > 0"
      @click="sendPasswordReset"
      style="margin-top: 10px; min-width: 180px;"
    >
      Passwort zurücksetzen
      <span v-if="pwResetCooldown > 0" style="margin-left:8px;color:#ef4444;font-weight:700;">
        (noch {{ pwResetCooldown }}s)
      </span>
    </button>
    <div v-if="pwResetMsg" :class="pwResetMsg.includes('Es gab ein Problem. Bitte kontaktiere einen Systemadministrator') ? 'error-popup' : 'info-popup'" style="margin-top:14px;">
      {{ pwResetMsg }}
    </div>


     <div class="mfa-container">
  <h3> Multi Faktor Authentifizierung (2FA)</h3>
  <p>Mutli Fakore Authentifizierung (2FA) ist aktuell noch nicht verfügbar. Wir arbeiten daran.</p>
 </div>
   <div class="accountlöschen-container" style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: #fff; border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
    <h3 style="margin-bottom: 8px; color: #0c89e3; font-weight: 900;">Account löschen</h3>
    <p style="font-size: 1.08rem;">Wenn du deinen Account löschen willst drücke diesen Button:</p>
    <button
      class="primary-btn"
      style="margin-top: 10px;"
      @mouseenter="showEmailHint = true"
      @mouseleave="showEmailHint = false"
      disabled
    >
      Account löschen
    </button>
    <span
      v-if="showEmailHint"
      class="email-hint-tooltip"
      style="left: 50%; top: 110%;"
    >
      Bitte kontaktiere einen Systemadministrator um deinen Account zu löschen.
    </span>
  </div>
    
    </div>
    </div>
  </div>



  <div v-if="activeSidebar === 'benachrichtigungen'" class="account-notifications-section">
    <div class="notifications-header">
      <h2><span class="notifications-main-icon">🔔</span> Benachrichtigungen</h2>
      <p class="notifications-subtitle">Alle wichtigen Infos & Updates zu deinem Account.</p>
      <div class="notifications-stats">
        <span>Gesamt: <b>{{ notifications.length }}</b></span>
        <span v-if="notifications.length">| Ungelesen: <b>{{ notifications.filter(n => !n.read).length }}</b></span>
      </div>
    </div>
    <div class="benachrichtigungen-container">
      <p v-if="!notifications.length" class="notifications-empty">
        <span class="notifications-empty-icon">📭</span>
        Du hast derzeit keine Benachrichtigungen.
      </p>
      <div v-else>
        <div
          v-for="n in notifications"
          :key="n.id"
          class="notification-card"
          :class="{ read: n.read }"
        >
          <div class="notification-card-header">
            <span class="notification-icon">{{ n.icon || '🔔' }}</span>
            <div class="notification-title-row">
              <span class="notification-title">{{ n.title }}</span>
              <span v-if="!n.read" class="notification-unread-badge">Neu</span>
            </div>
          </div>
          <div class="notification-date">
            {{ n.createdAt && n.createdAt.toDate ? n.createdAt.toDate().toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' }) : '' }}
          </div>
          <div class="notification-message">{{ n.message }}</div>
          <div class="notification-meta">
            <span class="notification-author">Von: <b>{{ n.author }}</b></span>
            <span class="notification-footer">{{ n.footer }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="activeSidebar === 'inhalte'" class="inhalte-section">
    <div class="inhalte-header" style="text-align:center; margin-bottom: 24px;">
      <h2 style="color:#0c89e3; font-weight:900; font-size:1.5rem; margin-bottom:8px;">
        <span style="font-size:1.6rem;">📚</span> Inhalte
      </h2>
      <p style="font-size:1.08rem; color:#23272e;">
        Verwalte deine erstellten Inhaltspreferenzen
      </p>
    </div>

    <div class="alter-box"
      style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: linear-gradient(120deg, #e3f2fd 0%, #f7e017 100%); border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
      <h3 style="margin-bottom: 8px; color: #0c89e3; font-weight: 900; font-size:1.18rem;">
        <span style="font-size:1.3rem;">🎂</span> Alter
      </h3>
      <p>Dein gespeichertes Alter ist {{ realAge }}</p>
      <p v-if="realAge < 18">Damit liegst du in der Altersgruppe Kind</p>
      <p v-else-if="userProfile.ageVerified">Damit liegst du in der Altersgruppe {{ ageGroup }}</p>
      <p v-else style="color:#ef4444;font-weight:700;">Verifizierung ausstehend. Bitte kontaktiere einen Systemadministrator. Age Gruppe: {{ ageGroup }}</p>
    </div>

    <div class="bild-preferenzen-box">
     <h3>Bild Preferenzen</h3>
     <p>Hier kannst den Style deiner AI generierten Bilder anpassen.</p>
     <p>Notiz: Bereits generierte Bilder werden nicht automatisch aktualisiert.
      AI kann beim Bild Style Fehler machen.
     </p>
     <div class="style-select">
      <label for="bild-style">Bild Style auswählen:</label>
      <select id="bild-style" v-model="userProfile.bildPreferenz" @change="saveBildPreferenz($event.target.value)" :disabled="bildPreferenzLoading">
        <option value="">Bitte wählen…</option>
        <option v-for="opt in bildPreferenzOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>
      <div v-if="bildPreferenzLoading" style="color:#0c89e3;font-weight:700;">Wird gespeichert…</div>
      <div v-else-if="userProfile.bildPreferenz" style="color:#22c55e;font-weight:700;">Aktuelle Präferenz: {{ userProfile.bildPreferenz }}</div>
     </div>
     </div>

    <div class="text-preferenzen-box"
        style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 420px; background: linear-gradient(120deg, #e3f2fd 0%, #f7e017 100%); border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
        <h3>Text Preferenzen</h3>
        <p>Hier kannst den Stil deiner AI generierten Texte anpassen.</p>
        <p>Notiz: Bereits generierte Texte werden nicht automatisch aktualisiert.
          AI kann beim Text Stil Fehler machen.
        </p>
        <div class="style-select">
          <label for="text-style">Text Style auswählen:</label>
          <select id="text-style" v-model="userProfile.textPreferenz" @change="saveTextPreferenz($event.target.value)" :disabled="textPreferenzLoading">
            <option value="">Bitte wählen…</option>
            <option v-for="opt in textPreferenzOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
          <div v-if="textPreferenzLoading" style="color:#0c89e3;font-weight:700;">Wird gespeichert…</div>
          <div v-else-if="userProfile.textPreferenz" style="color:#22c55e;font-weight:700;">Aktuelle Präferenz: {{ userProfile.textPreferenz }}</div>
        </div>
      </div>

      <div class="ai-instructions-box"
        style="display: flex; flex-direction: column; align-items: center; gap: 18px; margin: 32px auto 0 auto; max-width: 520px; background: linear-gradient(120deg, #e3f2fd 0%, #f7e017 100%); border-radius: 18px; box-shadow: 0 2px 12px #0c89e322; padding: 32px 24px;">
        <h3 style="margin-bottom: 8px; color: #0c89e3; font-weight: 900;">Zusätzliche AI-Information</h3>
        <p>Hier kannst du der AI eine Zusatz-Info geben, z.B. "Du bist David, ein hilfreicher Assistent". Diese Info wird bei jeder Anfrage an die AI mitgesendet.</p>
        <textarea
          v-model="userProfile.aiCustomInstructions"
          :disabled="aiInstructionsLoading"
          @change="saveAICustomInstructions($event.target.value)"
          placeholder="Gib hier deine Zusatz-Info für die AI ein..."
          style="width:100%;min-height:60px;max-width:100%;border-radius:8px;border:1.5px solid #dbeafe;padding:12px;margin-bottom:10px;"
        ></textarea>
        <div v-if="aiInstructionsLoading" style="color:#0c89e3;font-weight:700;">Wird gespeichert…</div>

        <div v-if="activeSidebar === 'datenschutz'" class="Datenschutz">
          <div class="datenschutz-section" style="text-align:center; margin-top: 64px;">
            <h2 style="color:#0c89e3; font-weight:900; font-size:1.5rem; margin-bottom:8px;">
              <span style="font-size:1.6rem;">🔒</span> Datenschutz
            </h2>
            <p style="font-size:1.08rem; color:#23272e; margin-bottom:24px;">
              Hier findest du Informationen zu unseren Datenschutzrichtlinien und wie wir deine Daten schützen.
            </p>
            <button class="primary-btn" @click="openPrivacyPolicy" style="min-width: 180px; background-color: #0c89e3; border-color: #0c89e3;">
              Datenschutzrichtlinie anzeigen
            </button>
          </div>
        </div>


  <div v-if="activeSidebar === 'logout'" class="Logout">
    <div class="logout-section" style="text-align:center; margin-top: 64px;">
      <h2 style="color:#ef4444; font-weight:900; font-size:1.5rem; margin-bottom:8px;">
        <span style="font-size:1.6rem;">🚪</span> Ausloggen
      </h2>
      <p style="font-size:1.08rem; color:#23272e; margin-bottom:24px;">
        Bist du sicher, dass du dich aus deinem Konto ausloggen möchtest?
      </p>
      <button class="primary-btn" @click="logout" style="min-width: 180px; background-color: #ef4444; border-color: #ef4444;">
        Ja, ausloggen
      </button>
    </div>
  </div>





</div>

  <div class="modal-container">
    <PasswordChangeModal
      v-model="showPasswordModal"
      @saved="onPasswordChanged"
    />

    <TwoFAModal
      v-model="show2FAModal"
      @enabled="on2FAEnabled"
      @disabled="on2FADisabled"
    />
  </div>
</div>
      </div>
    </div>
        </div>
      </div>

</template>



    
    <style scoped>
    .global-error-popup {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 3000;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      pointer-events: none;
    }
    .logout-section {
      margin-top: 64px;
    }
    .account-status-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      margin: 32px auto 0 auto;
      max-width: 420px;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px #0c89e322;
      padding: 32px 24px;
    }
    .bild-preferenzen-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      margin: 32px auto 0 auto;
      max-width: 420px;
      background: linear-gradient(120deg, #e3f2fd 0%, #f7e017 100%);
      border-radius: 18px;
      box-shadow: 0 2px 12px #0c89e322;
      padding: 32px 24px;
    }
    .text-preferenzen-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      margin: 32px auto 0 auto;
      max-width: 420px;
      background: linear-gradient(120deg, #e3f2fd 0%, #f7e017 100%);
      border-radius: 18px;
      box-shadow: 0 2px 12px #0c89e322;
      padding: 32px 24px;
    }
    .delete-account-btn {
      background: #ef4444;
      color: #fff;
      font-weight: 900;
      border: none;
      border-radius: 10px;
      padding: 10px 18px;
      font-size: 1.08rem;
      cursor: pointer;
      margin-bottom: 8px;
      transition: background 0.18s, color 0.18s, transform 0.18s;
      box-shadow: 0 2px 8px #ef444422;
      /* Fix: Use correct CSS for hover state */
      &:hover {
        background: #b91c1c;
        color: #fff;
        transform: scale(1.04);
      }
    }
.redesigned-auth-card {
      background: linear-gradient(120deg, #f5f7fa 0%, #e3f2fd 100%);
            border-radius: 22px;
            box-shadow: 0 6px 32px #0c89e322, 0 1.5px 8px #0c89e344;
            padding: 44px 28px 36px 28px;
            max-width: 420px;
            margin: 48px auto 0 auto;
            border: 1.5px solid #e3eafc;
            transition: box-shadow 0.18s, background 0.18s, border 0.18s;
          }
          .redesigned-auth-card:hover {
            box-shadow: 0 12px 48px #0c89e344, 0 2px 12px #0c89e322;
            border: 1.5px solid #b6d0f7;
            background: linear-gradient(120deg, #e3f2fd 0%, #f5f7fa 100%);
          }
          @media (max-width: 600px) {
            .redesigned-auth-card {
              padding: 22px 4vw 18px 4vw;
              margin: 24px 0 0 0;
              border-radius: 14px;
 max-width: 98vw;
}
}
    .global-error-content {
      margin-top: 32px;
      background: #ef4444;
      color: #fff;
      padding: 18px 32px;
      border-radius: 12px;
      font-weight: 900;
      font-size: 1.15rem;
      box-shadow: 0 2px 12px #ef444422;
      display: flex;
      align-items: center;
      gap: 14px;
      pointer-events: auto;
      position: relative;
    }
    .error-icon {
      width: 28px;
      height: 28px;
      color: #fff;
    }
    .close-error-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      font-weight: 900;
      margin-left: 18px;
      cursor: pointer;
      position: absolute;
      right: 12px;
      top: 8px;
    }
    /* Suspended modal */
    .suspended-modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(44, 62, 80, 0.18);
      z-index: 4000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .suspended-modal-card {
      background: #fff6f6;
      border-radius: 22px;
      box-shadow: 0 8px 32px #ef444422;
      padding: 48px 38px 38px 38px;
      min-width: 340px;
      max-width: 440px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      animation: fadeInModal 0.3s;
    }
    .suspended-modal-title {
      font-size: 1.5rem;
      font-weight: 900;
      color: #ef4444;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .passwort-container {
      margin-top: 32px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      border-radius: 18px;
      box-shadow: 0 2px 12px #0c89e322;
      padding: 32px 24px;
    }
    .suspended-modal-content {
      color: #ef4444;
      font-size: 1.08rem;
      margin-bottom: 22px;
    }
    .suspended-close-error {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #b91c1c;
      font-weight: 900;
      margin-top: 18px;
      font-size: 1.08rem;
    }
    .account-bg {
      min-height: 100vh;
      width: 100vw;
      background: linear-gradient(120deg, #0c89e3 0%, #23272e 100%);
      color: #23272e;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .account-container-wide {
      width: 95vw;
      max-width: 1400px;
      min-height: 80vh;
      margin: 4vh auto;
      background: linear-gradient(120deg, #f5f7fa 0%, #e3f2fd 100%);
      border-radius: 32px;
      box-shadow: 0 12px 48px 0 rgba(12,137,227,0.22), 0 2px 12px #0c89e322;
      display: flex;
      flex-direction: column;
    }
    .account-title-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
      padding: 0 38px;
      border-radius: 32px 32px 0 0;
      min-height: 64px;
      box-shadow: 0 2px 16px #0c89e322;
    }
    .account-title {
      font-size: 2rem;
      font-weight: 900;
      color: #23272e;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 8px #0c89e322;
    }
    .account-main-full {
      display: flex;
      flex-direction: row;
      height: 100%;
      min-height: 0;
      flex: 1;
      width: 100%;
      position: relative;
    }
    .sidebar-nav {
      width: 240px;
      background: linear-gradient(120deg, #e3f2fd 0%, #f5f7fa 100%);
      border-radius: 32px 0 0 32px;
      box-shadow: 2px 0 12px #0c89e322;
      padding: 24px 0 18px 0;
      min-height: 72vh;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      z-index: 10;
      transition: left 0.3s;
      max-width: 100vw;
      box-sizing: border-box;
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
      padding: 16px 24px;
      cursor: pointer;
      color: #23272e;
      font-weight: 700;
      border-left: 6px solid transparent;
      border-radius: 12px 0 0 12px;
      margin-bottom: 8px;
      font-size: 1.08rem;
      display: flex;
      align-items: center;
      gap: 16px;
      transition: background 0.15s, border 0.15s, color 0.15s;
    }
    .sidebar-list li.active, .sidebar-list li:hover {
      background: linear-gradient(90deg, #f7e017 0%, #e3f2fd 100%);
      color: #0c89e3;
      border-left: 6px solid #0c89e3;
      font-weight: 900;
    }
    .sidebar-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .account-content-full {
      flex: 1;
      padding: 32px 16px;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      background: transparent;
      border-radius: 0 32px 32px 0;
      overflow-x: hidden;
    }
    @media (max-width: 900px) {
      .account-main-full {
        flex-direction: column;
      }
      .sidebar-nav {
        position: fixed;
        left: -100vw;
        top: 0;
               height: 100vh;
        width: 80vw;
        max-width: 320px;
        border-radius: 0 32px 32px 0;
        box-shadow: 4px 0 24px #0c89e322;
        transition: left 0.3s;
        background: #fff;
      }
      .sidebar-nav.sidebar-mobile {
        left: 0;
      }
      .sidebar-toggle {
        position: fixed;
        left: 18px;
        top: 18px;
        z-index: 200;
        background: #0c89e3;
        border: none;
        border-radius: 8px;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 2rem;
        box-shadow: 0 2px 8px #0c89e322;
      }
    }
    @media (max-width: 600px) {
      .account-title {
        font-size: 1.2rem;
      }
      .account-content-full {
        padding: 8px 2vw;
      }
      .sidebar-nav {
        width: 90vw;
        max-width: 100vw;
        padding: 12px 0;
      }
    }
    /* Card, Button, Modal, etc. - make sure all have min-width:0 and max-width:100% for mobile */
.nickname-container, .email-container, .account-status-box, .telefonnummer-box, .password-container, .willkommen-text, .account-management-section {
  max-width: 100%;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
}
.primary-btn, .modal-btn, .delete-account-btn {
  width: 100%;
  max-width: 320px;
  min-width: 0;
  font-size: 1.08rem;
  padding: 14px 0;
  border-radius: 10px;
  margin-bottom: 8px;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 2px 8px #0c89e322;
}
.primary-btn:hover, .modal-btn:hover, .delete-account-btn:hover {
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
  color: #23272e;
  transform: scale(1.04);
}
input, select, textarea {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid #dbeafe;
  padding: 12px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
input:focus, select:focus, textarea:focus {
  border: 1.5px solid #0c89e3;
  outline: none;
}
.example-image.blurred {
  filter: blur(16px) brightness(0.8) grayscale(0.2);
  transition: filter 0.3s;
}
.blur-icon-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
}
.login-modal-card, .modal-card, .suspended-modal-card {
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.willkommen-text {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin: 16px 0;
  padding: 24px 12px;
  border-radius: 18px;
  background: linear-gradient(120deg, #e3f2fd 0%, #f7e017 100%);
  box-shadow: 0 2px 8px #0c89e322;
  text-align: center;
}
.notification-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px #0c89e322;
  margin-bottom: 18px;
  padding: 18px 22px 14px 22px;
  transition: box-shadow 0.18s, background 0.18s;
  border-left: 6px solid #0c89e3;
  position: relative;
}
.notification-card.read {
  opacity: 0.7;
  background: #f3f4f6;
}
.notification-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 2px;
}
.notification-icon {
  font-size: 2rem;
  margin-right: 6px;
  flex-shrink: 0;
}
.notification-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.notification-title {
  font-weight: 900;
  color: #0c89e3;
  font-size: 1.18rem;
  white-space: pre-line;
}
.notification-unread-badge {
  background: linear-gradient(90deg, #22c55e 0%, #0c89e3 100%);
  color: #fff;
  font-weight: 900;
  font-size: 0.98rem;
  border-radius: 8px;
  padding: 3px 14px;
  box-shadow: 0 2px 8px #0c89e322;
  letter-spacing: 0.5px;
  margin-left: 6px;
}
.notification-date {
  color: #6b7280;
  font-size: 0.98rem;
  font-weight: 500;
  margin-left: 2.6rem;
  margin-bottom: 2px;
}
.notification-message {
  font-size: 1.08rem;
  color: #23272e;
  margin-bottom: 2px;
  margin-left: 2.6rem;
  white-space: pre-line;
}
.notification-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.98rem;
  color: #6b7280;
  font-style: italic;
  margin-left: 2.6rem;
  margin-top: 2px;
  gap: 12px;
}
.notification-author {
  font-weight: 700;
}
.notification-footer {
  margin-left: 18px;
}
@media (max-width: 600px) {
  .account-notifications-section {
    max-width: 100vw;
    padding: 0 2vw 32px 2vw;
  }
  .notification-card {
    padding: 16px 8px 14px 12px;
  }
  .notification-title {
    font-size: 1.05rem;
  }
  .notification-icon {
    font-size: 1.3rem;
  }
  .notification-date,
  .notification-message,
  .notification-meta {
    margin-left: 1.6rem;
  }
}
.sidebar-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 62, 80, 0.18);
  z-index: 99;
}
.sidebar-nav {
  z-index: 100;
}
.sidebar-toggle {
  position: fixed;
  left: 18px;
  top: 18px;
  z-index: 200;
  background: #0c89e3;
  border: none;
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  box-shadow: 0 2px 8px #0c89e322;
}
@media (max-width: 900px) {
  .sidebar-nav {
    position: fixed;
    left: -100vw;
    top: 0;
    height: 100vh;
    width: 80vw;
    max-width: 320px;
    border-radius: 0 32px 32px 0;
    box-shadow: 4px 0 24px #0c89e322;
    transition: left 0.3s;
    background: #fff;
  }
  .sidebar-nav.sidebar-mobile {
    left: 0;
  }
}
</style>
