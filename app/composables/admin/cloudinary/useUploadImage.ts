import axios from 'axios'
import { useAuthStore } from '~/store/admin/auth/authStore'

export const useUploadImage = () => {
  const authStore = useAuthStore()
  const uploading = ref(false)
  const uploadError = ref<string | null>(null)

  const upload = async (file: File, folder = 'cefire'): Promise<string | null> => {
    uploading.value = true
    uploadError.value = null

    try {
      if (!authStore.accessToken) {
        throw new Error('No hay sesión activa')
      }

      const { timestamp, signature, apiKey, cloudName, folder: signedFolder } = await $fetch<{
        timestamp: number
        signature: string
        apiKey: string
        cloudName: string
        folder: string
      }>('/api/cloudinary/sign', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
        body: { folder },
      })

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', apiKey)
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)
      formData.append('folder', signedFolder)

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )

      return data.secure_url as string

    } catch (err: any) {
      uploadError.value = err.response?.data?.error?.message ?? err.message ?? 'Error desconocido'
      return null
    } finally {
      uploading.value = false
    }
  }

  return { upload, uploading, uploadError }
}
