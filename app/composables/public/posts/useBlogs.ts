import { createPublicApi } from '~/api/public-api'
import type { PublicBlogDetail } from '~/interfaces/public-blog-detail'
import type { PublicBlog } from '~/interfaces/public-blog'

export const useBlogs = () => {
  const api = createPublicApi()

  async function fetchBlogBySlug(slug: string): Promise<PublicBlogDetail> {
    const { data } = await api.get('/posts', {
      params: {
        select: 'slug,title,excerpt,conclusion,content,tags,readTime:reading_time,featuredImage:featured_image,metaDescription:meta_description,status,createdAt:created_at,category:categories!inner(id,name,chip_color,text_chip_color),author:profiles!inner(name,first_last_name,second_last_name)',
        slug: `eq.${slug}`,
        status: 'eq.Published',
      },
      headers: {
        Accept: 'application/vnd.pgrst.object+json',
      },
    })
    return data
  }

  async function fetchRelatedPosts(categoryId: number, currentSlug: string): Promise<PublicBlog[]> {
    const { data } = await api.get('/posts', {
      params: {
        select: 'slug,title,excerpt,updatedAt:updated_at,status,readingTime:reading_time,featuredImage:featured_image,category:categories!inner(name,chip_color,text_chip_color),user:profiles!inner(name,first_last_name,second_last_name)',
        status: 'eq.Published',
        category_id: `eq.${categoryId}`,
        slug: `neq.${currentSlug}`,
        limit: 3,
      },
    })
    return data
  }

  return {
    fetchBlogBySlug,
    fetchRelatedPosts,
  }
}
