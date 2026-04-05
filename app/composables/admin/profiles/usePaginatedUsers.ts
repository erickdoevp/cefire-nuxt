import type { PaginatedUserProfile } from "~/interfaces/paginated-profiles";

export const usePaginatedUsers = () => {

  const { $supabase } = useNuxtApp();

  const users = ref<PaginatedUserProfile[]>([]);
  const isLoading = ref<boolean>(false);
  const total = ref<number>(0);
  const page = ref<number>(1);
  const pageSize = ref<number>(10);

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

  const fetchUsers = async (options?: { page?: number; pageSize?: number }) => {
    isLoading.value = true;

    if (options?.page) page.value = options.page;
    if (options?.pageSize) pageSize.value = options.pageSize;

    const from = (page.value - 1) * pageSize.value;
    const to = from + pageSize.value - 1;

    const { data, count, error } = await $supabase
      .from('profiles')
      .select('id, name, first_last_name, second_last_name, username, email, role, phone:phone_number', { count: 'exact' })
      .order('name', { ascending: true })
      .range(from, to);

    if (error?.message) {
      console.log(error.message);
    }

    if (data) {
      users.value = data;
      total.value = count || 0;
    }

    isLoading.value = false;
  };

  return {
    users,
    isLoading,
    total,
    page,
    pageSize,
    totalPages,
    fetchUsers,
  };

};
