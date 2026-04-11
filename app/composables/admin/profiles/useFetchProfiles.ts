import adminApi from "~/api/admin-api";
import type { Profile } from "~/interfaces/profiles";

export const useFetchProfiles = () => {

  const users = ref<Profile[]>([]);
  const isLoading = ref<boolean>(false);

  const fetchProfiles = async () => {
    isLoading.value = true;

    try {
      const { data } = await adminApi.get<Profile[]>(
        `/profiles`,
        {
          params: {
            select: 'id,name',
          },
        }
      );

      users.value = data;
      
    } catch (err: any) {
      console.error('Unexpected error fetching profiles:', err.response?.data?.message ?? err.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    users,
    isLoading,
    fetchProfiles,
    userList: computed(() => users.value.map(user => ({ value: user.id, label: user.name }))),
  };

};
