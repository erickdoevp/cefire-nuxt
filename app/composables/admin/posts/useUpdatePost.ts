import type { Payload } from './useCreatePost'

export const useUpdatePost = () => {

  const { $supabase } = useNuxtApp()

  const err = ref<string>('')
  const isLoading = ref<boolean>(false)

  const updatePost = async (id: number, body: Payload) => {
    isLoading.value = true
    err.value = ''

    const { error } = await $supabase
      .from('posts')
      .update({
        title:         body.title,
        excerpt:       body.excerpt,
        featured_image: body.featuredImage,
        content:       body.content,
        conclusion:    body.conclusion,
        reading_time:  body.readTime,
        status:        body.status,
        meta_description: body.metaDescription,
        category_id:   body.category,
        tags:          body.tags,
        slug:          body.slug,
      })
      .eq('id', id)

    if (error) {
      err.value = error.message
    } else {
      navigateTo('/admin/blogs');
    }

    isLoading.value = false
  }

  return {
    updatePost,
    err,
    isLoading
  }
}
