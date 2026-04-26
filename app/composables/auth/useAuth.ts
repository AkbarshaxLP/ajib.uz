import { authConfig, authActions } from '~/authConfig'

export const useAuth = () => {
  const state = useAuthState()
  const { setTokens, clearTokens } = useAuthTokens()
  const { refresh } = useAuthRefresh()

  const login = async (payload: any) => {
    const { data, status, execute } = authActions.login(payload)
    await execute();
    setTokens({
      access: (data.value as Record<string, any>)?.[authConfig.keys.access],
      refresh: (data.value as Record<string, any>)?.[authConfig.keys.refresh]
    })

    return { data, status }
  }

  const getMe = async () => {
    const { data } = await authActions.getMe()
    state.user.value = data.value;

    if (authConfig.loginRedirect) {
      navigateTo(authConfig.loginRedirect)
    }
  }

  const logout = async () => {
    clearTokens()
    state.user.value = null;

    if (authConfig.logoutRedirect) {
      navigateTo(authConfig.logoutRedirect)
    }
  }

  const loginAndGetMe = async (payload: any) => {
    const { status } = await login(payload);
    if (status.value === 'success') {
      await getMe()
    }
  }

  return {
    ...state,
    login,
    logout,
    refresh,
    getMe,
    loginAndGetMe
  }
}
