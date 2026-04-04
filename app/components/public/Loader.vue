<template>
  <transition name="fade">
    <div v-if="visible" class="bar" />
  </transition>
</template>

<script setup lang="ts">
const pending = useState<number>('pendingRequests')

const visible = ref(false)
let timeout: any

watch(pending, (val) => {
  if (val > 0) {
    timeout = setTimeout(() => {
      visible.value = true
    }, 100)
  } else {
    clearTimeout(timeout)
    visible.value = false
  }
})
</script>

<style scoped>
.bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 100%;
  z-index: 9999;

  background: linear-gradient(90deg, #00dc82, #36e4da);
  animation: loading 1s linear infinite;
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>