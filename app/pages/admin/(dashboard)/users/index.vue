<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { usePaginatedUsers } from '~/composables/admin/profiles/usePaginatedUsers';

import type { PaginatedUserProfile } from '~/interfaces/paginated-profiles';

definePageMeta({
  middleware: 'auth'
});

const UButton = resolveComponent('UButton');

const { users, isLoading, total, page, pageSize, totalPages, fetchUsers } = usePaginatedUsers();

const columns: TableColumn<PaginatedUserProfile>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const fullName = [
        row.original.name,
        row.original.first_last_name,
        row.original.second_last_name,
      ].filter(Boolean).join(' ');

      return h('p', { class: 'text-sm font-medium text-gray-900' }, fullName);
    },
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => {
      const username = row.getValue('username') as string;
      return h('p', { class: 'text-sm text-gray-600' }, username ? `@${username}` : '—');
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.getValue('email') as string;
      return h('p', { class: 'text-sm text-gray-600' }, email || '—');
    },
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      const isAdmin = role?.toLowerCase() === 'admin';
      return h(
        'p',
        {
          class: `text-sm rounded-lg py-[2px] px-[10px] w-fit ${isAdmin ? 'bg-blue-100/50 text-blue-600' : 'bg-gray-100 text-gray-600'}`,
        },
        role || '—'
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string;
      return h('p', { class: 'text-sm text-gray-600' }, phone || '—');
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const userId = row.original.id;
      return h(
        'div',
        { class: 'flex flex-row gap-2' },
        [
          h(UButton, {
            icon: 'material-symbols:edit-outline-sharp',
            variant: 'link',
            to: `/admin/user/${userId}`,
            class: 'text-2xl text-[#9C9B99] cursor-pointer hover:text-primary',
          }),
        ]
      );
    },
  },
];

watch(page, () => {
  fetchUsers({ page: page.value });
});

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="flex flex-col h-full gap-8">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Usuarios</h1>
        <p class="text-sm text-gray-500 mt-0.5">Gestiona los usuarios del sistema</p>
      </div>
      <UButton 
        color="primary" 
        variant="outline" 
        size="lg" 
        to="/admin/new-user"
        >Nuevo usuario
      </UButton>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto border border-solid rounded-lg border-default">
      <UTable
        :columns="columns"
        :data="users"
        :loading="isLoading"
        loading-color="primary"
        loading-animation="carousel"
        sticky
      />
      <div class="flex justify-between border-t border-default pt-4 px-4 pb-4">
        <p class="text-[#9C9B99] text-xs font-light">Mostrando {{ users.length }} de {{ total }} usuarios</p>
        <UPagination
          v-model:page="page"
          :items-per-page="pageSize"
          :total="totalPages"
          :show-edges="false"
          variant="ghost"
          active-variant="ghost"
        />
      </div>
    </div>
  </div>
</template>
