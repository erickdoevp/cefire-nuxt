export const useInView = () => {
  const isVisible = ref(false)

  const observer = ref<IntersectionObserver | null>(null)

  const observe = (el: HTMLElement) => {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        observer.value?.disconnect()
      }
    }, { threshold: 0.2 })

    observer.value.observe(el)
  }

  return { isVisible, observe }
}