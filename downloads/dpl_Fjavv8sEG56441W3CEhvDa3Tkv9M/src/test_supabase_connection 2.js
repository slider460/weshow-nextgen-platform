import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('🔍 Тестируем подключение к Supabase...');
    
    // Проверяем существование таблицы news
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .limit(1);
    
    if (newsError) {
      console.log('❌ Таблица news не найдена:', newsError.message);
      
      // Проверяем, есть ли таблица blog_posts
      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .select('*')
        .limit(1);
      
      if (blogError) {
        console.log('❌ Таблица blog_posts не найдена:', blogError.message);
        console.log('📋 Нужно создать таблицы в Supabase Dashboard');
        console.log('🌐 Откройте: https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt');
        console.log('📝 Перейдите в SQL Editor и выполните create_news_blog_tables.sql');
      } else {
        console.log('✅ Таблица blog_posts существует');
      }
    } else {
      console.log('✅ Таблица news существует, найдено записей:', newsData.length);
    }
    
    // Проверяем общее подключение
    const { data: testData, error: testError } = await supabase
      .from('_supabase_migrations')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.log('⚠️  Ошибка подключения к миграциям:', testError.message);
    } else {
      console.log('✅ Подключение к Supabase работает');
    }
    
  } catch (error) {
    console.error('💥 Ошибка подключения:', error.message);
  }
}

// Запускаем тест
testConnection();
