<template
>
  <div>
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <footer class="footer">
      <Footer />
    </footer>
  </div>
</template>
<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
</script>