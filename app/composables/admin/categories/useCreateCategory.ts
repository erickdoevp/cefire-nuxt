import { createAdminApi } from '~/api/admin-api'
import type { Category } from '~/interfaces/category'

type CreateCategoryPayload = Omit<Category, 'id'>

export const useCreateCategory = () => {

  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const createCategory = async (payload: CreateCategoryPayload) => {
    isLoading.value = true
    error.value = null

    try {
      const api = createAdminApi()
      const data = await api<Category>('/categories', {
        method: 'POST',
        query: { select: 'id,name,chip_color,text_chip_color' },
        body: payload,
        headers: {
          Prefer: 'return=representation,resolution=merge-duplicates',
          Accept: 'application/vnd.pgrst.object+json',
        },
      })

      return data
    } catch (err: any) {
      error.value = err.data?.message ?? err.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    createCategory,
  }
}
