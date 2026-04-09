<script setup lang="ts">
import CountUp from '~/components/shared/CountUp.vue';
import Reveal from '~/components/shared/Reveal.vue';


useSeoMeta({
  title: 'Nosotros | Cefire Fisioterapia en Tlaxcala',
  description: 'Desde 2009, Cefire Fisioterapia se dedica a ayudar a las personas a recuperar su movilidad y calidad de vida con fisioterapia personalizada y basada en evidencia.',
  ogTitle: 'Nosotros | Cefire Fisioterapia en Tlaxcala',
  ogDescription: 'Conoce al equipo de Cefire: especialistas certificados comprometidos con tu recuperación desde 2009.',
  ogImage: 'https://cefiretlx.com/images/about-1.jpeg',
  ogType: 'website',
  ogUrl: 'https://cefiretlx.com/about',
  ogLocale: 'es_MX',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nosotros | Cefire Fisioterapia en Tlaxcala',
  twitterDescription: 'Conoce al equipo de Cefire: especialistas certificados comprometidos con tu recuperación desde 2009.',
  twitterImage: 'https://cefiretlx.com/images/about-1.jpeg',
  canonical: 'https://cefiretlx.com/about',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Nosotros — Cefire Fisioterapia',
        description: 'Desde 2009, Cefire Fisioterapia ayuda a las personas a recuperar su movilidad y calidad de vida con fisioterapia personalizada.',
        url: 'https://cefiretlx.com/about',
        isPartOf: {
          '@type': 'MedicalBusiness',
          name: 'Cefire Fisioterapia',
          url: 'https://cefiretlx.com',
          foundingDate: '2009',
          numberOfEmployees: { '@type': 'QuantitativeValue', value: 3 },
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
          { '@type': 'ListItem', position: 2, name: 'Nosotros', item: 'https://cefiretlx.com/about' },
        ],
      }),
    },
  ],
});

const milestones = [
  {
    year: '2009',
    title: 'Fundada con una misión',
    description: 'LTFyR. Elliut Cruz empezó CEFIRE TLAX con una creencia simple: cada paciente merece un plan de recuperación diseñado en torno a su vida, no solo a su diagnóstico.'
  },
  {
    year: '2019',
    title: 'Ampliamos nuestras especialidades',
    description: 'Se instala área de neurorehabilitación, especialidad terapéutica enfocada en ayudar a las personas a recuperar y adaptar las funciones perdidas o deterioradas a causa de una enfermedad o lesión que afectan al sistema nervioso.'
  },
  {
    year: '2022',
    title: 'Un hito en nuestra historia',
    description: 'Con la confianza de más de 1000 pacientes, dimos el paso hacia un espacio propio, equipándolo con tecnología de última generación para elevar nuestros estándares de atención.'
  }
];

const values = [
  {
    icon: 'i-lucide-user-check',
    title: 'Atención al paciente primero',
    description: 'Tus objetivos, tu ritmo. Cada plan se adapta a tu vida, no a un protocolo universal.'
  },
  {
    icon: 'i-lucide-microscope',
    title: 'Basado en evidencia',
    description: 'Nuestros métodos se basan en las últimas investigaciones y las mejores prácticas clínicas: sin trucos ni conjeturas.'
  },
  {
    icon: 'i-lucide-hand-heart',
    title: 'Trato humanitario',
    description: "La sanación no es solo física. Tratamos a cada paciente con empatía, paciencia y un cuidado genuino por su bienestar."
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Resultados duraderos',
    description: "No solo aliviamos el dolor: desarrollamos fuerza, movilidad y resiliencia para que pueda reintegrarse a sus actividades diarias, laborales y sociables"
  }
];

const stats = [
  { number: 1000, suffix: '+', label: 'Pacientes tratados' },
  { number: 99,   suffix: '%', label: 'Satisfacción del paciente' },
  { number: 10,   suffix: '+', label: 'Años de experiencia' },
  { number: 15,   suffix: '+', label: 'Años combinados de experiencia' }
];

</script>

