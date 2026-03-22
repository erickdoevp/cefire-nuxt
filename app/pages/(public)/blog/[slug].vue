<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const allPosts = [
  {
    category: 'Recuperación',
    categoryColor: '#BFDBFE',
    categoryTextColor: '#2563EB',
    title: 'Guía Completa de Recuperación Post-Cirugía: Lo que tu Cuerpo Necesita',
    excerpt: 'La recuperación después de una cirugía no tiene que ser abrumadora. Aprende los pasos esenciales, los tiempos esperados y los ejercicios respaldados por expertos que te ayudarán a recuperar fuerza y movilidad más rápido de lo que imaginas.',
    author: 'Lic. Paloma Cruz',
    authorRole: 'Especialista en Fisioterapia',
    authorBio: 'La Lic. Cruz lleva más de 8 años ayudando a pacientes a recuperarse de cirugías y dolor crónico. Se especializa en rehabilitación basada en evidencia y educación preventiva.',
    date: '15 Mar 2026',
    readTime: '8 min de lectura',
    image: '/images/tratamientos1.jpg',
    slug: 'guia-recuperacion-post-cirugia',
    tags: ['Post-Cirugía', 'Rehabilitación', 'Recuperación', 'Fisioterapia'],
    content: `
      <p>Después de cualquier intervención quirúrgica, el cuerpo entra en un proceso natural de cicatrización. Sin embargo, sin la guía adecuada, este proceso puede volverse lento, doloroso o derivar en complicaciones como rigidez articular, pérdida de masa muscular o adherencias.</p>
      <p>La fisioterapia post-operatoria tiene como objetivo principal <strong>acelerar tu recuperación</strong>, reducir el dolor y devolverte la funcionalidad completa lo antes posible.</p>
      <h2>Fase 1: Primeras 72 horas</h2>
      <p>En las primeras horas tras la cirugía, la prioridad es controlar la inflamación y el dolor. Recomendamos aplicar hielo envuelto en tela durante 15 minutos cada 2 horas, mantener el miembro afectado elevado y realizar ejercicios de respiración profunda.</p>
      <h2>Fase 2: Primera semana</h2>
      <p>La movilización temprana, siempre bajo supervisión profesional, es uno de los pilares de la recuperación moderna. Contrario a lo que muchos piensan, el reposo absoluto prolongado puede ser contraproducente.</p>
      <h2>Fase 3: Semanas 2 a 6</h2>
      <p>Una vez que la herida ha cicatrizado y la inflamación ha disminuido significativamente, comenzamos el fortalecimiento muscular de manera progresiva. Se incorporan ejercicios de resistencia, propiocepción y trabajo en cadena cinética.</p>
      <h2>Señales de alerta</h2>
      <p>Consulta de inmediato si experimentas fiebre superior a 38°C, enrojecimiento o pus en la herida, dolor agudo repentino o entumecimiento persistente.</p>
    `,
  },
  {
    category: 'Medicina Deportiva',
    categoryColor: '#D1FAE5',
    categoryTextColor: '#059669',
    title: '5 Ejercicios que Todo Corredor Debe Hacer para Prevenir Lesiones de Rodilla',
    excerpt: 'Fortalece los músculos que protegen tus rodillas con estos ejercicios de prevención comprobados por nuestros especialistas en medicina deportiva.',
    author: 'Lic. Luna Hernández',
    authorRole: 'Fisioterapeuta Deportiva',
    authorBio: 'La Lic. Hernández se especializa en medicina deportiva y rehabilitación de atletas. Trabaja con corredores y deportistas de alto rendimiento en Cefire Tlaxcala.',
    date: '12 Mar 2026',
    readTime: '5 min de lectura',
    image: '/images/tratamientos2.jpg',
    slug: 'ejercicios-prevenir-lesiones-rodilla',
    tags: ['Rodilla', 'Prevención', 'Corredores', 'Medicina Deportiva'],
    content: `
      <p>La rodilla es una articulación compleja que absorbe el impacto en cada zancada. Con el entrenamiento repetitivo, los desequilibrios musculares pueden derivar en lesiones como el síndrome de la banda iliotibial o condromalacia rotuliana.</p>
      <h2>1. Sentadilla de una pierna</h2>
      <p>Este ejercicio trabaja el glúteo medio, cuádriceps y estabilizadores de cadera, fundamentales para proteger la rodilla durante la carrera. 3 series de 8 repeticiones por pierna.</p>
      <h2>2. Puente de glúteo con banda elástica</h2>
      <p>Activa e incrementa la fuerza del glúteo mayor y medio, reduciendo la carga que recibe la rodilla al correr. 3 series de 15 repeticiones.</p>
      <h2>3. Estocada lateral con control excéntrico</h2>
      <p>Mejora la movilidad de cadera y trabaja los aductores, ayudando a mantener la alineación de la rodilla en el plano frontal.</p>
      <h2>4. Elevación de talones en escalón</h2>
      <p>Fortalece el complejo gastrocnemio-sóleo, reduciendo el estrés sobre la articulación tibiofemoral.</p>
      <h2>5. Step-down excéntrico</h2>
      <p>Uno de los ejercicios más efectivos para la prevención del dolor anterior de rodilla. Entrena el control excéntrico del cuádriceps.</p>
    `,
  },
  {
    category: 'Recuperación',
    categoryColor: '#BFDBFE',
    categoryTextColor: '#2563EB',
    title: 'Dolor de Espalda Baja: Causas, Mitos y Tratamientos Modernos',
    excerpt: 'Desmitificamos las creencias más comunes sobre el dolor lumbar y exploramos enfoques terapéuticos basados en evidencia científica.',
    author: 'Lic. Paloma Cruz',
    authorRole: 'Especialista en Fisioterapia',
    authorBio: 'La Lic. Cruz lleva más de 8 años ayudando a pacientes a recuperarse de cirugías y dolor crónico. Se especializa en rehabilitación basada en evidencia y educación preventiva.',
    date: '8 Mar 2026',
    readTime: '7 min de lectura',
    image: '/images/tratamientos3.jpg',
    slug: 'dolor-espalda-baja-causas-mitos-tratamientos',
    tags: ['Espalda', 'Lumbar', 'Dolor Crónico', 'Tratamiento'],
    content: `
      <p>Se estima que el 80% de las personas experimentarán dolor lumbar en algún momento de su vida. Es la principal causa de discapacidad laboral a nivel mundial y, sin embargo, sigue siendo ampliamente incomprendido.</p>
      <h2>Mito #1: "El reposo absoluto es la mejor medicina"</h2>
      <p>Falso. La evidencia científica actual señala que el reposo prolongado puede agravar el dolor lumbar al debilitar la musculatura y reducir la movilidad. La actividad moderada y supervisada es mucho más beneficiosa.</p>
      <h2>Mito #2: "Si hay dolor, hay daño"</h2>
      <p>El dolor no siempre correlaciona con lesión estructural. Muchas personas con hernias discales en imagen no tienen dolor. El dolor es una experiencia multifactorial.</p>
      <h2>Tratamientos basados en evidencia</h2>
      <p>Los enfoques con mayor respaldo científico incluyen terapia manual, ejercicio terapéutico (especialmente Pilates clínico), educación en neurociencia del dolor y terapia cognitivo-conductual para el componente psicosocial.</p>
    `,
  },
  {
    category: 'Bienestar',
    categoryColor: '#FEF3C7',
    categoryTextColor: '#D97706',
    title: 'Rutinas de Estiramiento Matutino que Transforman tu Día',
    excerpt: 'Empieza cada mañana con estos estiramientos simples para mejorar la flexibilidad y reducir los dolores diarios desde la primera semana.',
    author: 'Lic. Luna Hernández',
    authorRole: 'Fisioterapeuta Deportiva',
    authorBio: 'La Lic. Hernández se especializa en medicina deportiva y rehabilitación de atletas. Trabaja con corredores y deportistas de alto rendimiento en Cefire Tlaxcala.',
    date: '5 Mar 2026',
    readTime: '4 min de lectura',
    image: '/images/tratamientos5.jpg',
    slug: 'rutinas-estiramiento-matutino',
    tags: ['Estiramiento', 'Bienestar', 'Rutina', 'Flexibilidad'],
    content: `
      <p>Durante la noche, los músculos y tejidos conectivos se contraen ligeramente. Una rutina matutina de estiramientos activa la circulación, lubrica las articulaciones y prepara tu cuerpo para el día.</p>
      <h2>Rutina de 10 minutos</h2>
      <p>Esta secuencia puede realizarse en tu cama o en un tapete al levantarte. Comienza con rodillas al pecho (30 seg cada lado), sigue con rotación de columna, postura del niño y estiramiento de isquiotibiales.</p>
      <h2>Consejos importantes</h2>
      <p>El estiramiento no debe ser doloroso. Busca una sensación de tensión suave y sostenida. Respira profundo durante cada posición y nunca realices rebotes bruscos.</p>
    `,
  },
  {
    category: 'Historias',
    categoryColor: '#FCE7F3',
    categoryTextColor: '#DB2777',
    title: 'De la Silla de Ruedas al Maratón: Cómo la Fisioterapia Cambió mi Vida',
    excerpt: 'Lee el increíble camino de recuperación de un paciente desde una lesión devastadora hasta cruzar la meta del maratón.',
    author: 'Paciente Cefire',
    authorRole: 'Testimonio de paciente',
    authorBio: 'Historia real de uno de nuestros pacientes que, tras un accidente automovilístico, logró recuperarse gracias a un programa de rehabilitación personalizado en Cefire.',
    date: '28 Feb 2026',
    readTime: '10 min de lectura',
    image: '/images/quienes-somos1.jpg',
    slug: 'silla-ruedas-maraton-historia',
    tags: ['Historia', 'Inspiración', 'Rehabilitación', 'Superación'],
    content: `
      <p>Tenía 34 años cuando un accidente automovilístico me dejó con una fractura vertebral y los médicos me dijeron que probablemente no volvería a caminar. Recuerdo esas palabras con una claridad que aún me eriza la piel.</p>
      <h2>Los primeros meses</h2>
      <p>Los primeros meses fueron los más difíciles de mi vida. La frustración de no poder levantarme de la silla de ruedas era abrumadora. Pero entonces llegué a Cefire.</p>
      <h2>El proceso de rehabilitación</h2>
      <p>Mi fisioterapeuta diseñó un programa personalizado que comenzó con los ejercicios más básicos: mover los dedos de los pies, contracciones isométricas mínimas. A los 8 meses di mis primeros pasos con andadera.</p>
      <h2>Cruzando la meta</h2>
      <p>Dos años y medio después del accidente, crucé la meta del Maratón de la Ciudad de México. La fisioterapia no solo rehabilitó mi cuerpo; me devolvió mi identidad.</p>
    `,
  },
  {
    category: 'Recuperación',
    categoryColor: '#BFDBFE',
    categoryTextColor: '#2563EB',
    title: 'Hielo vs. Calor: ¿Cuándo Usar Cada uno en la Recuperación de Lesiones?',
    excerpt: 'El debate de siempre resuelto por la ciencia. Aprende cuándo el frío o el calor acelerará tu curación.',
    author: 'Lic. Paloma Cruz',
    authorRole: 'Especialista en Fisioterapia',
    authorBio: 'La Lic. Cruz lleva más de 8 años ayudando a pacientes a recuperarse de cirugías y dolor crónico. Se especializa en rehabilitación basada en evidencia y educación preventiva.',
    date: '22 Feb 2026',
    readTime: '6 min de lectura',
    image: '/images/artritis-reumatismo.jpg',
    slug: 'hielo-vs-calor-recuperacion-lesiones',
    tags: ['Hielo', 'Calor', 'Primeros Auxilios', 'Lesiones'],
    content: `
      <p>¿Cuántas veces has dudado si poner hielo o calor a una lesión? Esta confusión es extremadamente común y puede marcar la diferencia en tu recuperación.</p>
      <h2>¿Cuándo usar HIELO?</h2>
      <p>El frío es ideal en las primeras 48-72 horas de una lesión aguda: esguinces, contusiones con hematoma, inflamación aguda. Nunca directamente sobre la piel, 15-20 minutos con descansos de 40 minutos.</p>
      <h2>¿Cuándo usar CALOR?</h2>
      <p>El calor es beneficioso para dolor muscular crónico, rigidez articular matutina, contracturas y antes de realizar estiramientos.</p>
      <h2>La regla de oro</h2>
      <p>Lesión aguda con inflamación = HIELO. Dolor crónico sin inflamación activa = CALOR. En caso de duda, consulta siempre con tu fisioterapeuta.</p>
    `,
  },
  {
    category: 'Medicina Deportiva',
    categoryColor: '#D1FAE5',
    categoryTextColor: '#059669',
    title: 'Volver al Deporte tras una Cirugía de LCA: Una Línea de Tiempo',
    excerpt: 'Una guía mes a mes para regresar de forma segura a las actividades que amas después de la reconstrucción del ligamento cruzado anterior.',
    author: 'Lic. Luna Hernández',
    authorRole: 'Fisioterapeuta Deportiva',
    authorBio: 'La Lic. Hernández se especializa en medicina deportiva y rehabilitación de atletas. Trabaja con corredores y deportistas de alto rendimiento en Cefire Tlaxcala.',
    date: '15 Feb 2026',
    readTime: '9 min de lectura',
    image: '/images/tratamientos4.png',
    slug: 'volver-deporte-cirugia-lca-timeline',
    tags: ['LCA', 'Rodilla', 'Cirugía', 'Atletismo'],
    content: `
      <p>La reconstrucción del ligamento cruzado anterior (LCA) es una de las cirugías ortopédicas más frecuentes en atletas. El proceso de rehabilitación es largo, pero con el protocolo correcto, el regreso al deporte es completamente posible.</p>
      <h2>Mes 1-2: Protección y control del dolor</h2>
      <p>Los primeros dos meses se enfocan en reducir la inflamación, recuperar el rango de movimiento completo y activar el cuádriceps. El objetivo es lograr extensión completa y flexión cercana a los 120°.</p>
      <h2>Mes 3-4: Fortalecimiento progresivo</h2>
      <p>Se incorporan sentadillas y prensa. El trabajo en bicicleta estacionaria mantiene la condición cardiovascular sin sobrecargar el injerto.</p>
      <h2>Mes 5-9: Funcional y regreso al deporte</h2>
      <p>Comienzan los ejercicios de agilidad y pliometría. El retorno al juego completo suele ocurrir entre los 9 y 12 meses, cumpliendo criterios de simetría de fuerza y clearance psicológico.</p>
    `,
  },
]

