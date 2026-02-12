// Безопасная обработка переменных окружения
export const getEnvVar = (key: string, fallback: string = ''): string => {
  try {
    // Сначала пробуем получить из import.meta.env
    const value = import.meta.env[key]
    if (value && typeof value === 'string') {
      return value
    }
    
    // Затем пробуем получить из define переменных (для build-time)
    const defineKey = `__${key}__`
    if (typeof window !== 'undefined' && (window as any)[defineKey]) {
      return (window as any)[defineKey]
    }
    
    // Затем пробуем получить из window (для runtime)
    if (typeof window !== 'undefined' && (window as any).__ENV__?.[key]) {
      return (window as any).__ENV__[key]
    }
    
    // Возвращаем fallback
    return fallback
  } catch (error) {
    console.warn(`Failed to get environment variable ${key}:`, error)
    return fallback
  }
}

// Инициализация переменных окружения (сайт работает локально)
export const initEnv = () => {
  if (import.meta.env.DEV) {
    console.log('✅ Сайт работает в локальном режиме')
  }
}

// Экспортируем для использования в других модулях
export default {
  getEnvVar,
  initEnv,
}
