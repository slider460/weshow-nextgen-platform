import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Простая статическая конфигурация Supabase
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

// Создаем Supabase клиент
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export { supabase }
export type { Database, Tables, Enums } from '../types/database'