<script setup lang="ts">
import PostEditor from '~/components/shared/PostEditor.vue';
import { useFetchCategories } from '~/composables/admin/categories/useFetchCategories';
import { useCreatePost, type Payload } from '~/composables/admin/posts/useCreatePost';

definePageMeta({ 
  middleware:'auth' 
});

const { fetchCategories, categoryList } = useFetchCategories();
const { savePost, isLoading } = useCreatePost();

const handleSavePost = async (data: Payload) => {
  await savePost(data);
};

onMounted(() => {
  fetchCategories();
});

</script>

<template>
  <div>
    <PostEditor 
      :category-list="categoryList" 
      :is-loading="isLoading"
      @post-data="handleSavePost" 
    />
  </div>
</template>