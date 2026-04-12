import { createAdminApi } from '~/api/admin-api'
import type { Payload } from './useCreatePost'

export const useUpdatePost = () => {

  const err = ref<string>('')
  const isLoading = ref<boolean>(false)

  const updatePost = async (id: number, body: Payload) => {
    isLoading.value = true
    err.value = ''

    try {
      const api = createAdminApi()
      await api('/posts', {
        method: 'PATCH',
        query: { id: `eq.${id}` },
        body: {
          title:            body.title,
          excerpt:          body.excerpt,
          featured_image:   body.featuredImage,
          content:          body.content,
          conclusion:       body.conclusion,
          reading_time:     body.readTime,
          status:           body.status,
          meta_description: body.metaDescription,
          category_id:      body.category,
          tags:             body.tags,
          slug:             body.slug,
        },
        headers: {
          Prefer: 'return=minimal',
        },
      })

      navigateTo('/admin/blogs')

    } catch (e: any) {
      err.value = e.data?.message ?? e.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    updatePost,
    err,
    isLoading,
  }
}
