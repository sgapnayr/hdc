// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  alias: {
    './runtimeConfig': './runtimeConfig.browser',
  },
  vite: {
    define: {
      'window.global': {},
    },
  },
  router: {
    middleware: ['auth'],
  },
  loading: '@/components/Loading.vue',
})
