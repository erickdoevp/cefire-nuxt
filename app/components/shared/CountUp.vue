<script setup lang="ts">
interface Props {
  end: number
  duration?: number
  suffix?: string
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1500,
  suffix: '',
  once: true
})

const el = ref<HTMLElement | null>(null)
const current = ref(0)
const isAnimating = ref(false)

let observer: IntersectionObserver | null = null
let rafId: number | null = null

const animate = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  const startTime = performance.now()

  const step = (time: number) => {
    const t = Math.min((time - startTime) / props.duration, 1)

    // ease-out (suave)
    const ease = 1 - Math.pow(1 - t, 3)

    current.value = Math.floor(ease * props.end)

    if (t < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      current.value = props.end
      isAnimating.value = false
    }
  }

  rafId = requestAnimationFrame(step)
}

const reset = () => {
  if (rafId) cancelAnimationFrame(rafId)
  current.value = 0
  isAnimating.value = false
}

onMounted(() => {
  if (!el.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        animate()
        if (props.once) observer?.disconnect()
      } else if (!props.once) {
        reset()
      }
    },
    { threshold: 0.3 }
  )

  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <span ref="el">
    {{ current.toLocaleString() }}{{ suffix }}
  </span>
</template>