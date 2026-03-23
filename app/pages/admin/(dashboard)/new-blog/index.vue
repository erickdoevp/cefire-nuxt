<script setup>
import { ref } from 'vue'
import PostEditor from '~/components/shared/PostEditor.vue';

const content = ref(null)

const savePost = () => {
  console.log(content.value) // 👉 JSON listo para Supabase
}

</script>

<template>
  <div>
    <PostEditor v-model="content"/>
    <button @click="savePost">Guardar</button>
  </div>
</template>