// Проверка переменных окружения Supabase
export const checkSupabaseEnv = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('=== ПРОВЕРКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ ===');
  console.log('VITE_SUPABASE_URL:', supabaseUrl || 'НЕ НАЙДЕНА');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'НАЙДЕНА' : 'НЕ НАЙДЕНА');
  console.log('=====================================');
  
  if (!supabaseUrl) {
    console.error('❌ ОШИБКА: VITE_SUPABASE_URL не найдена!');
    return false;
  }
  
  if (!supabaseAnonKey) {
    console.error('❌ ОШИБКА: VITE_SUPABASE_ANON_KEY не найдена!');
    return false;
  }
  
  console.log('✅ Все переменные Supabase найдены!');
  return true;
};
