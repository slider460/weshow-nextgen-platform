import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fixBlobImages() {
  try {
    console.log('🔍 Исправляем blob URL в базе данных...');
    
    // Получаем все новости с blob URL
    const { data: newsData, error: fetchError } = await supabase
      .from('news')
      .select('id, title, image_url')
      .like('image_url', 'blob:%');
    
    if (fetchError) {
      console.log('❌ Ошибка получения новостей:', fetchError.message);
      return;
    }
    
    console.log(`📰 Найдено новостей с blob URL: ${newsData.length}`);
    
    // Обновляем каждую новость, заменяя blob URL на placeholder
    for (const item of newsData) {
      console.log(`🔄 Обновляем новость: ${item.title}`);
      
      const { error: updateError } = await supabase
        .from('news')
        .update({ image_url: '/placeholder.svg' })
        .eq('id', item.id);
      
      if (updateError) {
        console.log(`❌ Ошибка обновления новости ${item.id}:`, updateError.message);
      } else {
        console.log(`✅ Новость ${item.id} обновлена`);
      }
    }
    
    console.log('🎉 Все blob URL исправлены!');
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
  }
}

// Запускаем исправление
fixBlobImages();
