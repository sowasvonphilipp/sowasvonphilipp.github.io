<template>
  <div class="admin-panel">
    <h3>Alle Nutzer (Firestore)</h3>
    <table class="admin-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.uid">
          <td v-for="col in columns" :key="col">{{ user[col] || '—' }}</td>
          <td>
            <button @click="editUser(user)">Bearbeiten</button>
            <button @click="deleteUser(user)">Löschen</button>
            <button @click="resetPassword(user)">Passwort zurücksetzen</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="selectedUser" class="admin-edit-modal">
      <h4>Nutzer bearbeiten: {{ selectedUser.uid }}</h4>
      <div v-for="col in editableColumns" :key="col">
        <label>{{ col }}:</label>
        <input v-model="selectedUser[col]" />
      </div>
      <button @click="saveUser">Speichern</button>
      <button @click="selectedUser=null">Abbrechen</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore();
const users = ref([]);
const columns = ref([]);
const editableColumns = ref(['badge', 'permission', 'displayName', 'adminNote']);
const selectedUser = ref(null);
const userEmail = ref("");


onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    userEmail.value = user?.email || "";
    // Only load users if the email matches
    if (userEmail.value === 'sowasvonphilipp23@gmail.com') {
      loadUsers();
    } else {
      users.value = [];
    }
  });
});

async function loadUsers() {
  const snap = await getDocs(collection(db, 'users'));
  users.value = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  if (users.value.length > 0) {
    columns.value = Object.keys(users.value[0]).filter(k => k !== 'uid');
    columns.value.unshift('uid');
  }
}

function editUser(user) {
  selectedUser.value = { ...user };
}
async function saveUser() {
  if (!selectedUser.value) return;
  await updateDoc(doc(db, 'users', selectedUser.value.uid), selectedUser.value);
  await loadUsers();
}
async function deleteUser(user) {
  if (confirm('Wirklich löschen?')) {
    await deleteDoc(doc(db, 'users', user.uid));
    await loadUsers();
  }
}
async function resetPassword(user) {
  if (user.email) {
    await sendPasswordResetEmail(getAuth(), user.email);
    alert('Passwort-Reset gesendet!');
  }
}
</script>

<style scoped>
.admin-panel { margin-top: 32px; }
.admin-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
.admin-table th, .admin-table td { border: 1px solid #ccc; padding: 8px; }
.admin-table th { background: #e3f2fd; }
.admin-edit-modal { background: #fff; border: 1px solid #0c89e3; padding: 18px; border-radius: 12px; margin-top: 18px; }
</style>
