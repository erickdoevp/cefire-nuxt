import type { Category } from "~/interfaces/category";


export const useFetchCategories = () => {
  const { $supabase } = useNuxtApp();

  const categories = ref<Category[]>([]);
  const loading = ref<boolean>(false);

  const fetchCategories = async () => {

    loading.value = true;

    try {
      const { data, error } = await $supabase
        .from('categories')
        .select('id, name, chip_color, text_chip_color')
        .order('name', { ascending: true });

      if(error) {
        console.error('Error fetching categories:', error);
        categories.value = [];
      } else {
        categories.value = data as Category[];
      }
    } catch (err) {
      console.error('Unexpected error fetching categories:', err)
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