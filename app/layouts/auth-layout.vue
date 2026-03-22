<script setup lang="ts">

</script>

<template>
  <div class="flex h-screen w-full overflow-hidden font-[Outfit]">
    <!-- Left Panel -->
    <div
      class="relative hidden w-1/2 flex-col items-center justify-center gap-6 overflow-hidden bg-[#1A1918] p-15 lg:flex"
    >
      <!-- Imagen de fondo -->
      <img
        src="/images/instalaciones-1.jpeg"
        alt="Instalaciones Cefire"
        class="absolute inset-0 w-full h-full object-cover"
      >
      <!-- Overlay oscuro difuminado -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center gap-6 text-center">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-heart-pulse" class="w-6 h-6 text-primary" />
          <span class="text-[32px] font-bold leading-none text-white">CEFIRE</span>
        </div>

        <!-- Tagline -->
        <p class="w-[400px] text-[20px] leading-relaxed text-[#BFDBFE]">
          Impulsando la recuperación, <br> un paciente a la vez.
        </p>

        <!-- Subtitle -->
        <p class="w-[360px] text-sm leading-relaxed text-[#6D6C6A]">
          Su plataforma integral para la gestión de su consulta de fisioterapia.
        </p>
      </div>
    </div>

    <div class="flex flex-1 items-center justify-center bg-white px-20 py-15">
      <div class="flex w-full max-w-[400px] flex-col gap-6">
        <slot />
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>