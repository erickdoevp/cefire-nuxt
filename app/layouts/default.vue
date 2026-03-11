<script setup lang="ts">
import BookConsultation from '~/components/shared/BookConsultation.vue';

</script>

<template>
  <div >
    <SharedHeader />
    <UMain >
      <slot />
    </UMain>
    <BookConsultation />
    <SharedFooter />
  </div>
</template>