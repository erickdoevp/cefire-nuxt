import { defineStore } from 'pinia'

interface AuthUser {
  id: string
  email: string
  [key: string]: any
}

export const useAuthStore = defineStore('auth', () => {

  const config = useRuntimeConfig()

  const user = ref<AuthUser | null>(null)
  const role = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const accessToken = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === 'admin')

  const authBase = `${config.public.supabaseUrl}/auth/v1`
  const restBase = `${config.public.supabaseUrl}/rest/v1`
  const commonHeaders = { apikey: config.public.supabaseAnonKey as string }

  async function fetchRole(userId: string) {
    const data = await $fetch<{ role: string }>(`${restBase}/profiles`, {
      query: { id: `eq.${userId}`, select: 'role' },
      headers: {
        ...commonHeaders,
        Authorization: `Bearer ${accessToken.value}`,
        Accept: 'application/vnd.pgrst.object+json',
      },
    })
    role.value = data?.role ?? null
  }

  async function init() {
    if (!accessToken.value) return
    try {
      const data = await $fetch<AuthUser>(`${authBase}/user`, {
        headers: { ...commonHeaders, Authorization: `Bearer ${accessToken.value}` },
      })
      user.value = data
      if (user.value) await fetchRole(user.value.id)
    } catch {
      user.value = null
      role.value = null
      accessToken.value = null
    }
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<{ access_token: string; user: AuthUser }>(
        `${authBase}/token?grant_type=password`,
        {
          method: 'POST',
          headers: commonHeaders,
          body: { email, password },
        }
      )
      accessToken.value = data.access_token
      user.value = data.user
      if (user.value) await fetchRole(user.value.id)
    } catch (err: any) {
      error.value = err.data?.error_description ?? err.message
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await $fetch(`${authBase}/logout`, {
        method: 'POST',
        headers: { ...commonHeaders, Authorization: `Bearer ${accessToken.value}` },
      })
    } finally {
      user.value = null
      role.value = null
      accessToken.value = null
    }
  }

  return {
    user,
    role,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    init,
    login,
    logout,
    accessToken,
  }

}, {
  persist: {
    pick: ['user', 'role', 'accessToken'],
  }
})
