#!/usr/bin/env node

// Тестируем API для создания кейса с минимальными данными
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

// Функция для отправки данных через REST API
async function sendToSupabase(table, method, data, params) {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}${params ? '?' + params : ''}`
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : undefined
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    // Проверяем, есть ли контент для парсинга
    const text = await response.text()
    if (!text) {
      return null // Пустой ответ для DELETE операций
    }
    
    return JSON.parse(text)
  } catch (error) {
    console.error(`Ошибка отправки данных в ${table}:`, error)
    throw error
  }
}

// Функция createCase
async function createCase(data) {
  try {
    return await sendToSupabase('cases', 'POST', data)
  } catch (error) {
    console.error('Ошибка создания кейса:', error)
    throw error
  }
}

// Тестируем создание кейса с минимальными данными
async function testMinimalCase() {
  console.log('🧪 Тестирую создание кейса с минимальными данными...');
  
  try {
    const minimalCase = {
      title: 'Минимальный тестовый кейс',
      description: 'Описание',
      client: 'Тест клиент',
      year: 2024,
      is_visible: true,
      sort_order: 9999
    };
    
    console.log('📝 Данные:', minimalCase);
    
    const result = await createCase(minimalCase);
    console.log('✅ Минимальный кейс создан:', result);
    
    return result;
    
  } catch (error) {
    console.log(`❌ Ошибка создания минимального кейса: ${error.message}`);
    return null;
  }
}

// Тестируем создание кейса с полными данными
async function testFullCase() {
  console.log('\n🧪 Тестирую создание кейса с полными данными...');
  
  try {
    const fullCase = {
      title: 'Корпоративный Новый год Samsung',
      description: 'Полное технологическое и мультимедийное сопровождение',
      detailed_description: 'Подробное описание проекта',
      client: 'Samsung',
      year: 2025,
      project_duration: '3-6 месяцев',
      challenges: 'Технические вызовы',
      solutions: 'Инновационные решения',
      results: JSON.stringify(['Результат 1', 'Результат 2']),
      technologies_used: ['React', 'Node.js', 'Supabase'],
      is_visible: true,
      sort_order: 9998,
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('📝 Данные:', fullCase);
    
    const result = await createCase(fullCase);
    console.log('✅ Полный кейс создан:', result);
    
    return result;
    
  } catch (error) {
    console.log(`❌ Ошибка создания полного кейса: ${error.message}`);
    return null;
  }
}

// Основная функция тестирования
async function testCaseFormIssues() {
  console.log('🚀 ТЕСТИРУЮ ПРОБЛЕМЫ С ФОРМОЙ КЕЙСОВ...\n');
  
  const minimalResult = await testMinimalCase();
  const fullResult = await testFullCase();
  
  console.log('\n📊 РЕЗУЛЬТАТЫ:');
  console.log(`✅ Минимальный кейс: ${minimalResult ? 'СОЗДАН' : 'ОШИБКА'}`);
  console.log(`✅ Полный кейс: ${fullResult ? 'СОЗДАН' : 'ОШИБКА'}`);
  
  if (minimalResult && fullResult) {
    console.log('\n🎉 API РАБОТАЕТ!');
    console.log('✅ Создание кейсов через API функционирует');
    console.log('💡 Проблема в компоненте React - нужно исправить форму');
  } else {
    console.log('\n⚠️  ПРОБЛЕМЫ С API');
    console.log('💡 Нужно исправить конфигурацию или RLS');
  }
}

// Запуск тестов
testCaseFormIssues();


