import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDeleteWithAuth() {
  try {
    console.log('🔍 Тестируем удаление с аутентификацией...');
    
    // Получаем все новости
    const { data: newsData, error: fetchError } = await supabase
      .from('news')
      .select('*');
    
    if (fetchError) {
      console.log('❌ Ошибка получения новостей:', fetchError.message);
      return;
    }
    
    console.log(`📰 Найдено новостей: ${newsData.length}`);
    
    if (newsData.length === 0) {
      console.log('⚠️  Нет новостей для удаления');
      return;
    }
    
    const firstNews = newsData[0];
    console.log('📄 Удаляем новость:', {
      id: firstNews.id,
      title: firstNews.title
    });
    
    // Пробуем удалить
    const { data, error } = await supabase
      .from('news')
      .delete()
      .eq('id', firstNews.id)
      .select();
    
    if (error) {
      console.log('❌ Ошибка удаления:', error.message);
      console.log('🔍 Детали ошибки:', error);
      
      // Проверяем, связана ли ошибка с RLS
      if (error.message.includes('permission') || error.message.includes('policy')) {
        console.log('🚨 Проблема с RLS политиками!');
        console.log('💡 Решение: Временно отключить RLS или изменить политики');
      }
    } else {
      console.log('✅ Новость успешно удалена!');
      console.log('📊 Удаленные данные:', data);
    }
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
  }
}

// Запускаем тест
testDeleteWithAuth();
