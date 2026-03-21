<script setup lang="ts">
import CountUp from '~/components/shared/CountUp.vue';
import Reveal from '~/components/shared/Reveal.vue';

// import { ref, onMounted, onUnmounted } from 'vue'

// Scroll + frame animation
// const videoSection = ref<HTMLElement | null>(null)
// const canvasEl = ref<HTMLCanvasElement | null>(null)
// const videoRadius = ref(24)

// const TOTAL_FRAMES = 121
// const frames: HTMLImageElement[] = []
// let rafId: number | null = null
// let targetProgress = 0

// function preloadFrames() {
//   for (let i = 30; i <= TOTAL_FRAMES; i++) {
//     const img = new Image()
//     img.src = `/frames/frame_${String(i).padStart(4, '0')}.jpg`
//     img.onload = () => {
//       if (i === 1) drawFrame(0)
//     }
//     frames[i - 1] = img
//   }
// }

// function drawFrame(progress: number) {
//   const canvas = canvasEl.value
//   if (!canvas) return
//   const idx = Math.min(Math.round(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
//   const img = frames[idx]
//   if (!img?.complete || !img.naturalWidth) return
//   const ctx = canvas.getContext('2d')
//   if (!ctx) return
//   if (canvas.width !== img.naturalWidth) {
//     canvas.width = img.naturalWidth
//     canvas.height = img.naturalHeight
//   }
//   ctx.drawImage(img, 0, 0)
// }

// function onScroll() {
//   const el = videoSection.value
//   if (!el) return
//   const rect = el.getBoundingClientRect()
//   const scrolled = -rect.top
//   targetProgress = Math.min(Math.max(scrolled / (el.offsetHeight - window.innerHeight), 0), 1)
//   videoRadius.value = 24 - targetProgress * 24
//   if (!rafId) rafId = requestAnimationFrame(onRaf)
// }

// function onRaf() {
//   rafId = null
//   drawFrame(targetProgress)
// }

// onMounted(() => {
//   preloadFrames()
//   window.addEventListener('scroll', onScroll, { passive: true })
// })
// onUnmounted(() => {
//   window.removeEventListener('scroll', onScroll)
//   if (rafId) cancelAnimationFrame(rafId)
// })

useSeoMeta({
  title: 'Cefire | Clínica de Fisioterapia en Tlaxcala',
  description: 'Fisioterapia experta con planes de recuperación personalizados. Rehabilitación deportiva, posoperatoria y alivio del dolor crónico. Más de 1,000 pacientes recuperados.',
  ogTitle: 'Cefire | Clínica de Fisioterapia en Tlaxcala',
  ogDescription: 'Recupera el movimiento con fisioterapia personalizada. Agenda tu valoración gratuita hoy.',
  ogImage: 'https://cefiretlx.com/images/comience-hoy.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  // canonical: 'https://cefiretlx.com',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Necesito una remisión de mi médico?',
            acceptedAnswer: { '@type': 'Answer', text: 'No se necesita referencia médica. Puede reservar directamente con nosotros. Sin embargo, algunos planes de seguro pueden requerirla; nuestro equipo de recepción puede ayudarle a verificar su cobertura.' },
          },
          {
            '@type': 'Question',
            name: '¿Qué debo esperar en mi primera visita?',
            acceptedAnswer: { '@type': 'Answer', text: 'Su primera sesión incluye una evaluación exhaustiva de su condición, patrones de movimiento y objetivos. Elaboraremos su plan de tratamiento y, a menudo, comenzaremos la terapia práctica el mismo día.' },
          },
          {
            '@type': 'Question',
            name: '¿Cuántas sesiones necesitaré?',
            acceptedAnswer: { '@type': 'Answer', text: 'Esto varía según la afección. La mayoría de los pacientes observan una mejora significativa en 6 a 12 sesiones. Le daremos un cronograma realista después de su evaluación inicial.' },
          },
          { 
            '@type': 'Question',
            name: '¿Cuáles son los beneficios de la fisioterapia?',
            acceptedAnswer: { '@type': 'Answer', text: 'La fisioterapia ofrece múltiples beneficios para la salud física y funcional, destacando el alivio del dolor (agudo o crónico), la recuperación de lesiones y cirugías, y la mejora de la movilidad, fuerza muscular y flexibilidad.' },
          },
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: 'Cefire Fisioterapia',
        description: 'Clínica de fisioterapia especializada en rehabilitación deportiva, recuperación posoperatoria y alivio del dolor crónico.',
        url: 'https://cefiretlx.com',
        telephone: '+522461370462',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Insurgentes 3, San Esteban Tizatlan',
          addressRegion: 'Tlaxcala',
          addressCountry: 'MX',
        },
        medicalSpecialty: 'PhysicalTherapy',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '1000',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de Fisioterapia',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Neurorehabilitación' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recuperación post parto' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Terapia ocupacional' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estimulación temprana' } },
          ],
        },
      }),
    },
  ],
})


