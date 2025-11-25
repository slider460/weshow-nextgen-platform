// Проверка переменных окружения Supabase
export const checkSupabaseEnv = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('=== ПРОВЕРКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ ===');
  console.log('Environment:', import.meta.env.MODE);
  console.log('VITE_SUPABASE_URL:', supabaseUrl || 'НЕ НАЙДЕНА');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'НАЙДЕНА' : 'НЕ НАЙДЕНА');
  console.log('Все env переменные:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  console.log('=====================================');
  
  if (!supabaseUrl) {
    console.error('❌ ОШИБКА: VITE_SUPABASE_URL не найдена!');
    console.error('Ожидаемое значение: https://zbykhdjqrtqftfitbvbt.supabase.co');
    return false;
  }
  
  if (!supabaseAnonKey) {
    console.error('❌ ОШИБКА: VITE_SUPABASE_ANON_KEY не найдена!');
    console.error('Ожидаемое значение: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    return false;
  }
  
  console.log('✅ Все переменные Supabase найдены!');
  console.log('URL:', supabaseUrl);
  console.log('Key (первые 20 символов):', supabaseAnonKey.substring(0, 20) + '...');
  return true;
};
