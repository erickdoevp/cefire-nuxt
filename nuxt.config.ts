// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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

  // nitro: {
  //   prerender: {
  //     failOnError: false,
  //   },
  // },

})