import adminApi from "~/api/admin-api";
import type { Category } from "~/interfaces/category";

export const useFetchCategory = () => {

  const category = ref<Category | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchCategory = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    try {

      const { data } = await adminApi.get<Category>('/categories', {
        params: {
          select: 'id,name,chip_color,text_chip_color',
          id: `eq.${id}`,
          limit: 1,
        },
        headers: {
          Accept: 'application/vnd.pgrst.object+json',
        }
      });

      category.value = data;

    } catch (err: any) {

      error.value = err.response?.data?.message ?? err.message;

    } finally {

      isLoading.value = false;
      
    }
  };

  return {
    category,
    isLoading,
    error,
    fetchCategory,
  };

};
