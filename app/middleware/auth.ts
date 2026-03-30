import { useAuth } from "~/composables/admin/auth/useAuth";

export default defineNuxtRouteMiddleware((to, from) => {

  const user = useAuth(); // o tu lógica de auth

//   if (!user.data.value) {
//     console.log('No tienes permisos', user.data);

//     console.log('No tienes permisos', user.data.value);
    
//     return navigateTo('/admin/login')
//   }

});