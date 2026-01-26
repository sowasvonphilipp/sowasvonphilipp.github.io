<template>
  <div class="release-hero">
    <div class="release-hero-bg"></div>
    <div class="release-hero-content glass">
      <h1 class="release-title">🚀 DeepAI Release</h1>
      <h2 class="release-subtitle">Erlebe den offiziellen DeepAI Launch!</h2>
      <p class="release-info">Alle wichtigen Infos zum Start und zur Entwicklung von DeepAI auf einen Blick.</p>
      <div class="release-countdown-card glass">
        <div class="countdown-label">
          <span class="icon-calendar">📅</span>
          <span>DeepAI Release: <strong>01.03.2026, 20:00 Uhr</strong></span>
        </div>
        <div class="countdown-timer-row animated">
          <div class="countdown-timer-item">
            <span class="countdown-timer-value">{{ weeks }}</span>
            <span class="countdown-timer-unit">Wochen</span>
          </div>
          <div class="countdown-timer-item">
            <span class="countdown-timer-value">{{ days }}</span>
            <span class="countdown-timer-unit">Tage</span>
          </div>
          <div class="countdown-timer-item">
            <span class="countdown-timer-value">{{ hours }}</span>
            <span class="countdown-timer-unit">Stunden</span>
          </div>
          <div class="countdown-timer-item">
            <span class="countdown-timer-value">{{ minutes }}</span>
            <span class="countdown-timer-unit">Minuten</span>
          </div>
          <div class="countdown-timer-item">
            <span class="countdown-timer-value">{{ seconds }}</span>
            <span class="countdown-timer-unit">Sekunden</span>
          </div>
        </div>
        <div class="countdown-progress-bar">
          <div class="countdown-progress" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="countdown-emoji">⏳</div>
      </div>
    </div>
  </div>

  <div class="timeline-section">
    <h2 class="timeline-title">DeepAI Entwicklungs-Timeline</h2>
    <div class="timeline-stepper">
      <div class="timeline-step" :class="{ active: progressPercent >= 0 }">
        <div class="timeline-dot done">1</div>
        <div class="timeline-content">
          <div class="timeline-label">Planung</div>
          <div class="timeline-date">01.01.2026 - 20.01.2026</div>
          <div class="timeline-desc">Definition der Funktionen, Architekturplanung und Projektplan.</div>
        </div>
      </div>
      <div class="timeline-step" :class="{ active: progressPercent >= 33 }">
        <div class="timeline-dot done">2</div>
        <div class="timeline-content">
          <div class="timeline-label">Entwicklung</div>
          <div class="timeline-date">21.01.2026 - 22.02.2026</div>
          <div class="timeline-desc">Implementierung der Kernfunktionen, UI und Feature-Integration.</div>
        </div>
      </div>
      <div class="timeline-step" :class="{ active: progressPercent >= 66 }">
        <div class="timeline-dot" :class="{ done: progressPercent >= 66 }">3</div>
        <div class="timeline-content">
          <div class="timeline-label">Testen & Release</div>
          <div class="timeline-date">23.02.2026 - 01.03.2026</div>
          <div class="timeline-desc">Intensive Tests, Bugfixes und finale Veröffentlichung.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="feature-section">
    <h2 class="feature-title">Was erwartet dich mit DeepAI?</h2>
    <div class="feature-carousel">
      <div class="feature-card">
        <span class="feature-icon">🤖</span>
        <div class="feature-head">Intelligente Antworten</div>
        <div class="feature-desc">DeepAI liefert dir smarte, kontextbezogene Antworten auf deine Fragen – blitzschnell und zuverlässig.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🎨</span>
        <div class="feature-head">Bild- & Text-Kreativität</div>
        <div class="feature-desc">Erstelle kreative Texte, Bilder und mehr – alles mit der Power von KI.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">🔒</span>
        <div class="feature-head">Datenschutz & Sicherheit</div>
        <div class="feature-desc">Deine Daten sind bei uns sicher. DeepAI setzt auf modernste Verschlüsselung und Datenschutz.</div>
      </div>
      <div class="feature-card">
        <span class="feature-icon">⚡</span>
        <div class="feature-head">Schnelle Entwicklung</div>
        <div class="feature-desc">Regelmäßige Updates und neue Features – DeepAI bleibt immer am Puls der Zeit.</div>
      </div>
    </div>
  </div>

  <div class="faq-section">
    <h2 class="faq-title">Häufige Fragen (FAQ)</h2>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q">Wann kann ich DeepAI nutzen?</div>
        <div class="faq-a">Ab dem 1. März 2026 um 20 Uhr ist DeepAI für Freunde und Bekannte verfügbar.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Wird DeepAI kostenlos sein?</div>
        <div class="faq-a">Es werden Aktivierungscodes benötigt, um DeepAI nutzen zu können. Weitere Details folgen.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Wie kann ich Feedback geben?</div>
        <div class="faq-a">Nach dem Release findest du im Nutzerbereich eine Feedback-Funktion. Wir freuen uns auf deine Meinung!</div>
      </div>
      <div class="faq-item">
        <div class="faq-q">Wie sicher sind meine Daten?</div>
        <div class="faq-a">Deine Daten werden nach höchsten Standards verschlüsselt und niemals an Dritte weitergegeben.</div>
      </div>
    </div>
  </div>

 
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const weeks = ref(0);

