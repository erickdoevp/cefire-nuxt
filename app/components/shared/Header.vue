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
  //   label: 'Todo',
  //   to: '/todo',
  //   active: route.path.startsWith('/todo')
  // },
]);

</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center gap-3">
        <img
          src="/images/main-logo.png"
          alt="Cefire Fisioterapia logo"
          width="34"
          height="34"
        />
        <p>CEFIRE</p>
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
