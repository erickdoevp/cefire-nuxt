<script setup lang="ts">

const services = [
  {
    id: 'sports',
    icon: 'i-lucide-activity',
    accentColor: '#3D8A5A',
    accentBg: '#C8F0D8',
    label: 'REHABILITACIÓN DEPORTIVA',
    title: 'Vuelve al juego, más fuerte que antes',
    description:
      "Nuestros programas de recuperación específicos para cada deporte están diseñados para atletas de todos los niveles, desde deportistas de fin de semana hasta profesionales de competición. No solo te ayudamos a recuperar tu nivel inicial, sino que te ayudamos a superarlo.",
    bullets: [
      'Protocolos de rehabilitación del ligamento cruzado anterior (LCA), ligamento colateral medial (LCM) y menisco',
      'Pruebas y autorización de regreso al deporte',
      'Mejora del rendimiento y prevención de lesiones',
      'Análisis del movimiento específico del deporte',
    ],
    image: '/images/equipo-medico1.jpg',
    imagePosition: 'left',
    sectionBg: 'bg-[#F5F4F1]',
  },
  {
    id: 'post-surgery',
    icon: 'i-lucide-bone',
    accentColor: '#D89575',
    accentBg: '#F5E6DC',
    label: 'RECUPERACIÓN POST-CIRUGÍA',
    title: 'Reconstruir la fuerza, restaurar la confianza',
    description:
      'La cirugía es solo la mitad del camino. Nuestros programas de rehabilitación estructurados le guiarán en cada fase de la recuperación, recuperando de forma segura la fuerza, la amplitud de movimiento y la confianza para volver a moverse con libertad.',
    bullets: [
      'Recuperación del reemplazo total de rodilla y cadera',
      'Rehabilitación para la reparación del manguito rotador y del hombro',
      'Recuperación de cirugía de columna y laminectomía',
      'Planes de tratamiento progresivos basados ​​en hitos',
    ],
    image: '/images/equipo-medico1.jpg',
    imagePosition: 'right',
    sectionBg: 'bg-white',
  },
  {
    id: 'chronic-pain',
    icon: 'i-lucide-hand',
    accentColor: '#7C5DAF',
    accentBg: '#E8E0F5',
    label: 'Alivio del dolor crónico',
    title: 'Libérate del dolor persistente',
    description:
      "El dolor crónico no tiene por qué definir tu vida. Nuestro enfoque multifacético combina terapia práctica, ejercicios específicos y educación para abordar el dolor desde su origen, no solo enmascarar los síntomas.",
    bullets: [
      'Terapia manual y movilización articular',
      'Punción seca y liberación de puntos gatillo',
      'Punción seca y liberación de puntos gatillo.',
      'Educación sobre la ciencia del dolor y estrategias de autogestión',
    ],
    image: '/images/equipo-medico1.jpg',
    imagePosition: 'left',
    sectionBg: 'bg-[#F5F4F1]',
  },
  {
    id: 'mobility',
    icon: 'i-lucide-stretch-horizontal',
    accentColor: '#4A7BB5',
    accentBg: '#DCE8F5',
    label: 'MOVILIDAD Y BIENESTAR',
    title: 'Muévete mejor, \nvive mejor',
    description:
      'La prevención es la mejor medicina. Nuestros programas de movilidad y bienestar le ayudan a desarrollar fuerza funcional, mejorar el equilibrio y mantener un estilo de vida activo en cada etapa de su vida.',
    bullets: [
      'Evaluación y corrección del movimiento funcional',
      'Entrenamiento de equilibrio y prevención de caídas',
      'Programas de flexibilidad y rango de movimiento',
      'Evaluación ergonómica y bienestar en el trabajo',
    ],
    image: '/images/equipo-medico1.jpg',
    imagePosition: 'right',
    sectionBg: 'bg-white',
  },
];

const whyCards = [
  {
    icon: 'i-lucide-clipboard-check',
    title: 'Planes personalizados',
    description:
      'Planes personalizados. Sin protocolos predefinidos. Cada plan de tratamiento se adapta a tu condición, objetivos y estilo de vida específicos.',
  },
  {
    icon: 'i-lucide-award',
    title: 'Equipo certificado por la junta',
    description:
      'Nuestros especialistas cuentan con certificaciones avanzadas en fisioterapia ortopédica, deportiva y neurológica.',
  },
  {
    icon: 'i-lucide-timer',
    title: 'Horario flexible',
    description:
      'Citas en la misma semana, horarios temprano por la mañana y por la tarde, y no se necesita derivación para comenzar.',
  },
];

