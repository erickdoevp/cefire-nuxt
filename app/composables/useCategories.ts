export const useCategories = () => {

  const { $supabase } = useNuxtApp();

  const categories = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const getCategories = async () => {
    loading.value = true
    error.value = null

    const { data, error: err } = await $supabase
      .from('categories')
      .select(`*`)
      .order('created_at', { ascending: false })

    if (err) {
      error.value = err.message
    } else {
      categories.value = data
    }

    loading.value = false
  }

  return {
    categories,
    loading,
    error,
    getCategories,
  }
}