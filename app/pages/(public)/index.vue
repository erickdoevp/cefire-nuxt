<script setup lang="ts">

useSeoMeta({
  title: 'Cefire | Clínica de Fisioterapia en Tlaxcala',
  description: 'Fisioterapia experta con planes de recuperación personalizados. Rehabilitación deportiva, posoperatoria y alivio del dolor crónico. Más de 1,000 pacientes recuperados.',
  ogTitle: 'Cefire | Clínica de Fisioterapia en Tlaxcala',
  ogDescription: 'Recupera el movimiento con fisioterapia personalizada. Agenda tu valoración gratuita hoy.',
  // ogImage: 'https://cefire.com.mx/images/comience-hoy.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
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
            name: '¿Aceptan seguro?',
            acceptedAnswer: { '@type': 'Answer', text: 'Sí, aceptamos la mayoría de los principales planes de seguro. Contáctenos para verificar su cobertura.' },
          },
          {
            '@type': 'Question',
            name: '¿Cuántas sesiones necesitaré?',
            acceptedAnswer: { '@type': 'Answer', text: 'Esto varía según la afección. La mayoría de los pacientes observan una mejora significativa en 6 a 12 sesiones. Le daremos un cronograma realista después de su evaluación inicial.' },
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
        //url: 'https://cefire.com.mx',
        telephone: '+522461370462',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Insurgentes 3, San Esteban Tizatlan',
          addressRegion: 'Tlaxcala',
          addressCountry: 'MX',
        },
        medicalSpecialty: 'PhysicalTherapy',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de Fisioterapia',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rehabilitación Deportiva' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Recuperación Posoperatoria' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Alivio del Dolor Crónico' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Movilidad y Bienestar' } },
          ],
        },
      }),
    },
  ],
})


const services = [
  {
    title: "Rehabilitación Deportiva",
    description:
      "Regrese al juego más rápido con programas de recuperación específicos para cada deporte adaptados a su disciplina y objetivos.",
    icon: "i-heroicons-heart",
    iconBg: "bg-green-100 text-green-600"
  },
  {
    title: "Recuperación posoperatoria",
    description:
      "Programas de rehabilitación estructurados que reconstruyen de forma segura la fuerza y ​​la movilidad después de procedimientos ortopédicos.",
    icon: "material-symbols:hand-bones-outline",
    iconBg: "bg-orange-100 text-orange-600"
  },
  {
    title: "Alivio del dolor crónico",
    description:
      "Aborde el dolor persistente desde su origen con terapia manual y programas de ejercicios específicos.",
    icon: "i-heroicons-hand-raised",
    iconBg: "bg-purple-100 text-purple-600"
  },
  {
    title: "Movilidad y bienestar",
    description:
      "Atención preventiva y entrenamiento del movimiento funcional para mejorar la flexibilidad, el equilibrio y la calidad de vida.",
    icon: "ic:baseline-directions-walk",
    iconBg: "bg-blue-100 text-blue-600"
  },
  {
    title: "Neurorrehabilitación",
    description:
      "Tratamientos especializados que favorecen la recuperación de funciones motoras y neurológicas para mejorar la independencia y calidad de vida.",
    icon: "hugeicons:ai-brain-01",
    iconBg: "bg-red-100 text-red-600"
  },
  {
    title: "Estimulación temprana",
    description:
      "Actividades terapéuticas diseñadas para favorecer el desarrollo motor, cognitivo y sensorial en bebés y niños pequeños, potenciando sus habilidades desde los primeros años de vida.",
    icon: "tabler:baby-carriage",
    iconBg: "bg-cyan-100 text-cyan-600"
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

const patients = [
  {
    user: {
      name: 'Sarah Mitchell',
      description: 'Marathon Runner',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/499550?v=4',
        alt: 'Evan You',
        loading: 'lazy' as const
      }
    },
    quote: "“Después de mi cirugía de ligamento cruzado anterior (LCA), me aterraba no volver a correr. El equipo de RestorePT me permitió volver a correr en cuatro meses. De verdad se preocupan por tu recuperación.“"
  },
    {
    user: {
      name: 'Sarah Mitchell',
      description: 'Marathon Runner',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/499550?v=4',
        alt: 'Evan You',
        loading: 'lazy' as const
      }
    },
    quote: "“Pasé años viviendo con dolor de espalda. Después de 8 semanas con el Dr. Chen, no tengo dolor por primera vez en una década. Este lugar me cambió la vida.“"
  },
    {
    user: {
      name: 'Linda Thompson',
      description: 'Retired Teacher',
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/499550?v=4',
        alt: 'Evan You',
        loading: 'lazy' as const
      }
    },
    quote: "”En mi último año de secundaria, estaba nervioso por la fisioterapia. El equipo fue muy paciente y amable. Ahora puedo volver a acompañar a mis nietos a la escuela sin dolor.”"
  },
];

