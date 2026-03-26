<script setup lang="ts">
import { useGetPosts } from '~/composables/admin/posts/useGetAllPosts';

  const getPosts = useGetPosts();
onMounted(() => {
  console.log('get all posts');
  
  getPosts.getAllPosts();
})

definePageMeta({ 
  middleware:'auth' 
});

const search = ref('')
const activeTab = ref('all')
const categoryFilter = ref('all')
const dateFilter = ref('all')
const currentPage = ref(1)
const pageSize = 6


type Post = {
  id: number
  title: string
  author: string
  category: string
  status: 'Published' | 'Draft'
  date: string
  views: number
}

const posts: Post[] = [
  { id: 1, title: '5 Stretches You Should Do Every Morning', author: 'Dr. Michael Chen', category: 'Recovery Tips', status: 'Published', date: 'Mar 15, 2024', views: 1242 },
  { id: 2, title: 'How Foam Rolling Can Accelerate Your Recovery', author: 'Dr. Lisa Wagner', category: 'Fitness', status: 'Published', date: 'Mar 10, 2024', views: 628 },
  { id: 3, title: 'Why Athletes Should Never Skip Cool-Down', author: 'Dr. James Patel', category: 'Joint & Arthritis', status: 'Draft', date: 'Mar 9, 2024', views: 0 },
  { id: 4, title: 'Best Sleeping Positions for Lower Back Pain', author: 'Dr. Lisa Wagner', category: 'Pain Management', status: 'Published', date: 'Mar 2, 2024', views: 2145 },
  { id: 5, title: 'Understanding Non-Rotator Cuff Injury', author: 'Dr. James Patel', category: 'Sports Medicine', status: 'Draft', date: 'Feb 28, 2023', views: 0 },
  { id: 6, title: "A Patient's Guide to Post-Surgery Recovery", author: 'Dr. Michael Chen', category: 'Recovery Tips', status: 'Published', date: 'Feb 22, 2024', views: 548 },
]

const categories = ['Recovery Tips', 'Fitness', 'Joint & Arthritis', 'Pain Management', 'Sports Medicine']

const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  ...categories.map(c => ({ label: c, value: c })),
]

const dateOptions = [
  { label: 'All Time', value: 'all' },
  { label: 'This Month', value: 'month' },
  { label: 'This Week', value: 'week' },
]

const filteredPosts = computed(() => {
  return posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.value.toLowerCase())
      || post.author.toLowerCase().includes(search.value.toLowerCase())
    const matchesTab = activeTab.value === 'all'
      || (activeTab.value === 'published' && post.status === 'Published')
      || (activeTab.value === 'draft' && post.status === 'Draft')
    const matchesCategory = categoryFilter.value === 'all' || post.category === categoryFilter.value
    return matchesSearch && matchesTab && matchesCategory
  })
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredPosts.value.slice(start, start + pageSize)
})

const categoryColors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  'Recovery Tips': 'info',
  'Fitness': 'secondary',
  'Joint & Arthritis': 'success',
  'Pain Management': 'warning',
  'Sports Medicine': 'primary',
}

