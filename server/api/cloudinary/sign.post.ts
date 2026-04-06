import { createClient } from '@supabase/supabase-js'

async function signRequest(params: Record<string, string | number>, apiSecret: string): Promise<string> {
  const sorted = Object.keys(params)
    .sort()
    .map(k => `${k}=${params[k]}`)
    .join('&')

  const message = sorted + apiSecret
  const data = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const token = authHeader.replace('Bearer ', '')
  const config = useRuntimeConfig()

  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const body = await readBody(event)
  const folder = body?.folder ?? 'blog-images'
  const timestamp = Math.round(Date.now() / 1000)
  const params = { folder, timestamp }

  const signature = await signRequest(params, config.cloudinaryApiSecret)

  return {
    timestamp,
    signature,
    apiKey: config.cloudinaryApiKey,
    cloudName: config.cloudinaryCloudName,
    folder,
  }
})
