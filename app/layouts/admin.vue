<script setup lang="ts">
const route = useRoute()

const navSections = [
  {
    label: 'Content',
    items: [
      { label: 'Posts', icon: 'i-lucide-file-text', to: '/admin/blogs', badge: 24 },
      { label: 'Categories', icon: 'i-lucide-tag', to: '/admin/categories' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Media Library', icon: 'i-lucide-image', to: '/admin/media' },
      { label: 'Settings', icon: 'i-lucide-settings', to: '/admin/settings' },
    ],
  },
]

function isActive(to: string) {
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <aside class="w-65 shrink-0 flex flex-col bg-gray-950 text-white">
      <!-- Logo -->
      <div class="flex items-center gap-2.5 px-5 py-6">
        <div class="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-heart-pulse" class="w-4 h-4 text-white" />
        </div>
        <span class="font-semibold text-white text-base">CEFIRE</span>
        <UBadge color="primary" variant="solid" size="sm" class="ml-0.5">Admin</UBadge>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-4 flex flex-col gap-6 overflow-y-auto pb-4">
        <div v-for="section in navSections" :key="section.label" class="flex flex-col gap-1">
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 mb-1">
            {{ section.label }}
          </p>
          <NuxtLink
            v-for="item in section.items"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
            :class="isActive(item.to)
              ? 'bg-primary-500/15 text-primary-400 font-medium'
              : 'text-gray-400 hover:text-white hover:bg-white/5'"
          >
            <UIcon :name="item.icon" class="w-4 h-4 shrink-0" />
            <span class="flex-1">{{ item.label }}</span>
            <UBadge
              v-if="item.badge"
              :label="String(item.badge)"
              color="primary"
              variant="solid"
              size="sm"
            />
          </NuxtLink>
        </div>
      </nav>

      <!-- User profile -->
      <div class="px-4 py-4 border-t border-white/10">
        <div class="flex items-center gap-3 px-2">
          <UAvatar text="MC" size="sm" class="bg-primary-600 text-white shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">Dr. Michael Chen</p>
            <p class="text-xs text-gray-500 truncate">Administrator</p>
          </div>
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-lucide-log-out"
            size="sm"
            class="text-gray-500 hover:text-white shrink-0"
          />
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-auto bg-[#f6f7f9]">
      <slot />
    </main>
  </div>
</template>
