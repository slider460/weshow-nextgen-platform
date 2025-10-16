import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'
import { debugEnvironment, SUPABASE_CONFIG } from '../utils/env-debug'

// Запускаем диагностику окружения
const envDebug = debugEnvironment()

// Используем конфигурацию с fallback значениями
const supabaseUrl = SUPABASE_CONFIG.url
const supabaseAnonKey = SUPABASE_CONFIG.anonKey

// Дополнительная диагностика
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key defined:', !!supabaseAnonKey)

// Проверяем, что переменные определены
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials не найдены!')
  console.error('Environment debug:', envDebug)
  console.error('VITE_SUPABASE_URL:', supabaseUrl)
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '***defined***' : 'undefined')
} else {
  console.log('✅ Supabase credentials найдены')
}

// Создаем Supabase клиент
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
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
  fetch: (url, options = {}) => {
    return fetch(url, {
      ...options,
      signal: AbortSignal.timeout(10000),
    })
  }
})

export { supabase }
export type { Database, Tables, Enums } from '../types/database'