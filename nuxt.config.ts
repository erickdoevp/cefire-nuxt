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
    'pinia-plugin-persistedstate',
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
      ignore: ['/admin/**', '/blog/**'],
    },
  },

  routeRules: {

    '/': { static: true },
    '/about': { static: true },
    '/services': { static: true },
    '/contact': { static: true },
    '/blogs': { static: true },
    '/blog/**': { isr: 60 * 60 }, // revalida cada hora
    '/admin': { redirect: '/admin/login' },
    '/admin/**': { ssr: false },
  },

  runtimeConfig: {

    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,

    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,

    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    },
  },

  ui: {
    formField: {
      slots: {
        error: 'text-red-500 text-xs font-medium mt-1'
      }
    }
  }

})