const services = [
  {
    title: "Neurorehabilitación",
    description:
      "Recuperación de funciones motoras, neurológicas o deterioradas para mejorar la independencia y la calidad de vida ocasionadas por lesiones o enfermedades del sistema nervioso.",
    icon: "i-heroicons-heart",
    iconBg: "bg-green-100 text-green-600"
  },
  {
    title: "Recuperación post fractura",
    description:
      "Proceso integral para restaurar la funcionalidad y movilidad de la parte afectada, previniendo complicaciones a largo plazo ",
    icon: "material-symbols:hand-bones-outline",
    iconBg: "bg-orange-100 text-orange-600"
  },
  {
    title: "Terapia ocupacional",
    description:
      "Centrado en ayudar a participar de manera satisfactoria en las actividades de la vida diaria mediante la habilitación de sus capacidades o la de adaptación del entorno para facilitar su desempeño",
    icon: "i-heroicons-hand-raised",
    iconBg: "bg-purple-100 text-purple-600"
  },
  {
    title: "Estimulación temprana",
    description:
      "Actividades terapéuticas diseñadas para favorecer el desarrollo motor, cognitivo y sensorial en bebés y niños pequeños, potenciando sus habilidades desde los primeros años de vida.",
    icon: "ic:baseline-directions-walk",
    iconBg: "bg-blue-100 text-blue-600"
  }
];

const pathRecovery = [
  {
    title: "Valoración gratuita",
    description: "Reserve una valoración telefónica gratuita de 15 minutos para analizar su condición y sus objetivos con uno de nuestros especialistas.",
    iconBg: "bg-[#3D8A5A]"
  },
    {
    title: "Tratamiento personalizado",
    description: "Su terapeuta realiza una evaluación integral y diseña un plan de recuperación adaptado a sus necesidades únicas.",
    iconBg: "bg-[#D89575]"
  },
    {
    title: "Recuperación guiada",
    description: "Sesiones regulares con terapia práctica, ejercicios progresivos y apoyo continuo hasta alcanzar tus objetivos.",
    iconBg: "bg-[#4A7BB5]"
  },
];

