<script setup lang="ts">
import Card from '~/components/public/Card.vue'
import { usePaginatedPublicBlogs } from '~/composables/public/posts/usePaginatedBlogs';


useSeoMeta({
  title: 'Blog | Consejos de Fisioterapia y Recuperación — Cefire Tlaxcala',
  description: 'Artículos, consejos de fisioterapia, historias de recuperación y bienestar para apoyar tu camino hacia una vida activa y sin dolor.',
  ogTitle: 'Blog de Cefire — Fisioterapia y Bienestar',
  ogDescription: 'Consejos de fisioterapia, recuperación y bienestar escritos por nuestros especialistas en Tlaxcala.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
});

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
});

const {
  blogs: posts,
  page,
  totalPages,
  featuredPost,
} = usePaginatedPublicBlogs()

// const categories = ['Todos', 'Recuperación', 'Medicina Deportiva', 'Bienestar', 'Historias']
// const activeCategory = ref('Todos')

// const filteredPosts = computed(() =>
//   activeCategory.value === 'Todos'
//     ? posts
//     : posts.filter(p => p.category === activeCategory.value)
// )

const formatDate = (dateStr: Date | undefined) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

</script>

<template>
  <UPage>

    <!-- ─── HERO ─── -->
    <section class="bg-white h-auto md:h-100">
      <UContainer class="flex flex-col items-center gap-6 py-8 md:py-10">
        <UBadge
          icon="i-lucide-newspaper"
          variant="soft"
          class="mb-2 rounded-2xl px-3 text-sm"
        >
          NUESTRO BLOG
        </UBadge>
        <h1 class="max-w-200 text-center text-[52px] font-bold text-[#1A1918] leading-[1.1] tracking-[-1px]">
          Información Para tú <br> Recuperación
        </h1>
        <p class="max-w-155 text-[18px] text-[#6D6C6A] leading-[1.6] text-center">
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
        <NuxtLink :to="`/blog/${featuredPost?.slug}`" class="group">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <!-- Image -->
            <div class="aspect-4/3 lg:aspect-auto lg:min-h-90 overflow-hidden">
              <img
                :src="featuredPost?.featuredImage"
                :alt="featuredPost?.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              >
            </div>
            <!-- Content -->
            <div class="flex flex-col justify-center gap-5 p-8 lg:p-12">
              <div class="w-fit rounded-full text-xs px-4 py-2" :style="{ 'background-color': featuredPost?.category.chip_color, 'color': featuredPost?.category.text_chip_color }">
                <span class="">{{ featuredPost?.category.name }}</span>
              </div>
              <h3 class="text-[#1A1918] text-[26px] font-bold leading-tigth tracking-[-0.3px] group-hover:text-primary transition-colors">
                {{ featuredPost?.title }}
              </h3>
              <p class="text-[#6D6C6A] text-[16px] leading-[1.65]">
                {{ featuredPost?.excerpt }}
              </p>
              <div class="flex items-center gap-2 text-[#9D9B99] text-sm">
                <span>{{ featuredPost?.user.name }}</span>
                <span>·</span>
                <span>{{ formatDate(featuredPost?.updatedAt) }}</span>
                <span>·</span>
                <span>{{ featuredPost?.readingTime }} minutos de lectura</span>
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
              <p class="text-[#6D6C6A] text-[16px] leading-[1.6] mt-1 max-w-135">
                Nuestra colección de artículos expertos sobre recuperación, bienestar y cómo vivir sin dolor.
              </p>
            </div>
            <!-- Category filter -->
            <!-- <div class="flex flex-wrap gap-2">
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
            </div> -->
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="post in posts"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            class="group"
          >
            <Card :post="post" />
          </NuxtLink>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-2 pt-4">
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="page === 1"
            leading-icon="i-lucide-chevron-left"
            @click="page--"
          >
            Anterior
          </UButton>
          <UButton
            v-for="p in totalPages"
            :key="p"
            :variant="page === p ? 'link' : 'ghost'"
            :color="page === p ? 'primary' : 'neutral'"
            class="w-9 h-9 text-center rounded-md"
            @click="page = p"
          >
            {{ p }}
          </UButton>
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="page === totalPages"
            trailing-icon="i-lucide-chevron-right"
            @click="page++"
          >
            Siguiente
          </UButton>
        </div>
      </UContainer>
    </section>

  </UPage>
</template>
