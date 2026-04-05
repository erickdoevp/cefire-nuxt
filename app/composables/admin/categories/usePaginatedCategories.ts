import type { Category } from "~/interfaces/category";

export const usePaginatedCategories = () => {

  const { $supabase } = useNuxtApp();

  const categories = ref<Category[]>([]);
  const isLoading = ref<boolean>(false);
  const total = ref<number>(0);
  const page = ref<number>(1);
  const pageSize = ref<number>(10);

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  const fetchCategories = async (options?: { page?: number; pageSize?: number }) => {
    isLoading.value = true;

    if (options?.page) page.value = options.page;
    if (options?.pageSize) pageSize.value = options.pageSize;

    const from = (page.value - 1) * pageSize.value;
    const to = from + pageSize.value - 1;

    const { data, count, error } = await $supabase
      .from('categories')
      .select('id, name, chip_color, text_chip_color', { count: 'exact' })
      .order('name', { ascending: true })
      .range(from, to);

    if (error) {
      console.error('Error fetching categories:', error.message);
    }

    if (data) {
      categories.value = data as Category[];
      total.value = count || 0;
    }

    isLoading.value = false;
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
