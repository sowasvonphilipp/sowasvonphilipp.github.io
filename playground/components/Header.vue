<template>
  <div class="header-logo-group" @click="goHome">
    <div class="header-title-row">
      <img
        class="logo-img"
        src="http://91.99.206.192/logo-modified.png"
        alt="DeepAI Logo"
      />
      <h1 class="header-title">DeepAI</h1>
      <span class="badge">Beta</span>
      <span :class="['main-service-status', serviceStatus === 'operational' ? 'operational' : 'degraded']">
        <template v-if="serviceStatus === 'Beta verfügbar'">
          <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="#4caf50" stroke-width="2" fill="#e8f5e9"/><path stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 12l2 2l4-4"/></svg>
          <span class="status-text">All services operational</span>
        </template>
        <template v-else>
          <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="#4caf50" stroke-width="2" fill="#e8f5e9"/><path stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 12l2 2l4-4"/></svg>
          <span class="status-text">Beta verfügbar</span>
        </template>
      </span>
    </div>
    <div class="slogan-text">
      AI ohne Limits
    </div>
  </div>
  <div class="border-bottom header-background"></div>

  <!-- Notifications and Announcements below the header -->
  <div v-if="notifications.length" class="notifications notifications-header notifications-below">
    <span v-for="(notif, idx) in notifications" :key="idx" class="notification" :style="{ background: notif.color || '#f7e017' }">
      <span class="notif-icon">
        <component :is="getHeroicon(notif.icon)" />
      </span>
      <span>{{ notif.message }}</span>
    </span>
  </div>
  <div v-if="announcements.length" class="announcements announcements-below">
    <span v-for="(msg, idx) in announcements" :key="idx" class="announcement">
      {{ msg }}
    </span>
  </div>

  <div class="buttons-header">
    <button
      @click="handleDarkModeClick"
      class="dark-mode-btn square"
      aria-label="Toggle dark mode"
      ref="darkBtn"
    >
      <span v-if="colorMode.value !== 'dark'" class="icon-wrapper">
        <!-- Heroicons Sun (Outline) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="5" stroke-width="2"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/>
        </svg>
      </span>
      <span v-else class="icon-wrapper">
        <!-- Heroicons Moon (Outline) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
        </svg>
      </span>
    </button>
    <button
      class="preise-btn square"
      aria-label="Preise"
      @click="goPreise"
      style="margin-left:0;"
    >
      <span class="icon-wrapper">
<!-- Heroicons Tag (Outline) -->
<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        <span class="preise-text">Preise</span>
      </span>
    </button>
    <button
      class="ueberuns-btn square"
      aria-label="Über uns"
      @click="goUeberUns"
    >
      <span class="icon-wrapper">
        <!-- Heroicons User Group (Outline) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0zm6 8a4 4 0 00-3-3.87" />
        </svg>
        <span class="ueberuns-text">Über uns</span>
      </span>
    </button>
    <button
      class="account-btn square"
      aria-label="Account"
      v-if="!menuOpen"
      @click="goAccount"
      :aria-pressed="menuOpen"
    >
      <span class="icon-wrapper">
        <!-- Heroicons User Circle (Outline) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </span>
    </button>
    <button
      class="menu-btn square"
      aria-label="Open menu"
      @click="toggleMenu"
      :aria-pressed="menuOpen"
    >
      <span class="icon-wrapper">
        <!-- Heroicons Menu (Outline) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </span>
    </button>
    <button
      class="chat-btn square"
      aria-label="Chat"
      @click="goChat"
      style="margin-left:0;"
    >
      <span class="icon-wrapper">
        <!-- Heroicons Chat Bubble Left Ellipsis (Outline) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 12c0 3.728 3.64 6.75 8.125 6.75.98 0 1.93-.13 2.82-.37.37-.1.77-.02 1.06.22l2.12 1.77c.66.55 1.62-.07 1.44-.89l-.38-1.7c-.07-.32.04-.66.28-.88C20.36 15.98 21.75 14.13 21.75 12c0-3.728-3.64-6.75-8.125-6.75S2.25 8.272 2.25 12Z" />
          <circle cx="9" cy="12" r="1" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
          <circle cx="15" cy="12" r="1" fill="currentColor"/>
        </svg>
        <span class="chat-text">Chat</span>
      </span>
    </button>
  </div>

  <!-- Example sidebar/menu -->
  <transition name="sidebar-fade">
    <div v-if="menuOpen" class="sidebar">
      <button class="close-btn" @click="toggleMenu" aria-label="Close menu">&times;</button>
      <nav>
        <ul>
          <li><a href="#">Menu Link 1</a></li>
          <li><a href="#">Menu Link 2</a></li>
          <li><a href="#">Menu Link 3</a></li>
        </ul>
      </nav>
    </div>
  </transition>

 
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
const colorMode = useColorMode()
const menuOpen = ref(false)

