<script setup lang="ts">
import CountUp from '~/components/shared/CountUp.vue';
import Reveal from '~/components/shared/Reveal.vue';

useSeoMeta({
  title: 'Cefire | Clínica de Fisioterapia en Tlaxcala',
  description: 'Fisioterapia experta con planes de recuperación personalizados. Rehabilitación deportiva, posoperatoria y alivio del dolor crónico. Más de 1,000 pacientes recuperados.',
  ogTitle: 'Cefire | Clínica de Fisioterapia en Tlaxcala',
  ogDescription: 'Recupera el movimiento con fisioterapia personalizada. Agenda tu valoración gratuita hoy.',
  ogImage: 'https://cefiretlx.com/images/comience-hoy.jpg',
  ogType: 'website',
  ogUrl: 'https://cefiretlx.com',
  ogLocale: 'es_MX',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Cefire | Clínica de Fisioterapia en Tlaxcala',
  twitterDescription: 'Recupera el movimiento con fisioterapia personalizada. Agenda tu valoración gratuita hoy.',
  twitterImage: 'https://cefiretlx.com/images/comience-hoy.jpg',
  canonical: 'https://cefiretlx.com',
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
            acceptedAnswer: { '@type': 'Answer', text: 'No se necesita referencia médica. Puede reservar directamente con nosotros.' },
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
          addressLocality: 'San Esteban Tizatlan',
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
    description: "Reserve una valoración telefónica gratuita, para analizar su condición y sus objetivos con uno de nuestros especialistas.",
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
      name: 'Angelica Ruiz',
      description: 'Auxiliar administrativo',
      avatar: {
        src: '/images/angelica-ruiz.jpeg',
        alt: 'Angelica Ruiz',
        loading: 'lazy' as const
      }
    },
    quote: `“Me fracture el codo Izquierdo en una caída y tuvieron que operarme retirándome 
      el olecranon, el dr. me indico reposo por 2 meses, al acudir a revisión quedé con el movimiento
       limitado, no podía flexionar el codo para tomar agua, peinarme, ni tocarme la cara, 
       acudí a CEFIRE donde revisaron mis placas y me explicaron detalladamente el tratamiento 
       que llevaría, al finalizar el tratamiento puedo doblar mi codo no completamente pero 
       ya puedo peinarme, tocar mi cara y hacer todas mis actividades sin ninguna restricción.“`
  },
  {
    user: {
      name: 'Abigail Castillo',
      description: 'Licenciada en educación',
      avatar: {
        src: '/images/abigail-castillo.jpeg',
        alt: 'Evan You',
        loading: 'lazy' as const
      }
    },
    quote: `“Me luxe el hombro jalando un objeto pesado, Acudí con médico y me dio tratamiento farmacológico 
    y que inmovilizara el hombro con un cabestrillo, al pasar los días me dolía más y acudí a cefire, 
    ellos me dijeron que no es bueno tener inmovilizado la articulación porque se puede presentar fibrosis y
     disminuir el arco de movilidad que fue lo que me paso por estar sin movimiento, me realizaron un tratamiento
      dirigido al dolor y  muchos estiramientos y ejercicios terapéuticos que me permitieron recuperar mis arcos 
      de movilidad y fuerza, ha pasado un año desde mi tratamiento y puedo realizar todas mis actividades
       sin ningún problema.“`
  },
    {
    user: {
      name: 'Mariel Ahuatzin',
      description: 'Chef',
      avatar: {
        src: '/images/mariel.jpeg',
        alt: 'Mariel',
        loading: 'lazy' as const
      }
    },
    quote: `
    ”Padezco de dolor crónico en la espalda, 
    servicio médico solo me trataban con medicamentos y me sentía bien pero 
    el dolor volvía a presentarse al terminar el efecto, acudí a cefire y después de 
    una valoración completa me dijeron que tengo escoliosis dorsal, me trataron el dolor con 
    electroterapia y masoterapia, para la desviación de columna me hicieron una serie de ejercicios 
    terapéuticos para evitar que siga desviando mi columna, el dolor disminuyo considerablemente y 
    ahora puedo trabajar sin molestias.”
    `
  },
];

