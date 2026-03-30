<script setup lang="ts">
import { useAuth } from '~/composables/admin/auth/useAuth';


definePageMeta({
  layout: 'auth-layout'
});

const auth = useAuth();

const email = ref('erick.doev@gmail.com');
const password = ref('P@lom@lun@1234');
const showPassword = ref(false);

async function handleSubmit() {

  await auth.login(email.value, password.value);
  console.log(auth.error);
  
  if(!auth.error.value) {
    console.log('paso');
    
    navigateTo('/admin/blogs')
  }
}
</script>

<template >
  <div class="supa">
        <!-- Heading -->
        <div class="flex flex-col gap-1">
          <h1 class="text-[28px] font-bold text-[#1A1918]">Bienvenido de nuevo</h1>
          <p class="text-[15px] text-[#6D6C6A]">Inicia sesión en tu cuenta de administrador.</p>
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
              required
              class="h-12 w-full rounded-[10px] border border-[#E5E4E1] bg-[#FAFAF9] px-4 text-sm text-[#1A1918] placeholder:text-[#A3A2A0] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            >
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
                required
                class="h-12 w-full rounded-[10px] border border-[#E5E4E1] bg-[#FAFAF9] px-4 pr-11 text-sm text-[#1A1918] placeholder:text-[#A3A2A0] focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
              >
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A2A0] hover:text-[#6D6C6A]"
                @click="showPassword = !showPassword"
              >
                <Icon :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
              </button>
            </div>
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
          CEFIRE Admin Portal
        </p>
  </div>
</template>
