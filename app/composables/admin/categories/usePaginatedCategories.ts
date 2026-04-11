import adminApi from "~/api/admin-api";
import type { Category } from "~/interfaces/category";

export const usePaginatedCategories = () => {

  const categories = ref<Category[]>([]);
  const isLoading = ref<boolean>(false);
  const total = ref<number>(0);
  const page = ref<number>(1);
  const pageSize = ref<number>(5);

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  const fetchCategories = async (options?: { page?: number; pageSize?: number }) => {
    isLoading.value = true;

    if (options?.page) page.value = options.page;
    if (options?.pageSize) pageSize.value = options.pageSize;

    const from = (page.value - 1) * pageSize.value;

    try {

      const { data, headers } = await adminApi.get<Category[]>('/categories', {
        params: {
          select: 'id,name,chip_color,text_chip_color',
          order: 'name.asc',
          offset: from,
          limit: pageSize.value,
        },
        headers: {
          Prefer: 'count=exact',
        }
      });
      
      categories.value = data;
      const contentRange = headers['content-range'];
      total.value = contentRange ? parseInt(contentRange.split('/')[1]) : 0;
    } catch (err: any) {
      console.error('Error fetching categories:', err.response?.data?.message ?? err.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    categories,
    isLoading,
    total,
    page,
    pageSize,
    totalPages,
    fetchCategories,
  };

};
