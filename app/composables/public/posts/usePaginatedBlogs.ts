import { createPublicApi } from '~/api/public-api'
import type { PublicBlog } from '~/interfaces/public-blog'

interface PaginatedResult {
  blogs: PublicBlog[]
  total: number
}

export const usePaginatedPublicBlogs = (initialPageSize = 9) => {
  const page = ref<number>(1)
  const pageSize = ref<number>(initialPageSize)

  const { data, pending: loading, refresh } = useAsyncData<PaginatedResult>(
    'public-blogs',
    async () => {
      const api = createPublicApi()
      const from = (page.value - 1) * pageSize.value
      const to = from + pageSize.value - 1

      const response = await api.raw('/posts', {
        query: {
          select: 'slug,title,excerpt,updatedAt:updated_at,status,readingTime:reading_time,featuredImage:featured_image,category:categories!inner(name,chip_color,text_chip_color),user:profiles!inner(name,first_last_name,second_last_name)',
          status: 'eq.Published',
          order: 'created_at.desc',
        },
        headers: {
          Prefer: 'count=exact',
          Range: `${from}-${to}`,
        },
      })

      let total = 0
      const contentRange = response.headers.get('content-range')
      if (contentRange) {
        const match = contentRange.match(/\/(\d+)$/)
        if (match) total = parseInt(match[1])
      }

      return { blogs: response._data as PublicBlog[], total }
    },
    { watch: [page] }
  )

  const blogs = computed(() => data.value?.blogs ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  return {
    blogs,
    loading,
    total,
    page,
    pageSize,
    totalPages,
    refresh,
    featuredPost: computed(() => blogs.value[0] ?? null),
  }
}
