<script setup lang="ts">

useSeoMeta({
  title: 'Blog | Consejos de Fisioterapia y Recuperación — Cefire Tlaxcala',
  description: 'Artículos, consejos de fisioterapia, historias de recuperación y bienestar para apoyar tu camino hacia una vida activa y sin dolor.',
  ogTitle: 'Blog de Cefire — Fisioterapia y Bienestar',
  ogDescription: 'Consejos de fisioterapia, recuperación y bienestar escritos por nuestros especialistas en Tlaxcala.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog de Cefire Fisioterapia',
      description: 'Artículos y consejos de fisioterapia, recuperación y bienestar.',
      url: 'https://cefiretlx.com/blog',
      publisher: {
        '@type': 'MedicalBusiness',
        name: 'Cefire Fisioterapia',
        url: 'https://cefiretlx.com',
      },
    }),
  }],
})

const categories = ['Todos', 'Recuperación', 'Medicina Deportiva', 'Bienestar', 'Historias']
const activeCategory = ref('Todos')

const currentPage = ref(1)
const totalPages = 4

const featuredPost = {
  category: 'Recuperación',
  title: 'Guía Completa de Recuperación Post-Cirugía: Lo que tu Cuerpo Necesita',
  description: 'La recuperación después de una cirugía no tiene que ser abrumadora. Aprende los pasos esenciales, los tiempos esperados y los ejercicios respaldados por expertos que te ayudarán a recuperar fuerza y movilidad más rápido de lo que imaginas.',
  author: 'Lic. Paloma Cruz',
  date: '15 Mar 2026',
  readTime: '8 min de lectura',
  image: '/images/tratamientos1.jpg',
  slug: 'guia-recuperacion-post-cirugia',
}

const posts = [
  {
    category: 'Medicina Deportiva',
    title: '5 Ejercicios que Todo Corredor Debe Hacer para Prevenir Lesiones de Rodilla',
    description: 'Fortalece los músculos que protegen tus rodillas con estos ejercicios de prevención comprobados.',
    author: 'Lic. Luna Hernández',
    date: '12 Mar',
    readTime: '5 min de lectura',
    image: '/images/tratamientos2.jpg',
    slug: 'ejercicios-prevenir-lesiones-rodilla',
  },
  {
    category: 'Recuperación',
    title: 'Dolor de Espalda Baja: Causas, Mitos y Tratamientos Modernos',
    description: 'Desmitificamos las creencias más comunes sobre el dolor lumbar y exploramos enfoques terapéuticos basados en evidencia.',
    author: 'Lic. Paloma Cruz',
    date: '8 Mar',
    readTime: '7 min de lectura',
    image: '/images/tratamientos3.jpg',
    slug: 'dolor-espalda-baja-causas-mitos-tratamientos',
  },
  {
    category: 'Bienestar',
    title: 'Rutinas de Estiramiento Matutino que Transforman tu Día',
    description: 'Empieza cada mañana con estos estiramientos simples para mejorar la flexibilidad y reducir los dolores diarios.',
    author: 'Lic. Luna Hernández',
    date: '5 Mar',
    readTime: '4 min de lectura',
    image: '/images/tratamientos5.jpg',
    slug: 'rutinas-estiramiento-matutino',
  },
  {
    category: 'Historias',
    title: 'De la Silla de Ruedas al Maratón: Cómo la Fisioterapia Cambió mi Vida',
    description: 'Lee el increíble camino de recuperación de un paciente desde una lesión devastadora hasta cruzar la meta.',
    author: 'Paciente Cefire',
    date: '28 Feb',
    readTime: '10 min de lectura',
    image: '/images/quienes-somos1.jpg',
    slug: 'silla-ruedas-maraton-historia',
  },
  {
    category: 'Recuperación',
    title: 'Hielo vs. Calor: ¿Cuándo Usar Cada uno en la Recuperación de Lesiones?',
    description: 'El debate de siempre resuelto por la ciencia. Aprende cuándo el frío o el calor acelerará tu curación.',
    author: 'Lic. Paloma Cruz',
    date: '22 Feb',
    readTime: '6 min de lectura',
    image: '/images/artritis-reumatismo.jpg',
    slug: 'hielo-vs-calor-recuperacion-lesiones',
  },
  {
    category: 'Medicina Deportiva',
    title: 'Volver al Deporte tras una Cirugía de LCA: Una Línea de Tiempo',
    description: 'Una guía mes a mes para regresar de forma segura a las actividades que amas después de la reconstrucción del ligamento cruzado anterior.',
    author: 'Lic. Luna Hernández',
    date: '15 Feb',
    readTime: '9 min de lectura',
    image: '/images/tratamientos4.png',
    slug: 'volver-deporte-cirugia-lca-timeline',
  },
]

const filteredPosts = computed(() =>
  activeCategory.value === 'Todos'
    ? posts
    : posts.filter(p => p.category === activeCategory.value)
)

const categoryColors: Record<string, string> = {
  'Recuperación': 'primary',
  'Medicina Deportiva': 'success',
  'Bienestar': 'warning',
  'Historias': 'error',
}
</script>

