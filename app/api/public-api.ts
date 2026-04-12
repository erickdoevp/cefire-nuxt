import axios from 'axios'

export function createPublicApi() {
  const config = useRuntimeConfig()
  return axios.create({
    baseURL: `${config.public.supabaseUrl}/rest/v1`,
    headers: {
      apikey: config.public.supabaseAnonKey,
    },
  })
}