const testimonials = [
  {
    user: {
      name: 'Juan Felipe',
      description: 'Marathon Runner',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/499550?v=4',
        alt: 'Evan You',
        loading: 'lazy' as const
      }
    },
    quote: `“Me fracturé tercio medio de peroné y en el hospital me dijeron que necesitaba cirugía y
     tenía que esperar más de 15 días en lo que tenían sala disponible, acudí a CEFIRE y después de 
     una valoración completa me dijeron que, si se evitaba la cirugía, seguí todas las indicaciones y
      el tratamiento indicado, después de 8 sesiones ya pude apoyar mi peso con ayuda de bota y
       muletas y regresé a laborar. “`
  },
    {
    user: {
      name: 'Juan',
      description: 'Marathon Runner',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/499550?v=4',
        alt: 'Evan You',
        loading: 'lazy' as const
      }
    },
    quote: `“Trabajo como conductor de transporte público y me apareció un dolor muy extremo en 
    la espalda baja, no podía manejar por el dolor tan fuerte, acudí con especialista en columna 
    y me diagnostico con hernia discal y me dijo que la única solución que tenía para recuperarme 
    era con una cirugía, en CEFIRE me dieron tratamiento en mi domicilio, fue larga la recuperación, 
    ahora puedo decir que regrese a trabajar y evite una cirugía.“`
  },
    {
    user: {
      name: 'Angélica Ruiz',
      description: 'Retired Teacher',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/499550?v=4',
        alt: 'Evan You',
        loading: 'lazy' as const
      }
    },
    quote: `
    ”Me fracture el codo Izquierdo en una caída y tuvieron que operarme retirándome el olecranon, 
      el dr. me indico reposo por 2 meses, al acudir a revisión quedé con el movimiento limitado, 
      no podía flexionar el codo para tomar agua, peinarme, ni tocarme la cara, 
      acudí a CEFIRE donde revisaron mis placas y me explicaron detalladamente el tratamiento que llevaría,
       al finalizar el tratamiento puedo doblar mi codo no completamente pero ya puedo peinarme, 
       tocar mi cara y hacer todas mis actividades sin ninguna restricción.”
    `
  },
];

const team = [
  {
    name:  'Maestrante Elliut Misael Cruz Trinidad',
    role:  'Terapeuta fisico',
    bio:   'Experto en el tratamiento del dolor crónico mediante terapia manual y enfoques basados ​​en la neurociencia.',
    image: '/images/fisio-elliut.jpeg',
  },
  {
    name:  'LTFR. Paloma Jatzidi Cruz Padilla',
    role:  'Terapeuta fisico',
    bio:   'Enfocada en la rehabilitación pediatrica mediante el juego y ejercicio terapeutico.',
    image: '/images/fisio-paloma.jpeg',
  },
  {
    name:  'Luna Yeray Cruz Padilla',
    role:  'Practicante en Terapia Fisica',
    bio:   'Dedicada a ayudar a los adultos mayores a mantener la movilidad, la independencia y un estilo de vida activo.',
    image: '/images/fisio-luna.jpeg',
  },
];

const faqs = [
  {
    label:   '¿Necesito una remisión de mi médico?',
    content: 'No se necesita referencia médica. Puede reservar directamente con nosotros. Sin embargo, algunos planes de seguro pueden requerirla; nuestro equipo de recepción puede ayudarle a verificar su cobertura.',
  },
  {
    label:   '¿Qué debo esperar en mi primera visita?',
    content: 'Su primera sesión incluye una evaluación exhaustiva de su condición, patrones de movimiento y objetivos. Elaboraremos su plan de tratamiento y, a menudo, comenzaremos la terapia práctica el mismo día.',
  },
  {
    label:   '¿Cuántas sesiones necesitaré?',
    content: 'Esto varía según la afección. La mayoría de los pacientes observan una mejora significativa en 6 a 12 sesiones. Le daremos un cronograma realista después de su evaluación inicial.',
  },
  {
    label:   '¿Qué debo llevar en mi primera sesión?',
    content: 'Ropa cómoda (pants, playera, licra, toalla).',
  },
  {
    label:   '¿Cuáles son los beneficios de la fisioterapia?',
    content: 'La fisioterapia ofrece múltiples beneficios para la salud física y funcional, destacando el alivio del dolor (agudo o crónico), la recuperación de lesiones y cirugías, y la mejora de la movilidad, fuerza muscular y flexibilidad.',
  },
];

</script>

