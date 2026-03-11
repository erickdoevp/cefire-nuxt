<script setup lang="ts">

useHead({
  title: 'About Us — CEFIRE TLAX',
  meta: [
    { name: 'description', content: 'Desde 2009, CEFIRE TLAX se ha dedicado a ayudar a las personas a recuperar su movilidad, confianza y calidad de vida.' }
  ]
});

const milestones = [
  {
    year: '2009',
    title: 'Fundada con una misión',
    description: 'LTFyR. Elliut Cruz empezó CEFIRE TLAX con una creencia simple: cada paciente merece un plan de recuperación diseñado en torno a su vida, no solo a su diagnóstico.'
  },
  {
    year: '2015',
    title: 'Ampliamos nuestras especialidades',
    description: 'Se agregaron programas de rehabilitación deportiva y recuperación posoperatoria, ampliando nuestro equipo a seis especialistas certificados.'
  },
  {
    year: '2023',
    title: 'Un centro comunitario',
    description: 'Con más de 1000 pacientes atendidos y unas instalaciones de última generación, seguimos marcando el estándar en atención compasiva y orientada a resultados.'
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
    title: 'Compassion Always',
    description: "La sanación no es solo física. Tratamos a cada paciente con empatía, paciencia y un cuidado genuino por su bienestar."
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Resultados duraderos',
    description: "No solo aliviamos el dolor: desarrollamos fuerza, movilidad y resiliencia para que usted se mantenga mejor para siempre."
  }
];

const stats = [
  { number: '1,000+', label: 'Pacientes tratados' },
  { number: '97%',    label: 'Satisfacción del paciente' },
  { number: '10+',    label: 'Años de experiencia' },
  { number: '15+',    label: 'Años combinados de experiencia' }
];

</script>

<template>
  <UPage>

    <section class="bg-white">
      <UContainer class="flex flex-col items-center gap-6 py-[100px]">
        <!-- Badge -->
        <UBadge
          icon="i-lucide-heart-pulse"
          variant="soft"
          class="mb-6 rounded-2xl px-3" 
        >
          NUESTRA HISTORIA
        </UBadge>

        <h1 class="max-w-[800px] text-center text-[52px] font-bold text-[#1A1918] leading-[1.1] tracking-[-1px]">
          Curando personas, <br>no solo síntomas.
        </h1>

        <p class="max-w-[680px] text-center text-[18px] text-[#6D6C6A] leading-[1.6]">
          Desde 2009, CEFIRE Tlax se ha dedicado a ayudar a las personas a recuperar su movilidad, confianza y calidad de vida a través de fisioterapia personalizada y basada en evidencia.
        </p>
      </UContainer>
    </section>

    <section class="bg-[#F5F4F1] py-20">
       <UContainer class="flex flex-col items-center gap-8">
        <div class="flex flex-col items-center gap-3 text-center">
            <span class="text-primary text-[13px] font-semibold tracking-[2px]">NUESTRA VIAJE</span>
            <h2 class="text-[#1A1918] text-[40px] font-bold tracking-[-0.5px]">
            Construido con un propósito, impulsado por los resultados
            </h2>
            <p class="text-[#6D6C6A] text-[17px] leading-[1.5] max-w-[600px] text-center">
              Construido con un propósito, impulsado por los resultados
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-[60px] w-full">
            <div class="rounded-[20px] overflow-hidden shrink-0 bg-[#E8E6E1]">
            <img
                src="/images/comience-hoy.jpg"
                alt="RestorePT clinic through the years"
                class="w-full h-full object-cover"
            />
            </div>

            <div class="flex flex-col gap-7 flex-1">
            <div
                v-for="milestone in milestones"
                :key="milestone.year"
                class="flex gap-5"
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
            </div>
            </div>
        </div>
       </UContainer>
    </section>


    <section class="bg-white py-20">
        <UContainer class="flex flex-col items-center gap-12">
            <div class="flex flex-col items-center gap-3 text-center">
                <span class="text-primary text-[13px] font-semibold tracking-[2px]">NUESTROS VALORES</span>
                <h2 class="text-[#1A1918] text-[40px] font-bold tracking-[-0.5px]">Lo que representamos</h2>
                <p class="text-[#6D6C6A] text-[17px] leading-[1.5] max-w-[600px] text-center">
                  Estos principios guían cada plan de tratamiento, cada interacción y cada resultado que buscamos.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
              <div
                v-for="value in values"
                :key="value.title"
                class="bg-[#F5F4F1] rounded-2xl p-7 flex flex-col gap-4"
                >
                <div class="w-[52px] h-[52px] bg-[#c8e9f0] rounded-xl flex items-center justify-center shrink-0">
                  <UIcon :name="value.icon" class="w-6 h-6 text-primary" />
                </div>
                <h3 class="text-[#1A1918] text-xl font-semibold">{{ value.title }}</h3>
                <p class="text-[#6D6C6A] text-sm leading-[1.6]">{{ value.description }}</p>
              </div>
            </div>
        </UContainer>

    </section>

    <section class="bg-[#1A1918] py-20">
      <UContainer class="flex flex-col items-center gap-12">
        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-[#c8e4f0] text-[13px] font-semibold tracking-[2px]">NUESTRA IMPACTO</span>
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
            <span class="text-primary text-[44px] font-bold tracking-[-1px]">{{ stat.number }}</span>
            <span class="text-[#9C9B99] text-[15px] font-medium text-center">{{ stat.label }}</span>
          </div>
        </div>
      </UContainer>
    </section>

  </UPage>
</template>