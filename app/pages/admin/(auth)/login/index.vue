<script setup lang="ts">
import { z } from 'zod';
import { useAuth } from '~/composables/admin/auth/useAuth';

definePageMeta({
  layout: 'auth-layout'
});

const auth = useAuth();

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>;

const errors = ref<FormErrors>({});

async function handleSubmit() {
  errors.value = {};

  const result = loginSchema.safeParse({
    email: email.value.trim(),
    password: password.value.trim(),
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    errors.value = {
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    };
    return;
  }

  await auth.login(result.data.email, result.data.password);

  if (!auth.error) {
    navigateTo('/admin/blogs');
  }
}
</script>

<template >
  <div class="supa">
    <!-- Heading -->
    <div class="flex flex-col gap-1">
      <h1 class="text-[28px] font-bold text-[#1A1918]">Bienvenido de nuevo</h1>
      <p class="text-[15px] text-[#6D6C6A]">Inicia sesión en tu cuenta.</p>
    </div>
    <!-- Form -->
    <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
      <!-- Email field -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-[#1A1918]">Email Address</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          :class="[
            'h-12 w-full rounded-[10px] border bg-[#FAFAF9] px-4 text-sm text-[#1A1918] placeholder:text-[#A3A2A0] focus:outline-none focus:ring-1',
            errors.email
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
              : 'border-[#E5E4E1] focus:border-[#2563EB] focus:ring-[#2563EB]'
          ]"
        >
        <p v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</p>
      </div>
      <!-- Password field -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-[#1A1918]">Password</label>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            autocomplete="current-password"
            :class="[
              'h-12 w-full rounded-[10px] border bg-[#FAFAF9] px-4 pr-11 text-sm text-[#1A1918] placeholder:text-[#A3A2A0] focus:outline-none focus:ring-1',
              errors.password
                ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                : 'border-[#E5E4E1] focus:border-[#2563EB] focus:ring-[#2563EB]'
            ]"
          >
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A2A0] hover:text-[#6D6C6A]"
            @click="showPassword = !showPassword"
          >
            <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
          </button>
        </div>
        <p v-if="errors.password" class="text-xs text-red-500">{{ errors.password }}</p>
      </div>
      <!-- Remember me + Forgot password -->
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-[13px] font-medium text-[#2563EB] hover:underline">Regresar al inicio</NuxtLink>
        <!-- <label class="flex cursor-pointer items-center gap-2">
          <input
            v-model="rememberMe"
            type="checkbox"
            class="h-[18px] w-[18px] rounded border border-[#E5E4E1] bg-[#FAFAF9] accent-[#2563EB]"
          >
          <span class="text-[13px] text-[#6D6C6A]">Remember me</span>
        </label> -->
        <!-- <NuxtLink
          to="/admin/forgot-password"
          class="text-[13px] font-medium text-[#2563EB] hover:underline"
        >
          Forgot password?
        </NuxtLink> -->
      </div>
      <!-- Server error -->
      <p v-if="auth.error" class="rounded-[8px] bg-red-50 px-4 py-2.5 text-sm text-red-600">
        {{ auth.error }}
      </p>
      <!-- Submit button -->
      <button
        type="submit"
        class="h-12 w-full rounded-[12px] bg-[#2563EB] text-base font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        Sign In
      </button>
    </form>
    <!-- Footer -->
    <p class="text-center text-[13px] text-[#A3A2A0] mt-2">
      CEFIRE Portal de gestión de contenido
    </p>
  </div>
</template>
