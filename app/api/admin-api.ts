import { useAuthStore } from '~/store/admin/auth/authStore'

export function createAdminApi() {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  return $fetch.create({
    baseURL: `${config.public.supabaseUrl}/rest/v1`,
    headers: {
      apikey: config.public.supabaseAnonKey,
    },
    onRequest({ options }) {
      const token = authStore.accessToken ?? config.public.supabaseAnonKey
      options.headers = {
        ...(options.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
      }
    },
  })
}
