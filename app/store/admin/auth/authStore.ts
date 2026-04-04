import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {

  const { $supabase } = useNuxtApp()

  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  async function init() {
    const { data } = await $supabase.auth.getSession()
    user.value = data.session?.user ?? null

    $supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
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
    loading,
    error,
    isAuthenticated,
    init,
    login,
    logout,
  }

}, {
  persist: {
    pick: ['user'],
  }
})
