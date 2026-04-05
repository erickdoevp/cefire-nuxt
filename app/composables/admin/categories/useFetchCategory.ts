import type { Category } from "~/interfaces/category";

export const useFetchCategory = () => {

  const { $supabase } = useNuxtApp();

  const category = ref<Category | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchCategory = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    const { data, error: fetchError } = await $supabase
      .from('categories')
      .select('id, name, chip_color, text_chip_color')
      .eq('id', id)
      .single();

    if (fetchError) {
      error.value = fetchError.message;
    }

    if (data) {
      category.value = data as Category;
    }

    isLoading.value = false;
  };

  return {
    category,
    isLoading,
    error,
    fetchCategory,
  };

};
