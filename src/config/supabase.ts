import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ ОШИБКА: Supabase credentials не найдены! Создайте файл .env с VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY')
}

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