const releaseDate = new Date('2026-03-01T20:00:00');
const startDate = new Date('2026-01-01T00:00:00');

let timer: number | undefined;

function updateCountdown() {
  const now = new Date();
  const diff = releaseDate.getTime() - now.getTime();

  if (diff > 0) {
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    weeks.value = Math.floor(totalDays / 7);
    days.value = totalDays % 7;
    hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((diff / (1000 * 60)) % 60);
    seconds.value = Math.floor((diff / 1000) % 60);
  } else {
    weeks.value = 0;
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    if (timer) clearInterval(timer);
  }
}

const progressPercent = computed(() => {
  const now = new Date();
  const total = releaseDate.getTime() - startDate.getTime();
  const done = Math.max(0, Math.min(releaseDate.getTime() - now.getTime(), total));
  return 100 - Math.round((done / total) * 100);
});

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

import { ref } from 'vue';

const newsletterEmail = ref('');
const newsletterSuccess = ref(false);
function onNewsletterSubmit() {
  newsletterSuccess.value = true;
  setTimeout(() => newsletterSuccess.value = false, 4000);
  newsletterEmail.value = '';
}
</script>

<style scoped>
body {
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
}

.release-hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.release-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  opacity: 0.18;
  z-index: 0;
}
.release-hero-content.glass {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 2rem 2rem 2rem;
  background: rgba(255,255,255,0.7);
  border-radius: 2rem;
  box-shadow: 0 8px 32px #0c89e322, 0 2px 12px #0c89e344;
  text-align: center;
  backdrop-filter: blur(16px) saturate(1.2);
  border: 1.5px solid rgba(255,255,255,0.25);
  margin-top: 50px;
}
.release-title {
  font-size: 2.7rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #0c89e322;
}
.release-subtitle {
  font-size: 1.35rem;
  color: #23272e;
  margin-bottom: 1.2rem;
  font-weight: 700;
}
.release-info {
  color: #444;
  font-size: 1.08rem;
  margin-bottom: 2.2rem;
}
.release-countdown-card.glass {
  background: rgba(255,255,255,0.85);
  border-radius: 1.5rem;
  box-shadow: 0 4px 18px #0c89e344;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin: 0 auto;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(10px) saturate(1.1);
  border: 1.5px solid rgba(12,137,227,0.12);
  position: relative;
}
.countdown-label {
  font-size: 1.1rem;
  color: #23272e;
  font-weight: 700;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.icon-calendar {
  font-size: 1.3rem;
}
.countdown-timer-row {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 1.2rem;
  animation: popIn 1.2s cubic-bezier(.4,2,.6,1);
}
.countdown-timer-row.animated .countdown-timer-item {
  animation: pulse 1.2s infinite alternate;
}
@keyframes pulse {
  0% { box-shadow: 0 2px 8px #0c89e322; }
  100% { box-shadow: 0 6px 24px #0c89e344; }
}
@keyframes popIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
.countdown-timer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px #0c89e322;
  padding: 0.7rem 1.1rem;
  min-width: 70px;
  transition: box-shadow 0.2s;
  margin-top: 50px;
}
.countdown-timer-value {
  font-size: 2.1rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 0.2rem;
  text-shadow: 0 2px 8px #0c89e322;
}
.countdown-timer-unit {
  font-size: 1rem;
  color: #23272e;
  font-weight: 700;
}
.countdown-progress-bar {
  width: 100%;
  height: 12px;
  background: #e3eafc;
  border-radius: 8px;
  margin-top: 0.8rem;
  overflow: hidden;
  box-shadow: 0 1px 4px #0c89e322;
}
.countdown-progress {
  height: 100%;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  border-radius: 8px;
  transition: width 0.5s cubic-bezier(.4,2,.6,1);
}
.countdown-emoji {
  font-size: 2.2rem;
  margin-top: 0.7rem;
  animation: bounce 1.2s infinite alternate;
}
@keyframes bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-8px); }
}