<template>
  <UPage>
    <section class="bg-white h-auto md:h-100 py-8 md:py-10">
      <UContainer>

        <div class="flex justify-center">
          <UBadge
            icon="i-lucide-heart-pulse"
            variant="soft"
            class="mb-6 rounded-2xl px-3 text-sm" 
          >
            NUESTRA HISTORIA
          </UBadge>
        </div>

        <Reveal 
          :scale="0.8"  
          :duration="800"
          class="flex flex-col items-center gap-6"
          >

          <h1 class="max-w-200 text-center text-[52px] font-bold text-[#1A1918] leading-[1.1] tracking-[-1px]">
            Rehabilitando personas, <br>no solo síntomas.
          </h1>

          <p class="max-w-170 text-center text-[18px] text-[#6D6C6A] leading-[1.6]">
            Desde 2009, CEFIRE Tlax se ha dedicado a ayudar a las personas a recuperar su movilidad, confianza y calidad de vida a través de fisioterapia personalizada y basada en evidencia.
          </p>

        </Reveal>
      </UContainer>
    </section>

    <section class="bg-[#f6f7f9] py-20">
      <UContainer class="flex flex-col items-center gap-8">

        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-primary text-[13px] font-semibold tracking-[2px]">NUESTRO VIAJE</span>
          <h2 class="text-[#1A1918] text-[40px] font-bold tracking-[-0.5px]">
          Construido con un propósito, impulsado por los resultados
          </h2>
          <p class="text-[#6D6C6A] text-[17px] leading-normal max-w-150 text-center">
            Lo que comenzó como una consulta de una sola habitación se ha convertido en un centro de rehabilitación de confianza, pero nuestra misión nunca ha cambiado.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-15 w-full">
          <div class="rounded-[20px] overflow-hidden shrink-0 bg-[#f6f7f9]">
            <img
              src="/images/about-1.jpeg"
              alt="Instalaciones de Cefire Fisioterapia en Tlaxcala"
              class="w-full h-[450px] object-cover"
              format="webp"
              loading="lazy"
  
            />
          </div>

          <div class="flex flex-col gap-7 flex-1">
            <Reveal
              v-for="milestone in milestones"
              :key="milestone.year"
              class="flex gap-5"
              :scale="0.80"
            >
              <div
                class="flex items-center justify-center rounded-lg px-3.5 py-1.5 shrink-0 h-fit"
                :class="milestone.year === '2009' ? 'bg-primary' : 'bg-[#c8e9f0]'"
              >
                <span
                  class="text-sm font-bold"
                  :class="milestone.year === '2009' ? 'text-white' : 'text-primary'"
                >
                  {{ milestone.year }}
                </span>
              </div>
              <div class="flex flex-col gap-1.5">
                <h3 class="text-[#1A1918] text-lg font-semibold">{{ milestone.title }}</h3>
                <p class="text-[#6D6C6A] text-sm leading-[1.6]">{{ milestone.description }}</p>
              </div>
            </Reveal>
            </div>
        </div>
       </UContainer>
    </section>


    <section class="bg-white py-20">
      <UContainer class="flex flex-col items-center gap-12">

        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-primary text-[13px] font-semibold tracking-[2px]">NUESTROS VALORES</span>
          <h2 class="text-[#1A1918] text-[40px] font-bold tracking-[-0.5px]">Lo que representamos</h2>
          <p class="text-[#6D6C6A] text-[17px] leading-normal max-w-150 text-center">
            Estos principios guían cada plan de tratamiento, cada interacción y cada resultado que buscamos.
          </p>
        </div>

        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Reveal
            v-for="(value, index) in values"
            :key="value.title"
            class="bg-[#f6f7f9] rounded-2xl p-7 flex flex-col gap-4"
            :delay="index * 120"
            :scale="0.95"
          >
            <div class="w-13 h-13 bg-[#c8e9f0] rounded-xl flex items-center justify-center shrink-0">
              <UIcon :name="value.icon" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-[#1A1918] text-xl font-semibold">{{ value.title }}</h3>
            <p class="text-[#6D6C6A] text-sm leading-[1.6]">{{ value.description }}</p>
          </Reveal>
        </div>
      </UContainer>

    </section>

    <section class="bg-[#1A1918] py-20">
      <UContainer class="flex flex-col items-center gap-12">
        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-[#c8e4f0] text-[13px] font-semibold tracking-[2px]">NUESTRO IMPACTO</span>
          <h2 class="text-white text-[40px] font-bold tracking-[-0.5px]">
            Los números hablan por nosotros
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-[#2A2928] rounded-2xl px-6 py-8 flex flex-col items-center gap-2"
          >
            <span class="text-primary text-[44px] font-bold tracking-[-1px]">
              <Reveal><CountUp :end="stat.number" :suffix="stat.suffix"/></Reveal>
            </span>
            <span class="text-[#9C9B99] text-[15px] font-medium text-center">{{ stat.label }}</span>
          </div>
        </div>
      </UContainer>
    </section>

  </UPage>
</template>