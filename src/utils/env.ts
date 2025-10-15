// Безопасная обработка переменных окружения
export const getEnvVar = (key: string, fallback: string = ''): string => {
  try {
    // Сначала пробуем получить из import.meta.env
    const value = import.meta.env[key]
    if (value && typeof value === 'string') {
      return value
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

// Supabase конфигурация с fallback значениями
export const SUPABASE_CONFIG = {
  url: getEnvVar('VITE_SUPABASE_URL', 'https://zbykhdjqrtqftfitbvbt.supabase.co'),
  anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'),
}

// Проверка доступности переменных окружения
export const checkEnvVars = () => {
  const missing = []
  
  if (!import.meta.env.VITE_SUPABASE_URL) {
    missing.push('VITE_SUPABASE_URL')
  }
  
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    missing.push('VITE_SUPABASE_ANON_KEY')
  }
  
  if (missing.length > 0) {
    console.warn('⚠️ Отсутствуют переменные окружения:', missing.join(', '))
    console.log('🔧 Используются fallback значения')
  } else {
    console.log('✅ Все переменные окружения загружены')
  }
  
  return missing.length === 0
}

// Инициализация переменных окружения
export const initEnv = () => {
  // Проверяем только в development
  if (import.meta.env.DEV) {
    checkEnvVars()
  }
  
  // Сохраняем в window для runtime доступа
  if (typeof window !== 'undefined') {
    (window as any).__ENV__ = {
      VITE_SUPABASE_URL: SUPABASE_CONFIG.url,
      VITE_SUPABASE_ANON_KEY: SUPABASE_CONFIG.anonKey,
    }
  }
}

// Экспортируем для использования в других модулях
export default {
  getEnvVar,
  SUPABASE_CONFIG,
  checkEnvVars,
  initEnv,
}
