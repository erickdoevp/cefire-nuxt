import type { PublicBlog } from "~/interfaces/public-blog";

export const usePaginatedPublicBlogs = () => {

  const { $supabase } = useNuxtApp();

  const blogs = ref<PublicBlog[]>([]);
  const loading = ref<boolean>(false);
  const total = ref<number>(0);
  const page = ref<number>(1);
  const pageSize = ref<number>(10);

  const totalPages = computed(() =>
    Math.ceil(total.value / pageSize.value)
  )

  const fetchPosts = async (options?: {
    page?: number
    pageSize?: number
  }) => {

    loading.value = true

    if (options?.page) page.value = options.page;
    if (options?.pageSize) pageSize.value = options.pageSize;

    const from = (page.value - 1) * pageSize.value
    const to = from + pageSize.value - 1

    const query = $supabase
      .from('posts')
      .select(
        `slug,
        title,
        excerpt,
        updatedAt:updated_at,
        status,
        readingTime:reading_time,
        featuredImage:featured_image,
        category:categories!inner(name, chip_color, text_chip_color),
        user:profiles!inner(name,first_last_name, second_last_name)
        `, { count: 'exact' }
      )
      .eq('status', 'Published')
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error)
    } else {
      blogs.value = data.map((blog)=> ({
        ...blog, 
        category: blog.category as unknown as PublicBlog['category'],
        user: blog.user as unknown as PublicBlog['user']
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
    fetchPosts,
    nextPage,
    prevPage,
    goToPage
  }

}