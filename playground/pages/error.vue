<template>
  <div class="error-hero">
    <div class="error-hero-bg"></div>
    <div class="error-hero-content glass">
      <div class="error-icon">🚨</div>
      <h1 class="error-title">Website nicht verfügbar</h1>
      <h3 class="error-subtitle">Die Website wurde von System Administratoren vorübergehend deaktiviert.</h3>
      <p class="error-desc">
        Ein schwerwiegender Fehler ist aufgetreten. Wir arbeiten mit Hochdruck an einer Lösung und bitten um Ihr Verständnis. Bitte versuchen Sie es später erneut oder kontaktieren Sie unseren Support für weitere Informationen.
      </p>
      <a href="https://deepai.instatus.com/" target="_blank" rel="noopener noreferrer" class="error-btn">
        Status prüfen
      </a>
    </div>
  </div>
</template>

<style scoped>
body {
  background: linear-gradient(120deg, #ef4444 0%, #f7e017 100%);
}
.error-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, #ef4444 0%, #f7e017 100%);
  opacity: 0.18;
  z-index: 0;
}
.error-hero-content.glass {
  position: relative;
  z-index: 1;
  max-width: 540px;
  margin: 0 auto;
  padding: 2.5rem 2rem 2rem 2rem;
  background: rgba(255,255,255,0.85);
  border-radius: 2rem;
  box-shadow: 0 8px 32px #ef444422, 0 2px 12px #f7e01744;
  text-align: center;
  backdrop-filter: blur(16px) saturate(1.2);
  border: 1.5px solid rgba(255,255,255,0.25);
}
.error-icon {
  font-size: 3.2rem;
  margin-bottom: 1.2rem;
  animation: shake 1.2s infinite alternate;
}
@keyframes shake {
  0% { transform: rotate(-6deg); }
  100% { transform: rotate(6deg); }
}
.error-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ef4444;
  margin-bottom: 0.7rem;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #ef444422;
}
.error-subtitle {
  font-size: 1.15rem;
  color: #23272e;
  margin-bottom: 1.2rem;
  font-weight: 700;
}
.error-desc {
  color: #444;
  font-size: 1.08rem;
  margin-bottom: 2.2rem;
}
.error-btn {
  display: inline-block;
  background: linear-gradient(90deg, #ef4444 0%, #f7e017 100%);
  color: #23272e;
  font-weight: 900;
  border: none;
  border-radius: 1rem;
  padding: 0.9rem 2.2rem;
  font-size: 1.15rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #ef444422;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  text-decoration: none;
}
.error-btn:hover {
  background: linear-gradient(90deg, #f7e017 0%, #ef4444 100%);
  color: #fff;
  transform: scale(1.04);
}
@media (max-width: 600px) {
  .error-hero-content.glass {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  }
  .error-title {
    font-size: 1.5rem;
  }
}
</style>