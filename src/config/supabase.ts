// Автономный режим: Supabase опционален, сайт работает без него
import { createClient } from '@supabase/supabase-js'

// Создаем mock-клиент, который не делает реальных запросов
const createMockSupabaseClient = () => {
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: null }),
      signUp: () => Promise.resolve({ data: null, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
  } as any;
};

// Используем mock-клиент по умолчанию, так как Supabase не используется
// Реальный клиент создается только если переменные окружения явно заданы
let supabase: any;

try {
  // Проверяем, заданы ли переменные окружения (БЕЗ fallback значений)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Создаем реальный клиент ТОЛЬКО если переменные явно заданы
  if (supabaseUrl && supabaseAnonKey && supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '') {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
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
    });
  } else {
    // Если переменные не заданы - используем mock-клиент
    supabase = createMockSupabaseClient();
  }
} catch (error) {
  console.log('ℹ️ Supabase не доступен, используется mock-клиент');
  supabase = createMockSupabaseClient();
}

export { supabase }