function goHome() {
  window.location.href = '/'
}
function goAccount() {
  window.location.href = '/account'
}
function goUeberUns() {
  window.location.href = '/ueber-uns'
}
function goPreise() {
  window.location.href = '/preise'
}
function goChat() {
  window.location.href = '/chat'
}
function handleDarkModeClick() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

const serviceStatus = ref('operational')
const notifications = ref([])
const announcements = ref([])

// Heroicons outline SVGs (minimal set, add more as needed)
const icons = {
  'wrench-screwdriver': () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', width: 20, height: 20 }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 1.5, d: 'M15.232 5.232l3.536 3.536m-2.036-1.5l-2.036 2.036a2.5 2.5 0 01-3.536 0l-1.5-1.5a2.5 2.5 0 010-3.536l2.036-2.036m2.036 1.5l-2.036 2.036' })
  ]),
  'information-circle': () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', width: 20, height: 20 }, [
    h('circle', { cx: 12, cy: 12, r: 10, stroke: '#0c89e3', 'stroke-width': 2, fill: '#e3f2fd' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 2, stroke: '#0c89e3', d: 'M12 16v-4m0-4h.01' })
  ]),
  'exclamation-triangle': () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', width: 20, height: 20 }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 2, stroke: '#ff9800', d: 'M12 9v2m0 4h.01M21 20H3a1 1 0 01-.894-1.447l9-16a1 1 0 011.788 0l9 16A1 1 0 0121 20z' })
  ]),
}
function getHeroicon(name) {
  return icons[name] || icons['information-circle']
}

onMounted(async () => {
  try {
    const res = await fetch('/components/notifications.json')
    notifications.value = await res.json()
  } catch (e) {
    notifications.value = []
  }
  // Example: Announcements can be static or fetched
  announcements.value = [
    'Willkommen zu DeepAI Beta!',
    'Checke die neuen Features und Preise!'
  ]
})
</script>

<style scoped>
/* Main Service Status in Header */
.main-service-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.02rem;
  font-weight: 600;
  color: #388e3c;
  background: #e8f5e9;
  border-radius: 8px;
  padding: 2px 12px 2px 8px;
  margin-left: 18px;
  box-shadow: 0 1px 4px rgba(76,175,80,0.08);
  transition: background 0.2s, color 0.2s;
  height: 32px;
}
.main-service-status.degraded {
  color: #e39c0c;
  background: #fff3e0;
  box-shadow: 0 1px 4px rgba(255,152,0,0.08);
}
.main-service-status .status-icon {
  width: 18px;
  height: 18px;
  margin-right: 2px;
}
.main-service-status .status-text {
  font-size: 1.02rem;
  font-weight: 600;
}
.notifications-header {
  margin-top: 8px;
  margin-left: 2px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}
