import type { UserProfile } from '~/interfaces/profiles';

type UpdateUserPayload = Omit<UserProfile, 'id'> & { password?: string; avatarFile?: File | null };

export const useUpdateUser = () => {
  const { $supabase } = useNuxtApp();

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const updateUser = async (id: string, payload: UpdateUserPayload) => {
    isLoading.value = true;
    error.value = null;

    const { data: { session } } = await $supabase.auth.getSession();

    if (!session) {
      error.value = 'No autenticado';
      isLoading.value = false;
      return null;
    }

    try {
      const data = await $fetch<UserProfile>(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
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
