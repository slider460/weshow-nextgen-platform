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

// Оптимизированный Supabase клиент с улучшенной производительностью
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

export { supabase }

// Re-export types for convenience
export type { Database, Tables, Enums } from '../types/database'
