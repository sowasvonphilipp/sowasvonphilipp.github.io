<template>
  <div :class="['page-bg', $colorMode && $colorMode.value === 'dark' ? 'dark' : 'light']">
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="main-title animated-fadein">Willkommen zur DeepAI!</h1>
        <p class="main-subtitle animated-slidein">Nutze AI ohne Limits. Schnell, sicher, überall.</p>
        <NuxtLink to="/account" class="cta-btn animated-bounce">Jetzt kostenlos starten</NuxtLink>
      </div>
    </section>

    <div class="vorteile-text">
      <h2 class="vorteile-title animated-gradient">Entdecke die Vorteile von DeepAI</h2>
      <div class="vorteile-grid">
        <div class="vorteil-item animated-fadein" v-for="(v, i) in vorteile" :key="i" :style="{animationDelay: (0.1 + i*0.08) + 's'}">
          <span class="vorteil-icon">{{ v.icon }}</span>
          <div class="vorteil-content"><strong>{{ v.title }}</strong> {{ v.text }}</div>
        </div>
      </div>
    </div>

    <div class="vergleich-ai">
      <h2 class="vergleich-title animated-gradient">Warum DeepAI?</h2>
      <div class="vergleich-table-wrapper">
        <table class="vergleichstabelle">
          <thead>
            <tr>
              <th>Feature</th>
              <th><span class="ai-header"><svg xmlns='http://www.w3.org/2000/svg' class='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor'><circle cx='12' cy='12' r='10' stroke-width='2' /><path d='M8 12l2 2 4-4' stroke-width='2' /></svg> DeepAI</span></th>
              <th><span class="ai-header"><svg xmlns='http://www.w3.org/2000/svg' class='icon' viewBox='0 0 24 24' fill='none' stroke='currentColor'><circle cx='12' cy='12' r='10' stroke-width='2' /><path d='M15 9l-6 6' stroke-width='2' /></svg> Andere AI</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="feature-icon">🚀</span> Schneller Zugriff</td>
              <td class="yes"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg> Ja</td>
              <td class="no"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" /></svg> Teilweise</td>
            </tr>
            <tr>
              <td><span class="feature-icon">💡</span> Speziell Angepasst</td>
              <td class="yes"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg> Ja</td>
              <td class="no"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" /></svg> Nein</td>
            </tr>
            <tr>
              <td><span class="feature-icon">🔒</span> Datenschutz</td>
              <td class="yes"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg> Sicherer Datenumgang</td>
              <td class="no"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" /></svg> Verkauf an dritte</td>
            </tr>
            <tr>
              <td><span class="feature-icon">⚙️</span>Viele Updates</td>
              <td class="yes"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg> Ja</td>
              <td class="no"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" /></svg> Nein</td>
            </tr>
            <tr>
              <td><span class="feature-icon">🌐</span> Zugänglich überall</td>
              <td class="yes"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg> Ja</td>
              <td class="no"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" /></svg> Nein</td>
            </tr>
            <tr>
              <td><span class="feature-icon">💸</span> Preis</td>
              <td class="yes"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg> Fair</td>
              <td class="no"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" /></svg> Teuer</td>
            </tr>
            <tr>
              <td><span class="feature-icon">🧑‍💻</span> Support</td>
              <td class="yes"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg> Schnell</td>
              <td class="no"><svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 8.586l-4.293-4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z" clip-rule="evenodd" /></svg> Langsam</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="Limits-section">
      <div class="limits-frame animated-pop">
        <h2 class="vergleich-title">Keine Limits mit DeepAI*</h2>
        <p class="sub-title limits-visible">* Illegale oder rechtswidrige Inhalte müssen laut Gesetz blockiert werden.</p>
        <h3 class="sub-title limits-visible">Erlebe die Freiheit, die DeepAI bietet, ohne Einschränkungen.</h3>
        <h3 class="subtitle limits-visible">Unendlich viele Anfragen und Bilder</h3>
        <div class="nolimit-badge">NO LIMITS</div>
      </div>
    </div>

    <div class="starte-now-section">
      <div class="starte-frame animated-pop">
        <h2 class="vergleich-title">Starte jetzt mit DeepAI!</h2>
        <p class="sub-title starte-visible">Erstelle jetzt deinen Account und fange an mit DeepAI.</p>
        <NuxtLink to="/account" class="start-btn animated-bounce">Jetzt Registrieren</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const vorteile = [
  { icon: '🚀', title: 'Schneller Zugriff:', text: 'Greife per Webapp oder der Website auf unsere AI zu.' },
  { icon: '💡', title: 'Speziel Angepasst:', text: 'Unsere KI-Modelle sind speziell auf deine Bedürfnisse zugeschnitten.' },
  { icon: '🔒', title: 'Datenschutz:', text: 'Deine Daten werden sicher verarbeitet und nicht weiterverkauft.' },
  { icon: '⚙️', title: 'Support:', text: 'Erhalte schnellen und zuverlässigen Support bei Fragen und Problemen.' },
  { icon: '🌐', title: 'Zugänglich überall:', text: 'Nutze DeepAI von jedem Gerät mit Internetzugang.' },
];
</script>

