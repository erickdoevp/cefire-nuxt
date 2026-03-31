<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetchBlog } from '~/composables/admin/posts/useFetchBlog';
const route = useRoute();
const id = Number(route.params.id);
const { blog, fetchBlog } = useFetchBlog(id);

onMounted(() => {
  fetchBlog();
});

</script>

<template>
  <div>
    blod detail
    <pre>{{ blog }}</pre>
  </div>
</template>

<style scoped>

</style>