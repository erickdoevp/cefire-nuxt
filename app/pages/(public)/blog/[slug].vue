<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import type { PublicBlogDetail, PublicBlogDetailCategory, PublicBlogDetailAuthor } from '~/interfaces/public-blog-detail'
import type { PublicBlog } from '~/interfaces/public-blog'

const route = useRoute()
const slug = route.params.slug as string

// ── Fetch post principal ──────────────────────────────────────
const { data: post } = await useAsyncData<PublicBlogDetail>(
  `post-${slug}`,
  async () => {
    const config = useRuntimeConfig()
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
    const { data, error } = await supabase
      .from('posts')
      .select(`
        slug,
        title,
        excerpt,
        conclusion,
        content,
        tags,
        readTime:reading_time,
        featuredImage:featured_image,
        metaDescription:meta_description,
        status,
        createdAt:created_at,
        category:categories!inner(id, name, chip_color, text_chip_color),
        author:profiles!inner(name, first_last_name, second_last_name)
      `)
      .eq('slug', slug)
      .eq('status', 'Published')
      .single()

    if (error || !data) return null as any

    return {
      ...data,
      category: data.category as unknown as PublicBlogDetailCategory,
      author: data.author as unknown as PublicBlogDetailAuthor,
    }
  }
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
}

// ── Renderizar contenido Tiptap JSON → HTML ───────────────────
const contentHtml = computed(() => {
  if (!post.value?.content) return ''
  try {
    return generateHTML(post.value.content, [StarterKit, Image, Link])
  } catch {
    return ''
  }
})

// ── Fetch posts relacionados ──────────────────────────────────
const { data: relatedPosts } = await useAsyncData<PublicBlog[]>(
  `related-${slug}`,
  async () => {
    const config = useRuntimeConfig()
    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
    const categoryId = post.value?.category?.id
    if (!categoryId) return []

    const { data, error } = await supabase
      .from('posts')
      .select(`
        slug,
        title,
        excerpt,
        updatedAt:updated_at,
        status,
        readingTime:reading_time,
        featuredImage:featured_image,
        category:categories!inner(name, chip_color, text_chip_color),
        user:profiles!inner(name, first_last_name, second_last_name)
      `)
      .eq('status', 'Published')
      .eq('category_id', categoryId)
      .neq('slug', slug)
      .limit(3)

    if (error || !data) return []

    return data.map(b => ({
      ...b,
      category: b.category as unknown as PublicBlog['category'],
      user: b.user as unknown as PublicBlog['user'],
    }))
  }
)

// ── Author full name ──────────────────────────────────────────
const authorName = computed(() => {
  const a = post.value?.author
  if (!a) return ''
  return [a.name, a.first_last_name, a.second_last_name].filter(Boolean).join(' ')
})

const formattedDate = computed(() =>
  post.value?.createdAt
    ? new Date(post.value.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''
)

function copyLink() {
  if (import.meta.client) {
    navigator.clipboard.writeText(window.location.href)
  }
}

// ── SEO ───────────────────────────────────────────────────────
useSeoMeta({
  title: `${post.value.title} | Blog Cefire Fisioterapia`,
  description: post.value.metaDescription || post.value.excerpt,
  ogTitle: post.value.title,
  ogDescription: post.value.metaDescription || post.value.excerpt,
  ogImage: post.value.featuredImage,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.value.title,
      description: post.value.metaDescription || post.value.excerpt,
      image: post.value.featuredImage,
      datePublished: post.value.createdAt,
      author: {
        '@type': 'Person',
        name: authorName.value,
      },
      publisher: {
        '@type': 'MedicalBusiness',
        name: 'Cefire Fisioterapia',
        url: 'https://cefiretlx.com',
      },
    }),
  }],
})
</script>

