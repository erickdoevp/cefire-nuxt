import { useAuthStore } from '~/store/admin/auth/authStore'

export const useAuth = () => {
  return useAuthStore()
}
