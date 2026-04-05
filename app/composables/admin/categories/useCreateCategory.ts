import type { Category } from '~/interfaces/category';

type CreateCategoryPayload = Omit<Category, 'id'>;

export const useCreateCategory = () => {

  const { $supabase } = useNuxtApp();

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const createCategory = async (payload: CreateCategoryPayload) => {
    isLoading.value = true;
    error.value = null;

    const { data, error: insertError } = await $supabase
      .from('categories')
      .insert(payload)
      .select('id, name, chip_color, text_chip_color')
      .single();

    if (insertError) {
      error.value = insertError.message;
      isLoading.value = false;
      return null;
    }

    isLoading.value = false;
    return data as Category;
  };

  return {
    isLoading,
    error,
    createCategory,
  };

};
