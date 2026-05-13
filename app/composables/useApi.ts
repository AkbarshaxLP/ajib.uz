import type { UseFetchOptions } from 'nuxt/app'

export default function useApi<T>(
  url: string | (() => string),
  opts: UseFetchOptions<T> = {}
) {
  clearNuxtData();
  const config = useRuntimeConfig()

  const getAuthHeader = () => {
    if (import.meta.client) {
      const access = localStorage.getItem('auth:access')
      if (access) {
        return { Authorization: `Bearer ${access}` }
      }
    }
    return {}
  }

  return useFetch(url, {
  ...opts,
  baseURL: config.public.apiBase || '',
  watch: false,
  
  onRequest({ options }) {
    const headers = getAuthHeader()
    options.headers = { ...options.headers, ...headers }
  },
  
  onResponseError({ response }) {
    console.log('responseresponse',response)
    if (response?.status === 401) {
      navigateTo('/login')
    }
  },
})
}