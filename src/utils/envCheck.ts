// Проверка переменных окружения Supabase (опциональная, не критична для работы сайта)
export const checkSupabaseEnv = () => {
  // Сайт работает полностью автономно, проверка Supabase не обязательна
  // Функция оставлена для совместимости, но не выдает ошибок
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Только логируем, если переменные есть (для отладки)
  if (supabaseUrl && supabaseAnonKey) {
    console.log('ℹ️ Supabase переменные найдены (опционально)');
  }
  
  // Всегда возвращаем true, так как Supabase не обязателен
  return true;
};
