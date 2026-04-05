import type { UserProfile } from "~/interfaces/profiles";

type CreateUserPayload = Omit<UserProfile, 'id'> & { password: string; avatar_img_url?: string | null };

export const useCreateUser = () => {
  const { $supabase } = useNuxtApp();

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const createUser = async (payload: CreateUserPayload) => {
    isLoading.value = true;
    error.value = null;

    const { data: { session } } = await $supabase.auth.getSession();

    if (!session) {
      error.value = 'No autenticado';
      isLoading.value = false;
      return null;
    }

    try {
      const data = await $fetch<UserProfile>('/api/admin/users/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: payload,
      });

      return data;
    } catch (err: any) {
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
