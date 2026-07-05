export default defineEventHandler((event) => {
  deleteCookie(event, 'admin_session')
  return { success: true, message: 'Logged out' }
})