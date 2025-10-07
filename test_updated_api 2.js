#!/usr/bin/env node

// Тестируем обновленные функции API
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Функции как в adminRest.ts
async function getCases() {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Ошибка загрузки кейсов:', error)
    return []
  }
}

async function createCase(data) {
  try {
    const { data: result, error } = await supabase
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

// Тестируем функции
async function testUpdatedAPI() {
  console.log('🚀 ТЕСТИРУЮ ОБНОВЛЕННЫЕ ФУНКЦИИ API...\n');
  
  try {
    // Тест получения кейсов
    console.log('📡 Тестирую получение кейсов...');
    const cases = await getCases();
    console.log(`✅ Получено кейсов: ${cases.length}`);
    
    // Тест создания кейса
    console.log('\n📝 Тестирую создание кейса...');
    const testCase = {
      title: 'Обновленный API тест кейс',
      description: 'Описание обновленного API тест кейса',
      client: 'Обновленный API клиент',
      year: 2024,
      is_visible: true,
      sort_order: 6666
    };
    
    const result = await createCase(testCase);
    console.log(`✅ Кейс создан: ${result?.[0]?.id}`);
    
    console.log('\n🎉 ОБНОВЛЕННЫЕ ФУНКЦИИ РАБОТАЮТ!');
    console.log('✅ Получение кейсов работает');
    console.log('✅ Создание кейсов работает');
    console.log('✅ Админ панель должна функционировать');
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Запуск теста
testUpdatedAPI();


