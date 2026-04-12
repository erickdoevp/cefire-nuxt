import { createAdminApi } from '~/api/admin-api'
import type { PaginatedUserProfile } from '~/interfaces/paginated-profiles'

export const usePaginatedUsers = () => {

  const users = ref<PaginatedUserProfile[]>([])
  const isLoading = ref<boolean>(false)
  const total = ref<number>(0)
  const page = ref<number>(1)
  const pageSize = ref<number>(10)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  const fetchUsers = async (options?: { page?: number; pageSize?: number }) => {
    isLoading.value = true

    if (options?.page) page.value = options.page
    if (options?.pageSize) pageSize.value = options.pageSize

    const from = (page.value - 1) * pageSize.value

    try {
      const api = createAdminApi()
      const response = await api.raw<PaginatedUserProfile[]>('/profiles', {
        query: {
          select: 'id,name,first_last_name,second_last_name,username,email,role,phone:phone_number',
          order: 'name.asc',
          offset: from,
          limit: pageSize.value,
        },
        headers: { Prefer: 'count=exact' },
      })

      users.value = response._data as PaginatedUserProfile[]
      const contentRange = response.headers.get('content-range')
      total.value = contentRange ? parseInt(contentRange.split('/')[1]) : 0

    } catch (err: any) {
      console.error('Unexpected error fetching users:', err.data?.message ?? err.message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    isLoading,
    total,
    page,
    pageSize,
    totalPages,
    fetchUsers,
  }
}
