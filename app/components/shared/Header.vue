<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();
const isHome = computed(() => route.path === '/');
const scrolled = ref(false);

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 60;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onUnmounted(() => window.removeEventListener('scroll', onScroll));
});

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Nosotros',
    to: '/about',
    active: route.path.startsWith('/about'),
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
  {
    label: 'Blog',
    to: '/blogs',
    active: route.path.startsWith('/blog')
  },
]);

</script>

<template>
  <UHeader
    class="border-0 transition-[background-color,backdrop-filter] duration-300"
    :class="isHome && !scrolled ? 'bg-transparent! backdrop-blur-none shadow-none header-transparent' : ''"
  >
    
    <template #title>
      <div class="flex items-center gap-3 h-fit">
        <img
          src="/images/main-logo.png"
          alt="Cefire Fisioterapia logo"
          width="60"
          height="60"
          class="m-3"
        >
      </div>
    </template>

    <div :class="isHome && !scrolled ? 'nav-white' : ''">
      <UNavigationMenu :items="items"/>
    </div>

    <template #right>
      <UButton
        to="tel:+522461370462"
        size="md"
        block
        class="hidden lg:flex rounded-[10px] bg-primary text-white font-semibold text-[14px] py-3 transition-colors justify-center w-fit"
      >
        Reserva una cita
      </UButton>
    </template>

    <template #toggle="{ open, toggle }">
      <UButton
        variant="ghost"
        :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
        :color="isHome && !scrolled ? 'primary' : 'neutral'"
        class="transition-colors duration-300 lg:hidden"
        @click="toggle"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" :ui="{ link: 'p-1.5 overflow-hidden' }"/>
    </template>

  </UHeader>
</template>

<style scoped>
.nav-white :deep(a),
.nav-white :deep(button),
.nav-white :deep(span) {
  color: #1ea5f4 !important;
}

.nav-white :deep(a:hover),
.nav-white :deep(button:hover) {
  color: rgba(255, 255, 255) !important;
}

</style>
