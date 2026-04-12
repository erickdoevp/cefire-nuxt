import { createAdminApi } from '~/api/admin-api'
import type { BlogById } from '~/interfaces/fetch-blog-id'

export const useFetchBlog = (id: number) => {

  const blog = ref<BlogById | null>(null)
  const loading = ref<boolean>(false)

  const fetchBlog = async () => {
    loading.value = true

    try {
      const api = createAdminApi()
      const data = await api<BlogById>('/posts', {
        query: {
          id:     `eq.${id}`,
          select: 'id,title,category:categories(id,name),content,conclusion,excerpt,readTime:reading_time,status,metaDescription:meta_description,featuredImage:featured_image,tags,slug',
        },
        headers: {
          Accept: 'application/vnd.pgrst.object+json',
        },
      })

      blog.value = { ...data, category: data.category as unknown as BlogById['category'] }

    } catch (err: any) {
      console.error('Error fetching blog:', err.data?.message ?? err.message)
      blog.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    blog,
    loading,
    fetchBlog,
  }
}
