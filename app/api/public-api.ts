export function createPublicApi() {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: `${config.public.supabaseUrl}/rest/v1`,
    onRequest({ options }) {
      const existing = options.headers instanceof Headers
        ? Object.fromEntries((options.headers as Headers).entries())
        : { ...(options.headers as Record<string, string> ?? {}) }

      options.headers = {
        ...existing,
        apikey: config.public.supabaseAnonKey as string,
      }
    },
  })
}
