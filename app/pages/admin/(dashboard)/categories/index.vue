<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { usePaginatedCategories } from '~/composables/admin/categories/usePaginatedCategories';
import { useCreateCategory } from '~/composables/admin/categories/useCreateCategory';
import { useUpdateCategory } from '~/composables/admin/categories/useUpdateCategory';
import { useFetchCategory } from '~/composables/admin/categories/useFetchCategory';
import type { Category } from '~/interfaces/category';

definePageMeta({
  middleware: 'auth'
});

const UButton = resolveComponent('UButton');

const { categories, isLoading, total, page, pageSize, totalPages, fetchCategories } = usePaginatedCategories();
const { createCategory, isLoading: creating, error: createError } = useCreateCategory();
const { updateCategory, isLoading: updating, error: updateError } = useUpdateCategory();
const { category: selectedCategory, fetchCategory } = useFetchCategory();

const isModalOpen = ref(false);
const submitting = computed(() => creating.value || updating.value);
const modalError = computed(() => createError.value || updateError.value);

async function openEdit(id: number) {
  await fetchCategory(id);
  isModalOpen.value = true;
}

function openCreate() {
  selectedCategory.value = null;
  isModalOpen.value = true;
}

async function handleSave(payload: Omit<Category, 'id'>) {
  const result = selectedCategory.value
    ? await updateCategory(selectedCategory.value.id, payload)
    : await createCategory(payload);

  if (result) {
    isModalOpen.value = false;
    await fetchCategories({ page: page.value });
  }
}

const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;

      return h(
        'p', 
        { 
          class: 'text-sm font-medium text-gray-900',
        }, 
        name || '—');
    },
  },
  {
    accessorKey: 'chip_color',
    header: 'Color primario',
    cell: ({ row }) => {
      const color = row.getValue('text_chip_color') as string | null;
      if (!color) return h('p', { class: 'text-sm text-gray-400' }, '—');
      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'w-5 h-5 rounded-md border border-gray-200 shrink-0', style: `background-color: ${color}` }),
        h('p', { class: 'text-sm text-gray-600' }, color),
      ]);
    },
  },
  {
    accessorKey: 'text_chip_color',
    header: 'Color secundario',
    cell: ({ row }) => {
      const color = row.getValue('chip_color') as string | null;
      if (!color) return h('p', { class: 'text-sm text-gray-400' }, '—');
      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: 'w-5 h-5 rounded-md border border-gray-200 shrink-0', style: `background-color: ${color}` }),
        h('p', { class: 'text-sm text-gray-600' }, color),
      ]);
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const categoryId = row.original.id;
      return h(
        'div',
        { class: 'flex flex-row gap-2' },
        [
          h(UButton, {
            icon: 'material-symbols:edit-outline-sharp',
            variant: 'link',
            class: 'text-2xl text-[#9C9B99] cursor-pointer hover:text-primary',
            onClick: () => openEdit(categoryId),
          }),
        ]
      );
    },
  },
];

watch(page, () => {
  fetchCategories({ page: page.value });
});

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="flex flex-col h-full gap-8">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Categorías</h1>
        <p class="text-sm text-gray-500 mt-0.5">Gestiona las categorías del sistema</p>
      </div>
      <UButton
        color="primary"
        variant="solid"
        size="lg"
        @click="openCreate"
      >Crear nueva categoría</UButton>
    </div>

    <!-- Table -->
    <div class="flex-1 overflow-auto border border-solid rounded-lg border-default">
      <UTable
        :columns="columns"
        :data="categories"
        :loading="isLoading"
        loading-color="primary"
        loading-animation="carousel"
        sticky
      />
      <div class="flex justify-between border-t border-default pt-4 px-4 pb-4">
        <p class="text-[#9C9B99] text-xs font-light">Mostrando {{ categories.length }} de {{ total }} categorías</p>
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
    <AdminCategoryModal
      v-model:open="isModalOpen"
      :category="selectedCategory"
      :is-submitting="submitting"
      :error="modalError"
      @save="handleSave"
    />
  </div>
</template>

<style scoped>
.border-default {
  border-color: #e4e4e7;
}
</style>
