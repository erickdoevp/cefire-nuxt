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

  const { publicId } = await readBody(event)

  if (!publicId) {
    throw createError({ statusCode: 400, message: 'publicId requerido' })
  }

  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key:    config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  })

  const result = await cloudinary.uploader.destroy(publicId)

  if (result.result !== 'ok') {
    throw createError({ statusCode: 500, message: 'Error al eliminar la imagen' })
  }

  return { ok: true }
})
