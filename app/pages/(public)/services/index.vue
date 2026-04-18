<script setup lang="ts">
import Reveal from '~/components/shared/Reveal.vue';


useSeoMeta({
  title: 'Servicios | Neurorehabilitación, Terapia Ocupacional y más — Cefire Tlaxcala',
  description: 'Neurorehabilitación, recuperación post fractura, terapia ocupacional y estimulación temprana. Fisioterapia especializada y basada en evidencia en Tlaxcala.',
  ogTitle: 'Servicios de Fisioterapia — Cefire',
  ogDescription: 'Atención experta adaptada a tu recuperación: neurorehabilitación, post fractura, terapia ocupacional y estimulación temprana.',
  ogImage: 'https://cefiretlx.com/images/neurorehabilitacion.jpeg',
  ogType: 'website',
  ogUrl: 'https://cefiretlx.com/services',
  ogLocale: 'es_MX',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Servicios de Fisioterapia — Cefire',
  twitterDescription: 'Atención experta adaptada a tu recuperación: neurorehabilitación, post fractura, terapia ocupacional y estimulación temprana.',
  twitterImage: 'https://cefiretlx.com/images/neurorehabilitacion.jpeg',
  canonical: 'https://cefiretlx.com/services',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Servicios de Fisioterapia — Cefire',
        url: 'https://cefiretlx.com/services',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Neurorehabilitación',          url: 'https://cefiretlx.com/services#neurorehabilitation' },
          { '@type': 'ListItem', position: 2, name: 'Recuperación Post Fractura',   url: 'https://cefiretlx.com/services#fracture-recovery'   },
          { '@type': 'ListItem', position: 3, name: 'Terapia Ocupacional',          url: 'https://cefiretlx.com/services#occupational-therapy' },
          { '@type': 'ListItem', position: 4, name: 'Estimulación Temprana',        url: 'https://cefiretlx.com/services#early-stimulation'   },
          { '@type': 'ListItem', position: 5, name: 'Columna Vertebral',            url: 'https://cefiretlx.com/services#spine-recovery'       },
          { '@type': 'ListItem', position: 6, name: 'Electrolipólisis',             url: 'https://cefiretlx.com/services#electrolipolysis'     },
          { '@type': 'ListItem', position: 7, name: 'Terapia del Deporte',          url: 'https://cefiretlx.com/services#sports-therapy'        },
          { '@type': 'ListItem', position: 8, name: 'Fisioterapia Ortopédica',      url: 'https://cefiretlx.com/services#orthopedic-therapy'     },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cefiretlx.com' },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://cefiretlx.com/services' },
        ],
      }),
    },
  ],
})

