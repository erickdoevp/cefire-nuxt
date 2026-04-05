<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import type { Category } from '~/interfaces/category';

const props = defineProps<{
  open: boolean;
  category?: Category | null;
  isSubmitting?: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  'update:open': [value: boolean];
  'save': [payload: { name: string; chip_color: string; text_chip_color: string }];
}>();

const isEditMode = computed(() => !!props.category);

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  chip_color: z.string().min(1, 'Selecciona un color primario'),
  text_chip_color: z.string().min(1, 'Selecciona un color secundario'),
});

type Schema = z.output<typeof schema>;

const form = reactive<Schema>({
  name: '',
  chip_color: '#2563EB',
  text_chip_color: '#BFDBFE',
});

const primaryColors = [
  '#2563EB', '#C08060', '#B59040', '#7C3AED',
  '#4A7098', '#DC2626', '#16A34A', '#111111',
];

const secondaryColors = [
  '#BFDBFE', '#F5D9CC', '#FEF9C3', '#EDE9FE',
  '#DBEAFE', '#FEE2E2', '#DCFCE7', '#F3F4F6',
];

function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('save', event.data);
}

function close() {
  emit('update:open', false);
}

watch(() => props.open, (val) => {
  if (val && props.category) {
    form.name = props.category.name;
    form.chip_color = props.category.chip_color ?? '#2563EB';
    form.text_chip_color = props.category.text_chip_color ?? '#BFDBFE';
  } else if (!val) {
    form.name = '';
    form.chip_color = '#2563EB';
    form.text_chip_color = '#BFDBFE';
  }
});
</script>

<template>
  <UModal :open="props.open" @update:open="emit('update:open', $event)">
    <template #content>
      <div class="p-6 flex flex-col gap-5">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">{{ isEditMode ? 'Editar Categoría' : 'Nueva Categoría' }}</h2>
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            color="neutral"
            size="sm"
            @click="close"
          />
        </div>

        <UForm :schema="schema" :state="form" class="flex flex-col gap-5" @submit="onSubmit">
          <!-- Category Name -->
          <UFormField label="Nombre de la Categoría" name="name">
            <UInput
              v-model="form.name"
              placeholder="e.g. Recovery Tips"
              class="w-full"
              size="lg"
            />
          </UFormField>

          <!-- Primary Color -->
          <div class="flex flex-col gap-2">
            <UFormField label="Color Primario" name="text_chip_color">
              <UInput
                v-model="form.text_chip_color"
                class="w-full"
                size="lg"
              >
                <template #leading>
                  <span
                    class="w-5 h-5 rounded-md border border-gray-200 shrink-0"
                    :style="`background-color: ${form.text_chip_color}`"
                  />
                </template>
              </UInput>
            </UFormField>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="color in primaryColors"
                :key="color"
                type="button"
                class="w-9 h-9 rounded-lg border-2 transition-all cursor-pointer"
                :style="`background-color: ${color}`"
                :class="form.text_chip_color === color ? 'border-gray-500 scale-110' : 'border-transparent'"
                @click="form.text_chip_color = color"
              />
            </div>
          </div>

          <!-- Secondary Color -->
          <div class="flex flex-col gap-2">
            <UFormField label="Color Secundario" name="chip_color">
              <UInput
                v-model="form.chip_color"
                class="w-full"
                size="lg"
              >
                <template #leading>
                  <span
                    class="w-5 h-5 rounded-md border border-gray-200 shrink-0"
                    :style="`background-color: ${form.chip_color}`"
                  />
                </template>
              </UInput>
            </UFormField>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="color in secondaryColors"
                :key="color"
                type="button"
                class="w-9 h-9 rounded-lg border-2 transition-all cursor-pointer"
                :style="`background-color: ${color}`"
                :class="form.chip_color === color ? 'border-gray-400 scale-110' : 'border-gray-200'"
                @click="form.chip_color = color"
              />
            </div>
          </div>

          <!-- Error -->
          <UAlert
            v-if="props.error"
            color="error"
            variant="soft"
            icon="i-lucide-circle-alert"
            :description="props.error"
          />

          <!-- Footer -->
          <div class="flex justify-end gap-3 pt-1">
            <UButton color="neutral" variant="outline" :disabled="props.isSubmitting" @click="close">
              Cancelar
            </UButton>
            <UButton type="submit" color="primary" variant="solid" :loading="props.isSubmitting">
              {{ isEditMode ? 'Actualizar' : 'Crear' }} Categoría
            </UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
