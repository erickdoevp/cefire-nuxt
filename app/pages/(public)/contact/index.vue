<script setup lang="ts">
import Reveal from '~/components/shared/Reveal.vue'


useSeoMeta({
  title: 'Contacto | Agenda tu Valoración Gratuita — Cefire Fisioterapia',
  description: 'Contáctanos para agendar tu valoración gratuita de fisioterapia en Tlaxcala. Atención San Esteban Tizatlan. Tel: (246) 137 0462.',
  ogTitle: 'Contacto — Cefire Fisioterapia',
  ogDescription: 'Agenda tu valoración gratuita. Estamos en San Esteban Tizatlan, Tlaxcala.',
  ogImage: 'https://cefiretlx.com/images/instalaciones-1.jpeg',
  ogType: 'website',
  ogUrl: 'https://cefiretlx.com/contact',
  ogLocale: 'es_MX',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Contacto — Cefire Fisioterapia',
  twitterDescription: 'Agenda tu valoración gratuita. Estamos en San Esteban Tizatlan, Tlaxcala.',
  twitterImage: 'https://cefiretlx.com/images/instalaciones-1.jpeg',
  canonical: 'https://cefiretlx.com/contact',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contacto — Cefire Fisioterapia',
        url: 'https://cefiretlx.com/contact',
        isPartOf: {
          '@type': 'MedicalBusiness',
          name: 'Cefire Fisioterapia',
          telephone: '+522461370462',
          email: 'eliot_77@live.com.mx',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'San Esteban Tizatlan',
            addressRegion: 'Tlaxcala',
            addressCountry: 'MX',
          },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '22:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '08:00', closes: '14:00' },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cefiretlx.com' },
          { '@type': 'ListItem', position: 2, name: 'Contacto', item: 'https://cefiretlx.com/contact' },
        ],
      }),
    },
  ],
})

// Opciones del selector de servicios
const serviceOptions = [
  { label: 'Rehabilitación Deportiva',  value: 'sports'       },
  { label: 'Recuperación Post-Cirugía', value: 'post-surgery' },
  { label: 'Alivio del Dolor Crónico',  value: 'chronic-pain' },
  { label: 'Movilidad y Bienestar',     value: 'mobility'     },
  { label: 'Otro',                      value: 'other'        },
]

// Estado del formulario
const form = reactive({
  firstName: '',
  lastName:  '',
  email:     '',
  phone:     '',
  service:   '',
  message:   '',
})

function handleSubmit() {
  // TODO: conectar con tu API / endpoint
  console.log('Form submitted:', form)
}

// Tarjetas de información de contacto
const contactCards = [
  {
    icon:    'i-lucide-phone',
    title:   'Llámanos',
    value:   '(246) 137-0462',
    sub:     'Lun-Vie: 7am - 10pm\nSab: 8am - 2pm',
    dark:    false,
  },
  {
    icon:    'ic:outline-whatsapp',
    title:   'Contactenos por Whatsapp',
    value:   '(246) 137-0462',
    to:      "https://wa.me/522461370462?text=Gracias%20por%20comunicarte%20con%20CEFIRE%20(Centro%20Especializado%20en%20Fisioterapia%20y%20Rehabilitación).%20¿Cómo%20podemos%20ayudarte?",
    sub:     'Respondemos dentro de las 24 horas en días hábiles.',
    dark:    false,
  },
  {
    icon:    'i-lucide-map-pin',
    title:   'Visítanos',
    value:   'San Esteban Tizatlan Tlaxcala.',
    sub:     'Estacionamiento gratuito disponible en el lugar. \nEntrada accesible para sillas de ruedas.',
    dark:    false,
  },
]
</script>

