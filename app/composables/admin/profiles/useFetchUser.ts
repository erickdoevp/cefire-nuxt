import adminApi from "~/api/admin-api";
import type { UserProfile } from "~/interfaces/profiles";

export const useFetchUser = () => {

  const user = ref<UserProfile | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchUser = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await adminApi.get<UserProfile>(
        `/profiles`,
        {
          params: {
            id: `eq.${id}`,
            select: 'id,name,first_last_name,second_last_name,username,email,role,phone:phone_number,avatar_img_url',
          },
          headers: {
            Accept: 'application/vnd.pgrst.object+json',
          },
        }
      );

      user.value = data;

    } catch (err: any) {

      error.value = err.response?.data?.message ?? err.message;

    } finally {
      
      isLoading.value = false;

    }
  };

  return {
    user,
    isLoading,
    error,
    fetchUser,
  };

};