const team = [
  {
    name:  'LTFR. Elliut Misael Cruz Trinidad',
    role:  'Maestrante en Neurorehabilitación',
    bio:   'Experto en el tratamiento del dolor crónico mediante terapia manual y enfoques basados ​​en la neurociencia.',
    image: '/images/fisio-elliut.jpeg',
  },
  {
    name:  'LTFR. Paloma Jatzidi Cruz Padilla',
    role:  'Terapeuta Fisico',
    bio:   'Enfocada en la rehabilitación pediatrica mediante el juego y ejercicio terapeutico.',
    image: '/images/fisio-paloma.jpeg',
  },
  {
    name:  'Luna Yeray Cruz Padilla',
    role:  'Practicante en Terapia Fisica',
    bio:   'Dedicada a ayudar a los adultos mayores a mantener la movilidad, la independencia y un estilo de vida activo.',
    image: '/images/fisio-yeray.jpeg',
  },
];

const faqs = [
  {
    label:   '¿Necesito una remisión de mi médico?',
    content: 'No se necesita referencia médica. Puede reservar directamente con nosotros.',
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
  {
    label:   '¿Cuánto dura una sesión?',
    content: 'Cada sesión tiene una duración aproximada de no menos de 1 hora. El tiempo puede variar según el tipo de tratamiento y las necesidades específicas de cada paciente. Todas nuestras sesiones son completamente personalizadas.',
  },
  {
    label:   '¿Cuáles son las formas de pago?',
    content: 'Aceptamos efectivo y transferencia bancaria. El pago se realiza al finalizar cada sesión.',
  },
  {
    label:   '¿Emiten factura?',
    content: 'Sí, emitimos factura por cada sesión. Por favor, solicítela al finalizar su tratamiento.',
  },
  {
    label:   '¿Puedo cancelar mi sesión?',
    content: 'Sí, puedes cancelar tu terapia y solicitar un nuevo horario. Por favor ten en cuenta nuestra política de cancelación. Cancelación con más de 24 horas de anticipación: Sin cargo. Puedes solicitar un nuevo turno. Cancelación el mismo día del turno: Tiene un cargo del 50% del valor de la sesión. Avísanos por WhatsApp o llamada para cancelar y coordinar un nuevo horario.',
  },
];

</script>

<template>
  <UPage>

    <section class="relative min-h-auto md:min-h-[100vh] flex items-center overflow-hidden -mt-20 pt-20">
      <!-- Imagen de fondo -->
      <img
        src="/images/instalaciones-1.jpeg"
        alt="Instalaciones Cefire"
        class="absolute inset-0 w-full h-full object-cover"
      >
      <!-- Overlay oscuro difuminado -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-xs" />

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
              <h1 class="text-center md:text-start text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
                Restaura el Movimiento,
                <br>
                Recupera tu vida.
              </h1>

              <!-- Description -->
              <Reveal :duration="300">
                <p class="text-gray-200 text-lg mb-8 text-center md:text-start">
                  Fisioterapia experta que va más allá del tratamiento. <br>
                  Creamos planes de recuperación personalizados que te permiten
                  volver a hacer lo que amas, <br> sin dolor y con más fuerza que antes.
                </p>
              </Reveal>

            <!-- Buttons -->
            <Reveal :delay="70" :duration="300">
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
            </Reveal>

            <!-- Stats -->
            <div class="flex gap-10 text-sm">
              <div>
                <p class="text-2xl font-bold text-white">
                  <CountUp class="text-primary" :end="10" suffix="+" :once="true"/>
                </p>
                <p class="text-gray-300">Años de experiencia</p>
              </div>

              <div>
                <p class="text-2xl font-bold text-white">
                  <CountUp class="text-primary" :end="99" suffix="%" :once="true"/>
                </p>
                <p class="text-gray-300">Satisfacción del cliente</p>
              </div>

              <div>
                <p class="text-2xl font-bold text-white">
                  <CountUp class="text-primary" :end="1000" suffix="+" :once="true"/>
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
            :scale="0.95"
            :delay="i * 120"
          >
            
            <div class="w-full h-80 rounded-2xl overflow-hidden">
              <NuxtImg
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover"
                width="400"
                height="320"
                loading="lazy"
                format="webp"
              />
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