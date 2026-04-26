export const authConfig = {
  keys: {
    access: 'access',
    refresh: 'refresh',
  },
  loginRedirect: '/',
  logoutRedirect: '/login',
  hasRefresh: true,
  refreshApiEndpoint: '/api/token/refresh/',
}

export const authActions = {
  get login() {
    return useApiService().token.create
  },
  get refresh() {
    return useApiService().token.refresh_create
  },
  get getMe() {
    return useApiService().users.me_retrieve
  },
}