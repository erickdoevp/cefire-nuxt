<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Nosotros',
    to: '/about',
    active: route.path.startsWith('/about')
  },
  {
    label: 'Servicios',
    to: '/services',
    active: route.path.startsWith('/services')
  },
  {
    label: 'Contacto',
    to: '/contact',
    active: route.path.startsWith('/contact')
  },
  // {
  //   label: 'Blog',
  //   to: '/blogs',
  //   active: route.path.startsWith('/blog')
  // },
]);

</script>

<template>
  <UHeader class="h-20 border-0">
    <template #title>
      <div class="flex items-center gap-3">
        <img
          src="/images/main-logo.png"
          alt="Cefire Fisioterapia logo"
          width="70"
          height="70"
        >
      </div>
    </template>

    <UNavigationMenu :items="items"/>

    <template #right>
      <UButton
        to="tel:+522461370462"
        size="md"
        block
        class="rounded-[10px] bg-primary text-white font-semibold text-[14px] py-3 transition-colors justify-center w-fit"
      >
        Reserva una cita
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

  </UHeader>
</template>
