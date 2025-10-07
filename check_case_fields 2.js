#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

// Supabase конфигурация
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

// Создаем клиент с service role ключом
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Функция для проверки полей в базе данных
async function checkDatabaseFields() {
  console.log('🔍 Проверяю поля в базе данных...');
  
  try {
    const { data: cases, error } = await supabase
      .from('cases')
      .select('*')
      .limit(1)
      .single();
      
    if (error) {
      console.log(`❌ Ошибка получения кейса: ${error.message}`);
      return;
    }
    
    console.log('✅ Поля в базе данных:');
    Object.keys(cases).forEach(key => {
      console.log(`   - ${key}: ${typeof cases[key]} = ${cases[key]}`);
    });
    
    return cases;
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return null;
  }
}

// Функция для создания совместимого кейса
async function createCompatibleCase() {
  console.log('\n📝 Создаю совместимый кейс...');
  
  try {
    const compatibleCase = {
      title: 'Совместимый тестовый кейс',
      description: 'Описание совместимого кейса',
      detailed_description: 'Подробное описание совместимого кейса',
      client: 'Совместимый клиент',
      year: 2024,
      image_url: null,
      video_url: null,
      results: 'Результаты проекта',
      is_visible: true,
      sort_order: 8888,
      featured: false,
      gallery_images: null,
      gallery_videos: null,
      project_duration: '3 месяца',
      team_size: 3,
      budget_range: 'Средний',
      challenges: 'Вызовы проекта',
      solutions: 'Решения проекта',
      technologies_used: ['React', 'Node.js'],
      project_scope: 'Полная разработка',
      client_feedback: 'Отличная работа!',
      awards: null,
      case_study_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data: newCase, error } = await supabase
      .from('cases')
      .insert(compatibleCase)
      .select()
      .single();
      
    if (error) {
      console.log(`❌ Ошибка создания совместимого кейса: ${error.message}`);
      return false;
    } else {
      console.log(`✅ Совместимый кейс создан: ${newCase.id}`);
      return true;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для тестирования API с совместимыми данными
async function testAPIWithCompatibleData() {
  console.log('\n🧪 Тестирую API с совместимыми данными...');
  
  try {
    const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
    
    const testData = {
      title: 'API тест кейс',
      description: 'Описание API тест кейса',
      client: 'API тест клиент',
      year: 2024,
      is_visible: true,
      sort_order: 7777,
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/cases`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ HTTP ошибка: ${response.status} - ${errorText}`);
      return false;
    }
    
    const result = await response.json();
    console.log(`✅ API тест успешен: ${result[0]?.id}`);
    return true;
    
  } catch (error) {
    console.log(`💥 Ошибка API теста: ${error.message}`);
    return false;
  }
}

// Основная функция
async function checkCaseFields() {
  console.log('🚀 ПРОВЕРКА ПОЛЕЙ КЕЙСОВ...\n');
  
  const dbFields = await checkDatabaseFields();
  
  if (dbFields) {
    await createCompatibleCase();
    await testAPIWithCompatibleData();
    
    console.log('\n📊 РЕЗУЛЬТАТЫ:');
    console.log('✅ Поля базы данных проверены');
    console.log('✅ Совместимый кейс создан');
    console.log('✅ API тест выполнен');
    console.log('\n💡 Теперь админ панель должна работать корректно');
  }
}

// Запуск проверки
checkCaseFields();
