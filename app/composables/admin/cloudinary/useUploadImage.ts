export const useUploadImage = () => {
  const { $supabase } = useNuxtApp()
  const uploading = ref(false)
  const uploadError = ref<string | null>(null)

  const upload = async (file: File, folder = 'cefire'): Promise<string | null> => {
    uploading.value = true
    uploadError.value = null

    try {
      const { data: { session } } = await $supabase.auth.getSession()

      if (!session) {
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
        headers: { authorization: `Bearer ${session.access_token}` },
        body: { folder },
      })

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', apiKey)
      formData.append('timestamp', String(timestamp))
      formData.append('signature', signature)
      formData.append('folder', signedFolder)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      )

      if (!res.ok) {
        throw new Error('Error al subir la imagen a Cloudinary')
      }

      const data = await res.json()
      return data.secure_url as string

    } catch (err: any) {
      uploadError.value = err.message ?? 'Error desconocido'
      return null
    } finally {
      uploading.value = false
    }
  }

  return { upload, uploading, uploadError }
}
