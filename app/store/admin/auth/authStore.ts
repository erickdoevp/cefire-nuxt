import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {

  const { $supabase } = useNuxtApp()

  const user = ref<User | null>(null)
  const role = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === 'admin')

  async function fetchRole(userId: string) {
    const { data } = await $supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    role.value = data?.role ?? null
  }

  async function init() {
    const { data } = await $supabase.auth.getSession()
    user.value = data.session?.user ?? null
    if (user.value) await fetchRole(user.value.id)

    $supabase.auth.onAuthStateChange(async (_event, session) => {
      user.value = session?.user ?? null
      if (user.value) await fetchRole(user.value.id)
      else role.value = null
    })
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null

    const { data, error: err } = await $supabase.auth.signInWithPassword({ email, password })

    if (err) {
      error.value = err.message
    } else {
      user.value = data.user
    }

    loading.value = false
  }

  async function logout() {
    await $supabase.auth.signOut()
    user.value = null
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
  }

}, {
  persist: {
    pick: ['user', 'role'],
  }
})