const services = [
  {
    id: 'neurorehabilitation',
    icon: 'i-lucide-brain',
    accentColor: '#3D8A5A',
    accentBg: '#C8F0D8',
    label: 'NEUROREHABILITACIÓN',
    title: 'Recupera el control de tu cuerpo y tu movimiento',
    description:
      'Nuestro programa de neurorehabilitación está diseñado para personas que han sufrido lesiones o enfermedades neurológicas. A través de técnicas especializadas, trabajamos para restablecer la función motora, el equilibrio y la coordinación, mejorando la calidad de vida de cada paciente.',
    bullets: [
      'Rehabilitación post-ACV (accidente cerebrovascular)',
      'Tratamiento de enfermedades neurodegenerativas (Parkinson, esclerosis múltiple)',
      'Reeducación de la marcha y el equilibrio',
      'Estimulación neuromuscular y plasticidad cerebral',
    ],
    image: '/images/neurorehabilitacion.jpeg',
    imagePosition: 'left',
    sectionBg: 'bg-[#f6f7f9]',
  },
  {
    id: 'fracture-recovery',
    icon: 'i-lucide-bone',
    accentColor: '#D89575',
    accentBg: '#F5E6DC',
    label: 'RECUPERACIÓN POST FRACTURA',
    title: 'Reconstruye tu fuerza, paso a paso',
    description:
      'Una fractura puede detener tu vida, pero con el tratamiento adecuado puedes recuperarte de forma segura y efectiva. Nuestros fisioterapeutas te acompañan en cada etapa, desde la inmovilización hasta el retorno completo a tus actividades cotidianas.',
    bullets: [
      'Reducción del edema y manejo del dolor post-fractura',
      'Recuperación de movilidad articular y fuerza muscular',
      'Rehabilitación de fracturas de cadera, muñeca, tobillo y columna',
      'Planes progresivos adaptados a cada fase de consolidación ósea',
    ],
    image: '/images/post-fractura.jpeg',
    imagePosition: 'right',
    sectionBg: 'bg-white',
  },
  {
    id: 'occupational-therapy',
    icon: 'i-lucide-hand',
    accentColor: '#7C5DAF',
    accentBg: '#E8E0F5',
    label: 'TERAPIA OCUPACIONAL',
    title: 'Vuelve a hacer lo que más importa',
    description:
      'La terapia ocupacional te ayuda a retomar las actividades de la vida diaria con mayor autonomía e independencia. Trabajamos en las habilidades funcionales necesarias para el hogar, el trabajo y el tiempo libre, adaptando el entorno y las tareas a tus capacidades.',
    bullets: [
      'Evaluación y entrenamiento en actividades de la vida diaria',
      'Adaptación de entornos para mayor autonomía',
      'Rehabilitación de mano y miembro superior',
      'Integración sensorial y habilidades cognitivas',
    ],
    image: '/images/terapia-ocupacional1.jpeg',
    imagePosition: 'left',
    sectionBg: 'bg-[#f6f7f9]',
  },
  {
    id: 'early-stimulation',
    icon: 'i-lucide-baby',
    accentColor: '#4A7BB5',
    accentBg: '#DCE8F5',
    label: 'ESTIMULACIÓN TEMPRANA',
    title: 'Un inicio sólido para un desarrollo pleno',
    description:
      'La estimulación temprana potencia el desarrollo motor, sensorial y cognitivo de los niños en sus primeros años de vida. Nuestro equipo trabaja de manera lúdica y afectiva para favorecer el máximo potencial de cada pequeño, detectando y atendiendo de forma oportuna cualquier retraso en el desarrollo.',
    bullets: [
      'Estimulación del desarrollo psicomotor en bebés y niños',
      'Atención a retrasos en el desarrollo y tono muscular bajo',
      'Trabajo coordinado con padres y cuidadores',
      'Detección temprana de alteraciones del neurodesarrollo',
    ],
    image: '/images/estimulacion-temprana.jpeg',
    imagePosition: 'right',
    sectionBg: 'bg-white',
  },
  {
    id: 'spine-recovery',
    icon: 'healthicons:spine-outline',
    accentColor: '#C0782A',
    accentBg: '#F7EADB',
    label: 'COLUMNA VERTEBRAL',
    title: 'Recupera tu espalda, recupera tu vida',
    description:
      'Los problemas de columna pueden limitar seriamente tu movilidad y bienestar. Nuestro equipo especializado evalúa y trata hernias discales, escoliosis, lumbalgias y otras alteraciones vertebrales con técnicas basadas en evidencia, reduciendo el dolor y devolviendo la funcionalidad.',
    bullets: [
      'Tratamiento de hernia discal, lumbalgia y cervicalgia',
      'Terapia manual y movilización vertebral',
      'Ejercicio terapéutico para estabilización de columna',
      'Manejo conservador de escoliosis y estenosis espinal',
    ],
    image: '/images/columna.jpeg',
    imagePosition: 'left',
    sectionBg: 'bg-[#f6f7f9]',
  },
  {
    id: 'electrolipolysis',
    icon: 'i-lucide-zap',
    accentColor: '#2A7DC0',
    accentBg: '#DBE9F7',
    label: 'ELECTROLIPÓLISIS',
    title: 'Tratamiento estetico',
    description:
      'La electrolipólisis es una técnica estética diseñada para combatir la celulitis y la grasa localizada en zonas difíciles como muslos, glúteos, caderas y abdomen. Su objetivo principal es estimular la circulación sanguínea, favorecer el drenaje de los depósitos de grasa y mejorar la tonificación de la piel, logrando una reducción de volumen y reafirmación de los tejidos.',
    bullets: [
      '⁠Reducción de grasa localizada y volumen corporal',
      'Mejora la circulación sanguínea y linfática',
      '⁠Tonifica y reafirma la piel',
      '⁠Elimina toxinas y mejora la apariencia de celulitis',
    ],
    image: '/images/electropiolisis.jpeg',
    imagePosition: 'right',
    sectionBg: 'bg-white',
  },
  {
    id: 'sports-therapy',
    icon: 'i-lucide-dumbbell',
    accentColor: '#1E7A4A',
    accentBg: '#C6EDD8',
    label: 'TERAPIA DEL DEPORTE',
    title: 'Regresa a tu deporte en tu mejor nivel',
    description:
      'La terapia del deporte está orientada a la prevención, evaluación y rehabilitación de lesiones deportivas. Trabajamos contigo para que recuperes el rendimiento óptimo de forma segura, minimizando el riesgo de recaída y potenciando tus capacidades físicas.',
    bullets: [
      'Rehabilitación de esguinces, desgarros y lesiones musculares',
      'Recuperación post-quirúrgica de ligamentos (LCA, manguito rotador)',
      'Programas de retorno al deporte progresivo y seguro',
      'Prevención de lesiones y acondicionamiento físico terapéutico',
    ],
    image: '/images/terapia-deporte.jpeg',
    imagePosition: 'left',
    sectionBg: 'bg-[#f6f7f9]',
  },
  {
    id: 'orthopedic-therapy',
    icon: 'i-lucide-activity',
    accentColor: '#A04030',
    accentBg: '#F5DDD8',
    label: 'FISIOTERAPIA ORTOPÉDICA',
    title: 'Muévete sin dolor, vive sin límites',
    description:
      'La fisioterapia ortopédica se enfoca en el diagnóstico y tratamiento de lesiones del sistema musculoesquelético: huesos, articulaciones, músculos, tendones y ligamentos. Nuestro equipo aplica técnicas manuales y ejercicio terapéutico para restaurar la función y aliviar el dolor de forma duradera.',
    bullets: [
      'Tratamiento de tendinitis, bursitis y síndromes de sobreuso',
      'Rehabilitación pre y post operatoria de rodilla, cadera y hombro',
      'Terapia manual articular y de tejidos blandos',
      'Fortalecimiento y estabilización articular progresiva',
    ],
    image: '/images/fisioterapia-ortopedica.jpeg',
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
    title: 'Equipo certificado',
    description:
      'Nuestros especialistas cuentan con certificaciones avanzadas en fisioterapia ortopédica, deportiva y neurológica.',
  },
  {
    icon: 'i-lucide-timer',
    title: 'Horario de atención',
    description:
      'Lunes a Viernes 08:00 a 20:00 y Sábados 08:00 a 12:00',
  },
];

