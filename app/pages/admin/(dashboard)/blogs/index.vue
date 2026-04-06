<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { ZonedDateTime, CalendarDate, CalendarDateTime } from '@internationalized/date';
import { useDebounceFn } from '@vueuse/core';
import { usePaginatedBlogs } from '~/composables/admin/posts/usePaginatedBlogs';
import type { Blog, Category, User } from '~/interfaces/paginated-blog';
import { useFetchCategories } from '~/composables/admin/categories/useFetchCategories';
import { useFetchProfiles } from '~/composables/admin/profiles/useFetchProfiles';
import { useAuthStore } from '~/store/admin/auth/authStore';

definePageMeta({
  middleware:'auth'
});

const UButton = resolveComponent('UButton');
const inputDate1 = useTemplateRef('inputDate1');
const inputDate2 = useTemplateRef('inputDate2');

const { 
  fetchPosts, 
  blogs, 
  loading, 
  page, 
  pageSize, 
  totalPages, 
  total 
} = usePaginatedBlogs();

const { 
  categoryList, 
  fetchCategories 
} = useFetchCategories();

const {
  fetchProfiles,
  userList
} = useFetchProfiles();

const auth = useAuthStore();

const columns: TableColumn<Blog>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({row}) => `${(page.value - 1) * pageSize.value + row.index + 1}`
  },
  {
    accessorKey: 'title',
    header: 'Título',
    cell: ({row}) => {
      const title = row.getValue('title');
      return h(
        'p',
          {
            style: 'white-space: normal; word-break: break-word; max-width: 400px; min-width:300px;',
            class: 'truncate-text text-md font-semibold text-black',
          }, 
          String(title).slice(0, 40) + '...'
        )
    }
  },
  {
    accessorKey: 'user',
    header: 'Autor',
    cell: ({row}) => {
      const author = row.getValue('user') as User;
      console.log(author);
      
      const fullName = `${ author.name } ${ author.first_last_name } ${ author.second_last_name }`;
      return h(
        'p',
        {
          class: 'text-md'
        },
        fullName
      )
    }
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({row}) => {
      const category = row.getValue('category') as Category;
      const textColor = `color: ${category.text_chip_color}`;
      const bgColor = `background-color: ${category.chip_color}`;
      return h(
        'p', 
        {
          class: `rounded-lg py-[2px] px-[10px] text-md w-fit`,
          style: `${textColor}; ${bgColor}`
        },
        category.name
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Estatus',
    cell: ({row}) => {
      const status = row.getValue('status') as string;
      return h(
        'p',
        {
          class: status === 'Published' ? 'chip-published text-md w-fit' : 'chip-draft text-md w-fit',
        },
        status
      )
    }
  },
  {
    accessorKey: 'updated_at',
    header: 'Última edición',
    cell: ({row}) => {
      const date = row.getValue('updated_at') as Date;

      return h(
        'p',
        {
          class: 'text-md'
        },
        new Date(date).toLocaleString()
      )
    }
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({row}) => {
      const blogId = row.getValue('id') as string;
      const icons = ['material-symbols:edit-outline-sharp'];

      return h(
        'div',
        { class: 'flex flex-row gap-2' },
        icons.map((icon) => 
          h(
            UButton,
            {
              icon: icon,
              variant: 'link',
              to: `/admin/blog/${blogId}`,
              class: 'text-2xl text-[#9C9B99] cursor-pointer hover:text-primary'
            },

          )
        )
      )
    }
  }
];

const form = reactive<{
  title: string | undefined;
  status: 'All' | 'Published' | 'Draft';
  categoryId: number | undefined;
  userId: string | undefined;
  updatedAtFrom: CalendarDate | CalendarDateTime | ZonedDateTime | undefined;
  updatedAtTo: CalendarDate | CalendarDateTime | ZonedDateTime | undefined;
}>({
  title: undefined,
  status: 'All',
  categoryId: undefined,
  userId: undefined,
  updatedAtFrom: undefined,
  updatedAtTo: undefined,
});

const applyFilters = useDebounceFn(() => {
  fetchPosts({
    page: 1,
    filters: {
      title: form.title || undefined,
      status: form.status === 'All' ? undefined : form.status,
      categoryId: form.categoryId?.toString(),
      userId: form.userId,
      updatedAtFrom: form.updatedAtFrom?.toString(),
      updatedAtTo: form.updatedAtTo?.toString(),
    }
  });
}, 500);

const resetFilters = () => {
  form.title = undefined;
  form.status = 'All';
  form.categoryId = undefined;
  form.userId = auth.isAdmin ? undefined : auth.user?.id;
  form.updatedAtFrom = undefined;
  form.updatedAtTo = undefined;
};

watch(form, applyFilters);
watch(page, () => {
  fetchPosts({ page: page.value });
});

onMounted(() => {
  const userId = auth.isAdmin ? undefined : auth.user?.id;
  fetchPosts({ filters: { userId } });
  fetchCategories();
  if (auth.isAdmin) fetchProfiles();
  console.log('onmounted');
  
});

</script>

<template>
  <div class="flex flex-col h-full gap-8">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Blogs</h1>
        <p class="text-sm text-gray-500 mt-0.5">Gestiona el contenido de tu blogs</p>
      </div>
      <UButton 
        color="primary" 
        variant="outline" 
        size="lg" 
        to="/admin/new-blog"
        >Nuevo blog</UButton>
    </div>
    <!-- Filters -->

    <UForm :state="form" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <UFormField label="Título" name="title" class="w-full">
          <UInput 
            v-model="form.title"
            icon="i-lucide-search"
            :ui="{ trailing: 'pe-1' }"
            placeholder="Buscar por título..." 
            class="w-full"
            variant="subtle"
            size="xl"
          >
            <template v-if="form.title" #trailing>
              <UButton
                class="cursor-pointer"
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-circle-x"
                aria-label="Clear input"
                @click="form.title = ''"
              />
            </template>
          </UInput>
        </UFormField>

      </div>

      <div class="flex flex-wrap gap-4">

        <UFormField label="Estatus" name="status" class="w-full md:w-40">
          <USelect 
            v-model="form.status" 
            :items="['All', 'Published', 'Draft']" 
            variant="subtle"
            size="lg"
            class="w-full"
          />
        </UFormField>

         <UFormField label="Categoría" name="categoryId" class="w-full md:w-40">
          <USelect 
            v-model="form.categoryId" 
            :items="categoryList" 
            variant="subtle"
            size="lg"
            placeholder="Seleccione una categoría" 
            class="w-full"
          />
        </UFormField>
        
        <UFormField v-if="auth.isAdmin" label="Autor" name="userId" class="w-full md:w-40">
          <USelect
            v-model="form.userId"
            :items="userList"
            variant="subtle"
            size="lg"
            placeholder="Seleccione un autor"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Última edición desde" name="updatedAtFrom" class="w-full md:w-40">
          <UInputDate ref="inputDate1" v-model="(form.updatedAtFrom as any)" variant="subtle" size="lg" class="w-full">
            <template #trailing>
              <UPopover :reference="inputDate1?.inputsRef[3]?.$el">
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  icon="i-lucide-calendar"
                  aria-label="Select a date"
                  class="px-0"
                />

                <template #content>
                  <UCalendar v-model="(form.updatedAtFrom as any)" class="w-full md:w-40" />
                </template>
              </UPopover>
            </template>
          </UInputDate>
        </UFormField>

        <UFormField label="Última edición hasta" name="updatedAtTo" class="w-full md:w-40">
          <UInputDate ref="inputDate2" v-model="(form.updatedAtTo as any)" variant="subtle" size="lg" class="w-full">
            <template #trailing>
              <UPopover :reference="inputDate2?.inputsRef[3]?.$el">
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  icon="i-lucide-calendar"
                  aria-label="Select a date"
                  class="px-0"
                />

                <template #content>
                  <UCalendar v-model="(form.updatedAtTo as any)" class="p-2" />
                </template>
              </UPopover>
            </template>
          </UInputDate>
        </UFormField>

        <UButton
          color="error"
          variant="subtle"
          size="lg"
          class="h-fit self-end"
          @click="resetFilters"
          >Borrar filtros</UButton>

      </div>


    </UForm>

    <div class="">
      <div class="flex-1 overflow-auto border border-solid rounded-lg border-default">
        <UTable 
          :columns="columns" 
          :data="blogs" 
          :loading="loading"
          loading-color="primary"
          loading-animation="carousel"
          sticky
          />
        <div class="flex justify-between border-t border-default pt-4 px-4">
          <p class="text-[#9C9B99] text-xs font-light">Mostrando {{ blogs.length }} de {{ total }} resultados</p>
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
  </div>
</template>

<style lang="css">
.chip-published {
  border-radius: 16px;
  padding: 2px 10px;
  background-color: #bfdbfe20;
  color: #2563EB;
}

.chip-draft {
  border-radius: 16px;
  padding: 2px 10px;
  background-color: #FFF3CD;
  color: #D4A64A;
} 
</style>