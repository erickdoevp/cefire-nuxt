export default defineNuxtPlugin(() => {
  const pendingRequests = useState('pendingRequests', () => 0)

  const api = $fetch.create({
    onRequest() {
      pendingRequests.value++
    },
    onResponse() {
      pendingRequests.value = Math.max(0, pendingRequests.value - 1)
    },
    onResponseError() {
      pendingRequests.value--
    }
  })

  return {
    provide: { api }
  }
})