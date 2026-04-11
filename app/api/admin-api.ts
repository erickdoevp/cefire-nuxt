import axios from 'axios';
import { useAuthStore } from '~/store/admin/auth/authStore';

const config = useRuntimeConfig();
const adminApi = axios.create({
  baseURL: `${config.public.supabaseUrl}/rest/v1`,
  headers: {
    apikey: config.public.supabaseAnonKey,
  },
});

adminApi.interceptors.request.use((requestConfig) => {
  const authStore = useAuthStore();
  const token = authStore.accessToken ?? config.public.supabaseAnonKey;
  requestConfig.headers.Authorization = `Bearer ${token}`;
  return requestConfig;
});

export default adminApi;