export const useAuthTokens = () => {
  
  const setTokens = (tokens: {
    access: string
    refresh?: string
  }) => {
    localStorage.setItem('auth:access', tokens.access)
    
    if (tokens.refresh) {
      localStorage.setItem('auth:refresh', tokens.refresh)
    }
  }

  const clearTokens = () => {
    localStorage.removeItem('auth:access')
    localStorage.removeItem('auth:refresh')
  }

  return {
    setTokens,
    clearTokens
  }
}
