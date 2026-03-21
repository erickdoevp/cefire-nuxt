<script setup lang="ts">
interface Props {
  as?: string
  delay?: number
  duration?: number
  y?: number
  x?: number
  scale?: number
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  delay: 0,
  duration: 600,
  y: 20,
  x: 0,
  scale: 1,
  once: true
})

const el = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        if (props.once) observer?.disconnect()
      } else if (!props.once) {
        isVisible.value = false
      }
    },
    { threshold: 0.2 }
  )

  observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <component
    :is="as"
    ref="el"
    :style="{
      transition: `all ${duration}ms ease-out ${delay}ms`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'translate(0,0) scale(1)'
        : `translate(${x}px, ${y}px) scale(${scale})`,
      filter: isVisible ? 'blur(0px)' : 'blur(6px)'
    }"
  >
    <slot />
  </component>
</template>