const tabs = [
  { value: 'all', label: 'All Posts' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

const selectedRows = ref<number[]>([])

function toggleAll() {
  if (selectedRows.value.length === paginatedPosts.value.length) {
    selectedRows.value = []
  } else {
    selectedRows.value = paginatedPosts.value.map(p => p.id)
  }
}

function toggleRow(id: number) {
  const idx = selectedRows.value.indexOf(id)
  if (idx === -1) selectedRows.value.push(id)
  else selectedRows.value.splice(idx, 1)
}

const rowActions = (_post: Post) => [
  [{ label: 'Editar', icon: 'i-lucide-pencil' }],
  [{ label: 'Eliminar', icon: 'i-lucide-trash-2', color: 'error' as const }],
]
</script>

<template>
  <div class="flex flex-col h-full gap-6">
    <!-- Header -->
    <div class="flex items-start justify-between px-8 pt-8">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Posts</h1>
        <p class="text-sm text-gray-500 mt-0.5">Manage your blog, wellness tools content</p>
      </div>
      <div class="flex items-center gap-3">
        <UInput
          v-model="search"
          placeholder="Search posts..."
          icon="i-lucide-search"
          class="w-60"
        />
        <UButton icon="i-lucide-plus" color="primary" @click="navigateTo('/admin/new-blog')">
          New Post
        </UButton>
      </div>
    </div>
    <div class="p-8">
      <!-- Tabs + Filters -->
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div class="flex gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px"
            :class="activeTab === tab.value
              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
            @click="activeTab = tab.value; currentPage = 1"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="flex items-center gap-2 pb-2">
          <USelectMenu
            v-model="categoryFilter"
            :options="categoryOptions"
            value-attribute="value"
            option-attribute="label"
            placeholder="Category"
            class="w-40"
          />
          <USelectMenu
            v-model="dateFilter"
            :options="dateOptions"
            value-attribute="value"
            option-attribute="label"
            placeholder="Date Range"
            class="w-36"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="flex-1 overflow-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-800">
              <th class="w-10 pb-3 text-left">
                <UCheckbox
                  :checked="selectedRows.length === paginatedPosts.length && paginatedPosts.length > 0"
                  :indeterminate="selectedRows.length > 0 && selectedRows.length < paginatedPosts.length"
                  @change="toggleAll"
                />
              </th>
              <th class="pb-3 text-left font-medium text-gray-500 dark:text-gray-400 pr-4">Title</th>
              <th class="pb-3 text-left font-medium text-gray-500 dark:text-gray-400 pr-4">Category</th>
              <th class="pb-3 text-left font-medium text-gray-500 dark:text-gray-400 pr-4">Status</th>
              <th class="pb-3 text-left font-medium text-gray-500 dark:text-gray-400 pr-4">Date</th>
              <th class="pb-3 text-left font-medium text-gray-500 dark:text-gray-400 pr-4">Views</th>
              <th class="pb-3 w-10" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in paginatedPosts"
              :key="post.id"
              class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <td class="py-3.5 pr-3">
                <UCheckbox
                  :checked="selectedRows.includes(post.id)"
                  @change="toggleRow(post.id)"
                />
              </td>
              <td class="py-3.5 pr-4">
                <p class="font-medium text-gray-900 dark:text-white">{{ post.title }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ post.author }}</p>
              </td>
              <td class="py-3.5 pr-4">
                <UBadge :color="categoryColors[post.category]" variant="subtle" size="sm">
                  {{ post.category }}
                </UBadge>
              </td>
              <td class="py-3.5 pr-4">
                <div class="flex items-center gap-1.5">
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="post.status === 'Published' ? 'bg-green-500' : 'bg-amber-400'"
                  />
                  <span
                    class="text-sm font-medium"
                    :class="post.status === 'Published' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'"
                  >
                    {{ post.status }}
                  </span>
                </div>
              </td>
              <td class="py-3.5 pr-4 text-gray-500 dark:text-gray-400">{{ post.date }}</td>
              <td class="py-3.5 pr-4 text-gray-500 dark:text-gray-400">{{ post.views.toLocaleString() }}</td>
              <td class="py-3.5">
                <UDropdownMenu :items="rowActions(post)">
                  <UButton variant="ghost" color="neutral" icon="i-lucide-ellipsis" size="sm" />
                </UDropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer: count + pagination -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
        <p class="text-sm text-gray-500">
          Showing {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, filteredPosts.length) }} of {{ filteredPosts.length }} posts
        </p>
        <UPagination
          v-model:page="currentPage"
          :total="filteredPosts.length"
          :items-per-page="pageSize"
        />
      </div>
    

    </div>
  </div>
</template>