.timeline-section {
  margin: 3rem auto 2rem auto;
  max-width: 800px;
  background: rgba(255,255,255,0.85);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #0c89e322;
  padding: 2.5rem 2rem 2rem 2rem;
  backdrop-filter: blur(8px) saturate(1.1);
  border: 1.5px solid rgba(12,137,227,0.10);
}
.timeline-title {
  text-align: center;
  font-size: 2rem;
  color: #0c89e3;
  font-weight: 900;
  margin-bottom: 2.2rem;
  letter-spacing: 1px;
}
.timeline-stepper {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  position: relative;
}
.timeline-step {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  position: relative;
}
.timeline-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 1.2rem;
  top: 2.2rem;
  width: 4px;
  height: calc(100% - 2.2rem);
  background: linear-gradient(180deg, #0c89e3 0%, #f7e017 100%);
  border-radius: 2px;
  opacity: 0.18;
  z-index: 0;
}
.timeline-dot {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: #e3eafc;
  color: #0c89e3;
  font-weight: 900;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0c89e322;
  border: 2.5px solid #0c89e3;
  z-index: 1;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
.timeline-dot.done, .timeline-step.active .timeline-dot {
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  border: 2.5px solid #f7e017;
}
.timeline-content {
  flex: 1;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px #0c89e322;
  padding: 1.1rem 1.5rem;
  margin-left: 0.2rem;
  position: relative;
}
.timeline-label {
  font-size: 1.15rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 0.2rem;
}
.timeline-date {
  font-size: 0.98rem;
  color: #888;
  margin-bottom: 0.5rem;
}
.timeline-desc {
  font-size: 1.05rem;
  color: #23272e;
  line-height: 1.5;
}
.feature-section {
  margin: 3rem auto 2rem auto;
  max-width: 900px;
  text-align: center;
}
.feature-title {
  font-size: 2rem;
  color: #0c89e3;
  font-weight: 900;
  margin-bottom: 2rem;
}
.feature-carousel {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.feature-card {
  background: rgba(255,255,255,0.85);
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px #0c89e322;
  padding: 1.5rem 1.2rem;
  min-width: 220px;
  max-width: 260px;
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.18s, box-shadow 0.18s;
}
.feature-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 32px #0c89e344;
}
.feature-icon {
  font-size: 2.2rem;
  margin-bottom: 0.7rem;
}
.feature-head {
  font-size: 1.15rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 0.3rem;
}
.feature-desc {
  font-size: 1.02rem;
  color: #23272e;
}

.faq-section {
  margin: 3rem auto 2rem auto;
  max-width: 700px;
  background: rgba(255,255,255,0.85);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #0c89e322;
  padding: 2.5rem 2rem 2rem 2rem;
  backdrop-filter: blur(8px) saturate(1.1);
  border: 1.5px solid rgba(12,137,227,0.10);
}
.faq-title {
  text-align: center;
  font-size: 2rem;
  color: #0c89e3;
  font-weight: 900;
  margin-bottom: 2.2rem;
  letter-spacing: 1px;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.faq-item {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px #0c89e322;
  padding: 1.1rem 1.5rem;
  margin-left: 0.2rem;
  position: relative;
}
.faq-q {
  font-size: 1.08rem;
  font-weight: 900;
  color: #0c89e3;
  margin-bottom: 0.2rem;
}
.faq-a {
  font-size: 1.02rem;
  color: #23272e;
}

.newsletter-section.glass {
  margin: 3rem auto 2rem auto;
  max-width: 600px;
  background: rgba(255,255,255,0.85);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #0c89e322;
  padding: 2.5rem 2rem 2rem 2rem;
  text-align: center;
  backdrop-filter: blur(8px) saturate(1.1);
  border: 1.5px solid rgba(12,137,227,0.10);
}
.newsletter-title {
  font-size: 2rem;
  color: #0c89e3;
  font-weight: 900;
  margin-bottom: 1rem;
}
.newsletter-desc {
  color: #444;
  font-size: 1.08rem;
  margin-bottom: 1.5rem;
}
.newsletter-form {
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  margin-bottom: 1rem;
}
.newsletter-input {
  padding: 0.7rem 1.1rem;
  border-radius: 0.7rem;
  border: 1.5px solid #0c89e3;
  font-size: 1rem;
  min-width: 180px;
}
.newsletter-btn {
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #23272e;
  font-weight: 900;
  border: none;
  border-radius: 0.7rem;
  padding: 0.7rem 1.3rem;
  font-size: 1.08rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #0c89e322;
  transition: background 0.18s, color 0.18s, transform 0.18s;
}
.newsletter-btn:hover {
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
  color: #fff;
  transform: scale(1.04);
}
.newsletter-success {
  color: #22c55e;
  font-weight: 900;
  margin-top: 0.7rem;
  font-size: 1.1rem;
}
@media (max-width: 700px) {
  .release-hero-content.glass, .timeline-section {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  }
  .release-title {
    font-size: 2rem;
  }
  .timeline-content {
    padding: 0.7rem 0.7rem;
  }
}
</style>