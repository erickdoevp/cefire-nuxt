export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const token = authHeader.replace('Bearer ', '')
  const supabaseUrl = config.public.supabaseUrl
  const anonKey = config.public.supabaseAnonKey
  const serviceKey = config.supabaseServiceKey

  // Verificar token y obtener usuario
  const authUser = await $fetch<{ id: string }>(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${token}` },
  }).catch(() => null)

  if (!authUser) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  // Verificar rol admin
  const profile = await $fetch<{ role: string }>(`${supabaseUrl}/rest/v1/profiles`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.pgrst.object+json',
    },
    params: { id: `eq.${authUser.id}`, select: 'role' },
  }).catch(() => null)

  if (profile?.role !== 'admin') {
    throw createError({ statusCode: 403, message: 'Acceso denegado' })
  }

  const body = await readBody(event)
  const { name, first_last_name, second_last_name, username, email, role, phone, password, avatar_img_url } = body

  if (!email || !password || !name || !first_last_name || !username || !role) {
    throw createError({ statusCode: 400, message: 'Faltan campos requeridos' })
  }

  // Crear usuario en Auth con service key
  const newAuthUser = await $fetch<{ id: string }>(`${supabaseUrl}/auth/v1/admin/users`, {
    method: 'POST',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    body: { email, password, email_confirm: true },
  }).catch((err) => {
    throw createError({ statusCode: 400, message: err.data?.message ?? 'Error al crear el usuario' })
  })

  const userId = newAuthUser.id

  // Insertar perfil con service key
  const newProfile = await $fetch(`${supabaseUrl}/rest/v1/profiles`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: 'application/vnd.pgrst.object+json',
      Prefer: 'return=representation',
    },
    params: { select: 'id,name,first_last_name,second_last_name,username,email,role,phone:phone_number,avatar_img_url' },
    body: {
      id: userId,
      name,
      first_last_name,
      second_last_name: second_last_name || null,
      username,
      email,
      role,
      phone_number: phone || null,
      avatar_img_url,
    },
  }).catch(async (err) => {
    // Revertir: eliminar el usuario de Auth si falla el perfil
    await $fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    }).catch(() => null)
    throw createError({ statusCode: 400, message: err.data?.message ?? 'Error al crear el perfil' })
  })

  return newProfile
})
