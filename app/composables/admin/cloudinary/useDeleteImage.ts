import { useAuthStore } from "~/store/admin/auth/authStore"

export const useDeleteImage = () => {
  const authStore = useAuthStore()
  const deleting = ref(false)
  const deleteError = ref<string | null>(null)

  // Extrae el public_id de una URL de Cloudinary
  // Ej: https://res.cloudinary.com/cloud/image/upload/v123/cefire/foto.jpg → cefire/foto
  const extractPublicId = (url: string): string | null => {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)
    return match ? match[1] : null
  }

  const deleteImage = async (url: string): Promise<boolean> => {
    const publicId = extractPublicId(url)
    if (!publicId) return false

    deleting.value = true
    deleteError.value = null

    try {
      if (!authStore.accessToken) throw new Error('No hay sesión activa')

      await $fetch('/api/cloudinary/delete', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
        body: { publicId },
      })

      return true
    } catch (err: any) {
      deleteError.value = err.response?.data?.error?.message ?? err.message ?? 'Error al eliminar la imagen'
      return false
    } finally {
      deleting.value = false
    }
  }

  return { deleteImage, deleting, deleteError }
}
