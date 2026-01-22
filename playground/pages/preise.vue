<template>
  <div class="preise-container">
    <div class="page-title">
      <h1>Preise</h1>
    </div>
    <div class="content card">
      <p>
        <strong>DeepAI</strong> hat keinen festen Preis.<br>
        Unsere Dienste sind nicht für die öffentliche Nutzung gedacht, sondern als Hobby-Projekt und nur für Freunde bzw. Familienmitglieder der Server-Administratoren verfügbar.<br>
        Um DeepAI zu nutzen, benötigen Sie einen Aktivierungscode, der nur an ausgewählte Personen verteilt wird.<br>
        Für den Erhalt unseres Servers kosten Codes Geld. Bitte kontaktieren Sie den Server-Administrator für weitere Informationen.<br>
        Wenn Sie interessiert sind, auch eine KI wie DeepAI zu hosten, fragen Sie bitte eine andere KI.<br>
        <em>Danke für Ihr Verständnis!</em>
      </p>
    </div>
  </div>
</template>

<style scoped>
.preise-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  padding: 2rem 0;
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

.card {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px rgba(34, 60, 80, 0.15);
  padding: 2rem 2.5rem;
  max-width: 600px;
  width: 90%;
  font-size: 1.15rem;
  color: #222;
  line-height: 1.7;
  margin-bottom: 2rem;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(34, 60, 80, 0.22);
}

.card strong {
  color: #4b6cb7;
}

.card em {
  color: #182848;
  font-style: italic;
}
</style>

<script setup>
definePageMeta({
  title: 'Preise - DeepAI',
  meta: [
    {
      name: 'description',
      content: 'Erfahren Sie mehr über die Preisgestaltung von DeepAI und wie Sie unsere KI-Dienste optimal nutzen können.',
    },
  ],
})
</script>