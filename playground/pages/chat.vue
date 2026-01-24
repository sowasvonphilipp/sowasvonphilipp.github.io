<template>
<div>
  <div v-if="isLoggedIn">
    <div class="page-title">
      <h1>Chat mit DeepAI</h1>
    </div>
    <div style="display: flex;">
      <div class="chats-list-left">
        <button class="primary-btn" @click="newChat">
          <span class="icon">➕</span> Neuer Chat
        </button>
        <div class="chat-item" v-for="chat in chats" :key="chat.id" :class="{ selected: chat.id === selectedChatId }">
          <div class="chat-item-content" @click="selectChat(chat.id)">
            <h3 class="chat-item-title">{{ chat.title }}</h3>
            <p class="chat-item-last-message">{{ chat.lastMessage }}</p>
          </div>
          <div class="chat-actions">
            <button class="icon-btn" @click.stop="renameChat(chat)"><span class="icon">✏️</span></button>
            <button class="icon-btn delete" @click.stop="deleteChat(chat.id)"><span class="icon">🗑️</span></button>
          </div>
        </div>
      </div>
      <div class="chat-container">
        <div v-if="selectedChat">
          <div class="messages">
            <div v-for="(msg, idx) in selectedChat.messages" :key="idx" :class="['bubble-row', msg.role]">
              <div class="bubble-header" :class="msg.role">
                <span class="avatar" :class="msg.role">
                  <span v-if="msg.role === 'user'">👤</span>
                  <span v-else>🤖</span>
                </span>
                <span class="sender-name">{{ msg.role === 'user' ? 'Du' : assistantName }}</span>
              </div>
              <div class="bubble-message" :class="msg.role">
                <span class="bubble-text">{{ msg.text }}</span>
              </div>
              <div v-if="msg.role === 'assistant'" class="feedback-row">
                <button class="feedback-btn" :class="{active: msg.feedback === 'up'}" @click="setFeedback(idx, 'up')">👍</button>
                <button class="feedback-btn" :class="{active: msg.feedback === 'down'}" @click="setFeedback(idx, 'down')">👎</button>
                <span v-if="msg.feedback === 'up'" class="feedback-label">Danke für dein Feedback!</span>
                <span v-else-if="msg.feedback === 'down'" class="feedback-label">Wir versuchen uns zu verbessern.</span>
              </div>
            </div>
          </div>
          <form @submit.prevent="sendMessage" class="input-row">
            <input v-model="inputMessage" placeholder="Nachricht eingeben..." autocomplete="off" />
            <button class="primary-btn" type="submit"><span class="icon">📤</span> Senden</button>
          </form>
          <!-- Keine Konfiguration für Name/Icon mehr -->
        </div>
        <div v-else class="no-chat-selected">Wähle einen Chat aus oder erstelle einen neuen.</div>
      </div>
    </div>
  </div>
  <div v-else class="error-container">
    <h2>Du bist nicht eingeloggt</h2>
    <p>Bitte melde dich an, um den Chat zu nutzen.</p>
    <button @click="goToAccount">Zum Login</button>
  </div>
</div>
</template>

<style scoped>
.bubble-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.2rem;
}
.bubble-row.user {
  align-items: flex-end;
}
.bubble-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.1rem;
}
.bubble-header.user {
  flex-direction: row-reverse;
}
.bubble-header .avatar {
  margin: 0 0.5em;
}
.bubble-header.user .avatar {
  margin: 0 0.5em 0 0;
}
.bubble-header.assistant .avatar {
  margin: 0 0 0 0.5em;
}
.bubble-message {
  max-width: 70%;
  padding: 0.7rem 1.2rem;
  border-radius: 18px;
  word-break: break-word;
  font-size: 1.08em;
  box-shadow: 0 1px 4px #0001;
}
.bubble-message.user {
  background: #4b6cb7;
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}
.bubble-message.assistant {
  background: #e3e8f0;
  color: #222;
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}
.avatar-input {
  margin-left: 0.5rem;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
  width: 50px;
  text-align: center;
}
.primary-btn {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.8rem 1.2rem;
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
}
.primary-btn:hover {
  background: linear-gradient(90deg, #3a549a 0%, #182848 100%);
}
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.2rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: background 0.2s;
}
.icon-btn:hover {
  background: #e3e8f0;
}
.icon-btn.delete:hover {
  background: #ffeaea;
}
.chat-actions {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.icon {
  font-size: 1.2em;
}
.avatar {
  display: inline-block;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: #e3e8f0;
  text-align: center;
  line-height: 2em;
  margin-right: 0.5em;
  font-size: 1.3em;
}
.avatar.user {
  background: #4b6cb7;
  color: #fff;
}
.avatar.assistant {
  background: #e3e8f0;
  color: #222;
}
.sender-name {
  font-weight: bold;
  margin-right: 0.5em;
  font-size: 0.95em;
}
.bubble-text {
  vertical-align: middle;
}
.chat-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 500px;
}
.page-title {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.page-title h1 {
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
}
.error-container {
  max-width: 400px;
  margin: 4rem auto;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 2rem;
  background: #fafbfc;
}
.error-container button {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background: #4b6cb7;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error-container button:hover {
  background: #3a549a;
}
.chats-list-left {
  width: 250px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  min-height: 500px;
  padding: 1rem 0.5rem 1rem 0;
  background: #f8f9fa;
}
.feedback-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.2rem 0 0.2rem 0.5rem;
}
.feedback-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  width: 2.1em;
  height: 2.1em;
  font-size: 1.2em;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
}
.feedback-btn.active {
  background: #4b6cb7;
  color: #fff;
  border: 1.5px solid #4b6cb7;
}

