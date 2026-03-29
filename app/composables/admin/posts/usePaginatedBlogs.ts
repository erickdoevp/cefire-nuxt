import type { Blog, Category, User } from "~/interfaces/blog";

export interface BlogFilters {
  title?: string
  status?: string
  categoryId?: string
  userId?: string
  updatedAtFrom?: string
  updatedAtTo?: string
}

export const usePaginatedBlogs = () => {

  const { $supabase } = useNuxtApp();

  const blogs = ref<Blog[]>([]);
  const loading = ref<boolean>(false);
  const total = ref<number>(0);
  const page = ref<number>(1);
  const pageSize = ref<number>(10);
  const filters = ref<BlogFilters>({});

  const totalPages = computed(() =>
    Math.ceil(total.value / pageSize.value)
  )

  const fetchPosts = async (options?: {
    page?: number
    pageSize?: number
    filters?: BlogFilters
  }) => {

    loading.value = true

    if (options?.page) page.value = options.page;
    if (options?.pageSize) pageSize.value = options.pageSize;
    if (options?.filters !== undefined) filters.value = options.filters;

    const from = (page.value - 1) * pageSize.value
    const to = from + pageSize.value - 1

    let query = $supabase
      .from('posts')
      .select(
        `id,
        title,
        updated_at,
        status,
        category:categories!inner(id, name, chip_color, text_chip_color),
        user:profiles!inner(name,first_last_name, second_last_name)
        `, { count: 'exact' }
      )

    if (filters.value.title) {
      query = query.ilike('title', `%${filters.value.title}%`)
    }
    if (filters.value.status) {
      query = query.eq('status', filters.value.status)
    }
    if (filters.value.categoryId) {
      query = query.eq('category_id', filters.value.categoryId)
    }
    if (filters.value.userId) {
      query = query.eq('user_id', filters.value.userId)
    }
    if (filters.value.updatedAtFrom) {
      query = query.gte('updated_at', filters.value.updatedAtFrom)
    }
    if (filters.value.updatedAtTo) {
      query = query.lte('updated_at', filters.value.updatedAtTo)
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      blogs.value = data.map((blog)=> ({
        ...blog, 
        category: blog.category as unknown as Category,
        user: blog.user as unknown as User
       }));
      total.value = count || 0
    }

    loading.value = false
  }

  const nextPage = async () => {
    if (page.value < totalPages.value) {
      page.value++
      await fetchPosts()
    }
  }

  const prevPage = async () => {
    if (page.value > 1) {
      page.value--
      await fetchPosts()
    }
  }

  const goToPage = async (p: number) => {
    if (p >= 1 && p <= totalPages.value) {
      page.value = p
      await fetchPosts()
    }
  }

  return {
    blogs,
    loading,
    total,
    page,
    pageSize,
    totalPages,
    filters,
    fetchPosts,
    nextPage,
    prevPage,
    goToPage
  }

}