<script setup lang="ts">
interface Props {
  value: number
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1200
})

const el = ref<HTMLElement | null>(null)
const displayValue = ref(0)
const started = ref(false)

let observer: IntersectionObserver | null = null

// Animación del número base
const animate = () => {
  const start = performance.now()

  const step = (now: number) => {
    const t = Math.min((now - start) / props.duration, 1)
    const ease = 1 - Math.pow(1 - t, 3)

    displayValue.value = Math.floor(ease * props.value)

    if (t < 1) requestAnimationFrame(step)
    else displayValue.value = props.value
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  if (!el.value) return

  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting && !started.value) {
      started.value = true
      animate()
      observer?.disconnect()
    }
  }, { threshold: 0.3 })

  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

// Convierte número a array de dígitos
const digits = computed(() =>
  displayValue.value.toString().split('')
)
</script>

<template>
  <div ref="el" class="flex justify-center">
    <div class="flex overflow-hidden">
      <div
        v-for="(digit, i) in digits"
        :key="i"
        class="relative w-[1ch] h-[1em] overflow-hidden"
      >
        <div
          class="absolute left-0 transition-transform duration-500 ease-out"
          :style="{
            transform: `translateY(-${Number(digit) * 100}%)`
          }"
        >
          <div v-for="n in 10" :key="n">
            {{ n - 1 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>