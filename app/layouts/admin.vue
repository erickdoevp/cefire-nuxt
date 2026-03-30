<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const variant = ref<'sidebar' | 'floating' | 'inset'>('sidebar');
const side = ref<'left' | 'right'>('left');

const open = ref(true)

const items: NavigationMenuItem[] = [
  {
    label: 'Blogs',
    icon: 'i-lucide-house',
    active: true
  }
];

const user = ref({
  name: 'Benjamin Canac',
  avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'Benjamin Canac'
  }
});

</script>

<template>
  <div
    class="flex flex-1"
    :class="[
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse'
    ]"
  >

    <USidebar
      v-model:open="open"
      :variant="variant"
      collapsible="icon"
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
        <p class="w-full data-[state=open]:bg-elevated overflow-hidden">CEFIRE</p>
      </template>

      <UNavigationMenu
        :items="items"
        orientation="vertical"
        :ui="{ link: 'p-1.5 overflow-hidden' }"
      />

      <template #footer>
        <UButton
          v-bind="user"
          :label="user?.name"
          trailing-icon="i-lucide-chevrons-up-down"
          color="neutral"
          variant="ghost"
          square
          class="w-full data-[state=open]:bg-elevated overflow-hidden"
          :ui="{
            trailingIcon: 'text-dimmed ms-auto'
          }"
        />
      </template>

    </USidebar>

    <div
      class="flex-1 flex flex-col lg:peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 lg:peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-default bg-[#f6f7f9] w-auto"
    >
      <div
        class="h-(--ui-header-height) shrink-0 flex items-center px-4 bg-white sticky top-0 z-10"
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

      <div class="flex-1">
        <div class="bg-white p-6">
          <slot />
        </div>
      </div>

    </div>

  </div>
</template>