const post = allPosts.find(p => p.slug === slug)
if (!post) throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })

const relatedPosts = allPosts
  .filter(p => p.slug !== slug && p.category === post.category)
  .slice(0, 3)

function copyLink() {
  if (import.meta.client) {
    navigator.clipboard.writeText(window.location.href)
  }
}

useSeoMeta({
  title: `${post.title} | Blog Cefire Fisioterapia`,
  description: post.excerpt,
  ogTitle: post.title,
  ogDescription: post.excerpt,
  ogImage: post.image,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UPage>

    <!-- ─── ARTICLE HERO ─── -->
    <section class="bg-white py-15 px-5 flex flex-col items-center gap-8">
      <UContainer class="flex flex-col items-center gap-8 w-full">

        <!-- Meta row -->
        <div class="flex items-center gap-4 flex-wrap justify-center">
          <span
            class="text-xs font-semibold px-3.5 py-1.5 rounded-full"
            :style="{ background: post.categoryColor, color: post.categoryTextColor }"
          >
            {{ post.category }}
          </span>
          <span class="text-sm text-[#9C9B99]">{{ post.date }}</span>
          <span class="text-[#9C9B99]">·</span>
          <span class="text-sm text-[#9C9B99]">{{ post.readTime }}</span>
        </div>

        <!-- Title -->
        <h1 class="max-w-[800px] text-center text-[38px] md:text-[46px] font-bold text-[#1A1918] leading-[1.15] tracking-[-1px]">
          {{ post.title }}
        </h1>

        <!-- Excerpt -->
        <p class="max-w-[660px] text-center text-[18px] text-[#6D6C6A] leading-[1.6]">
          {{ post.excerpt }}
        </p>

        <!-- Author row -->
        <div class="flex items-center gap-3">
          <UAvatar
            :alt="post.author"
            size="md"
            icon="i-lucide-user-round"
          />
          <div class="flex flex-col gap-0.5">
            <span class="text-[15px] font-semibold text-[#1A1918]">{{ post.author }}</span>
            <span class="text-[13px]" :style="{ color: post.categoryTextColor }">{{ post.authorRole }}</span>
          </div>
        </div>

      </UContainer>
    </section>

    <!-- ─── FEATURED IMAGE ─── -->
    <section class="bg-white px-5 pb-0">
      <UContainer>
        <div class="rounded-[20px] overflow-hidden h-[320px] md:h-[500px]">
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-full object-cover"
          >
        </div>
      </UContainer>
    </section>

    <!-- ─── ARTICLE CONTENT ─── -->
    <section class="bg-white py-15 flex flex-col items-center">
      <div class="w-full max-w-[720px] px-5 flex flex-col gap-8">

        <!-- Body (v-html, hardcoded content) -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="article-body" v-html="post.content" />

        <!-- Pro tip callout -->
        <div class="flex gap-3 rounded-xl p-5 border border-[#C8F0D8]" style="background: rgba(191,219,254,0.12)">
          <UIcon name="i-lucide-lightbulb" class="shrink-0 mt-0.5 text-[#2563EB]" size="20" />
          <p class="text-[15px] text-[#3A3938] leading-[1.7]">
            <strong>Consejo profesional:</strong> La constancia es clave. Comunícate con tu fisioterapeuta ante cualquier duda durante el proceso de recuperación.
          </p>
        </div>

        <!-- Conclusion box -->
        <div class="bg-[#F5F4F1] rounded-2xl p-7 flex flex-col gap-4">
          <h3 class="text-[22px] font-bold text-[#1A1918]">Conclusión</h3>
          <p class="text-[16px] text-[#3A3938] leading-[1.7]">
            La fisioterapia es un proceso que requiere paciencia, constancia y acompañamiento profesional. En Cefire diseñamos planes de rehabilitación individualizados para que tu regreso a la vida activa sea seguro, efectivo y duradero.
          </p>
        </div>

        <!-- Divider -->
        <div class="h-px bg-[#E5E4E1] w-full" />

        <!-- Tags row -->
        <div class="flex items-center gap-2.5 flex-wrap">
          <span class="text-sm font-semibold text-[#1A1918]">Etiquetas:</span>
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-[13px] font-medium text-[#6D6C6A] px-3.5 py-1.5 rounded-full border border-[#E5E4E1]"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Share row -->
        <div class="flex items-center justify-between flex-wrap gap-3">
          <span class="text-sm font-semibold text-[#1A1918]">Compartir artículo</span>
          <div class="flex gap-3">
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-lucide-facebook"
              size="md"
              class="bg-[#F5F4F1] rounded-xl"
              aria-label="Compartir en Facebook"
            />
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-lucide-twitter"
              size="md"
              class="bg-[#F5F4F1] rounded-xl"
              aria-label="Compartir en Twitter"
            />
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-lucide-link"
              size="md"
              class="bg-[#F5F4F1] rounded-xl"
              aria-label="Copiar enlace"
              @click="copyLink"
            />
          </div>
        </div>

      </div>
    </section>

    <!-- ─── AUTHOR CARD ─── -->
    <section class="bg-white pb-15 flex justify-center px-5">
      <div class="w-full max-w-[720px] bg-[#F5F4F1] rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <UAvatar
          :alt="post.author"
          size="2xl"
          icon="i-lucide-user-round"
          class="shrink-0"
        />
        <div class="flex flex-col gap-2.5 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[18px] font-bold text-[#1A1918]">{{ post.author }}</span>
            <UBadge color="primary" variant="soft" class="rounded-full text-xs px-2.5">
              Especialista
            </UBadge>
          </div>
          <span class="text-[14px] font-medium text-primary">{{ post.authorRole }}</span>
          <p class="text-[14px] text-[#6D6C6A] leading-[1.6]">{{ post.authorBio }}</p>
        </div>
      </div>
    </section>

    <!-- ─── RELATED POSTS ─── -->
    <section v-if="relatedPosts.length" class="bg-[#F5F4F1] py-20 px-5">
      <UContainer class="flex flex-col gap-12">

        <!-- Header -->
        <div class="flex flex-col items-center gap-3 text-center">
          <span class="text-[13px] font-semibold tracking-[2px] text-primary">SIGUE LEYENDO</span>
          <h2 class="text-[38px] md:text-[40px] font-bold text-[#1A1918] tracking-[-0.5px]">
            Artículos Relacionados
          </h2>
        </div>

        <!-- Cards grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="related in relatedPosts"
            :key="related.slug"
            :to="`/blog/${related.slug}`"
            class="group"
          >
            <UCard class="overflow-hidden shadow-sm hover:shadow-md transition-shadow p-0 h-full">
              <div class="h-[200px] overflow-hidden">
                <img
                  :src="related.image"
                  :alt="related.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                >
              </div>
              <div class="flex flex-col gap-3 p-5">
                <span
                  class="self-start text-xs font-medium px-2.5 py-1 rounded-full"
                  :style="{ background: related.categoryColor, color: related.categoryTextColor }"
                >
                  {{ related.category }}
                </span>
                <h3 class="text-[18px] font-semibold text-[#1A1918] leading-[1.3] group-hover:text-primary transition-colors line-clamp-2">
                  {{ related.title }}
                </h3>
                <p class="text-[13px] text-[#9C9B99]">
                  {{ related.date }} · {{ related.readTime }}
                </p>
              </div>
            </UCard>
          </NuxtLink>
        </div>

      </UContainer>
    </section>

    <!-- ─── BACK BUTTON ─── -->
    <section class="bg-white py-8 px-5">
      <UContainer>
        <UButton
          to="/blogs"
          variant="ghost"
          color="neutral"
          leading-icon="i-lucide-arrow-left"
        >
          Volver al blog
        </UButton>
      </UContainer>
    </section>

  </UPage>
</template>

<style scoped>
.article-body :deep(p) {
  font-size: 17px;
  line-height: 1.8;
  color: #3A3938;
  margin-bottom: 1.25rem;
}

.article-body :deep(h2) {
  font-size: 28px;
  font-weight: 700;
  color: #1A1918;
  letter-spacing: -0.5px;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.article-body :deep(ul) {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
  list-style-type: disc;
}

.article-body :deep(li) {
  font-size: 17px;
  line-height: 1.8;
  color: #3A3938;
  margin-bottom: 0.5rem;
}

.article-body :deep(strong) {
  font-weight: 600;
  color: #1A1918;
}
</style>
