// Проверка переменных окружения
console.log('=== ПРОВЕРКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ ===');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL || 'НЕ НАЙДЕНА');
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'НАЙДЕНА' : 'НЕ НАЙДЕНА');
console.log('VITE_SUPABASE_SERVICE_KEY:', import.meta.env.VITE_SUPABASE_SERVICE_KEY ? 'НАЙДЕНА' : 'НЕ НАЙДЕНА');
console.log('=====================================');