<template>
  <div class="font-[Outfit] bg-[#F5F4F1]">


    <section class="bg-white h-auto md:h-100 py-8 md:py-10">
      <UContainer>

        <div class="flex justify-center">
          <UBadge
            icon="i-lucide-heart-pulse"
            variant="soft"
            class="mb-6 rounded-2xl px-3 text-sm" 
          >
            CONTÁCTENOS
          </UBadge>
        </div>

        <Reveal
          :scale="0.8"  
          :duration="800"
          class="flex flex-col items-center gap-6"
        >
          <h1 class="max-w-170 text-center text-[52px] font-bold text-[#1A1918] leading-[1.1] tracking-[-1px]">
            Nos Encantaría, <br>saber más de usted.
          </h1>

          <p class="max-w-170 text-center text-[18px] text-[#6D6C6A] leading-[1.6]">
            Si tiene preguntas sobre nuestros servicios, desea programar una cita o simplemente necesita orientación, nuestro equipo está aquí para ayudarle.
          </p>
        </Reveal>

      </UContainer>
    </section>

    <!-- ─── FORMULARIO + TARJETAS DE CONTACTO ────────────────────── -->
    <section class="bg-[#f6f7f9] py-20">
      <UContainer class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Formulario -->
        <div class="flex-1 min-w-0 bg-white rounded-[20px] border border-[#E5E4E1] shadow-[0_4px_24px_rgba(26,25,24,0.03)] p-10 flex flex-col gap-6">
          <div class="flex flex-col gap-1">
            <h2 class="text-[24px] font-bold text-[#1A1918]">Envíanos un mensaje</h2>
            <p class="text-[14px] text-[#6D6C6A] leading-normal">
              Complete el siguiente formulario y nos comunicaremos con usted dentro de 24 horas.
            </p>
          </div>

          <UForm 
            class="flex flex-col gap-5" 
            :state="form" 
            @submit="handleSubmit" >
            <!-- Nombre -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Nombre(s)" name="firstName">
                <UInput
                  v-model="form.firstName"
                  placeholder="Erick"
                  size="lg"
                  class="w-full"
                  :ui="{ base: 'rounded-[10px] bg-[#FAFAF9] border-[#E5E4E1] font-[Outfit]' }"
                />
              </UFormField>

              <UFormField label="Apellidos" name="lastName">
                <UInput
                  v-model="form.lastName"
                  placeholder="Cruz Padilla"
                  size="lg"
                  class="w-full"
                  :ui="{ base: 'rounded-[10px] bg-[#FAFAF9] border-[#E5E4E1] font-[Outfit]' }"
                />
              </UFormField>
            </div>

            <!-- Email + Teléfono -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Correo electrónico" name="email">
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="email@example.com"
                  size="lg"
                  class="w-full"
                  :ui="{ base: 'rounded-[10px] bg-[#FAFAF9] border-[#E5E4E1] font-[Outfit]' }"
                />
              </UFormField>

              <UFormField label="Número de teléfono" name="phone">
                <UInput
                  v-model="form.phone"
                  type="tel"
                  placeholder="(246) 000 0000"
                  size="lg"
                  class="w-full"
                  :ui="{ base: 'rounded-[10px] bg-[#FAFAF9] border-[#E5E4E1] font-[Outfit]' }"
                />
              </UFormField>
            </div>

            <!-- Servicio -->
            <UFormField label="Servicio de interés" name="service">
              <USelect
                v-model="form.service"
                :items="serviceOptions"
                placeholder="Selecciona un servicio..."
                size="lg"
                class="w-full"
                :ui="{ base: 'rounded-[10px] bg-[#FAFAF9] border-[#E5E4E1] font-[Outfit]' }"
              />
            </UFormField>

            <!-- Mensaje -->
            <UFormField label="Mensaje" name="message">
              <UTextarea
                v-model="form.message"
                placeholder="Cuéntanos sobre tu condición y lo que te gustaría lograr..."
                :rows="5"
                size="lg"
                class="w-full"
                :ui="{ base: 'rounded-[10px] bg-[#FAFAF9] border-[#E5E4E1] font-[Outfit]' }"
              />
            </UFormField>

            <!-- Botón submit -->
            <UButton
              type="submit"
              size="lg"
              block
              class="rounded-xl bg-[#00a6f4] text-white font-semibold text-[16px] py-4 hover:bg-[#0095dc] transition-colors justify-center"
            >
             Enviar mensaje
            </UButton>
          </UForm>
        </div>

        <!-- Tarjetas de contacto -->
        <div class="shrink-0 flex flex-col gap-6">
          <!-- Call, Email, Visit -->
          <UCard
            v-for="card in contactCards"
            :key="card.title"
            class="rounded-2xl border border-[#E5E4E1] shadow-none"
            :ui="{ body: 'p-7' }"
          >
            <div class="flex flex-col gap-4">
              <!-- Ícono + título -->
              <div class="flex items-center gap-3.5">
                <div class="size-12 rounded-xl bg-[#c8e9f0] flex items-center justify-center shrink-0">
                  <UIcon :name="card.icon" class="text-primary size-5.5" />
                </div>
                <span class="text-[18px] font-semibold text-[#1A1918]">{{ card.title }}</span>
              </div>
              <!-- Valor -->
              <p v-if="!card.to" class="text-[16px] font-medium text-primary">{{ card.value }}</p>
              <UButton
                v-else
                :to="card.to"
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                class="w-fit text-[16px] font-medium"
              >
                {{ card.value }}
              </UButton>
              <!-- Sub-texto -->
              <p class="text-[14px] text-[#6D6C6A] leading-normal whitespace-pre-line">{{ card.sub }}</p>
            </div>
          </UCard>

          <!-- Tarjeta Emergency (dark) -->
          <div class="rounded-2xl bg-[#1A1918] p-7 flex flex-col gap-4">
            <div class="flex items-center gap-3.5">
              <div class="size-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-calendar" class="text-white size-5.5" />
              </div>
              <span class="text-[18px] font-semibold text-white">¿Emergencia?</span>
            </div>
            <p class="text-[14px] text-[#9C9B99] leading-[1.6]">
              Si tiene dolor urgente o tiene inquietudes posoperatorias, llámenos directamente. 
              Ofrecemos citas el mismo día cuando estén disponibles.
            </p>
            <UButton
              to="tel:+522461370462"
              size="md"
              block
              class="rounded-[10px] bg-primary text-white font-semibold text-[14px] py-3 hover:bg-primary transition-colors justify-center"
            >
              <UIcon name="i-lucide-phone" class="size-4" />
              Llama ahora
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ─── MAPA ──────────────────────────────────────────────────── -->
    <!-- <section class="bg-white px-20 pb-20 flex flex-col gap-8">

      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <span class="text-[#3D8A5A] text-[13px] font-semibold tracking-[2px]">OUR LOCATION</span>
          <h2 class="text-[28px] font-bold text-[#1A1918] tracking-[-0.5px]">Find Us Easily</h2>
        </div>
        <p class="text-[14px] text-[#6D6C6A]">
          123 Wellness Ave, Suite 200 &nbsp;•&nbsp; Ample Free Parking &nbsp;•&nbsp; Wheelchair Accessible
        </p>
      </div>

      <div class="relative w-full h-[360px] rounded-[20px] overflow-hidden">
        <NuxtImg
          src="/images/map.png"
          alt="Location map"
          class="w-full h-full object-cover"
          width="1280"
          height="360"
        />

        <div class="absolute bottom-8 left-8 flex items-center gap-2.5 bg-white/93 backdrop-blur-sm rounded-xl px-5 py-3 shadow-[0_4px_16px_rgba(26,25,24,0.08)]">
          <UIcon name="i-lucide-map-pin" class="text-[#3D8A5A] size-[18px] flex-shrink-0" />
          <span class="text-[14px] font-semibold text-[#1A1918]">123 Wellness Ave, Suite 200</span>
        </div>
      </div>
    </section> -->

  </div>
</template>
