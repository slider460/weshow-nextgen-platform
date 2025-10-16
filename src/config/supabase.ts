import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Статические значения Supabase - радикальное решение
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

console.log('🔧 Supabase Config v2.4.4:')
console.log('URL:', supabaseUrl)
console.log('Key defined:', !!supabaseAnonKey)
console.log('✅ Используются статические значения - FORCE DEPLOY v2.4.4')

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