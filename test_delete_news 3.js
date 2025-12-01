import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDeleteNews() {
  try {
    console.log('🔍 Тестируем удаление новостей...');
    
    // Сначала получим все новости
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
    
    // Показываем первую новость
    const firstNews = newsData[0];
    console.log('📄 Первая новость:', {
      id: firstNews.id,
      title: firstNews.title,
      category: firstNews.category
    });
    
    // Тестируем удаление (закомментировано для безопасности)
    console.log('⚠️  Удаление отключено для безопасности');
    console.log('🔧 Для тестирования удаления раскомментируйте код ниже');
    
    /*
    const { error: deleteError } = await supabase
      .from('news')
      .delete()
      .eq('id', firstNews.id);
    
    if (deleteError) {
      console.log('❌ Ошибка удаления:', deleteError.message);
    } else {
      console.log('✅ Новость успешно удалена');
    }
    */
    
  } catch (error) {
    console.error('💥 Ошибка:', error.message);
  }
}

// Запускаем тест
testDeleteNews();
