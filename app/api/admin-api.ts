import { useAuthStore } from '~/store/admin/auth/authStore'

export function createAdminApi() {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  return $fetch.create({
    baseURL: `${config.public.supabaseUrl}/rest/v1`,
    onRequest({ options }) {
      const token = authStore.accessToken ?? config.public.supabaseAnonKey
      const existing = options.headers instanceof Headers
        ? Object.fromEntries((options.headers as Headers).entries())
        : { ...(options.headers as Record<string, string> ?? {}) }

      options.headers = {
        ...existing,
        apikey: config.public.supabaseAnonKey as string,
        Authorization: `Bearer ${token}`,
      }
    },
  })
}
