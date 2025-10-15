import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Статическая конфигурация Supabase для предотвращения ReferenceError
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

// Создаем Supabase клиент без динамических проверок
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
