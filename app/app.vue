<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'es-MX' },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/images/main-logo.png' },
  ],
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
