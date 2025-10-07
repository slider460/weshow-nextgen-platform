// Скрипт для настройки системы аутентификации в Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.YourServiceKeyHere';

// Используем anon key для создания таблиц (так как у нас нет service key)
const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE');

async function setupAuthSystem() {
  console.log('🔧 Настройка системы аутентификации...');
  
  try {
    // Проверяем подключение
    const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
    
    if (error) {
      console.log('❌ Ошибка подключения к базе данных:', error.message);
      console.log('📝 Необходимо выполнить SQL скрипт вручную в Supabase Dashboard');
      console.log('📄 Файл: setup_auth_system.sql');
      return;
    }
    
    console.log('✅ Подключение к базе данных успешно');
    console.log('📊 Таблицы уже существуют или созданы');
    
  } catch (error) {
    console.log('❌ Ошибка:', error.message);
    console.log('📝 Необходимо выполнить SQL скрипт вручную в Supabase Dashboard');
    console.log('📄 Файл: setup_auth_system.sql');
  }
}

setupAuthSystem();
