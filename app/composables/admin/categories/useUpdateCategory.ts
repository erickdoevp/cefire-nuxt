import { createAdminApi } from '~/api/admin-api'
import type { Category } from '~/interfaces/category'

type UpdateCategoryPayload = Omit<Category, 'id'>

export const useUpdateCategory = () => {

  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const updateCategory = async (id: number, payload: UpdateCategoryPayload) => {
    isLoading.value = true
    error.value = null

    try {
      const api = createAdminApi()
      const data = await api<Category>('/categories', {
        method: 'PATCH',
        query: {
          id: `eq.${id}`,
          select: 'id,name,chip_color,text_chip_color',
        },
        body: payload,
        headers: {
          Prefer: 'return=representation',
          Accept: 'application/vnd.pgrst.object+json',
        },
      })

      if (!data) {
        error.value = 'No se encontró la categoría o no tienes permisos para editarla'
        return null
      }

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
    updateCategory,
  }
}
