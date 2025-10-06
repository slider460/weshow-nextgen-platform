const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

// Создаем клиент с правами администратора
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkStorage() {
  console.log('🔍 Проверяем Supabase Storage...\n');

  try {
    // 1. Проверяем доступные buckets
    console.log('1. Проверяем доступные buckets...');
    
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error('❌ Ошибка получения buckets:', bucketsError);
      return;
    }

    console.log('📦 Найденные buckets:');
    buckets.forEach(bucket => {
      console.log(`  - ${bucket.name} (${bucket.public ? 'публичный' : 'приватный'})`);
    });

    const publicBucket = buckets.find(b => b.name === 'public');
    if (!publicBucket) {
      console.log('\n❌ Bucket "public" не найден!');
      console.log('📝 Создаем bucket "public"...');
      
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('public', {
        public: true,
        allowedMimeTypes: ['image/*', 'video/*'],
        fileSizeLimit: 50 * 1024 * 1024 // 50MB
      });

      if (createError) {
        console.error('❌ Ошибка создания bucket:', createError);
      } else {
        console.log('✅ Bucket "public" создан');
      }
    } else {
      console.log('✅ Bucket "public" существует');
    }

    // 2. Проверяем содержимое bucket "public"
    console.log('\n2. Проверяем содержимое bucket "public"...');
    
    const { data: files, error: filesError } = await supabase.storage
      .from('public')
      .list('cases/images', {
        limit: 10,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (filesError) {
      console.log('⚠️ Ошибка получения файлов:', filesError.message);
      
      // Пробуем создать папку
      console.log('📝 Создаем папку cases/images...');
      
      // Загружаем тестовый файл для создания структуры
      const testContent = new Blob(['test'], { type: 'text/plain' });
      const { error: testUploadError } = await supabase.storage
        .from('public')
        .upload('cases/images/.gitkeep', testContent);

      if (testUploadError) {
        console.log('⚠️ Не удалось создать структуру папок:', testUploadError.message);
      } else {
        console.log('✅ Структура папок создана');
        
        // Удаляем тестовый файл
        await supabase.storage
          .from('public')
          .remove(['cases/images/.gitkeep']);
      }
    } else {
      console.log('📁 Файлов в cases/images:', files.length);
      
      if (files.length > 0) {
        console.log('📋 Последние файлы:');
        files.slice(0, 5).forEach(file => {
          console.log(`  - ${file.name} (${file.metadata?.size || 'неизвестный размер'})`);
        });
      }
    }

    // 3. Проверяем кейсы с изображениями
    console.log('\n3. Проверяем кейсы с изображениями...');
    
    const { data: cases, error: casesError } = await supabase
      .from('cases')
      .select('id, title, image_url')
      .not('image_url', 'is', null)
      .limit(5);

    if (casesError) {
      console.error('❌ Ошибка получения кейсов:', casesError);
    } else {
      console.log('📊 Кейсов с изображениями:', cases.length);
      
      if (cases.length > 0) {
        console.log('📋 Кейсы с изображениями:');
        cases.forEach(caseItem => {
          console.log(`  - ${caseItem.title}: ${caseItem.image_url}`);
        });
      }
    }

    // 4. Тестируем загрузку файла
    console.log('\n4. Тестируем загрузку файла...');
    
    const testImageContent = new Blob(['fake-image-content'], { type: 'image/jpeg' });
    const testFileName = `test-${Date.now()}.jpg`;
    const testPath = `cases/images/${testFileName}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('public')
      .upload(testPath, testImageContent);

    if (uploadError) {
      console.error('❌ Ошибка тестовой загрузки:', uploadError);
    } else {
      console.log('✅ Тестовый файл загружен:', uploadData.path);
      
      // Получаем публичный URL
      const { data: urlData } = supabase.storage
        .from('public')
        .getPublicUrl(testPath);
      
      console.log('🔗 Публичный URL:', urlData.publicUrl);
      
      // Удаляем тестовый файл
      await supabase.storage
        .from('public')
        .remove([testPath]);
      
      console.log('🗑️ Тестовый файл удален');
    }

    console.log('\n🎉 Проверка Storage завершена!');

  } catch (error) {
    console.error('❌ Общая ошибка:', error);
  }
}

// Запускаем проверку
checkStorage();


