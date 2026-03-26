// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'es' }
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://cefiretlx.com',
    name: 'Cefire Fisioterapia',
  },

  sitemap: {
    strictNuxtContentPaths: false,
  },

  robots: {
    disallow: [],
  },

  colorMode: {
    preference: 'light'
  },


  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/admin/**'],
    },
  },

  routeRules: {
    // 🟢 Landing (SSG)
    '/': { static: true },
    '/about': { static: true },
    '/services': { static: true },
    '/contact': { static: true },

    // 🟡 Blog listado (puede ser SSG)
    '/blogs': { static: true },

    // 🟡 Blog dinámico (ISR recomendado)
    // '/blog/**': { isr: 60 * 60 }, // revalida cada hora

    // 🔴 Admin (SPA)
    '/admin/**': { ssr: false },
  },

  runtimeConfig: {

    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
    },
  },

})