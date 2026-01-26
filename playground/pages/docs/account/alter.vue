
<template>
<div class="alter-page">
  <div class="page-title">
    <h1>🪪 Altersnachweis & Informationen</h1>
    <p class="subtitle">Sicherer Zugang durch Altersüberprüfung</p>
  </div>

  <div class="info-section">
    <div class="info-card">
      <h2>Warum ist der Altersnachweis wichtig?</h2>
      <p>Um die Sicherheit und den Jugendschutz auf der DeepAI Plattform zu gewährleisten, ist eine Altersüberprüfung erforderlich. Nur so können wir altersgerechte Inhalte und Funktionen bereitstellen und gesetzliche Vorgaben einhalten.</p>
    </div>

    <div class="info-card">
      <h2>Wie funktioniert die Altersprüfung?</h2>
      <ul class="features-list">
        <li>🔍 <b>Automatische Einstufung:</b> Wenn kein Alter angegeben wird, erfolgt automatisch die Einstufung als unter 18 Jahre. Dadurch werden Schutzmechanismen wie der Kindermodus aktiviert.</li>
        <li>🧒 <b>Kindermodus:</b> Für alle Nutzer unter 18 Jahren wird automatisch der <a href="/docs/account/kindermodus">Kindermodus</a> aktiviert. Dieser bietet zusätzliche Schutzmechanismen und Einschränkungen für Minderjährige.</li>
        <li>🪪 <b>Ausweisprüfung:</b> Eine Verifizierung per Ausweis ist aktuell <b>nicht</b> möglich. In Zukunft wird eine sichere Altersverifikation per Ausweis eingeführt, um den Zugang zu erweiterten Funktionen zu ermöglichen.</li>
        <li>🔒 <b>Datenschutz & Speicherung:</b> Das Alter wird aktuell <b>nicht</b> in der Datenbank gespeichert, sondern ist nur temporär im System hinterlegt und dient ausschließlich der Zugangskontrolle. Es erfolgt keine dauerhafte Speicherung oder Weitergabe der Altersdaten.</li>
        <li>⚠️ <b>Keine manuelle Änderung:</b> Es gibt derzeit keine Möglichkeit, das Alter nachträglich zu ändern – auch nicht durch Administratoren.</li>
      </ul>
      <p>Alle Nutzer ohne Altersnachweis oder mit unklarem Alter werden ausnahmslos als minderjährig behandelt. Dies dient dem Schutz der Community und der Einhaltung gesetzlicher Vorgaben.</p>
    </div>

    <div class="info-card">
      <h2>Was passiert ohne Altersnachweis?</h2>
      <ul class="blocked-list">
        <li>🚫 Kein Zugang zu nicht altersgerechten Funktionen</li>
        <li>🚫 Auch Nutzer über 18 erhalten keinen vollen Zugriff ohne Altersnachweis</li>
        <li>🚫 Keine Möglichkeit, das Alter nachträglich zu ändern</li>
        <li>🚫 Keine Ausweiskontrolle durch Administratoren möglich</li>
      </ul>
      <p>Diese Maßnahmen dienen dem Schutz aller Nutzer und der Einhaltung gesetzlicher Vorgaben.</p>
    </div>

    <div class="info-card">
      <h2>Geplante Verbesserungen</h2>
      <ul>
        <li>🪪 Einführung einer sicheren Ausweisverifizierung</li>
        <li>🔄 Möglichkeit zur Aktualisierung des Alters durch Administratoren</li>
        <li>🔔 Benachrichtigungen bei erfolgreicher Altersprüfung</li>
        <li>📜 Transparente Speicherung und Löschung der Altersdaten gemäß DSGVO</li>
      </ul>
      <p>Wir arbeiten kontinuierlich daran, die Altersprüfung sicherer und komfortabler zu gestalten.</p>
    </div>

    <div class="info-card">
      <h2>FAQ – Häufige Fragen</h2>
      <ul class="faq-list">
        <li><b>Wie kann ich mein Alter angeben?</b><br>Aktuell ist dies nicht möglich. In Zukunft wird eine Verifizierung per Ausweis angeboten.</li>
        <li><b>Kann ich mein Alter nachträglich ändern?</b><br>Derzeit nicht. Nach Einführung der Ausweisprüfung wird dies über einen Administrator möglich sein.</li>
        <li><b>Wer sieht mein Alter?</b><br>Das Alter wird nicht gespeichert und ist nur für die Systemlogik relevant.</li>
        <li><b>Warum habe ich keinen vollen Zugriff?</b><br>Ohne Altersnachweis werden alle Nutzer als unter 18 behandelt und erhalten eingeschränkten Zugriff.</li>
      </ul>
    </div>
  </div>
</div>
</template>

<style scoped>
.alter-page {
  background: linear-gradient(120deg, #e3f2fd 0%, #f7e017 100%);
  border-radius: 24px;
  box-shadow: 0 4px 24px #0c89e322;
  padding: 32px 18px;
  max-width: 900px;
  margin: 32px auto;
}
.page-title {
  margin-bottom: 24px;
  text-align: center;
}
.subtitle {
  font-size: 1.18rem;
  color: #0c89e3;
  font-weight: 700;
  margin-top: 6px;
}
  .info-section {
    display: block;
    width: 100%;
  }
  .info-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 12px #0c89e322;
    padding: 24px 20px;
    width: 100%;
    max-width: 700px;
    margin: 0 auto 18px auto;
    min-width: 0;
    box-sizing: border-box;
    display: block;
  }
.info-card h2 {
  color: #0c89e3;
  font-size: 1.18rem;
  font-weight: 900;
  margin-bottom: 10px;
}
.features-list, .blocked-list, .faq-list {
  margin: 0 0 0 12px;
  padding: 0;
  list-style: none;
}
.features-list li, .blocked-list li, .faq-list li {
  font-size: 1.08rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

</style>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 24px;
}
</style>