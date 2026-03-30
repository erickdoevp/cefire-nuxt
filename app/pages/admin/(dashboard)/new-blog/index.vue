<script setup lang="ts">
import PostEditor from '~/components/shared/PostEditor.vue';
import { useFetchCategories } from '~/composables/admin/categories/useFetchCategories';
import { useCreatePost, type Payload } from '~/composables/admin/posts/useCreatePost';
import { useFetchTags } from '~/composables/admin/tags/useFetchTags';

definePageMeta({ 
  middleware:'auth' 
});

const { fetchCategories, categoryList } = useFetchCategories();
const { fetchTags, tagList } = useFetchTags();
const { savePost } = useCreatePost();

const handleSavePost = (data: Payload) => {
  savePost(data);
};

onMounted(() => {
  fetchCategories();
  fetchTags();
});

</script>

<template>
  <div>
    <PostEditor 
      :category-list="categoryList" 
      :tag-list="tagList"
      @post-data="handleSavePost" 
    />
  </div>
</template>