<style scoped>
:root {
  --deepai-blue: #0c89e3;
  --deepai-yellow: #f7e017;
  --deepai-bg-light: #fff;
  --deepai-bg-dark: #181c20;
  --deepai-text-light: #222;
  --deepai-text-dark: #f5f5f5;
  --deepai-card-light: #fff;
  --deepai-card-dark: #23272e;
  --deepai-border-light: #e3f2fd;
  --deepai-border-dark: #23272e;
}

:root {
  --deepai-bg: var(--deepai-bg-light);
  --deepai-text: var(--deepai-text-light);
  --deepai-card: var(--deepai-card-light);
  --deepai-border: var(--deepai-border-light);
}

.dark {
  --deepai-bg: var(--deepai-bg-dark);
  --deepai-text: var(--deepai-text-dark);
  --deepai-card: var(--deepai-card-dark);
  --deepai-border: var(--deepai-border-dark);
}

.page-bg {
  min-height: 100vh;
  width: 100vw;
  background: var(--deepai-bg);
  transition: background 0.5s;
}
.page-bg.light {
  --deepai-bg: #fff;
}
.page-bg.dark {
  --deepai-bg: #181c20;
}

.hero-section, .Limits-section, .starte-now-section {
  background: transparent;
}

.animated-fadein {
  opacity: 0;
  animation: fadeIn 1.2s forwards;
}
.animated-slidein {
  opacity: 0;
  animation: slideIn 1.2s forwards;
}
.animated-bounce {
  animation: bounceIn 1.1s;
}
.animated-gradient {
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 2.5s infinite alternate;
}
.animated-pop {
  animation: popIn 0.9s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0.5; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  80% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}
