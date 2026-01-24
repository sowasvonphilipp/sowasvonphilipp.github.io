export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  myModule: {},
  plugins: [
    { src: '~/plugins/firebase.client.ts', mode: 'client' }
  ]
})
