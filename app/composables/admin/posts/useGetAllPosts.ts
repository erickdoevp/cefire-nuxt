export const useGetPosts = () => {

  const { $supabase } = useNuxtApp();
  
  const err = ref<string>('');
  const data = ref<any>(null);
  const isLoading = ref<boolean>(false);

  const getAllPosts = async (page = 1, pageSize = 10) => {

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: response, error } = await $supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .range(from,to);
      if(error?.message) {
        err.value = error.message;
        console.log(err.value);
      } else {
        data.value = response;
      }

      isLoading.value = false;

  }


  return {
    getAllPosts,
    err,
    data
  }

}