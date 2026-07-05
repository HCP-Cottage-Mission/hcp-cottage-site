export default defineEventHandler((event) => {
  const cookie = getCookie(event, 'admin_session')

  if (!cookie) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  return { authenticated: true }
})