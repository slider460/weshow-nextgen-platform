import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

// Проверяем, существует ли уже клиент в window объекте
declare global {
  interface Window {
    __supabase_client?: ReturnType<typeof createClient>
  }
}

// Создаем простой Supabase клиент без сложных настроек аутентификации
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }

// Re-export types for convenience
export type { Database, Tables, Enums } from '../types/database'