<template>
  <UPage>

    <!-- ─── ARTICLE HERO ─── -->
    <section class="bg-white py-15 px-5 flex flex-col items-center gap-8">
      <UContainer class="flex flex-col items-center gap-8 w-full p-0 md:p-4">

        <!-- Meta row -->
        <div class="flex items-center gap-4 flex-wrap justify-center">
          <span
            class="text-xs font-semibold px-3.5 py-1.5 rounded-full"
            :style="{ background: post!.category.chip_color, color: post!.category.text_chip_color }"
          >
            {{ post!.category.name }}
          </span>
          <span class="text-sm text-[#9C9B99]">{{ formattedDate }}</span>
          <span class="text-[#9C9B99]">·</span>
          <span class="text-sm text-[#9C9B99]">{{ post!.readTime }} min de lectura</span>
        </div>

        <!-- Title -->
        <h1 class="max-w-[800px] text-center text-[38px] md:text-[46px] font-bold text-[#1A1918] leading-[1.15] tracking-[-1px]">
          {{ post!.title }}
        </h1>

        <!-- Excerpt -->
        <p class="max-w-[660px] text-center text-[18px] text-[#6D6C6A] leading-[1.6]">
          {{ post!.excerpt }}
        </p>

        <!-- Author row -->
        <div class="flex items-center gap-3">
          <UAvatar :alt="authorName" size="md" icon="i-lucide-user-round" />
          <div class="flex flex-col gap-0.5">
            <span class="text-[15px] font-semibold text-[#1A1918]">{{ authorName }}</span>
            <span class="text-[13px]" :style="{ color: post!.category.text_chip_color }">Especialista en Fisioterapia</span>
          </div>
        </div>

      </UContainer>
    </section>

    <!-- ─── FEATURED IMAGE ─── -->
    <section v-if="post!.featuredImage" class="bg-white px-5 pb-0">
      <UContainer>
        <div class="rounded-[20px] overflow-hidden h-80 md:h-125">
          <img
            :src="post!.featuredImage"
            :alt="post!.title"
            class="w-full h-full object-cover"
          >
        </div>
      </UContainer>
    </section>

    <!-- ─── ARTICLE CONTENT ─── -->
    <section class="bg-white py-15 flex flex-col items-center">
      <div class="w-full max-w-[720px] px-5 flex flex-col gap-8">

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="article-body" v-html="contentHtml" />

        <!-- Pro tip callout -->
        <div class="flex gap-3 rounded-xl p-5 border border-[#C8F0D8]" style="background: rgba(191,219,254,0.12)">
          <UIcon name="i-lucide-lightbulb" class="shrink-0 mt-0.5 text-[#2563EB]" size="20" />
          <p class="text-[15px] text-[#3A3938] leading-[1.7]">
            <strong>Consejo profesional:</strong> La constancia es clave. Comunícate con tu fisioterapeuta ante cualquier duda durante el proceso de recuperación.
          </p>
        </div>

        <!-- Conclusion -->
        <div v-if="post!.conclusion" class="bg-[#F5F4F1] rounded-2xl p-7 flex flex-col gap-4">
          <h3 class="text-[22px] font-bold text-[#1A1918]">Conclusión</h3>
          <p class="text-[16px] text-[#3A3938] leading-[1.7]">{{ post!.conclusion }}</p>
        </div>

        <div class="h-px bg-[#E5E4E1] w-full" />

        <!-- Tags -->
        <div v-if="post!.tags?.length" class="flex items-center gap-2.5 flex-wrap">
          <span class="text-sm font-semibold text-[#1A1918]">Etiquetas:</span>
          <span
            v-for="tag in post!.tags"
            :key="tag"
            class="text-[13px] font-medium text-[#6D6C6A] px-3.5 py-1.5 rounded-full border border-[#E5E4E1]"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Share -->
        <div class="flex items-center justify-between flex-wrap gap-3">
          <span class="text-sm font-semibold text-[#1A1918]">Compartir artículo</span>
          <div class="flex gap-3">
            <UButton variant="ghost" color="neutral" icon="i-lucide-facebook" size="md" class="bg-[#F5F4F1] rounded-xl" aria-label="Compartir en Facebook" />
            <UButton variant="ghost" color="neutral" icon="i-lucide-twitter" size="md" class="bg-[#F5F4F1] rounded-xl" aria-label="Compartir en Twitter" />
            <UButton variant="ghost" color="neutral" icon="i-lucide-link" size="md" class="bg-[#F5F4F1] rounded-xl" aria-label="Copiar enlace" @click="copyLink" />
          </div>
        </div>

      </div>
    </section>

    <!-- ─── AUTHOR CARD ─── -->
    <section class="bg-white pb-15 flex justify-center px-5">
      <div class="w-full max-w-[720px] bg-[#F5F4F1] rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <UAvatar :alt="authorName" size="2xl" icon="i-lucide-user-round" class="shrink-0" />
        <div class="flex flex-col gap-2.5 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[18px] font-bold text-[#1A1918]">{{ authorName }}</span>
            <UBadge color="primary" variant="soft" class="rounded-full text-xs px-2.5">Especialista</UBadge>
          </div>
          <span class="text-[14px] font-medium text-primary">Especialista en Fisioterapia</span>
        </div>
      </div>
    </section>

    <!-- ─── RELATED POSTS ─── -->
    <section v-if="relatedPosts?.length" class="bg-[#F5F4F1] py-20 px-5">
      <UContainer class="flex flex-col gap-12">
        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-[13px] font-semibold tracking-[2px] text-primary">SIGUE LEYENDO</span>
          <h2 class="text-[38px] md:text-[40px] font-bold text-[#1A1918] tracking-[-0.5px]">Artículos Relacionados</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="related in relatedPosts" :key="related.slug" :to="`/blog/${related.slug}`" class="group">
            <UCard class="overflow-hidden shadow-sm hover:shadow-md transition-shadow p-0 h-full">
              <div class="h-[200px] overflow-hidden">
                <img :src="related.featuredImage" :alt="related.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
              </div>
              <div class="flex flex-col gap-3 p-5">
                <span
                  class="self-start text-xs font-medium px-2.5 py-1 rounded-full"
                  :style="{ background: related.category.chip_color, color: related.category.text_chip_color }"
                >
                  {{ related.category.name }}
                </span>
                <h3 class="text-[18px] font-semibold text-[#1A1918] leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
                  {{ related.title }}
                </h3>
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- ─── BACK BUTTON ─── -->
    <section class="bg-white py-8 px-5">
      <UContainer>
        <UButton to="/blogs" variant="ghost" color="neutral" leading-icon="i-lucide-arrow-left">
          Volver al blog
        </UButton>
      </UContainer>
    </section>

  </UPage>
