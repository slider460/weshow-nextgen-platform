import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testCreateAndDelete() {
  try {
    console.log('🔍 Тестируем создание и удаление новости...');
    
    // Создаем тестовую новость
    const testNews = {
      title: 'Тестовая новость для удаления',
      content: 'Это тестовая новость, которая будет удалена',
      excerpt: 'Тестовая новость...',
      category: 'Технологии',
      author: 'Тест',
      image_url: '/placeholder.svg',
      tags: ['тест', 'удаление'],
      featured: false,
      status: 'published'
    };
    
    console.log('📝 Создаем тестовую новость...');
    const { data: createdNews, error: createError } = await supabase
      .from('news')
      .insert(testNews)
      .select()
      .single();
    
    if (createError) {
      console.log('❌ Ошибка создания новости:', createError.message);
      return;
    }
    
    console.log('✅ Новость создана:', {
      id: createdNews.id,
      title: createdNews.title
    });
    
    // Ждем немного
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Удаляем новость
    console.log('🗑️ Удаляем тестовую новость...');
    const { data: deletedData, error: deleteError } = await supabase
      .from('news')
      .delete()
      .eq('id', createdNews.id)
      .select();
    
    if (deleteError) {
      console.log('❌ Ошибка удаления:', deleteError.message);
    } else {
      console.log('✅ Новость успешно удалена!');
      console.log('📊 Удаленные данные:', deletedData);
    }
    
    // Проверяем, что новость действительно удалена
    console.log('🔍 Проверяем, что новость удалена...');
    const { data: checkData, error: checkError } = await supabase
      .from('news')
      .select('*')
      .eq('id', createdNews.id);
    
    if (checkError) {
      console.log('❌ Ошибка проверки:', checkError.message);
    } else {
      console.log('📊 Найдено записей с этим ID:', checkData.length);
      if (checkData.length === 0) {
        console.log('✅ Новость действительно удалена!');
      } else {
        console.log('❌ Новость не удалена!');
      }
    }
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
  }
}

// Запускаем тест
testCreateAndDelete();
