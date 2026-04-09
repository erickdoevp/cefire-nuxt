<script setup lang="ts">
import { useRoute } from 'vue-router';
import PostEditor from '~/components/shared/PostEditor.vue';
import { useFetchCategories } from '~/composables/admin/categories/useFetchCategories';
import type { Payload } from '~/composables/admin/posts/useCreatePost';
import { useFetchBlog } from '~/composables/admin/posts/useFetchBlog';
import { useUpdatePost } from '~/composables/admin/posts/useUpdatePost';

const route = useRoute();
const id = Number(route.params.id);

const { blog, fetchBlog } = useFetchBlog(id);
const { categoryList, fetchCategories } = useFetchCategories();
const { updatePost } = useUpdatePost();

onMounted(() => {
  fetchBlog();
  fetchCategories();
});

const handleEditPost = async (data: Payload) => {
  await updatePost(id, data);
};

</script>

<template>
  <div>
    <PostEditor
      :id="id"
      :post="blog ?? undefined"
      :category-list="categoryList"
      :is-loading="false"
      @post-data="handleEditPost"
    />
  </div>
</template>

<style scoped>

</style>