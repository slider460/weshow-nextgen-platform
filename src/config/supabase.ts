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

// Создаем простой Supabase клиент без сложных настроек аутентификации
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'main-supabase-client'
    }
  }
})

export { supabase }

// Re-export types for convenience
export type { Database, Tables, Enums } from '../types/database'
