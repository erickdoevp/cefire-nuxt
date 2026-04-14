/**
 * Cuando Nuxt despliega una nueva versión, los nombres de los chunks JS cambian
 * (hashes de Vite). Si el HTML en caché (ISR/CDN) sigue apuntando a chunks viejos
 * que ya no existen en el servidor, el navegador lanza un error de importación
 * dinámica. Este plugin lo detecta y hace un hard reload para que el usuario
 * obtenga el HTML y los chunks frescos del nuevo deploy.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:chunkError', () => {
    window.location.reload()
  })
})
