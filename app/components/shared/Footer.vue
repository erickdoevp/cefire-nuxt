<script setup lang="ts">

const footerServices = [
  { label: 'Rehabilitación deportiva',  href: '/services' },
  { label: 'Recuperación posoperatoria',  href: '/services' },
  { label: 'Alivio del dolor crónico',    href: '/services' },
  { label: 'Movilidad y bienestar',    href: '/services' }
]

const footerCompany = [
  { label: 'Sobre nosotros',  href: '/about' },
  { label: 'Nuestro equipo',  href: '/about' }
]

const footerContact = [
  '(246) 137-0462',
  'eliot_77@live.com.mx',
  // 'Insurgentes #2, San Esteban Tizatlan Tlaxcala.',
  'Lun-Vie: 08:00 - 22:00',
  'Sab: 08:00 - 12:00'
]

</script>

<template>
  <footer class="bg-[#1A1918] py-20 flex flex-col gap-12">
    <UContainer>
      <div class="grid sm:grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 mb-8">
        <!-- Brand -->
        <div class="flex flex-col gap-4 shrink-0">
          <div class="flex items-center justify-center md:justify-start gap-2.5">
            <UIcon name="i-lucide-heart-pulse" class="w-6 h-6 text-primary" />
            <span class="text-white text-xl font-bold">Cefire</span>
          </div>
          <p class="text-[#9C9B99] text-sm leading-[1.6] text-center md:text-start">
            Fisioterapia experta que te ayuda a moverte mejor, sentirte mejor y vivir mejor. Sirviendo a la comunidad desde 2009.
          </p>
        </div>

        <!-- Services -->
        <div class="flex flex-col gap-4">
          <span class="text-white text-sm font-semibold text-center md:text-start">Servicios</span>
          <a
            v-for="link in footerServices"
            :key="link.label"
            :href="link.href"
            class="text-[#9C9B99] text-sm hover:text-white transition-colors text-center md:text-start"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Company -->
        <div class="flex flex-col gap-4">
          <span class="text-white text-sm font-semibold text-center md:text-start">Compañia</span>
          <NuxtLink
            v-for="link in footerCompany"
            :key="link.label"
            :to="link.href"
            class="text-[#9C9B99] text-sm hover:text-white transition-colors text-center md:text-start"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Contact -->
        <div class="flex flex-col gap-4">
          <span class="text-white text-sm font-semibold text-center md:text-start">Contacto</span>
          <span
            v-for="item in footerContact"
            :key="item"
            class="text-[#9C9B99] text-sm text-center md:text-start"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <!-- Divider -->
      <div class="w-full h-px bg-[#2A2928] mb-8"/>

      <!-- Bottom Row -->
      <div class="flex justify-between items-center">
        <span class="text-[#6D6C6A] text-[13px]">© 2026 CEFIRE. Todos los derechos reservados.</span>
        <div class="flex gap-6">
          <a href="#" class="text-[#6D6C6A] text-[13px] hover:text-white transition-colors">Política de privacidad</a>
          <a href="#" class="text-[#6D6C6A] text-[13px] hover:text-white transition-colors">Terminos de servicio</a>
          <a href="#" class="text-[#6D6C6A] text-[13px] hover:text-white transition-colors">Accesibilidad</a>
        </div>
      </div>
    </UContainer>
  </footer>

</template>