const team = [
  {
    name:  'LTF y R. Elliut Misael Cruz Trinidad',
    role:  'Terapeuta fisico',
    bio:   'Experto en el tratamiento del dolor crónico mediante terapia manual y enfoques basados ​​en la neurociencia.',
    image: '/images/comience-hoy.jpg',
  },
  {
    name:  'LTF y R. Paloma Jatzidi Cruz Padilla',
    role:  'Terapeuta fisico',
    bio:   'Enfocada en la rehabilitación pediatrica mediante el juego y ejercicio terapeutico.',
    image: '/images/comience-hoy.jpg',
  },
  // {
  //   name:  'Dr. David Okafor',
  //   role:  'DPT, Geriatric Specialist',
  //   bio:   'Dedicado a ayudar a los adultos mayores a mantener la movilidad, la independencia y un estilo de vida activo.',
  //   image: '/images/comience-hoy.jpg',
  // },
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
    label:   '¿Aceptan seguro?',
    content: 'Sí, aceptamos la mayoría de los principales planes de seguro, como Blue Cross, Aetna, United Healthcare y Medicare. Contáctenos para verificar su cobertura.',
  },
  {
    label:   '¿Cuántas sesiones necesitaré?',
    content: 'Esto varía según la afección. La mayoría de los pacientes observan una mejora significativa en 6 a 12 sesiones. Le daremos un cronograma realista después de su evaluación inicial.',
  },
];

</script>

<template>
  <UPage>

    <UContainer class="py-8 md:py-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- LEFT CONTENT -->
        <div>
          <!-- Badge -->
          <UBadge
            icon="i-lucide-heart"
            variant="soft"
            class="mb-6 rounded-2xl px-3" 
          >
            Más de 1000 pacientes confían en nosotros
          </UBadge>

          <!-- Title -->
          <h1 class="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Restaura el Movimiento.
            <br />
            Recupera tu vida.
          </h1>

          <!-- Description -->
          <p class="text-gray-500 text-lg mb-8 max-w-lg">
            Fisioterapia experta que va más allá del tratamiento. 
            Creamos planes de recuperación personalizados que te permiten
             volver a hacer lo que amas, sin dolor y con más fuerza que antes.
          </p>

          <!-- Buttons -->
          <div class="flex gap-4 mb-10">
            <UButton>
              <NuxtLink
                target="_blank"
                to="https://wa.me/522461370462?text=Hola%20quiero%20más%20información"
                size="lg"
              >
                Reserva una valoración gratuita
              </NuxtLink>
            </UButton>

            <UButton
              variant="outline"
              size="lg"
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
              <p class="text-2xl font-bold text-primary">10+</p>
              <p class="text-gray-500">Años de experiencia</p>
            </div>

            <div>
              <p class="text-2xl font-bold text-primary">99%</p>
              <p class="text-gray-500">Satisfacción del cliente</p>
            </div>

            <div>
              <p class="text-2xl font-bold text-primary">1,000+</p>
              <p class="text-gray-500">Pacientes Recuperados</p>
            </div>
          </div>
        </div>

        <!-- RIGHT IMAGE -->
        <div>
          <NuxtImg
            src="/images/comience-hoy.jpg"
            alt="Fisioterapeuta realizando tratamiento manual a paciente en Cefire Fisioterapia"
            class="w-full object-cover rounded-lg"
            format="webp"
            fetchpriority="high"
            loading="eager"
            width="600"
            height="500"
          />
        </div>

      </div>
    </UContainer>

    <section class="bg bg-stone-100 py-20">
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
        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="service in services"
            :key="service.title"
            class="rounded-2xl"
          >
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
         </div>
       </UContainer>
    </section>

    <section class="py-20">
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
          <div v-for="(path, index) in pathRecovery" :key='index'>
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

    <section class="bg bg-gray-950 py-20">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto mb-16">
          <p class="text-sm font-semibold text-[#c8e4f0] tracking-widest uppercase mb-3">
            HISTORIAS DE PACIENTES
          </p>
          <h2 class="text-4xl font-bold mb-4 text-white">
            Escuche a los que sanaron
          </h2>
        </div>
        <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in patients" :key='testimonial.user.name' class="bg-stone-800 flex flex-col gap-4 p-5 rounded-2xl">
            <p class="text-white text-sm">{{ testimonial.quote }}</p>
            <UUser v-bind="testimonial.user">
              <template #name>
                <p class="text-white">{{ testimonial.user.name }}</p>
              </template>
            </UUser>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-20 bg-stone-100">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto mb-16">
          <p class="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            NUESTRO EQUIPO
          </p>
          <h2 class="text-4xl font-bold mb-4">
            Conoce a tus Fisioterapeutas
          </h2>
          <p class="text-gray-500">
            Especialistas certificados con más de 40 años de experiencia clínica combinada.
          </p>
        </div>
        <!-- Grid de terapeutas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <div
            v-for="member in team"
            :key="member.name"
            class="flex flex-col items-center gap-4"
          >
            <!-- Foto -->
            <div class="w-full h-[320px] rounded-2xl overflow-hidden">
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
          </div>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-20">
      <UContainer class="flex flex-col items-center gap-12">
        <!-- Encabezado -->
        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-sm font-semibold text-primary tracking-widest uppercase mb-3">FAQ</span>
          <h2 class="text-[40px] font-bold text-[#1A1918] tracking-[-0.5px]">Preguntas frecuentes</h2>
        </div>

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
</style>