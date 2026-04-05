import type { Category } from '~/interfaces/category';

type UpdateCategoryPayload = Omit<Category, 'id'>;

export const useUpdateCategory = () => {

  const { $supabase } = useNuxtApp();

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const updateCategory = async (id: number, payload: UpdateCategoryPayload) => {
    isLoading.value = true;
    error.value = null;

    const { data, error: updateError } = await $supabase
      .from('categories')
      .update(payload)
      .eq('id', id)
      .select('id, name, chip_color, text_chip_color')
      .maybeSingle();

    if (updateError) {
      error.value = updateError.message;
      isLoading.value = false;
      return null;
    }

    if (!data) {
      error.value = 'No se encontró la categoría o no tienes permisos para editarla';
      isLoading.value = false;
      return null;
    }

    isLoading.value = false;
    return data as Category;
  };

  return {
    isLoading,
    error,
    updateCategory,
  };

};
