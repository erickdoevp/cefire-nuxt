import type { UserProfile } from "~/interfaces/profiles";

export const useFetchUser = () => {

  const { $supabase } = useNuxtApp();

  const user = ref<UserProfile | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchUser = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    const { data, error: fetchError } = await $supabase
      .from('profiles')
      .select(`
        id, 
        name, 
        first_last_name, 
        second_last_name, 
        username, 
        email, 
        role, phone:phone_number, 
        avatar_img_url
      `)
      .eq('id', id)
      .single();

    if (fetchError) {
      error.value = fetchError.message;
    }

    if (data) {
      user.value = data;
    }

    isLoading.value = false;
  };

  return {
    user,
    isLoading,
    error,
    fetchUser,
  };

};
