import type { UseFetchOptions } from 'nuxt/app'
import { authConfig } from '~/authConfig';

export default function useApi<T>(
  url: string | (() => string),
  opts: UseFetchOptions<T> = {}
) {
  clearNuxtData();
  const config = useRuntimeConfig()

  // Единое глобальное состояние обновления и очередь
  const isRefreshing = ref(false)
  
  type QueueItem = { 
    resolve: (v?: any) => void
    reject: (e?: any) => void 
  }
  const failedQueue: QueueItem[] = []
  
  const processQueue = (error: any = null) => {
    failedQueue.forEach(p => (error ? p.reject(error) : p.resolve()))
    failedQueue.length = 0
  }

  // Вспомогательная функция для получения нового токена при каждом запросе
  const getAuthHeader = () => {
    if (import.meta.client) {
      const access = localStorage.getItem('auth:access')
      if (access) {
        return { Authorization: `Bearer ${access}` }
      }
    }
    return {}
  }

  // Счетчик для принудительного обновления
  const retryCounter = ref(0)

  // Создать экземпляр для получения данных из API
  const apiFetch = ($fetch as any).create({
    baseURL: config.public.apiBase || '',
    
    // Добавляем заголовок аутентификации к каждому запросу (новый токен)
    onRequest({ options }: any) {
      const headers = getAuthHeader()
      options.headers = { ...options.headers, ...headers }
    },

    // Обработка ошибки 401 путем обновления токена и повторной попытки запроса
    onResponseError: async (ctx: any) => {
      const { response, request, options } = ctx
      const originalRequest = options as any

      // если нет настроено обновление токена, просто выходим
      if (!authConfig.hasRefresh && response?.status === 401) {
        if (authConfig.logoutRedirect) {
          navigateTo(authConfig.logoutRedirect)
        }
        return
      }

      if (response?.status !== 401 || originalRequest._isRetry) {
        return
      }

      originalRequest._isRetry = true

      // Если обновление уже выполняется, ставим текущий запрос в очередь и ждём завершения обновления
      if (isRefreshing.value) {
        await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
        options.headers = { ...options.headers, ...getAuthHeader() }
        // Увеличиваем счетчик для триггера повторного запроса
        retryCounter.value++
        return
      }

      isRefreshing.value = true

      try {
        // Обновить токены
        await useAuthRefresh().refresh()
        
        // Обработка запросов из очереди
        processQueue()

        // Обновить заголовки новым токеном
        options.headers = { ...options.headers, ...getAuthHeader() }
        
        // Увеличиваем счетчик для триггера повторного запроса
        retryCounter.value++
      } catch (err) {
        processQueue(err)
        if (authConfig.logoutRedirect) {
          await navigateTo(authConfig.logoutRedirect)
        }
        throw err
      } finally {
        isRefreshing.value = false
      }
    },
  })

  return useFetch(url, {
    ...opts,
    $fetch: apiFetch,
    // Добавляем retryCounter в watch для автоматического перезапроса
    watch: opts.watch !== false ? [
      retryCounter,
      ...(Array.isArray(opts.watch) ? opts.watch : [])
    ] : false,
  })
}