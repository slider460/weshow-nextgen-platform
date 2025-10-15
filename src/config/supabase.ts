import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'
import { SUPABASE_CONFIG, initEnv } from '../utils/env'

// Инициализируем переменные окружения
initEnv()

// Supabase configuration with safe fallback values
const supabaseUrl = SUPABASE_CONFIG.url
const supabaseAnonKey = SUPABASE_CONFIG.anonKey

// Проверяем, существует ли уже клиент в window объекте
declare global {
  interface Window {
    __supabase_client?: ReturnType<typeof createClient>
  }
}

// Безопасная инициализация Supabase клиента
let supabase: any = null

try {
  // Проверяем, что у нас есть валидные credentials
  if (supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co') && supabaseAnonKey.length > 50) {
    // Оптимизированный Supabase клиент с улучшенной производительностью
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'weshow-platform',
      'x-application-name': 'weshow-platform'
    }
  },
  db: {
    schema: 'public',
  },
  // Добавляем таймауты для предотвращения зависаний
  fetch: (url, options = {}) => {
    return fetch(url, {
      ...options,
      signal: AbortSignal.timeout(10000), // 10 секунд таймаут
    })
  }
})
  } else {
    console.warn('⚠️ Invalid Supabase credentials, using fallback client')
    // Создаем fallback клиент с пустыми credentials
    supabase = createClient('https://fallback.supabase.co', 'fallback-key')
  }
} catch (error) {
  console.error('❌ Failed to initialize Supabase client:', error)
  // Создаем fallback клиент в случае ошибки
  supabase = createClient('https://fallback.supabase.co', 'fallback-key')
}

export { supabase }

// Re-export types for convenience
export type { Database, Tables, Enums } from '../types/database'
