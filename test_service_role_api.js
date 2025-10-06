#!/usr/bin/env node

// Тестируем API с service role ключом
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs'

// Функция для отправки данных через REST API с service role
async function sendToSupabaseWithServiceRole(table, method, data, params) {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}${params ? '?' + params : ''}`
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
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

// Функция createCase с service role
async function createCaseWithServiceRole(data) {
  try {
    return await sendToSupabaseWithServiceRole('cases', 'POST', data)
  } catch (error) {
    console.error('Ошибка создания кейса:', error)
    throw error
  }
}

// Тестируем создание кейса с service role
async function testServiceRoleCase() {
  console.log('🧪 Тестирую создание кейса с service role...');
  
  try {
    const testCase = {
      title: 'Service Role тестовый кейс',
      description: 'Описание service role кейса',
      client: 'Service Role клиент',
      year: 2024,
      is_visible: true,
      sort_order: 7777
    };
    
    console.log('📝 Данные:', testCase);
    
    const result = await createCaseWithServiceRole(testCase);
    console.log('✅ Service role кейс создан:', result);
    
    return result;
    
  } catch (error) {
    console.log(`❌ Ошибка создания service role кейса: ${error.message}`);
    return null;
  }
}

// Основная функция
async function testServiceRoleAPI() {
  console.log('🚀 ТЕСТИРУЮ SERVICE ROLE API...\n');
  
  const result = await testServiceRoleCase();
  
  if (result) {
    console.log('\n🎉 SERVICE ROLE API РАБОТАЕТ!');
    console.log('✅ Создание кейсов с service role функционирует');
    console.log('💡 Проблема в конфигурации API в админ панели');
  } else {
    console.log('\n⚠️  ПРОБЛЕМЫ С SERVICE ROLE API');
  }
}

// Запуск теста
testServiceRoleAPI();


