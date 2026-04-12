export function createPublicApi() {
  const config = useRuntimeConfig()
  return $fetch.create({
    baseURL: `${config.public.supabaseUrl}/rest/v1`,
    headers: {
      apikey: config.public.supabaseAnonKey,
    },
  })
}
