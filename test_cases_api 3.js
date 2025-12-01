#!/usr/bin/env node

// Тестируем API кейсов как в админ панели
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

// Функция для загрузки данных через REST API (как в adminRest.ts)
async function fetchFromSupabase(table, params = '') {
  try {
    const url = `${SUPABASE_URL}/rest/v1/${table}${params ? '?' + params : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Ошибка загрузки данных из ${table}:`, error)
    throw error
  }
}

// Функция getCases как в adminRest.ts
async function getCases() {
  try {
    return await fetchFromSupabase('cases', 'order=sort_order.asc')
  } catch (error) {
    console.error('Ошибка загрузки кейсов:', error)
    return []
  }
}

// Тестируем API
async function testCasesAPI() {
  console.log('🚀 ТЕСТИРУЮ API КЕЙСОВ...\n');
  
  try {
    console.log('📡 Запрашиваю кейсы через REST API...');
    const cases = await getCases();
    
    console.log(`✅ Получено кейсов: ${cases?.length || 0}`);
    
    if (cases && cases.length > 0) {
      console.log('\n📋 Список кейсов:');
      cases.forEach((caseItem, index) => {
        console.log(`   ${index + 1}. ${caseItem.title || 'Без названия'}`);
        console.log(`      Клиент: ${caseItem.client || 'Не указан'}`);
        console.log(`      Год: ${caseItem.year || 'Не указан'}`);
        console.log(`      Видимый: ${caseItem.is_visible ? 'Да' : 'Нет'}`);
        console.log(`      Порядок: ${caseItem.sort_order || 'Не указан'}`);
        console.log('');
      });
      
      console.log('🎉 API КЕЙСОВ РАБОТАЕТ!');
      console.log('✅ Кейсы успешно загружаются');
      console.log('✅ Админ панель должна показывать кейсы');
    } else {
      console.log('⚠️  Кейсы не найдены');
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Запуск теста
testCasesAPI();


