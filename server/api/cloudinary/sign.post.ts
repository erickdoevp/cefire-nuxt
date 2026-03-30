import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const token = authHeader.replace('Bearer ', '')
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const body = await readBody(event)
  const folder = body?.folder ?? 'blog-images'

  const timestamp = Math.round(Date.now() / 1000)
  const params = { timestamp, folder }

  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  })

  const signature = cloudinary.utils.api_sign_request(params, config.cloudinaryApiSecret)

  return {
    timestamp,
    signature,
    apiKey: config.cloudinaryApiKey,
    cloudName: config.cloudinaryCloudName,
    folder,
  }
})
