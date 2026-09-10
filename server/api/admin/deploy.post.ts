export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const token = authHeader.replace('Bearer ', '')
  const config = useRuntimeConfig()

  try {
    await $fetch(`${config.public.supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: config.public.supabaseAnonKey,
        Authorization: `Bearer ${token}`,
      },
    })
  } catch {
    throw createError({ statusCode: 401, message: 'No autorizado' })
  }

  const hook = config.cloudflareDeployHook

  // Sin hook configurado el panel sigue funcionando: solo no se regenera el sitio.
  if (!hook) {
    return { triggered: false, reason: 'deploy-hook-no-configurado' }
  }

  await $fetch(hook, { method: 'POST' }).catch((err) => {
    throw createError({
      statusCode: 502,
      message: err.data?.message ?? 'No se pudo disparar el rebuild',
    })
  })

  return { triggered: true }
})
