// https://nuxt.com/docs/api/configuration/nuxt-config

// Slugs publicados en Supabase, leidos en build time para prerenderizar el blog.
// Si Supabase no responde, el build continua y esas rutas caen a SSR en el worker.
async function fetchPublishedSlugs(): Promise<string[]> {
  const baseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL
  const apikey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY

  if (!baseUrl || !apikey) {
    console.warn('[prerender] Faltan las variables de Supabase: el blog no se prerenderiza.')
    return []
  }

  try {
    const res = await fetch(`${baseUrl}/rest/v1/posts?select=slug&status=eq.Published`, {
      headers: { apikey, Authorization: `Bearer ${apikey}` },
    })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)

    const posts = await res.json() as { slug: string }[]
    return posts.map(post => post.slug).filter(Boolean)
  }
  catch (error) {
    console.warn(`[prerender] No se pudieron leer los posts de Supabase (${error}): el blog cae a SSR.`)
    return []
  }
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // El proyecto vive en un volumen no-APFS: macOS siembra archivos AppleDouble
  // (._*) que rompen la copia de assets y ensucian _routes.json.
  ignore: ['**/._*'],

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
    '@nuxtjs/robots',
    'pinia-plugin-persistedstate',
  ],

  site: {
    url: 'https://cefiretlx.com',
    name: 'Cefire Fisioterapia',
  },

  sitemap: {
    strictNuxtContentPaths: false,
    exclude: [
      '/admin',
      '/admin/**',
    ],
    urls: [
      { loc: '/', priority: 1.0, changefreq: 'monthly' },
      { loc: '/about', priority: 0.8, changefreq: 'monthly' },
      { loc: '/services', priority: 0.8, changefreq: 'monthly' },
      { loc: '/contact', priority: 0.7, changefreq: 'yearly' },
      { loc: '/blogs', priority: 0.6, changefreq: 'weekly' },
    ],
  },

  robots: {
    disallow: ['/admin', '/admin/'],
    sitemap: 'https://cefiretlx.com/sitemap.xml',
  },

  colorMode: {
    preference: 'light'
  },


  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      pages: {
        // _routes.json admite 100 reglas como maximo y el preset lista un archivo
        // por regla: sin estos comodines los 81 frames y cada post agotan el limite.
        routes: {
          exclude: ['/frames/*', '/images/*', '/blog/*'],
        },
      },
    },
    prerender: {
      crawlLinks: true,
      // Escribe about.html en vez de about/index.html: sin esto Cloudflare
      // redirige 308 de /about a /about/ y las URLs canonicas no coinciden.
      autoSubfolderIndex: false,
    },
    hooks: {
      async 'prerender:routes'(routes) {
        for (const slug of await fetchPublishedSlugs()) {
          routes.add(`/blog/${slug}`)
        }
      },
    },
  },

  routeRules: {

    '/': { prerender: true },
    '/about': { prerender: true },
    '/services': { prerender: true },
    '/contact': { prerender: true },
    // El blog se genera en build time; se refresca con un deploy hook al publicar.
    '/blogs': { prerender: true },
    '/blog/**': { prerender: true },
    '/admin': { redirect: '/admin/login' },
    '/admin/**': { ssr: false },
  },

  runtimeConfig: {

    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,

    // Deploy hook de Cloudflare Pages: regenera el sitio al publicar un post.
    cloudflareDeployHook: process.env.CLOUDFLARE_DEPLOY_HOOK,

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