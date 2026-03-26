
const loading = ref(false)
const error = ref<string | null>(null)
const data = ref<any>(null);

export const useAuth = () => {

  const { $supabase } = useNuxtApp();


  const login = async (email: string, password: string) => {

    loading.value = true
    error.value = null

    const { data: dat, error: err } = await $supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if(err) {
      error.value = err?.message || 'Error al hacer loginsac';
    } else {
      data.value = dat;
      console.log(data.value);
    }

  }


  return {
    login,
    data,
    error
  }
}