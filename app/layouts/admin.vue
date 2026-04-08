<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useAuthStore } from '~/store/admin/auth/authStore'

const auth = useAuthStore()

const variant = ref<'sidebar' | 'floating' | 'inset'>('sidebar');
const side = ref<'left' | 'right'>('left');

const open = ref(true)

const baseItems: NavigationMenuItem[] = [
  {
    label: 'Contenido',
    type: 'label',
    slot: 'content-label' as const
  },
  {
    label: 'Blogs',
    icon: 'i-lucide-house',
    to: '/admin/blogs'
  },
  {
    label: 'Categorías',
    icon: 'i-lucide-tag',
    to: '/admin/categories'
  },
];

const adminItems: NavigationMenuItem[] = [
  {
    label: 'Ajustes',
    type: 'label',
    slot: 'settings-label' as const
  },
  {
    label: 'Usuarios',
    icon: 'i-lucide-users',
    to: '/admin/users'
  },
];

const items = computed<NavigationMenuItem[][]>(() =>
  auth.isAdmin ? [baseItems, adminItems] : [baseItems]
);

const initials = computed(() => {
  const email = auth.user?.email ?? ''
  return email.substring(0, 2).toUpperCase()
})

onMounted(() => {
  auth.init()
})

</script>

<template>
  <div
    class="flex h-screen overflow-hidden"
    :class="[
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse'
    ]"
  >
    <USidebar
      v-model:open="open"
      :variant="variant"
      mode="drawer"
      collapsible="offcanvas"
      :side="side"
      :ui="{
        container: 'h-full'
      }"
    >
      <template #header>
        <img
          src="/images/main-logo.png"
          alt="Cefire Fisioterapia logo"
          width="30"
          height="30"
        >
        <p class="text-black font-semibold tracking-wide flex-1 overflow-hidden">CEFIRE</p>
        <UBadge
          v-if="auth.isAdmin"
          label="Admin"
          color="primary"
          variant="soft"
          class="shrink-0 text-xs rounded-full"
        />
      </template>

      <UNavigationMenu
        :items="items"
        orientation="vertical"
        :ui="{ link: 'p-1.5 overflow-hidden' }"
      />

      <template #footer>
        <div class="flex w-full items-center gap-3 overflow-hidden">
          <div class="rounded-full bg-primary w-9 h-9 flex items-center justify-center shrink-0">
            <span class="text-white text-sm font-bold">{{ initials }}</span>
          </div>
          <div class="flex-1 min-w-0 overflow-hidden">
            <p class="text-sm font-medium truncate">{{ auth.user?.email ?? '' }}</p>
            <p class="text-xs capitalize">{{ auth.role ?? 'editor' }}</p>
          </div>
          <UButton
            icon="i-lucide-log-out"
            color="neutral"
            variant="ghost"
            aria-label="Cerrar sesión"
            @click="async () => { await auth.logout(); navigateTo('/admin/login') }"
          />
        </div>
      </template>

    </USidebar>

    <div
      class="flex-1 min-w-0 flex flex-col lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-[#f6f7f9]"
    >
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center px-4 bg-white"
        :class="[
          variant !== 'floating' && 'border-b border-default',
          side === 'right' && 'justify-end'
        ]"
      >
        <UButton
          :icon="side === 'left' ? 'i-lucide-panel-left' : 'i-lucide-panel-right'"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>

      <div class="flex-1 overflow-auto">
        <div class="bg-white p-6 min-w-0">
          <slot />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Active nav link */
.sidebar-nav :deep([data-active='true']) {
  background-color: rgba(37, 99, 235, 0.15);
  color: white;
}

.sidebar-nav :deep([data-active='true'] .i-lucide-house),
.sidebar-nav :deep([data-active='true'] .i-lucide-tag),
.sidebar-nav :deep([data-active='true'] .i-lucide-users) {
  color: #2563EB;
}
</style>
