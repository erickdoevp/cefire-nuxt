import { useAuthStore } from '~/store/admin/auth/authStore'

export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()
  console.log('isAuth? : ',auth.isAuthenticated);
  
  if (!auth.isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
