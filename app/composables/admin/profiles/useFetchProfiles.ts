import type { Profile } from "~/interfaces/profiles";

export const useFetchProfiles = () => {

  const { $supabase } = useNuxtApp();

  const users = ref<Profile[]>([]);
  const isLoading = ref<boolean>(false);

  const fetchProfiles = async () => {
      isLoading.value = true;

      const { data, error } = await $supabase
        .from('profiles')
        .select('id, name');

      if(error?.message) {
        console.log(error.message);
      }

      if(data) {
        users.value = data;
      }

      isLoading.value = false;
  };

  return {
    users,
    isLoading,
    fetchProfiles,
    userList: computed(() => users.value.map(user => ({ value: user.id, label: user.name }))),
  };

};