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

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID de usuario requerido' })
  }

  const body = await readBody(event)
  const { name, first_last_name, second_last_name, username, email, role, phone, avatar_img_url, password } = body

  if (!name || !first_last_name || !username || !email || !role) {
    throw createError({ statusCode: 400, message: 'Faltan campos requeridos' })
  }

  // Actualizar password en Auth si se proporcionó
  if (password) {
    await $fetch(`${supabaseUrl}/auth/v1/admin/users/${id}`, {
      method: 'PUT',
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      body: { password },
    }).catch((err) => {
      throw createError({ statusCode: 400, message: err.data?.message ?? 'Error al actualizar la contraseña' })
    })
  }

  // Actualizar perfil con service key
  const updatedProfile = await $fetch(`${supabaseUrl}/rest/v1/profiles`, {
    method: 'PATCH',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: 'application/vnd.pgrst.object+json',
      Prefer: 'return=representation',
    },
    params: {
      id: `eq.${id}`,
      select: 'id,name,first_last_name,second_last_name,username,email,role,phone:phone_number,avatar_img_url',
    },
    body: {
      name,
      first_last_name,
      second_last_name: second_last_name || null,
      username,
      email,
      role,
      phone_number: phone || null,
      avatar_img_url: avatar_img_url ?? null,
    },
  }).catch((err) => {
    throw createError({ statusCode: 400, message: err.data?.message ?? 'Error al actualizar el perfil' })
  })

  return updatedProfile
})
