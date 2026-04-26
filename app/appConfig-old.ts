export const appAuth = {
  auth: {
    login: useApiService().token.create,
    refresh: useApiService().token.refresh_create,
    getMe: useApiService().users.me_retrieve,
    keys: {
      access: 'access',
      refresh: 'refresh',
    },
    loginRedirect: '/',
    logoutRedirect: '/login',
  }
}