.cta-btn, .start-btn {
  display: inline-block;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  font-weight: 800;
  font-size: 1.15rem;
  padding: 15px 44px;
  border-radius: 32px;
  box-shadow: 0 4px 24px rgba(12,137,227,0.13);
  text-decoration: none;
  margin: 28px 0 24px 0;
  transition: transform 0.18s, box-shadow 0.18s, background 0.18s, filter 0.18s;
  letter-spacing: 0.04em;
  filter: brightness(1);
}
.cta-btn:hover, .start-btn:hover {
  transform: scale(1.09) rotate(-1deg);
  box-shadow: 0 8px 32px rgba(12,137,227,0.18);
  background: linear-gradient(90deg, #f7e017 0%, #0c89e3 100%);
  filter: brightness(1.08) drop-shadow(0 2px 8px #0c89e3aa);
}
.nolimit-badge {
  display: inline-block;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  font-weight: 900;
  font-size: 1.1rem;
  padding: 8px 28px;
  border-radius: 22px;
  margin: 18px 0 18px 32px;
  letter-spacing: 0.08em;
  box-shadow: 0 2px 12px #0c89e355;
  animation: fadeIn 1.2s;
}
.limits-frame, .starte-frame {
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  padding: 2px;
  border-radius: 28px;
  box-shadow: 0 4px 32px rgba(12,137,227,0.13);
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.limits-frame > *, .starte-frame > * {
  background: var(--deepai-card, #fff);
  color: var(--deepai-text, #222);
  border-radius: 26px;
  margin: 0;
  padding: 0 0 0 0;
}
.limits-frame h2,
.limits-frame .sub-title,
.limits-frame .subtitle,
.starte-frame h2,
.starte-frame .sub-title {
  background: none;
  -webkit-background-clip: unset;
  color: var(--deepai-text, #0c89e3);
  margin: 0;
  padding: 18px 32px 0 32px;
}
.limits-frame .subtitle {
  color: #f7b017;
  font-weight: 700;
  padding-bottom: 18px;
}
.limits-visible, .starte-visible {
  color: var(--deepai-text, #222) !important;
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
}
.hero-section {
  position: relative;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 40px;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  opacity: 0.13;
  z-index: 1;
  pointer-events: none;
  animation: heroFade 2.5s;
}
@keyframes heroFade {
  from { opacity: 0; }
  to { opacity: 0.13; }
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
}
.main-title {
  font-size: 2.7rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  color: #0c89e3;
  margin-bottom: 12px;
  text-shadow: 0 2px 16px #0c89e355;
  animation: fadeIn 1.5s;
}
.main-subtitle {
  font-size: 1.3rem;
  color: #222;
  margin-bottom: 28px;
  font-weight: 500;
  animation: fadeIn 2s;
}
.vorteile-text {
  margin-top: 40px;
  text-align: center;
}
.vorteile-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  margin-bottom: 18px;
}
.vorteile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  margin-top: 24px;
  justify-items: stretch;
}
.vorteil-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fff;
  border-radius: 18px;
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 4px 24px rgba(12,137,227,0.10);
  padding: 28px 22px;
  font-size: 1.08rem;
  color: #222;
  transition: transform 0.18s, box-shadow 0.18s, border 0.18s;
  max-width: 370px;
  margin: 0 auto;
  border-image: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%) 1;
}
.vorteil-item:hover {
  transform: translateY(-4px) scale(1.045);
  box-shadow: 0 8px 32px rgba(12,137,227,0.18);
  border: 2px solid #0c89e3;
}
.vorteil-icon {
  font-size: 2.1rem;
  flex-shrink: 0;
  margin-top: 2px;
  filter: drop-shadow(0 2px 4px #0c89e3aa);
}
.vorteil-content {
  text-align: left;
}
.vergleich-ai {
  margin-top: 60px;
  text-align: center;
}
.vergleich-title {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  margin-bottom: 18px;
}
.vergleich-table-wrapper {
  overflow-x: auto;
  margin: 0 auto;
  max-width: 900px;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(12,137,227,0.10);
  background: linear-gradient(90deg, #e3f2fd 0%, #f5f5f5 100%);
}
.vergleichstabelle {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1.08rem;
  background: transparent;
}
.vergleichstabelle th, .vergleichstabelle td {
  padding: 16px 10px;
  text-align: center;
}
.vergleichstabelle th {
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.vergleichstabelle tbody tr {
  transition: background 0.18s;
}
.vergleichstabelle tbody tr:hover {
  background: #e3f2fd;
}
.yes {
  color: #0c89e3;
  font-weight: 700;
}
.no {
  color: #e01717;
  font-weight: 700;
}
.icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: middle;
  margin-right: 6px;
  margin-bottom: 2px;
}
.feature-icon {
  font-size: 1.3em;
  margin-right: 6px;
}
.ai-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
@media (max-width: 600px) {
  .limits-frame h2, .limits-frame .sub-title, .limits-frame .subtitle,
  .starte-frame h2, .starte-frame .sub-title {
    padding: 12px 10px 0 10px;
  }
}
@media (max-width: 600px) {
  .vergleich-table-wrapper {
    padding: 8px 2px;
  }
  .vergleichstabelle th, .vergleichstabelle td {
    padding: 10px 4px;
    font-size: 0.98rem;
  }
}

.Limits-section {
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 32px;
}
.limits-frame {
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  padding: 2px;
  border-radius: 28px;
  box-shadow: 0 4px 32px rgba(12,137,227,0.13);
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.limits-frame > * {
  background: #fff;
  border-radius: 26px;
  margin: 0;
  padding: 0 0 0 0;
}
.limits-frame h2,
.limits-frame .sub-title,
.limits-frame .subtitle {
  background: none;
  -webkit-background-clip: unset;
  color: #0c89e3;
  margin: 0;
  padding: 18px 32px 0 32px;
}
.limits-frame .subtitle {
  color: #f7b017;
  font-weight: 700;
  padding-bottom: 18px;
}
.nolimit-badge {
  display: inline-block;
  background: linear-gradient(90deg, #0c89e3 0%, #f7e017 100%);
  color: #fff;
  font-weight: 900;
  font-size: 1.1rem;
  padding: 8px 28px;
  border-radius: 22px;
  margin: 18px 0 18px 32px;
  letter-spacing: 0.08em;
  box-shadow: 0 2px 12px #0c89e355;
  animation: fadeIn 1.2s;
}
.starte-now-section {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}
.starte-frame {
  background: linear-gradient(120deg, #0c89e3 0%, #f7e017 100%);
  padding: 2px;
  border-radius: 28px;
  box-shadow: 0 4px 32px rgba(12,137,227,0.13);
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.starte-frame > * {
  background: #fff;
  border-radius: 26px;
  margin: 0;
  padding: 0 0 0 0;
}
.starte-frame h2,
.starte-frame .sub-title {
  background: none;
  -webkit-background-clip: unset;
  color: #0c89e3;
  margin: 0;
  padding: 18px 32px 0 32px;
}
</style>