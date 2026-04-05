import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Verificar que el solicitante es un admin autenticado
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

  // Verificar que el usuario autenticado tiene rol admin
  const { data: profile } = await anonClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Acceso denegado' })
  }

  const body = await readBody(event)
  const { name, first_last_name, second_last_name, username, email, role, phone, password, avatar_img_url } = body

  if (!email || !password || !name || !first_last_name || !username || !role) {
    throw createError({ statusCode: 400, message: 'Faltan campos requeridos' })
  }

  // Usar service key para crear el usuario en Auth
  const adminClient = createClient(config.public.supabaseUrl, config.supabaseServiceKey)

  const { data: authData, error: createAuthError } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createAuthError) {
    throw createError({ statusCode: 400, message: createAuthError.message })
  }

  const userId = authData.user.id

  const { data: newProfile, error: profileError } = await adminClient
    .from('profiles')
    .insert({
      id: userId,
      name,
      first_last_name,
      second_last_name: second_last_name || null,
      username,
      email,
      role,
      phone_number: phone || null,
      avatar_img_url,
    })
    .select('id, name, first_last_name, second_last_name, username, email, role, phone:phone_number, avatar_img_url')
    .single()

  if (profileError) {
    // Revertir: eliminar el usuario de Auth si falla el perfil
    await adminClient.auth.admin.deleteUser(userId)
    throw createError({ statusCode: 400, message: profileError.message })
  }

  return newProfile
})
