import type { PublicBlog } from "~/interfaces/public-blog";

export const usePaginatedPublicBlogs = (initialPageSize = 9) => {

  const { $supabase } = useNuxtApp();

  const page = ref<number>(1);
  const pageSize = ref<number>(initialPageSize);
  const total = ref<number>(0);

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  const { data, pending: loading, refresh } = useAsyncData<PublicBlog[]>(
    'public-blogs',
    async () => {
      const from = (page.value - 1) * pageSize.value;
      const to = from + pageSize.value - 1;

      const { data, count, error } = await $supabase
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
          user:profiles!inner(name, first_last_name, second_last_name)`,
          { count: 'exact' }
        )
        .eq('status', 'Published')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Error fetching posts:', error);
        return [];
      }

      total.value = count ?? 0;

      return data.map(blog => ({
        ...blog,
        category: blog.category as unknown as PublicBlog['category'],
        user: blog.user as unknown as PublicBlog['user'],
      }));
    },
    { watch: [page] }
  );

  const blogs = computed(() => data.value ?? []);

  return {
    blogs,
    loading,
    total,
    page,
    pageSize,
    totalPages,
    refresh,
    lastPost: computed(() => blogs.value.length > 0 ? blogs.value[blogs.value.length - 1] : null),
  };

};
