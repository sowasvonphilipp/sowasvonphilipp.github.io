<template>
  <div class="container">
    <div class="page-title">
      <h1>Über Uns</h1>
    </div>
    <div class="ueber-uns-content">
      <p>
        DeepAI ist ein Hobby Projekt von Philipp S. mit dem Ziel, eine leistungsstarke und benutzerfreundliche KI-Plattform zu schaffen, die für alle zugänglich ist und keine Einschränkungen bei der Nutzung auferlegt. Wir glauben daran, dass KI-Technologie das Potenzial hat, das Leben der Menschen zu verbessern, und möchten sicherstellen, dass jeder die Möglichkeit hat, von den Vorteilen der KI zu profitieren.
        Aktuell ist DeepAI nur für Freunde oder Familienmitglieder der Server-Administratoren zugänglich. Wir arbeiten jedoch kontinuierlich daran, unsere Dienste zu verbessern und hoffen, in Zukunft eine breitere Öffentlichkeit zu erreichen.
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
}
.page-title {
  text-align: left;
  margin-top: 50px;
  margin-bottom: 2.5rem;
  color: #0c89e3;
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 1.1;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.page-title h1 {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}
.ueber-uns-content p {
  font-size: 1.15rem;
  color: #23272e;
  line-height: 1.7;
  margin: 0;
}
.dark .page-title {
  color: #f7e017;
}
.dark .ueber-uns-content p {
  color: #f5f5f5;
}
</style>

<script setup>
definePageMeta({
  title: 'Über Uns - DeepAI',
  meta: [
    {
      name: 'description',
      content: 'Erfahren Sie mehr über DeepAI, unser Hobby-Projekt und unsere Mission, KI für alle zugänglich zu machen.',
    },
  ],
})
</script>
<style scoped>
.über-uns-text {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2.5rem 2rem;
  background: rgba(255,255,255,0.85);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(34, 49, 63, 0.12);
  font-size: 1.18rem;
  color: #222b45;
  line-height: 1.7;
  border: 1px solid #e0e6ed;
}

.page-title h1 {
  background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
  padding-bottom: 0.5rem;
}

@media (max-width: 600px) {
  .über-uns-text {
    padding: 1.2rem 0.7rem;
    font-size: 1rem;
  }
  .page-title h1 {
    font-size: 2rem;
  }
}
</style>