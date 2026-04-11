import adminApi from "~/api/admin-api";
import type { Category } from "~/interfaces/category";


export const useFetchCategories = () => {

  const categories = ref<Category[]>([]);
  const loading = ref<boolean>(false);

  const fetchCategories = async () => {

    loading.value = true;

    try {

      const { data } = await adminApi.get<Category[]>('/categories', {
        params: {
          select: 'id,name,chip_color,text_chip_color',
          order: 'name.asc',
        },
      });
      
      categories.value = data;
    } catch (err: any) {
      console.error('Error fetching categories:', err.response?.data?.message ?? err);
      categories.value = [];
    } finally {
      loading.value = false;
    }
  }
  
  return {
    categories,
    loading,
    fetchCategories,
    categoryList: computed(() => categories.value.map(category => ({
      value: category.id,
      label: category.name
    }))),
    
  }

};