</template>

<style scoped>
.article-body :deep(p) {
  font-size: 17px;
  line-height: 1.8;
  color: #3A3938;
  margin-bottom: 1.25rem;
}

.article-body :deep(h2) {
  font-size: 28px;
  font-weight: 700;
  color: #1A1918;
  letter-spacing: -0.5px;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.article-body :deep(h3) {
  font-size: 22px;
  font-weight: 700;
  color: #1A1918;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.article-body :deep(ul) {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  list-style-type: disc;
}

.article-body :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  list-style-type: decimal;
}

.article-body :deep(li) {
  font-size: 17px;
  line-height: 1.8;
  color: #3A3938;
  margin-bottom: 0.5rem;
}

.article-body :deep(strong) {
  font-weight: 600;
  color: #1A1918;
}

.article-body :deep(blockquote) {
  border-left: 3px solid #2563EB;
  padding: 8px 16px;
  margin: 1.25rem 0;
  color: #6D6C6A;
  font-style: italic;
}

.article-body :deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 1.25rem 0;
  overflow-x: auto;
}

.article-body :deep(code) {
  background: #f3f4f6;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.875em;
  font-family: monospace;
}

.article-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1rem 0;
}

.article-body :deep(a) {
  color: #2563EB;
  text-decoration: underline;
}
</style>
