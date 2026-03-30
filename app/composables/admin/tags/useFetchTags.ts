import type { Tag } from "~/interfaces/tags";


export const useFetchTags = () => {
  const { $supabase } = useNuxtApp();

  const tags = ref<Tag[]>([]);
  const loading = ref<boolean>(false);

  const fetchTags = async () => {

    loading.value = true;

    const { data, error } = await $supabase
      .from('tags')
      .select('id, name')
      .order('name', { ascending: true });

      if(error) {
        console.error('Error fetching tags:', error);
        tags.value = [];
      } else {
        tags.value = data as Tag[];
      }
      loading.value = false;
  }
  
  return {
    tags,
    loading,
    fetchTags,
    tagList: computed(() => tags.value.map(tag => ({
      value: tag.id,
      label: tag.name
    }))),
    
  }

};