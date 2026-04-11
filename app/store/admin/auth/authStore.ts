import { defineStore } from 'pinia'
import axios from 'axios'
import adminApi from '~/api/admin-api'

interface AuthUser {
  id: string
  email: string
  [key: string]: any
}

export const useAuthStore = defineStore('auth', () => {

  const config = useRuntimeConfig()

  const authApi = axios.create({
    baseURL: `${config.public.supabaseUrl}/auth/v1`,
    headers: {
      apikey: config.public.supabaseAnonKey,
    },
  })

  const user = ref<AuthUser | null>(null)
  const role = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const accessToken = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === 'admin')

  async function fetchRole(userId: string) {
    const { data } = await adminApi.get<{ role: string }>(
      '/profiles',
      {
        params: {
          id: `eq.${userId}`,
          select: 'role',
        },
        headers: {
          Accept: 'application/vnd.pgrst.object+json',
        },
      }
    )
    role.value = data?.role ?? null
  }

  async function init() {
    if (!accessToken.value) return
    try {
      const { data } = await authApi.get<AuthUser>('/user', {
        headers: { Authorization: `Bearer ${accessToken.value}` },
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
      const { data } = await authApi.post<{ access_token: string; user: AuthUser }>(
        '/token?grant_type=password',
        { email, password }
      )
      accessToken.value = data.access_token
      user.value = data.user
      if (user.value) await fetchRole(user.value.id)
    } catch (err: any) {
      error.value = err.response?.data?.error_description ?? err.message
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authApi.post('/logout', {}, {
        headers: { Authorization: `Bearer ${accessToken.value}` },
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
    accessToken
  }

}, {
  persist: {
    pick: ['user', 'role', 'accessToken'],
  }
})
