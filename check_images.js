import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkImages() {
  try {
    console.log('🔍 Проверяем изображения в базе данных...');
    
    const { data: newsData, error } = await supabase
      .from('news')
      .select('id, title, image_url');
    
    if (error) {
      console.log('❌ Ошибка получения новостей:', error.message);
      return;
    }
    
    console.log(`📰 Найдено новостей: ${newsData.length}`);
    
    newsData.forEach((item, index) => {
      console.log(`\n📄 Новость ${index + 1}:`);
      console.log(`  ID: ${item.id}`);
      console.log(`  Заголовок: ${item.title}`);
      console.log(`  Изображение: ${item.image_url || 'НЕТ'}`);
      
      if (item.image_url) {
        // Проверяем, доступно ли изображение
        fetch(item.image_url)
          .then(response => {
            if (response.ok) {
              console.log(`  ✅ Изображение доступно (${response.status})`);
            } else {
              console.log(`  ❌ Изображение недоступно (${response.status})`);
            }
          })
          .catch(err => {
            console.log(`  ❌ Ошибка загрузки изображения: ${err.message}`);
          });
      }
    });
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
  }
}

// Запускаем проверку
checkImages();