</script>

<template>
  <UPage class="font-[Outfit] bg-[#F5F4F1]">

    <!-- ─── HERO ─────────────────────────────────────────────────── -->
    <section class="bg-white flex flex-col items-center gap-6 py-[100px]">
      <!-- Badge -->
      <UBadge
        icon="i-lucide-stethoscope"
        variant="soft"
        class="mb-6 rounded-2xl px-3" 
      >
        LO QUE HACEMOS
      </UBadge>

      <h1 class="max-w-[800px] text-center text-[52px] font-bold text-[#1A1918] leading-[1.1] tracking-[-1px]">
      Atención experta, <br/> adaptada a su recuperación.
      </h1>

      <p class="max-w-[680px] text-center text-[18px] text-[#6D6C6A] leading-[1.6]">
        Desde atletas que regresan a la competición hasta pacientes que se recuperan tras una cirugía,
        ofrecemos fisioterapia especializada y basada en la evidencia para cada etapa de su proceso.
      </p>
    </section>

    <!-- ─── SERVICE SECTIONS (alternadas) ────────────────────────── -->
    <section
      v-for="service in services"
      :key="service.id"
      :class="[service.sectionBg, 'py-20']"
    >
      <UContainer class="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
        <!-- Imagen a la izquierda -->
        <div
          v-if="service.imagePosition === 'left'"
          class="flex-shrink-0 rounded-[20px] overflow-hidden order-last md:order-first"
        >
          <NuxtImg
            :src="service.image"
            :alt="service.label"
            class="w-full h-full object-cover"
            width="560"
            height="420"
          />
        </div>

        <!-- Contenido de texto -->
        <div class="flex flex-col gap-6 flex-1 min-w-0">
          <!-- Ícono + etiqueta -->
          <div class="flex items-center gap-3">
            <div
              class="size-11 rounded-xl flex items-center justify-center flex-shrink-0"
              :style="{ backgroundColor: service.accentBg }"
            >
              <UIcon :name="service.icon" class="size-[22px]" :style="{ color: service.accentColor }" />
            </div>
            <span class="text-[13px] font-semibold tracking-[2px]" :style="{ color: service.accentColor }">
              {{ service.label }}
            </span>
          </div>

          <h2 class="text-[36px] font-bold text-[#1A1918] leading-[1.15] tracking-[-0.5px] whitespace-pre-line">
            {{ service.title }}
          </h2>

          <p class="text-[16px] text-[#6D6C6A] leading-[1.6]">
            {{ service.description }}
          </p>

          <ul class="flex flex-col gap-3.5">
            <li v-for="bullet in service.bullets" :key="bullet" class="flex items-start gap-2.5">
              <UIcon
                name="i-lucide-circle-check"
                class="size-[18px] mt-0.5 flex-shrink-0"
                :style="{ color: service.accentColor }"
              />
              <span class="text-[14px] text-[#6D6C6A] leading-[1.5]">{{ bullet }}</span>
            </li>
          </ul>
        </div>

        <!-- Imagen a la derecha -->
        <div
          v-if="service.imagePosition === 'right'"
          class="flex-shrink-0 rounded-[20px] overflow-hidden"
        >
          <NuxtImg
            :src="service.image"
            :alt="service.label"
            class="w-full h-full object-cover"
            width="560"
            height="420"
          />
        </div>

      </UContainer>
    </section>

    <!-- ─── WHY CHOOSE US ─────────────────────────────────────────── -->
    <section class="bg-[#1A1918] py-20">
      <UContainer class="flex flex-col items-center gap-12">
        <!-- Encabezado -->
        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-[#c8e4f0] text-[13px] font-semibold tracking-[2px]">PORQUÉ CEFIRE TLAX</span>
          <h2 class="text-[40px] font-bold text-white tracking-[-0.5px]">Lo que nos distingue</h2>
          <p class="max-w-[600px] text-[17px] text-[#9C9B99] leading-[1.5]">
            Combinamos la excelencia clínica con la compasión genuina para ofrecer resultados duraderos.
          </p>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <UCard
            v-for="card in whyCards"
            :key="card.title"
            class="bg-[#2A2928] ring-0 border-0 rounded-2xl"
            :ui="{ body: 'p-7' }"
          >
            <div class="flex flex-col gap-4">
              <UIcon :name="card.icon" class="text-primary size-7" />
              <h3 class="text-[18px] font-semibold text-white">{{ card.title }}</h3>
              <p class="text-[14px] text-[#9C9B99] leading-[1.6]">{{ card.description }}</p>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>
  
  </UPage>
</template>
