import type { UserProfile } from "~/interfaces/profiles";
import { useAuthStore } from "~/store/admin/auth/authStore";

type CreateUserPayload = Omit<UserProfile, 'id'> & { password?: string; avatar_img_url?: string | null };

export const useCreateUser = () => {
  const authStore = useAuthStore();

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const createUser = async (payload: CreateUserPayload) => {
    console.log('create user');
    
    isLoading.value = true;
    error.value = null;

    if (!authStore.accessToken) {
      console.log('No autenticado');
      
      error.value = 'No autenticado';
      isLoading.value = false;
      return null;
    }

    try {
      console.log('try');
      
      const data = await $fetch<UserProfile>('/api/admin/users/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
        body: payload,
      });

      return data;
    } catch (err: any) {
      console.log(err);
      
      error.value = err?.data?.message ?? 'Error al crear el usuario';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    createUser,
  };
};
