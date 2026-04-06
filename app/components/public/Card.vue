<script setup lang="ts">
import type { PublicBlog } from '~/interfaces/public-blog';

defineProps<{
  post: PublicBlog
}>();

const formatDate = (dateStr: Date) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

</script>
<template>
  <UCard class="h-full overflow-hidden hover:shadow-md transition-shadow p-0">
    <!-- Image -->
    <div class="aspect-video overflow-hidden">
      <img
        :src="post.featuredImage"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <!-- Content -->
    <div class="flex flex-col gap-3 p-0 md:p-3">
      <div class="w-fit rounded-full text-xs px-4 py-2 mt-2 md:mt-0" :style="{ 'background-color': post.category.chip_color, 'color': post.category.text_chip_color }">
        <span class="">{{ post.category.name }}</span>
      </div>
      <h3 class="text-[#1A1918] text-[17px] font-semibold leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
        {{ post.title }}
      </h3>
      <p class="text-[#6D6C6A] text-sm leading-[1.6] line-clamp-2">
        {{ post.excerpt }}
      </p>
      <div class="flex items-center gap-1 text-[#9D9B99] text-xs mt-1">
        <span class="font-bold text-black">{{ post.user.name }} {{ post.user.first_last_name }}</span>
        <span>·</span>
        <span>{{ formatDate(post.updatedAt) }}</span>
        <span>·</span>
        <span>{{ post.readingTime }} minutos de lectura</span>
      </div>
    </div>
  </UCard>
</template>