import { useAuthStore } from '~/store/admin/auth/authStore'

/**
 * El blog se prerenderiza en build time, asi que publicar o editar un post
 * requiere un rebuild. Dispara el deploy hook de Cloudflare Pages sin bloquear
 * al editor: si falla, el post ya esta guardado y el sitio se regenera en el
 * siguiente deploy.
 */
export const useTriggerDeploy = () => {
  const auth = useAuthStore()

  const triggerDeploy = async () => {
    try {
      await $fetch('/api/admin/deploy', {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
    }
    catch (e) {
      console.error('No se pudo disparar el rebuild:', e)
    }
  }

  return { triggerDeploy }
}
