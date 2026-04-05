<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

const props = defineProps<{
  createError?: string | null;
  isSubmitting?: boolean;
}>();

const emit = defineEmits(['post-user']);

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  first_last_name: z.string().min(2, 'El apellido paterno debe tener al menos 2 caracteres'),
  second_last_name: z.string().optional(),
  email: z.email('Ingresa un correo electrónico válido'),
  username: z
    .string()
    .min(3, 'El username debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9_.]+$/, 'Solo se permiten letras minúsculas, números, puntos y guiones bajos'),
  phone: z
    .string()
    .regex(/^\+?[\d\s()-]{7,15}$/, 'Ingresa un número de teléfono válido')
    .optional()
    .or(z.literal('')),
  role: z.enum(['admin', 'editor', 'user']),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

type Schema = z.output<typeof schema>;

const form = reactive<Schema>({
  name: '',
  first_last_name: '',
  second_last_name: '',
  email: '',
  username: '',
  phone: '',
  role: 'admin',
  password: '',
});

const avatarPreview = ref<string | null>(null);
const avatarFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const showPassword = ref(false);

const roles = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Acceso completo a todas las funciones y configuraciones del sistema',
    icon: 'i-lucide-shield',
    iconClass: 'text-blue-600 bg-blue-100',
  },
  {
    value: 'editor',
    label: 'Editor',
    description: 'Puede crear y editar publicaciones y contenido',
    icon: 'i-lucide-pencil',
    iconClass: 'text-yellow-600 bg-yellow-100',
  },
  {
    value: 'user',
    label: 'User',
    description: 'Acceso básico para ver contenido',
    icon: 'i-lucide-user',
    iconClass: 'text-gray-500 bg-gray-100',
  },
];

const roleOptions = roles.map(r => ({ label: r.label, value: r.value }));

function onUploadClick() {
  fileInputRef.value?.click();
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  avatarFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

function onRemove() {
  avatarPreview.value = null;
  avatarFile.value = null;
  if (fileInputRef.value) fileInputRef.value.value = '';
}

function onSubmit(event: FormSubmitEvent<Schema>) {
  const payload = { ...event.data, avatarFile: avatarFile.value };
  emit('post-user', payload);
}

</script>

<template>
  <div class="flex gap-4">
    <!-- Form -->
    <UForm :schema="schema" :state="form" class="w-full" @submit="onSubmit">
      <UCard>
        <template #header>
          <p class="font-semibold text-gray-900">Información del usuario</p>
        </template>
        <div class="flex flex-col gap-6">
          <!-- Profile Photo -->
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 p-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              <img v-if="avatarPreview" :src="avatarPreview" alt="Profile" class="w-full h-full object-cover">
              <UIcon v-else name="i-lucide-user" class="text-3xl text-gray-400" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900 mb-2">Foto de perfil</p>
              <div class="flex gap-2">
                <UButton
                  icon="i-lucide-upload"
                  size="sm"
                  color="primary"
                  variant="solid"
                  @click="onUploadClick"
                >
                  Upload
                </UButton>
                <UButton
                  size="sm"
                  color="neutral"
                  variant="outline"
                  @click="onRemove"
                >
                  Remove
                </UButton>
                <input
                  ref="fileInputRef"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onFileChange"
                >
              </div>
            </div>
          </div>
          <USeparator />
          <!-- Nombre(s), Apellido Paterno, Apellido Materno -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Nombre(s)" name="name" required>
              <UInput
                v-model="form.name"
                placeholder="Ingresa el nombre"
                class="w-full"
                size="lg"
              />
            </UFormField>
            <UFormField label="Apellido Paterno" name="first_last_name" required>
              <UInput
                v-model="form.first_last_name"
                placeholder="Ingresa el apellido paterno"
                class="w-full"
                size="lg"
              />
            </UFormField>
            <UFormField label="Apellido Materno" name="second_last_name">
              <UInput
                v-model="form.second_last_name"
                placeholder="Ingresa el apellido materno"
                class="w-full"
                size="lg"
              />
            </UFormField>
          </div>
          <!-- Email, Username -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Email" name="email" required>
              <UInput
                v-model="form.email"
                type="email"
                placeholder="usuario@ejemplo.com"
                icon="i-lucide-mail"
                class="w-full"
                size="lg"
              />
            </UFormField>
            <UFormField label="Username" name="username" required>
              <UInput
                v-model="form.username"
                placeholder="nombre.usuario"
                icon="i-lucide-at-sign"
                class="w-full"
                size="lg"
              />
            </UFormField>
            <UFormField label="Contraseña" name="password" required>
              <UInput
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mínimo 8 caracteres"
                icon="i-lucide-lock"
                class="w-full"
                size="lg"
                :trailing-icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                @click:trailing="showPassword = !showPassword"
              />
            </UFormField>
          </div>
          <!-- Teléfono, Role -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Número de Teléfono" name="phone">
              <UInput
                v-model="form.phone"
                placeholder="+52 (000) 000-0000"
                icon="i-lucide-phone"
                class="w-full"
                size="lg"
              />
            </UFormField>
            <UFormField label="Role" name="role" required>
              <USelect
                v-model="form.role"
                :items="roleOptions"
                placeholder="Select a role..."
                icon="i-lucide-shield"
                class="w-full"
                size="lg"
              />
            </UFormField>
          </div>
  
          <USeparator />
        </div>
        <template #footer>
          <div class="flex flex-col gap-3">
            <UAlert
              v-if="props.createError"
              color="error"
              variant="soft"
              icon="i-lucide-circle-alert"
              :description="props.createError"
            />
            <div class="flex justify-end gap-3">
              <UButton color="neutral" variant="outline" to="/admin/users" :disabled="props.isSubmitting">
                Cancelar
              </UButton>
              <UButton type="submit" color="primary" variant="solid" :loading="isSubmitting">
                Crear usuario
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </UForm>

    <!-- Role Description -->
    <div class="w-100 p-4 rounded-lg border border-default bg-white h-fit">
      <div class="flex flex-col gap-3">
        <label
          v-for="role in roles"
          :key="role.value"
          class="flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors"
          :class="form.role === role.value
            ? 'border-primary bg-primary/5'
            : 'border-default bg-white hover:bg-gray-50'"
          >
            <span
              class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              :class="role.iconClass"
            >
              <UIcon :name="role.icon" class="text-base" />
            </span>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ role.label }}</p>
              <p class="text-xs text-gray-500">{{ role.description }}</p>
            </div>
        </label>
      </div>
    </div>

    </div>
</template>

<style lang="css" scoped>
.border-default {
  border-color: #e4e4e7;
}
</style>
