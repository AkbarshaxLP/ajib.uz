export const useAuthState = () => {
  const access = localStorage.getItem('auth:access') || null
  const refresh = localStorage.getItem('auth:refresh') || null
  const user = useState<any | null>('auth:user', () => null)
  const isAuthenticated = computed(() => !!access)

  return {
    access,
    refresh,
    user,
    isAuthenticated
  }
}