<template>
  <UPage>

    <section class="relative min-h-auto md:min-h-[85vh] flex items-center overflow-hidden md:mx-4 md:mb-4 rounded-2xl">
      <!-- Imagen de fondo -->
      <img
        src="/images/instalaciones-1.jpeg"
        alt="Instalaciones Cefire"
        class="absolute inset-0 w-full h-full object-cover"
      >
      <!-- Overlay oscuro difuminado -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-xs" />

      <UContainer class="relative z-10 py-6 md:py-20">
        <div>
          <div>
            <!-- Badge -->
              <UBadge
                icon="i-lucide-heart"
                variant="soft"
                class="mb-6 rounded-2xl px-3 text-sm"
              >
                Más de 1000 pacientes confían en nosotros
              </UBadge>

            <!-- Title -->
              <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
                Restaura el Movimiento,
                <br>
                Recupera tu vida.
              </h1>

              <!-- Description -->
              <p class="text-gray-200 text-lg mb-8 w-175">
                Fisioterapia experta que va más allá del tratamiento. <br>
                Creamos planes de recuperación personalizados que te permiten
                volver a hacer lo que amas, sin dolor y con más fuerza que antes.
              </p>

            <!-- Buttons -->
            <div class="flex gap-4 mb-10">
              <UButton>
                <NuxtLink
                  target="_blank"
                  to="https://wa.me/522461370462?text=Hola%20quiero%20más%20información"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Reserva una valoración gratuita
                </NuxtLink>
              </UButton>

              <UButton
                variant="outline"
                size="lg"
                class="text-white border-white hover:bg-white/10"
              >
                <NuxtLink
                  to="/services"
                  size="lg"
                >
                  Conoce nuestros servicios
                </NuxtLink>
              </UButton>
            </div>

            <!-- Stats -->
            <div class="flex gap-10 text-sm">
              <div>
                <p class="text-2xl font-bold text-white">
                  <CountUp :end="10" suffix="+" :once="false"/>
                </p>
                <p class="text-gray-300">Años de experiencia</p>
              </div>

              <div>
                <p class="text-2xl font-bold text-white">
                  <CountUp :end="99" suffix="%" :once="false"/>
                </p>
                <p class="text-gray-300">Satisfacción del cliente</p>
              </div>

              <div>
                <p class="text-2xl font-bold text-white">
                  <CountUp :end="1000" suffix="+" :once="false"/>
                </p>
                <p class="text-gray-300">Pacientes Recuperados</p>
              </div>
            </div>

          </div>

        </div>
      </UContainer>
    </section>

    <!-- VIDEO SCROLL ANIMATION -->
    <!-- <section ref="videoSection" class="video-scroll-section">
      <div class="video-sticky">
        <canvas
          ref="canvasEl"
          class="video-el"
        />
      </div>
    </section> -->

    <section class="  py-20">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto mb-16">
          <p class="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            NUESTROS SERVICIOS
          </p>

          <h2 class="text-4xl font-bold mb-4">
            Atención especializada para cada necesidad
          </h2>

          <p class="text-gray-500">
           Desde la rehabilitación posoperatoria hasta el manejo del dolor crónico, nuestro enfoque basado en evidencia ofrece resultados duraderos.
          </p>
        </div>
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Reveal 
            v-for="(service, index) in services"
            :key="service.title"
            :once="false"
            :delay="index * 120"
            :scale="0.95"
            >
            <UCard class="rounded-2xl h-full">
              <div class="flex flex-col gap-4">
                <div
                  class="w-12 h-12 rounded-xl flex items-center justify-center"
                  :class="service.iconBg"
                >
                  <UIcon :name="service.icon" class="text-xl"/>
                </div>
                <h3 class="font-semibold text-lg">
                  {{ service.title }}
                </h3>
                <p class="text-gray-500 text-sm">
                  {{ service.description }}
                </p>
              </div>
            </UCard>
          </Reveal>
         </div>
       </UContainer>
    </section>

    <section class="bg-[#f6f7f9] py-20">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto">

          <p class="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            CÓMO FUNCIONA
          </p>
          <h2 class="text-4xl font-bold mb-4">
            Tu camino hacia la recuperación
          </h2>
          <p class="text-gray-500 mb-12">
            Tres pasos sencillos para que vuelvas a moverte, sin necesidad de recomendación.
          </p>

          
        </div>
        <div class="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          <div 
            v-for="(path, index) in pathRecovery" 
            :key='index'
            >
            <div class="flex flex-col gap-4 items-center">
              <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="path.iconBg">
                <span class="text-white">{{ index + 1 }}</span>
              </div>
              <h3 class="font-semibold text-lg text-center">{{ path.title }}</h3>
              <p class="text-gray-500 text-sm text-center">{{ path.description }}</p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>


    <section class="bg-[#1A1918] py-20">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto mb-16">
          <p class="text-sm font-semibold text-[#c8e4f0] tracking-widest uppercase mb-3">
            HISTORIAS DE PACIENTES
          </p>
          <h2 class="text-4xl font-bold mb-4 text-white">
            Escuche a nuestros rehabilitados
          </h2>
        </div>
        <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          <Reveal 
            v-for="(testimonial, i) in testimonials" 
            :key='testimonial.user.name' 
            class="bg-[#2A2928] flex flex-col gap-4 p-5 rounded-2xl h-fit"
            :once="false"
            :delay="i * 120"
            >
            <p class="text-white text-sm">{{ testimonial.quote }}</p>
            <UUser v-bind="testimonial.user">
              <template #name>
                <span class="text-white">{{ testimonial.user.name }}</span>
              </template>
            </UUser>
          </Reveal>
        </div>
      </UContainer>
    </section>

    <section class="py-20 bg-[#f6f7f9]">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto mb-16">
          <!-- <Reveal 
            :duration="800"
            > -->
            <p class="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              NUESTRO EQUIPO
            </p>
            
            <h2 class="text-4xl font-bold mb-4">
              Conoce a tus Fisioterapeutas
            </h2>
            <p class="text-gray-500">
              Especialistas certificados con más de 15 años de experiencia clínica combinada.
            </p>
          <!-- </Reveal> -->
        </div>
 
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <Reveal
            v-for="(member, i) in team"
            :key="member.name"
            class="flex flex-col items-center gap-4"
            :once="false"
            :scale="0.95"
            :delay="i * 120"
          >
            
            <div class="w-full h-80 rounded-2xl overflow-hidden">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover"
                width="400"
                height="320"
                loading="lazy"
                format="webp"
              >
            </div>

            <!-- Info -->
            <h3 class="text-[20px] font-semibold text-[#1A1918] text-center">{{ member.name }}</h3>
            <p class="text-[14px] font-medium text-primary text-center -mt-2">{{ member.role }}</p>
            <p class="text-[14px] text-[#6D6C6A] leading-[1.6] text-center">{{ member.bio }}</p>
          </Reveal>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-20">
      <UContainer class="flex flex-col items-center gap-12">
        <!-- Encabezado -->
         <!-- <Reveal 
          :scale="0.98" 
          :once="false"> -->
          <div class="flex flex-col items-center text-center">
            <span class="text-sm font-semibold text-primary tracking-widest uppercase mb-3">FAQ</span>
            <h2 class="text-4xl font-bold mb-4">Preguntas frecuentes</h2>
          </div>
        <!-- </Reveal> -->

        <!-- Acordeón -->
        <UAccordion
          :items="faqs"
          :ui="{
            item: 'border-b border-[#E5E4E1] py-1',
            label: 'text-[17px] font-semibold text-[#1A1918] text-left',
            content: 'text-[15px] text-[#6D6C6A] leading-[1.6] pt-3 pb-1',
            trailingIcon: 'text-[#9C9B99] size-5',
          }"
          class="w-full"
        />
      </UContainer>
    </section>

  </UPage>
  
</template>

<style scoped>
.card-healed {
  border-color: transparent !important;
  background-color: #2A2928;
}

/* Scroll-driven video animation */
.video-scroll-section {
  height: 250vh;
  position: relative;
}

.video-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

.video-el {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: border-radius;
}
</style>