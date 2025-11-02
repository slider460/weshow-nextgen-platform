const { createClient } = require('@supabase/supabase-js');

// Инициализация Supabase клиента
const supabase = createClient(
  'https://zbykhdjqrtqftfitbvbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'
);

async function updateSamaraProject() {
  try {
    console.log('🔍 Ищем проект samara-stand...');
    
    // Ищем проект по ID или названию
    const { data: projects, error: searchError } = await supabase
      .from('cases')
      .select('*')
      .or('id.eq.samara-stand,title.ilike.%samara%,title.ilike.%самар%')
      .limit(10);

    if (searchError) {
      console.error('❌ Ошибка поиска:', searchError);
      return;
    }

    console.log(`📊 Найдено проектов: ${projects.length}`);
    
    if (projects.length === 0) {
      console.log('❌ Проект samara-stand не найден');
      return;
    }

    // Показываем найденные проекты
    projects.forEach((project, index) => {
      console.log(`\n${index + 1}. Проект:`);
      console.log(`   ID: ${project.id}`);
      console.log(`   Название: ${project.title}`);
      console.log(`   Клиент: ${project.client}`);
      console.log(`   Год: ${project.year}`);
      console.log(`   Текущее изображение: ${project.image_url}`);
    });

    // Ищем конкретно samara-stand
    const samaraProject = projects.find(p => 
      p.id === 'samara-stand' || 
      p.title.toLowerCase().includes('samara') ||
      p.title.toLowerCase().includes('самар')
    );

    if (!samaraProject) {
      console.log('❌ Проект samara-stand не найден среди результатов');
      return;
    }

    console.log(`\n✅ Найден проект: ${samaraProject.title} (ID: ${samaraProject.id})`);

    // Обновляем проект - удаляем старое изображение и устанавливаем новое
    const { data: updatedProject, error: updateError } = await supabase
      .from('cases')
      .update({
        image_url: '/lovable-uploads/samara-stand-main.jpg', // Новое основное изображение
        updated_at: new Date().toISOString()
      })
      .eq('id', samaraProject.id)
      .select();

    if (updateError) {
      console.error('❌ Ошибка обновления:', updateError);
      return;
    }

    console.log('✅ Проект успешно обновлен!');
    console.log('📸 Новое основное изображение установлено');
    
    // Проверяем, есть ли галерея изображений для этого проекта
    console.log('\n🔍 Проверяем галерею изображений...');
    
    const { data: galleryImages, error: galleryError } = await supabase
      .from('images')
      .select('*')
      .eq('case_id', samaraProject.id);

    if (galleryError) {
      console.log('ℹ️ Таблица images не найдена или нет галереи');
    } else {
      console.log(`📊 Найдено изображений в галерее: ${galleryImages.length}`);
      
      if (galleryImages.length > 0) {
        console.log('🗑️ Удаляем галерею изображений...');
        
        const { error: deleteError } = await supabase
          .from('images')
          .delete()
          .eq('case_id', samaraProject.id);

        if (deleteError) {
          console.error('❌ Ошибка удаления галереи:', deleteError);
        } else {
          console.log('✅ Галерея изображений удалена');
        }
      }
    }

    console.log('\n🎉 Обновление завершено!');
    console.log(`Проект: ${samaraProject.title}`);
    console.log(`Новое изображение: /lovable-uploads/samara-stand-main.jpg`);

  } catch (error) {
    console.error('❌ Общая ошибка:', error);
  }
}

updateSamaraProject();






