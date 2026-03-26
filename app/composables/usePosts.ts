export const usePosts = () => {

  const { $supabase } = useNuxtApp()

  const posts = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const getPosts = async () => {
    loading.value = true
    error.value = null

    const { data, error: err } = await $supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })

    if (err) {
      error.value = err.message
    } else {
      posts.value = data
    }

    loading.value = false
  }

  return {
    posts,
    loading,
    error,
    getPosts,
  }
}