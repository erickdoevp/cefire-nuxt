<script setup lang="ts">
import UserForm from '~/components/admin/UserForm.vue';
import { useUploadImage } from '~/composables/admin/cloudinary/useUploadImage';
import { useCreateUser } from '~/composables/admin/profiles/useCreateUser';
import type { UserProfile } from '~/interfaces/profiles';

definePageMeta({
  middleware: 'auth'
});

const { upload, uploading } = useUploadImage();
const { createUser, isLoading: creating, error: createError } = useCreateUser();

const isSubmitting = computed(() => uploading.value || creating.value);

const handleSubmit = async (event: UserProfile & { avatarFile: File | null }) => {

 let avatar_url: string | null = null;
  if (event.avatarFile) {
    avatar_url = await upload(event.avatarFile, 'cefire/avatars');
    if (!avatar_url) return;
  }

  const result = await createUser({ ...event, avatar_img_url: avatar_url });
  if (result) {
    navigateTo('/admin/users');
  }

};

</script>

<template>
  <div class="w-full">
    <!-- Header -->
    <div class="mb-6 flex gap-4 items-start">
      <UButton
        icon="mdi:keyboard-backspace"
        class="w-6 h-6 text-black cursor-pointer hover:text-gray-600"
        to="/admin/users"
        variant="link"
      />
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Crear nuevo usuario</h1>
        <p class="text-sm text-gray-500 mt-0.5">Completa la información para agregar un usuario al sistema</p>
      </div>
    </div>

    <UserForm
      :is-submitting="isSubmitting"
      :create-error="createError"
      @post-user="handleSubmit" 
    />

  </div>
</template>

<style lang="css" scoped>
.border-default {
  border-color: #e4e4e7;
}
</style>
