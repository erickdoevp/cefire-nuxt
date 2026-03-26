<script setup lang="ts">
import { ref } from 'vue'
import PostEditor from '~/components/shared/PostEditor.vue';

definePageMeta({ 
  middleware:'auth' 
});

const categories = useCategories();

onMounted(() => {
  categories.getCategories();
}
)
const content = ref(null)

</script>

<template>
  <div>
    <PostEditor v-model="content"/>
  </div>
</template>