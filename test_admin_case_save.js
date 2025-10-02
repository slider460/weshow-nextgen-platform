#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

// Тестируем сохранение кейсов как в админ панели
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs'

// Создаем клиент с service role (как в adminRest.ts)
const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Функция createCase как в adminRest.ts
async function createCase(data) {
  try {
    const { data: result, error } = await adminSupabase
      .from('cases')
      .insert(data)
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Ошибка создания кейса:', error)
    throw error
  }
}

// Функция updateCase как в adminRest.ts
async function updateCase(id, data) {
  try {
    const { data: result, error } = await adminSupabase
      .from('cases')
      .update(data)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error('Ошибка обновления кейса:', error)
    throw error
  }
}

// Тестируем создание кейса с данными как в форме
async function testCaseSave() {
  console.log('🧪 Тестирую сохранение кейса с данными формы...');
  
  try {
    const caseData = {
      title: 'Корпоративный Новый год Samsung',
      description: 'Полное технологическое и мультимедийное сопровождение',
      detailed_description: 'Подробное описание проекта с техническими деталями',
      client: 'Samsung',
      year: 2025,
      project_duration: '3-6 месяцев',
      challenges: 'Технические вызовы проекта',
      solutions: 'Инновационные решения',
      results: JSON.stringify(['Результат 1', 'Результат 2', 'Результат 3']),
      technologies_used: ['React', 'Node.js', 'Supabase'],
      is_visible: true,
      sort_order: 5555,
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('📝 Данные для сохранения:', caseData);
    
    const result = await createCase(caseData);
    console.log('✅ Кейс сохранен:', result);
    
    if (result && result[0]) {
      console.log(`✅ ID сохраненного кейса: ${result[0].id}`);
      
      // Тестируем обновление
      console.log('\n🔄 Тестирую обновление кейса...');
      const updateData = {
        title: 'Обновленный корпоративный Новый год Samsung',
        updated_at: new Date().toISOString()
      };
      
      const updateResult = await updateCase(result[0].id, updateData);
      console.log('✅ Кейс обновлен:', updateResult);
    }
    
    return true;
    
  } catch (error) {
    console.log(`❌ Ошибка сохранения кейса: ${error.message}`);
    return false;
  }
}

// Тестируем загрузку изображения
async function testImageUpload() {
  console.log('\n🖼️ Тестирую загрузку изображения...');
  
  try {
    // Создаем тестовый файл (в реальности это будет файл из формы)
    const testImageData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG заголовок
    const testFile = new File([testImageData], 'test.png', { type: 'image/png' });
    
    const fileName = `${Date.now()}.png`;
    const filePath = `cases/images/${fileName}`;
    
    console.log(`📤 Загружаю файл: ${filePath}`);
    
    const { data: uploadData, error: uploadError } = await adminSupabase.storage
      .from('public')
      .upload(filePath, testFile);
    
    if (uploadError) {
      console.log(`❌ Ошибка загрузки: ${uploadError.message}`);
      return false;
    }
    
    console.log('✅ Файл загружен:', uploadData);
    
    // Получаем публичный URL
    const { data: urlData } = adminSupabase.storage
      .from('public')
      .getPublicUrl(filePath);
    
    console.log('✅ Публичный URL:', urlData.publicUrl);
    
    return true;
    
  } catch (error) {
    console.log(`❌ Ошибка загрузки изображения: ${error.message}`);
    return false;
  }
}

// Основная функция тестирования
async function testAdminCaseSave() {
  console.log('🚀 ТЕСТИРУЮ СОХРАНЕНИЕ КЕЙСОВ В АДМИН ПАНЕЛИ...\n');
  
  const saveWorks = await testCaseSave();
  const uploadWorks = await testImageUpload();
  
  console.log('\n📊 РЕЗУЛЬТАТЫ:');
  console.log(`✅ Сохранение кейсов: ${saveWorks ? 'РАБОТАЕТ' : 'НЕ РАБОТАЕТ'}`);
  console.log(`✅ Загрузка изображений: ${uploadWorks ? 'РАБОТАЕТ' : 'НЕ РАБОТАЕТ'}`);
  
  if (saveWorks && uploadWorks) {
    console.log('\n🎉 ВСЕ РАБОТАЕТ!');
    console.log('✅ API функций корректны');
    console.log('💡 Проблема может быть в React компоненте');
  } else {
    console.log('\n⚠️  ПРОБЛЕМЫ С API');
    console.log('💡 Нужно исправить конфигурацию');
  }
}

// Запуск тестов
testAdminCaseSave();
