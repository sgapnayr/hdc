// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    link: [{ rel: 'stylesheet', href: '~/assets/css/fonts.css' }],
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
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    },
    public: {
      appDomain: process.env.APP_DOMAIN,
    },
  },
})
