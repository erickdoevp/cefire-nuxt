<script setup lang="ts">
import UserForm from '~/components/admin/UserForm.vue';
import { useFetchUser } from '~/composables/admin/profiles/useFetchUser';
import { useUpdateUser } from '~/composables/admin/profiles/useUpdateUser';
import { useUploadImage } from '~/composables/admin/cloudinary/useUploadImage';
import { useDeleteImage } from '~/composables/admin/cloudinary/useDeleteImage';
import type { UserProfile } from '~/interfaces/profiles';

definePageMeta({ middleware: 'auth' });

const route = useRoute();
const id = route.params.id as string;

const { user, fetchUser, isLoading: fetching } = useFetchUser();
const { updateUser, isLoading: updating, error: updateError } = useUpdateUser();
const { upload, uploading } = useUploadImage();
const { deleteImage } = useDeleteImage();

const isSubmitting = computed(() => fetching.value || updating.value || uploading.value);

const handleUpdate = async (event: UserProfile & { avatarFile: File | null }) => {
  let avatar_img_url = user.value?.avatar_img_url ?? null;

  if (event.avatarFile) {
    if (avatar_img_url) {
      await deleteImage(avatar_img_url);
    }
    const uploaded = await upload(event.avatarFile, 'cefire/avatars');
    if (!uploaded) return;
    avatar_img_url = uploaded;
  }

  const result = await updateUser(id, { ...event, avatar_img_url });
  if (result) {
    navigateTo('/admin/users');
  }
};

onMounted(() => {
  fetchUser(id);
});

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
        <h1 class="text-2xl font-semibold text-gray-900">Editar usuario</h1>
        <p class="text-sm text-gray-500 mt-0.5">Completa la información para actualizar el usuario</p>
      </div>
    </div>

    <UserForm
      :is-submitting="isSubmitting"
      :create-error="updateError"
      :user-profile="user"
      @post-user="handleUpdate"
    />
  </div>
</template>

<style scoped>

</style>