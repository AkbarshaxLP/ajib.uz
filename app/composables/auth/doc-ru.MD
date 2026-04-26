Это отличный пример реализации **interceptor-паттерна с очередью запросов** для обработки 401 ошибок и обновления токенов в Nuxt 3. Давайте разберем его детально:

## 🎯 **Основная цель**
Создать обертку над `useFetch`, которая автоматически:
1. Добавляет токен авторизации к каждому запросу
2. Обновляет access-токен при получении 401 ошибки
3. Ставит запросы в очередь во время обновления токена
4. Повторяет запросы после успешного обновления

## 📝 **Структура кода**

### 1. **Инициализация и очистка**
```javascript
clearNuxtData(); // Очищает кэш предыдущих запросов
const config = useRuntimeConfig() // Получаем конфигурацию
```

### 2. **Очередь запросов - ключевая часть**
```javascript
const isRefreshing = ref(false) // Флаг обновления токена
const failedQueue: QueueItem[] = [] // Очередь запросов, ожидающих обновления токена

type QueueItem = { 
  resolve: (v?: any) => void
  reject: (e?: any) => void 
}
```
**Зачем очередь?** Представьте, что пользователь одновременно делает 3 запроса:
1. Запрос A → 401 ошибка → начинаем обновлять токен
2. Запрос B → 401 ошибка → не начинаем новое обновление, а ставим в очередь
3. Запрос C → 401 ошибка → тоже в очередь

Без очереди было бы 3 одновременных обновления токена!

### 3. **Функция для получения заголовка авторизации**
```javascript
const getAuthHeader = () => {
  if (import.meta.client) { // Только на клиенте
    const access = localStorage.getItem('auth:access')
    if (access) {
      return { Authorization: `Bearer ${access}` }
    }
  }
  return {}
}
```
⚠️ **Важно**: Использование `localStorage` только на клиенте (`import.meta.client`)

### 4. **Создание кастомного $fetch с интерцепторами**
```javascript
const apiFetch = ($fetch as any).create({
  baseURL: config.public.apiBase || '',
  
  onRequest({ options }: any) {
    // Добавляем заголовок авторизации КАЖДОМУ запросу
    const headers = getAuthHeader()
    options.headers = { ...options.headers, ...headers }
  },

  onResponseError: async (ctx: any) => {
    // Обработка 401 ошибок
  }
})
```

### 5. **Логика обработки 401 ошибок (самая сложная часть)**

#### **Сценарий 1: Обновление уже в процессе**
```javascript
if (isRefreshing.value) {
  // Ставим запрос в очередь
  await new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject })
  })
  
  // После обновления токена:
  options.headers = { ...options.headers, ...getAuthHeader() }
  retryCounter.value++ // Триггерит повтор запроса
  return
}
```

#### **Сценарий 2: Первая 401 ошибка**
```javascript
isRefreshing.value = true

try {
  // 1. Обновляем токен
  await useAuthRefresh().refresh()
  
  // 2. Обрабатываем очередь (разрешаем все ожидающие промисы)
  processQueue()
  
  // 3. Обновляем заголовки
  options.headers = { ...options.headers, ...getAuthHeader() }
  
  // 4. Триггерим повтор
  retryCounter.value++
} catch (err) {
  // Если обновление не удалось - реджектим все запросы в очереди
  processQueue(err)
  await navigateTo(authConfig.logoutRedirect) // Редирект на логин
  throw err
} finally {
  isRefreshing.value = false
}
```

### 6. **Вспомогательная функция для обработки очереди**
```javascript
const processQueue = (error: any = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve()))
  failedQueue.length = 0
}
```
- **`resolve()`** → запросы продолжают выполняться
- **`reject(error)`** → все запросы получают ошибку

### 7. **Использование с useFetch**
```javascript
return useFetch(url, {
  ...opts,
  $fetch: apiFetch, // Подменяем стандартный $fetch
  
  watch: opts.watch !== false ? [
    retryCounter, // ← МАГИЯ! При изменении retryCounter useFetch автоматически перезапрашивает данные
    ...(Array.isArray(opts.watch) ? opts.watch : [])
  ] : false,
})
```

## 🎪 **Наглядный пример работы**

### **Последовательность событий:**
```
1. Пользователь делает запрос за данными
2. Токен истек → сервер возвращает 401
3. onResponseError срабатывает:
   - Ставим запрос в очередь
   - Обновляем токен (один раз!)
   - Разрешаем очередь
   - retryCounter++ → useFetch автоматически повторяет запрос
   - Новый запрос уже с обновленным токеном → успех!
```

### **Пример использования:**
```vue
<script setup>
// Вместо стандартного useFetch используем нашу обертку
const { data: user, refresh } = useApi('/api/user/profile')

// Если токен истек - всё произойдет автоматически!
const updateProfile = async () => {
  // useApi автоматически добавит токен и обработает 401
  const { data } = await useApi('/api/user/update', {
    method: 'POST',
    body: { name: 'Новое имя' }
  })
}
</script>
```

## 🔧 **Особенности реализации**

### **1. retryCounter как триггер**
```javascript
const retryCounter = ref(0)
// ...
retryCounter.value++ // Увеличиваем
// ...
watch: [retryCounter, ...] // useFetch следит за изменением
```
Это гениальный хак: когда `retryCounter` меняется, `useFetch` автоматически повторяет запрос!

### **2. Флаг `_isRetry`**
```javascript
if (response?.status !== 401 || originalRequest._isRetry) {
  return // Не обрабатываем повторно
}
originalRequest._isRetry = true // Помечаем как повторную попытку
```
Предотвращает бесконечный цикл при повторной 401 ошибке.

### **3. Конфигурация через `authConfig`**
```javascript
if (!authConfig.hasRefresh && response?.status === 401) {
  // Если нет настроек обновления - сразу редирект
  navigateTo(authConfig.logoutRedirect)
}
```
Позволяет гибко настраивать поведение.

## ⚠️ **Потенциальные проблемы**

1. **Race condition**: Что если два разных компонента одновременно вызовут `useApi`?
   - Решение: глобальное состояние `isRefreshing` решает эту проблему

2. **Memory leak**: Очередь может расти бесконечно
   - В текущей реализации после обработки очередь очищается

3. **SSR/SSG**: `localStorage` не доступен на сервере
   - Решение: проверка `import.meta.client`

4. **Множественные обновления**: Пользователь может уйти со страницы во время обновления
   - Нужна дополнительная логика отмены

## ✅ **Преимущества подхода**

1. **Автоматичность**: не нужно вручную обновлять токены
2. **Эффективность**: один refresh для множества запросов
3. **Прозрачность**: для компонентов логика скрыта
4. **Гибкость**: конфигурируется через `authConfig`

Это профессиональная реализация **токен-рефреш механизма**, которую используют в production-приложениях. Она решает сложную проблему синхронизации асинхронных операций с помощью паттерна очереди!