.notifications-below {
  margin: 0 auto;
  margin-top: 12px;
  margin-bottom: 0;
  max-width: 900px;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
}
.notification {
  display: flex;
  align-items: center;
  gap: 7px;
  border-radius: 16px;
  padding: 6px 14px 6px 10px;
  font-size: 0.98rem;
  font-weight: 500;
  background: var(--notif-bg, #f7e017);
  color: #232323;
  box-shadow: 0 1px 6px rgba(0,0,0,0.07);
  min-width: 44px;
  max-width: 320px;
  transition: background 0.2s, color 0.2s;
  word-break: break-word;
}
.notification .notif-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.announcements {
  width: 100%;
  padding: 8px 32px;
  background: linear-gradient(90deg, #e3f2fd 0%, #e8f5e9 100%);
  color: #0c89e3;
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 2px;
  display: flex;
  gap: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(12,137,227,0.08);
  align-items: center;
  min-height: 36px;
}
.announcements-below {
  margin: 0 auto;
  margin-top: 8px;
  margin-bottom: 0;
  max-width: 900px;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
}
.announcement {
  padding: 2px 8px;
  white-space: pre-line;
}
/* Über uns Button Styles */
.ueberuns-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 18px 0 14px;
  min-width: 110px;
  height: 48px;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid rgba(12,137,227,0.13);
  border-radius: 16px;
  cursor: pointer;
  transition: box-shadow 0.25s, transform 0.18s, background 0.25s, border 0.25s;
  box-shadow: 0 2px 12px rgba(12,137,227,0.10);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
}
.ueberuns-btn .icon-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ueberuns-btn .icon {
  width: 22px;
  height: 22px;
  stroke: #0c89e3;
  transition: stroke 0.3s, filter 0.3s, transform 0.2s;
  filter: drop-shadow(0 1px 2px rgba(12,137,227,0.10));
}
.ueberuns-btn .ueberuns-text {
  font-size: 1rem;
  background: linear-gradient(90deg, hsl(127, 93%, 42%), #0c89e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.ueberuns-btn:hover {
  background: rgba(12, 137, 227, 0.13);
  box-shadow: 0 4px 24px rgba(12,137,227,0.18);
  border: 1.5px solid #0c89e3;
  transform: scale(1.10) rotate(-4deg);
}
.ueberuns-btn:active {
  background: rgba(12, 137, 227, 0.18);
  transform: scale(0.96) rotate(2deg);
}
.dark .ueberuns-btn .icon {
  stroke: #f7e017;
  filter: drop-shadow(0 1px 4px rgba(247,224,23,0.15));
}
.dark .ueberuns-btn .ueberuns-text {
  background: linear-gradient(90deg, #f7e017, #0c89e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
/* Preise Button Styles */
.preise-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 18px 0 14px;
  min-width: 110px;
  height: 48px;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid rgba(12,137,227,0.13);
  border-radius: 16px;
  cursor: pointer;
  transition: box-shadow 0.25s, transform 0.18s, background 0.25s, border 0.25s;
  box-shadow: 0 2px 12px rgba(12,137,227,0.10);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
}
.preise-btn .icon-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.preise-btn .icon {
  width: 22px;
  height: 22px;
  stroke: #0c89e3;
  transition: stroke 0.3s, filter 0.3s, transform 0.2s;
  filter: drop-shadow(0 1px 2px rgba(12,137,227,0.10));
}
.preise-btn .preise-text {
  font-size: 1rem;
  background: linear-gradient(90deg, hsl(127, 93%, 42%), #0c89e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.preise-btn:hover {
  background: rgba(12, 137, 227, 0.13);
  box-shadow: 0 4px 24px rgba(12,137,227,0.18);
  border: 1.5px solid #0c89e3;
  transform: scale(1.10) rotate(-4deg);
}
.preise-btn:active {
  background: rgba(12, 137, 227, 0.18);
  transform: scale(0.96) rotate(2deg);
}
.dark .preise-btn .icon {
  stroke: #f7e017;
  filter: drop-shadow(0 1px 4px rgba(247,224,23,0.15));
}
.dark .preise-btn .preise-text {
  background: linear-gradient(90deg, #f7e017, #0c89e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
/* Header Logo Group (Logo + Title + Slogan) */
.header-logo-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px 0 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  cursor: pointer;
}
.header-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo-img {
  height: 48px;
  margin: 0 8px 0 0;
  cursor: pointer;
}
.logo-img:hover {
  opacity: 0.8;
}
.slogan-text {
  font-size: 1rem;
  color: #333;
  margin-top: 2px;
  margin-bottom: 0;
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-left: 56px;
}
.header-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-title {
  font-size: 1.5rem;
  background: linear-gradient(90deg, hsl(127, 93%, 42%), #0c89e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 700;
  margin: 0;
}
.badge {
  background: #0c89e3;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 2px 8px;
  margin-left: 4px;
  letter-spacing: 0.03em;
  box-shadow: 0 1px 4px rgba(12,137,227,0.10);
}
.slogan-text {
  font-size: 1rem;
  color: #333;
  margin-top: 2px;
  margin-bottom: 0;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.header-status-row {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 20px;
  margin-top: 70px;
  min-height: 28px;
}
.service-status {
  font-size: 0.95rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 8px;
  background: #e0f7fa;
  color: #0c89e3;
  box-shadow: 0 1px 4px rgba(12,137,227,0.08);
}
.service-status.degraded {
  background: #fff3e0;
  color: #e39c0c;
}
.notifications {
  display: flex;
  gap: 10px;
}
.notification {
  background: #f7e017;
  color: #232323;
  font-size: 0.85rem;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(247,224,23,0.10);
}
.announcements {
  width: 100%;
  padding: 8px 32px;
  background: linear-gradient(90deg, #e3f2fd 0%, #e8f5e9 100%);
  color: #0c89e3;
  font-size: 1.05rem;
  font-weight: 600;
  margin-top: 2px;
  display: flex;
  gap: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(12,137,227,0.08);
  align-items: center;
  min-height: 36px;
}
.announcement {
  padding: 2px 8px;
  white-space: pre-line;
}
.dark .badge {
  background: #f7e017;
  color: #232323;
}
.dark .service-status {
  background: #232323;
  color: #f7e017;
}
.dark .service-status.degraded {
  background: #3a2c0c;
  color: #e39c0c;
}
.dark .announcements {
  background: #232323;
  color: #f7e017;
}
.header-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}
.buttons-header {
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 10px;
}
.square {
  width: 48px;
  height: 48px;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid rgba(12,137,227,0.13);
  border-radius: 16px;
  cursor: pointer;
  transition: box-shadow 0.25s, transform 0.18s, background 0.25s, border 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(12,137,227,0.10);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
}
.square:hover {
  background: rgba(12, 137, 227, 0.13);
  box-shadow: 0 4px 24px rgba(12,137,227,0.18);
  transform: scale(1.10) rotate(-4deg);
  border: 1.5px solid #0c89e3;
}
.square:active {
  background: rgba(12, 137, 227, 0.18);
  transform: scale(0.96) rotate(2deg);
}
.menu-btn.square {
  margin-left: 8px;
}
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon {
  width: 28px;
  height: 28px;
  stroke: #0c89e3;
  transition: stroke 0.3s, filter 0.3s, transform 0.2s;
  filter: drop-shadow(0 1px 2px rgba(12,137,227,0.10));
}
.dark .icon {
  stroke: #f7e017;
  filter: drop-shadow(0 1px 4px rgba(247,224,23,0.15));
}
.square:active .icon {
  transform: scale(0.95) rotate(10deg);
}
.dark .header-logo {
  background-color: #1e1e1e;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
}
.dark .header-title {
  color: #ffffff;
}
.dark .header-background {
  background-color: #1e1e1e;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
}

/* Sidebar styles */
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 260px;
  height: 100vh;
  background: rgba(255,255,255,0.98);
  box-shadow: -2px 0 16px rgba(0,0,0,0.08);
  z-index: 2000;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  animation: sidebar-in 0.3s;
}
.dark .sidebar {
  background: #232323;
  color: #fff;
  box-shadow: -2px 0 16px rgba(0,0,0,0.18);
}
@keyframes sidebar-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.sidebar nav ul {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0 0;
}
.sidebar nav ul li {
  margin-bottom: 1.2rem;
}
.sidebar nav ul li a {
  color: inherit;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.sidebar nav ul li a:hover {
  color: #0c89e3;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  align-self: flex-end;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
  margin-bottom: 1rem;
}
.close-btn:hover {
  color: #0c89e3;
}
.sidebar-fade-enter-active, .sidebar-fade-leave-active {
  transition: opacity 0.2s;
}
.sidebar-fade-enter-from, .sidebar-fade-leave-to {
  opacity: 0;
}

/* Chat Button Styles */
.chat-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 18px 0 14px;
  min-width: 110px;
  height: 48px;
  background: rgba(255,255,255,0.18);
  border: 1.5px solid rgba(12,137,227,0.13);
  border-radius: 16px;
  cursor: pointer;
  transition: box-shadow 0.25s, transform 0.18s, background 0.25s, border 0.25s;
  box-shadow: 0 2px 12px rgba(12,137,227,0.10);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
}
.chat-btn .icon-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chat-btn .icon {
  width: 22px;
  height: 22px;
  stroke: #0c89e3;
  transition: stroke 0.3s, filter 0.3s, transform 0.2s;
  filter: drop-shadow(0 1px 2px rgba(12,137,227,0.10));
}
.chat-btn .chat-text {
  font-size: 1rem;
  background: linear-gradient(90deg, hsl(127, 93%, 42%), #0c89e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.chat-btn:hover {
  background: rgba(12, 137, 227, 0.13);
  box-shadow: 0 4px 24px rgba(12,137,227,0.18);
  border: 1.5px solid #0c89e3;
  transform: scale(1.10) rotate(-4deg);
}
.chat-btn:active {
  background: rgba(12, 137, 227, 0.18);
  transform: scale(0.96) rotate(2deg);
}
.dark .chat-btn .icon {
  stroke: #f7e017;
  filter: drop-shadow(0 1px 4px rgba(247,224,23,0.15));
}
.dark .chat-btn .chat-text {
  background: linear-gradient(90deg, #f7e017, #0c89e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
</style>