<template>
  <UPage>

    <!-- ─── HERO ─── -->
    <section class="bg-white h-auto md:h-[400px]">
      <UContainer class="flex flex-col items-center gap-6 py-8 md:py-10">
        <UBadge
          icon="i-lucide-newspaper"
          variant="soft"
          class="mb-2 rounded-2xl px-3 text-sm"
        >
          NUESTRO BLOG
        </UBadge>
        <h1 class="max-w-[800px] text-center text-[52px] font-bold text-[#1A1918] leading-[1.1] tracking-[-1px]">
          Información para <br> tu Recuperación
        </h1>
        <p class="max-w-[620px] text-[18px] text-[#6D6C6A] leading-[1.6] text-center">
          Consejos de fisioterapia, bienestar e historias de recuperación inspiradoras para apoyarte en tu camino hacia una vida plena y sin dolor.
        </p>
      </UContainer>
    </section>

    <!-- ─── FEATURED ARTICLE ─── -->
    <section class="bg-[#F5F4F1] py-16">
      <UContainer class="flex flex-col gap-8">
        <!-- Section header -->
        <div class="flex flex-col gap-1">
          <span class="text-primary text-[13px] font-semibold tracking-[2px]">ARTÍCULO DESTACADO</span>
          <h2 class="text-[#1A1918] text-[32px] font-bold tracking-[-0.5px]">Lo Último en Nuestro Blog</h2>
        </div>

        <!-- Featured card -->
        <NuxtLink :to="`/blog/${featuredPost.slug}`" class="group">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <!-- Image -->
            <div class="aspect-[4/3] lg:aspect-auto lg:min-h-[360px] overflow-hidden">
              <img
                :src="featuredPost.image"
                :alt="featuredPost.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <!-- Content -->
            <div class="flex flex-col justify-center gap-5 p-8 lg:p-12">
              <UBadge
                :color="categoryColors[featuredPost.category] as any"
                variant="soft"
                class="w-fit rounded-full px-3"
              >
                {{ featuredPost.category }}
              </UBadge>
              <h3 class="text-[#1A1918] text-[26px] font-bold leading-[1.25] tracking-[-0.3px] group-hover:text-primary transition-colors">
                {{ featuredPost.title }}
              </h3>
              <p class="text-[#6D6C6A] text-[16px] leading-[1.65]">
                {{ featuredPost.description }}
              </p>
              <div class="flex items-center gap-2 text-[#9D9B99] text-sm">
                <span>{{ featuredPost.author }}</span>
                <span>·</span>
                <span>{{ featuredPost.date }}</span>
                <span>·</span>
                <span>{{ featuredPost.readTime }}</span>
              </div>
              <UButton
                variant="soft"
                class="w-fit"
                trailing-icon="i-lucide-arrow-right"
              >
                Leer artículo
              </UButton>
            </div>
          </div>
        </NuxtLink>
      </UContainer>
    </section>

    <!-- ─── ARTICLES GRID ─── -->
    <section class="bg-white py-16">
      <UContainer class="flex flex-col gap-10">
        <!-- Section header -->
        <div class="flex flex-col gap-3">
          <span class="text-primary text-[13px] font-semibold tracking-[2px]">MÁS ARTÍCULOS</span>
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 class="text-[#1A1918] text-[32px] font-bold tracking-[-0.5px]">Explora Nuestros Recursos</h2>
              <p class="text-[#6D6C6A] text-[16px] leading-[1.6] mt-1 max-w-[540px]">
                Nuestra colección de artículos expertos sobre recuperación, bienestar y cómo vivir sin dolor.
              </p>
            </div>
            <!-- Category filter -->
            <div class="flex flex-wrap gap-2">
              <UButton
                v-for="cat in categories"
                :key="cat"
                :variant="activeCategory === cat ? 'solid' : 'ghost'"
                :color="activeCategory === cat ? 'primary' : 'neutral'"
                size="sm"
                class="rounded-full"
                @click="activeCategory = cat"
              >
                {{ cat }}
              </UButton>
            </div>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            class="group"
          >
            <UCard class="h-full overflow-hidden hover:shadow-md transition-shadow p-0">
              <!-- Image -->
              <div class="aspect-[16/9] overflow-hidden">
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <!-- Content -->
              <div class="flex flex-col gap-3 p-6">
                <UBadge
                  :color="categoryColors[post.category] as any"
                  variant="soft"
                  class="w-fit rounded-full px-3 text-xs"
                >
                  {{ post.category }}
                </UBadge>
                <h3 class="text-[#1A1918] text-[17px] font-semibold leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
                  {{ post.title }}
                </h3>
                <p class="text-[#6D6C6A] text-sm leading-[1.6] line-clamp-2">
                  {{ post.description }}
                </p>
                <div class="flex items-center gap-1.5 text-[#9D9B99] text-xs mt-1">
                  <span>{{ post.author }}</span>
                  <span>·</span>
                  <span>{{ post.date }}</span>
                  <span>·</span>
                  <span>{{ post.readTime }}</span>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-2 pt-4">
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="currentPage === 1"
            leading-icon="i-lucide-chevron-left"
            @click="currentPage > 1 && currentPage--"
          >
            Anterior
          </UButton>
          <UButton
            v-for="page in totalPages"
            :key="page"
            :variant="currentPage === page ? 'solid' : 'ghost'"
            :color="currentPage === page ? 'primary' : 'neutral'"
            class="w-9 h-9"
            @click="currentPage = page"
          >
            {{ page }}
          </UButton>
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="currentPage === totalPages"
            trailing-icon="i-lucide-chevron-right"
            @click="currentPage < totalPages && currentPage++"
          >
            Siguiente
          </UButton>
        </div>
      </UContainer>
    </section>

  </UPage>
</template>
