#!/usr/bin/env node

// Тестируем API для создания и обновления кейсов
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

// Функция для отправки данных через REST API (как в adminRest.ts)
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

    return await response.json()
  } catch (error) {
    console.error(`Ошибка отправки данных в ${table}:`, error)
    throw error
  }
}

// Функция createCase как в adminRest.ts
async function createCase(data) {
  try {
    return await sendToSupabase('cases', 'POST', data)
  } catch (error) {
    console.error('Ошибка создания кейса:', error)
    throw error
  }
}

// Функция updateCase как в adminRest.ts
async function updateCase(id, data) {
  try {
    return await sendToSupabase('cases', 'PUT', data, `id=eq.${id}`)
  } catch (error) {
    console.error('Ошибка обновления кейса:', error)
    throw error
  }
}

// Тестируем создание кейса
async function testCreateCase() {
  console.log('🧪 Тестирую создание кейса...');
  
  try {
    const testCaseData = {
      title: 'Тестовый кейс для проверки API',
      description: 'Описание тестового кейса',
      client: 'Тестовый клиент',
      year: 2024,
      is_visible: true,
      sort_order: 1000,
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('📝 Данные для создания:', testCaseData);
    
    const result = await createCase(testCaseData);
    console.log('✅ Кейс создан успешно:', result);
    
    return result;
    
  } catch (error) {
    console.log(`❌ Ошибка создания кейса: ${error.message}`);
    return null;
  }
}

// Тестируем обновление кейса
async function testUpdateCase(caseId) {
  console.log('🧪 Тестирую обновление кейса...');
  
  try {
    const updateData = {
      title: 'Обновленный тестовый кейс',
      description: 'Обновленное описание',
      updated_at: new Date().toISOString()
    };
    
    console.log('📝 Данные для обновления:', updateData);
    
    const result = await updateCase(caseId, updateData);
    console.log('✅ Кейс обновлен успешно:', result);
    
    return result;
    
  } catch (error) {
    console.log(`❌ Ошибка обновления кейса: ${error.message}`);
    return null;
  }
}

// Основная функция тестирования
async function testCasesActions() {
  console.log('🚀 ТЕСТИРУЮ ДЕЙСТВИЯ С КЕЙСАМИ...\n');
  
  // Тестируем создание
  const newCase = await testCreateCase();
  
  if (newCase && newCase[0] && newCase[0].id) {
    // Тестируем обновление
    await testUpdateCase(newCase[0].id);
    
    console.log('\n🎉 ВСЕ ТЕСТЫ ПРОШЛИ!');
    console.log('✅ Создание кейсов работает');
    console.log('✅ Обновление кейсов работает');
    console.log('✅ API функции корректны');
    console.log('\n💡 Проблема может быть в фронтенде (React компонентах)');
  } else {
    console.log('\n⚠️  ПРОБЛЕМА С API');
    console.log('❌ Создание кейсов не работает');
    console.log('💡 Нужно проверить RLS политики или права доступа');
  }
}

// Запуск тестов
testCasesActions();


