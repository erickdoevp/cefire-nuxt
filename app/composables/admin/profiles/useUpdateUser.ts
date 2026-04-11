import type { UserProfile } from '~/interfaces/profiles';
import { useAuthStore } from '~/store/admin/auth/authStore';

type UpdateUserPayload = Omit<UserProfile, 'id'> & { password?: string; avatarFile?: File | null };

export const useUpdateUser = () => {
  const authStore = useAuthStore();

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const updateUser = async (id: string, payload: UpdateUserPayload) => {
    isLoading.value = true;
    error.value = null;

    if (!authStore.accessToken) {
      error.value = 'No autenticado';
      isLoading.value = false;
      return null;
    }

    try {
      const data = await $fetch<UserProfile>(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
        body: payload,
      });

      return data;
    } catch (err: any) {
      error.value = err?.data?.message ?? 'Error al actualizar el usuario';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    updateUser,
  };
};
