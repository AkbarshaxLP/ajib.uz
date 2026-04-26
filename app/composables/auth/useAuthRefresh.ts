import { authConfig } from "~/authConfig"

export const useAuthRefresh = () => {
  const { access, refresh } = useAuthState()
  const { setTokens, clearTokens } = useAuthTokens()

  const refreshToken = async () => {
    const body = {
      access: access ?? '',
      refresh: refresh,
    }

    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase

    clearNuxtData();
    const { data, status } = await useFetch<{ access?: string; refresh?: string }>(authConfig.refreshApiEndpoint, {
      method: 'POST',
      body,
      baseURL
    })

    if (status.value === 'success') {
      setTokens({
        access: data.value?.access ?? '',
        refresh: data.value?.refresh ?? '',
      })

      return { status }
    } else {
      clearTokens();
      throw new Error('Unable to refresh token');
    }
  }

  return { refresh: refreshToken }
}
