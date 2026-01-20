<template>
  <div class="site-wrapper">
    <Header />

    <main class="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style>
/* 1. Grund-Layout: Flexbox sorgt dafür, dass der Footer unten bleibt */
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-main);
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px; /* Optional: Zentriert den Inhalt auf großen Screens */
  margin: 0 auto;
  padding: 80px 20px 40px 20px; /* Top-Padding, damit der Inhalt nicht unter dem Header klebt */
}

/* 2. Variablen Definitionen */
:root {
  --bg-primary: #ffffff;
  --text-main: #1f2937; /* neutral-800 */
}

/* Nuxt UI nutzt standardmäßig die Klasse .dark auf dem <html> Tag */
.dark {
  --bg-primary: #09090b; /* zinc-950 (Nuxt UI Standard) */
  --text-main: #f9fafb; /* neutral-50 */
}

/* 3. Globale Body Styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-main);
  /* Übergang für den Dark Mode Wechsel */
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Verhindert horizontales Scrollen bei Animationen */
html, body {
  overflow-x: hidden;
}
</style>