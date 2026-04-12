import { createAdminApi } from '~/api/admin-api'
import type { Profile } from '~/interfaces/profiles'

export const useFetchProfiles = () => {

  const users = ref<Profile[]>([])
  const isLoading = ref<boolean>(false)

  const fetchProfiles = async () => {
    isLoading.value = true

    try {
      const api = createAdminApi()
      const data = await api<Profile[]>('/profiles', {
        query: { select: 'id,name' },
      })

      users.value = data

    } catch (err: any) {
      console.error('Unexpected error fetching profiles:', err.data?.message ?? err.message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    isLoading,
    fetchProfiles,
    userList: computed(() => users.value.map(user => ({ value: user.id, label: user.name }))),
  }
}
