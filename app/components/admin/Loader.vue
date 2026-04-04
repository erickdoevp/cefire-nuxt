<template>
  <transition name="fade">
    <div v-if="visible" class="overlay">
      <div class="spinner" />
    </div>
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
    }, 150)
  } else {
    clearTimeout(timeout)
    visible.value = false
  }
})
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Spinner tipo Angular */
.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #ddd;
  border-top-color: #00dc82;
  border-radius: 50%;
  animation: spin .8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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