.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  max-height: 350px;
}
.bubble {
  display: inline-block;
  padding: 0.7rem 1.2rem;
  border-radius: 18px;
  max-width: 70%;
  word-break: break-word;
  margin-bottom: 0.2rem;
}
.bubble.user {
  background: #4b6cb7;
  color: #fff;
  align-self: flex-end;
}
.bubble.assistant {
  background: #e3e8f0;
  color: #222;
  align-self: flex-start;
}
.input-row {
  display: flex;
  gap: 0.5rem;
}
.input-row input {
  flex: 1;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.input-row button {
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  border: none;
  background: #4b6cb7;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}
.input-row button:hover {
  background: #3a549a;
}
.no-chat-selected {
  color: #888;
  text-align: center;
  margin-top: 2rem;
}
</style>

<script setup>

import { ref, onMounted, computed } from 'vue'

const assistantName = 'DeepAI';
// Feedback für AI-Antworten setzen
function setFeedback(idx, value) {
  const msg = selectedChat.value?.messages[idx];
  if (msg && msg.role === 'assistant') {
    msg.feedback = value;
  }
}
definePageMeta({
  title: 'Chat - DeepAI',
  meta: [
    {
      name: 'description',
      content: 'Chatte mit DeepAI, unserem KI-gestützten Assistenten, und erhalte Antworten auf deine Fragen in Echtzeit.',
    },
  ],
})

const nuxtApp = useNuxtApp();
const router = useRouter();
const auth = nuxtApp.$auth;

const isLoggedIn = ref(false);

onMounted(() => {
  isLoggedIn.value = !!auth.currentUser;
  // Listen for auth state changes (optional, for better UX)
  auth.onAuthStateChanged?.((user) => {
    isLoggedIn.value = !!user;
  });
});

function goToAccount() {
  router.push('/account');
}


const chats = ref([
  {
    id: 1,
    title: 'Chat 1',
    lastMessage: 'Letzte Nachricht von Chat 1',
    messages: [
      { role: 'user', text: 'Hallo!' },
      { role: 'assistant', text: 'Hallo! Wie kann ich helfen?' }
    ]
  }
]);
const selectedChatId = ref(null);
const inputMessage = ref('');

const selectedChat = computed(() => chats.value.find(c => c.id === selectedChatId.value));

function selectChat(chatId) {
  selectedChatId.value = chatId;
}

function newChat() {
  const newId = chats.value.length ? Math.max(...chats.value.map(c => c.id)) + 1 : 1;
  const chat = {
    id: newId,
    title: `Chat ${newId}`,
    lastMessage: '',
    messages: []
  };
  chats.value.unshift(chat);
  selectedChatId.value = chat.id;
}

function renameChat(chat) {
  const newTitle = prompt('Neuer Name für den Chat:', chat.title);
  if (newTitle && newTitle.trim()) {
    chat.title = newTitle.trim();
  }
}

function deleteChat(chatId) {
  const chat = chats.value.find(c => c.id === chatId);
  if (!chat) return;
  if (confirm(`Möchtest du den Chat "${chat.title}" wirklich löschen?`)) {
    const idx = chats.value.findIndex(c => c.id === chatId);
    if (idx !== -1) {
      if (selectedChatId.value === chatId) {
        selectedChatId.value = chats.value.length > 1 ? chats.value.find(c => c.id !== chatId).id : null;
      }
      chats.value.splice(idx, 1);
    }
  }
}

function sendMessage() {
  if (!inputMessage.value.trim() || !selectedChat.value) return;
  // Add user message
  selectedChat.value.messages.push({ role: 'user', text: inputMessage.value });
  selectedChat.value.lastMessage = inputMessage.value;
  const userMsg = inputMessage.value;
  inputMessage.value = '';
  // Simulate assistant echo response
  setTimeout(() => {
    const echo = `Echo: ${userMsg}`;
    selectedChat.value.messages.push({ role: 'assistant', text: echo });
    selectedChat.value.lastMessage = echo;
  }, 500);
}
</script>