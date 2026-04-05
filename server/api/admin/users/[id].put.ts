import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const token = authHeader.replace('Bearer ', '')
  const anonClient = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)

  const { data: { user }, error: authError } = await anonClient.auth.getUser(token)
  if (authError || !user) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const { data: profile } = await anonClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Acceso denegado' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID de usuario requerido' })
  }

  const body = await readBody(event)
  const { name, first_last_name, second_last_name, username, email, role, phone, avatar_img_url, password } = body

  if (!name || !first_last_name || !username || !email || !role) {
    throw createError({ statusCode: 400, message: 'Faltan campos requeridos' })
  }

  const adminClient = createClient(config.public.supabaseUrl, config.supabaseServiceKey)

  if (password) {
    const { error: passwordError } = await adminClient.auth.admin.updateUserById(id, { password })
    if (passwordError) {
      throw createError({ statusCode: 400, message: passwordError.message })
    }
  }

  const { data: updatedProfile, error: updateError } = await adminClient
    .from('profiles')
    .update({
      name,
      first_last_name,
      second_last_name: second_last_name || null,
      username,
      email,
      role,
      phone_number: phone || null,
      avatar_img_url: avatar_img_url ?? null,
    })
    .eq('id', id)
    .select('id, name, first_last_name, second_last_name, username, email, role, phone:phone_number, avatar_img_url')
    .single()

  if (updateError) {
    throw createError({ statusCode: 400, message: updateError.message })
  }

  return updatedProfile
})
