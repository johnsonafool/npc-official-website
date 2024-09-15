// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    'radix-vue/nuxt',
    'unplugin-icons/nuxt',
  ],
  css: [
    'assets/reset.css',
    'assets/cubic-11.css',
  ],
})
