import axios from 'axios';
import adminApi from '~/api/admin-api';
import type { Blog, Category, User } from "~/interfaces/paginated-blog";
export interface BlogFilters {
  title?: string
  status?: string
  categoryId?: string
  userId?: string
  updatedAtFrom?: string
  updatedAtTo?: string
}

export const usePaginatedBlogs = () => {

  const config = useRuntimeConfig();

  const blogs = ref<Blog[]>([]);
  const loading = ref<boolean>(false);
  const total = ref<number>(0);
  const page = ref<number>(1);
  const pageSize = ref<number>(5);
  const filters = ref<BlogFilters>({});

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  const fetchPosts = async (options?: {
    page?: number
    pageSize?: number
    filters?: BlogFilters
  }) => {
    loading.value = true;

    if (options?.page) page.value = options.page;
    if (options?.pageSize) pageSize.value = options.pageSize;
    if (options?.filters !== undefined) filters.value = options.filters;

    const from = (page.value - 1) * pageSize.value;

    const params = new URLSearchParams();
    params.append('select', 'id,title,updated_at,status,category:categories!inner(id,name,chip_color,text_chip_color),user:profiles!inner(name,first_last_name,second_last_name)');
    params.append('order', 'created_at.desc');
    params.append('offset', String(from));
    params.append('limit', String(pageSize.value));

    if (filters.value.title) params.append('title', `ilike.*${filters.value.title}*`);
    if (filters.value.status) params.append('status', `eq.${filters.value.status}`);
    if (filters.value.categoryId) params.append('category_id', `eq.${filters.value.categoryId}`);
    if (filters.value.userId) params.append('profile_id', `eq.${filters.value.userId}`);
    if (filters.value.updatedAtFrom) params.append('updated_at', `gte.${filters.value.updatedAtFrom}`);
    if (filters.value.updatedAtTo) params.append('updated_at', `lte.${filters.value.updatedAtTo}`);

    try {
      const { data, headers } = await adminApi.get<Blog[]>(
        `${config.public.supabaseUrl}/rest/v1/posts?${params.toString()}`,
        {
          headers: {
            Prefer: 'count=exact',
          },
        }
      );

      blogs.value = data.map(blog => ({
        ...blog,
        category: blog.category as unknown as Category,
        user:     blog.user as unknown as User,
      }));

      const contentRange = headers['content-range'];
      total.value = contentRange ? parseInt(contentRange.split('/')[1]) : 0;

    } catch (err: any) {

      console.error('Error fetching posts:', err.response?.data?.message ?? err.message);

    } finally {

      loading.value = false;
      
    }
  };

  const nextPage = async () => {
    if (page.value < totalPages.value) {
      page.value++;
      await fetchPosts();
    }
  };

  const prevPage = async () => {
    if (page.value > 1) {
      page.value--;
      await fetchPosts();
    }
  };

  const goToPage = async (p: number) => {
    if (p >= 1 && p <= totalPages.value) {
      page.value = p;
      await fetchPosts();
    }
  };

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
    goToPage,
  };

};