</script>

<template>
  <UPage class="font-[Outfit] bg-[#F5F4F1]">

    <section class="bg-white h-auto md:h-100 py-8 md:py-10">
      <UContainer>

        <div class="flex justify-center">
          <UBadge
            icon="i-lucide-stethoscope"
            variant="soft"
            class="mb-6 rounded-2xl px-3 text-sm" 
          >
            LO QUE HACEMOS
          </UBadge>
        </div>

        <Reveal
          :scale="0.8"  
          :duration="800"
          class="flex flex-col items-center gap-6"
        >

          <h1 class="max-w-200 text-center text-[52px] font-bold text-[#1A1918] leading-[1.1] tracking-[-1px]">
            Atención experta, <br> adaptada a su recuperación.
          </h1>

          <p class="max-w-170 text-center text-[18px] text-[#6D6C6A] leading-[1.6]">
            Desde atletas que regresan a la competición hasta pacientes que se recuperan tras una cirugía,
            ofrecemos fisioterapia especializada y basada en la evidencia para cada etapa de su proceso.
          </p>
        </Reveal>

      </UContainer>
    </section>

    <!-- ─── SERVICE SECTIONS (alternadas) ────────────────────────── -->
    <section
      v-for="service in services"
      :key="service.id"
      :id="service.id"
      :class="[service.sectionBg, 'py-20']"
    >
      <UContainer class="grid grid-cols-1 md:grid-cols-2 gap-15">
        <!-- Imagen a la izquierda -->
        <div
          v-if="service.imagePosition === 'left'"
          class="shrink-0 overflow-hidden order-last md:order-first"
        >
          <NuxtImg
            :loading="service.id === 'sports' ? 'eager' : 'lazy'"
            :src="service.image"
            :alt="`Fisioterapeuta realizando ${service.label.toLowerCase()} en Cefire`"
            format="webp"
            height="800"
            width="1200"
            quality="80"
            class="bject-cover rounded-[20px]"
          />
        </div>

        <!-- Contenido de texto -->
        <div class="flex flex-col gap-6 flex-1 min-w-0">
          <!-- Ícono + etiqueta -->
          <div class="flex items-center gap-3">
            <div
              class="size-11 rounded-xl flex items-center justify-center shrink-0"
              :style="{ backgroundColor: service.accentBg }"
            >
              <UIcon :name="service.icon" class="size-5.5" :style="{ color: service.accentColor }" />
            </div>
            <span class="text-[20px] font-semibold tracking-[2px]" :style="{ color: service.accentColor }">
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
                class="size-4.5 mt-0.5 shrink-0"
                :style="{ color: service.accentColor }"
              />
              <span class="text-[14px] text-[#6D6C6A] leading-normal">{{ bullet }}</span>
            </li>
          </ul>
        </div>

        <!-- Imagen a la derecha -->
        <div
          v-if="service.imagePosition === 'right'"
          class="shrink-0 overflow-hidden"
        >
          <NuxtImg
            :src="service.image"
            :alt="`Fisioterapeuta realizando ${service.label.toLowerCase()} en Cefire`"
            class="bject-cover rounded-[20px]"
            format="webp"
            height="800"
            width="1200"
            quality="80"
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
          <p class="max-w-150 text-[17px] text-[#9C9B99] leading-normal">
            Combinamos la excelencia clínica con la compasión genuina para ofrecer resultados duraderos.
          </p>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <Reveal
            v-for="(card, i) in whyCards"
            :key="card.title"
            :delay="i * 120"
          >
            <UCard
              :ui="{ body: 'p-7' }"
              class="bg-[#2A2928] ring-0 border-0 rounded-2xl"
            >
              <div class="flex flex-col gap-4">
                <UIcon :name="card.icon" class="text-primary size-7" />
                <h3 class="text-[18px] font-semibold text-white">{{ card.title }}</h3>
                <p class="text-[14px] text-[#9C9B99] leading-[1.6]">{{ card.description }}</p>
              </div>
            </UCard>
          </Reveal>
        </div>
      </UContainer>
    </section>
  
  </UPage>
</template>
