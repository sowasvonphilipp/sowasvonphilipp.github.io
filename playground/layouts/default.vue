<template
>
  <div>
    <Header />
    <main :class="['main-content', { 'blurred': loadingStatus }]">
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



import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const websiteStatus = ref(null);
// loadingStatus removed
let statusInterval = null;


// Fetch status ASAP before mount
fetchStatus();

async function fetchStatus() {
  const db = getFirestore();
  const docRef = doc(db, 'important/website');
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      websiteStatus.value = docSnap.data()['website status'];
      // Redirect immediately if status is set
      if (websiteStatus.value === "1" && route.path !== '/maintenance') {
        router.push('/maintenance');
      } else if (websiteStatus.value === "2" && route.path !== '/error') {
        router.push('/error');
      }
    } else {
    }
  } catch {
  }
}

onMounted(() => {
  statusInterval = setInterval(fetchStatus, 2000); // Poll every 2 seconds for instant redirect
});

onUnmounted(() => {
  if (statusInterval) clearInterval(statusInterval);
});

watch(websiteStatus, (status) => {
  if (status === "1" && route.path !== '/maintenance') {
    router.push('/maintenance');
  } else if (status === "2" && route.path !== '/error') {
    router.push('/error');
  }
}, { immediate: true });

// Lock user on error/maintenance page if status is active
if (process.client) {
  router.beforeEach((to, from, next) => {
    const status = websiteStatus.value;
    if ((status === "1" && from.path === '/maintenance') || (status === "2" && from.path === '/error')) {
      if (to.path !== from.path) {
        // Prevent leaving
        return next(false);
      }
    }
    next();
  });
}

</script>

