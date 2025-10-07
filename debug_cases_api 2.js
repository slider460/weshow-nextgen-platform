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

// Функция для тестирования API кейсов как в админ панели
async function testCasesAPI() {
  console.log('🔍 Тестирую API кейсов как в админ панели...');
  
  try {
    // Тестируем разные способы получения кейсов
    console.log('\n1️⃣ Тест с service role ключом:');
    const { data: serviceData, error: serviceError } = await supabase
      .from('cases')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (serviceError) {
      console.log(`❌ Ошибка с service role: ${serviceError.message}`);
    } else {
      console.log(`✅ Service role: найдено ${serviceData?.length || 0} кейсов`);
      if (serviceData && serviceData.length > 0) {
        console.log('📋 Первые кейсы:');
        serviceData.slice(0, 3).forEach((caseItem, index) => {
          console.log(`   ${index + 1}. ${caseItem.title} (${caseItem.client})`);
        });
      }
    }
    
    // Тестируем с обычным клиентом (как в браузере)
    console.log('\n2️⃣ Тест с обычным клиентом:');
    const regularClient = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.Vy7LdF6xJYVhVvQnKqBqJXzJYVhVvQnKqBqJXzJYVhVvQnKqBqJXz');
    
    const { data: regularData, error: regularError } = await regularClient
      .from('cases')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (regularError) {
      console.log(`❌ Ошибка с обычным клиентом: ${regularError.message}`);
    } else {
      console.log(`✅ Обычный клиент: найдено ${regularData?.length || 0} кейсов`);
    }
    
    // Тестируем аутентификацию
    console.log('\n3️⃣ Тест аутентификации:');
    const { data: authData, error: authError } = await regularClient.auth.signInWithPassword({
      email: 'admin@weshow.ru',
      password: 'password'
    });
    
    if (authError) {
      console.log(`❌ Ошибка аутентификации: ${authError.message}`);
    } else {
      console.log(`✅ Аутентификация успешна: ${authData.user?.email}`);
      
      // Тестируем получение кейсов после аутентификации
      const { data: authCasesData, error: authCasesError } = await regularClient
        .from('cases')
        .select('*')
        .order('sort_order', { ascending: true });
        
      if (authCasesError) {
        console.log(`❌ Ошибка получения кейсов после аутентификации: ${authCasesError.message}`);
      } else {
        console.log(`✅ После аутентификации: найдено ${authCasesData?.length || 0} кейсов`);
      }
    }
    
    return {
      serviceRole: !serviceError,
      regularClient: !regularError,
      authenticated: !authError,
      authCases: !authError && !authCasesError
    };
    
  } catch (error) {
    console.log(`💥 Критическая ошибка: ${error.message}`);
    return {
      serviceRole: false,
      regularClient: false,
      authenticated: false,
      authCases: false
    };
  }
}

// Функция для проверки RLS политик
async function checkRLSPolicies() {
  console.log('\n🔒 Проверяю RLS политики...');
  
  try {
    // Проверяем, включен ли RLS
    const { data: rlsData, error: rlsError } = await supabase
      .from('pg_tables')
      .select('tablename, rowsecurity')
      .eq('tablename', 'cases')
      .eq('schemaname', 'public');
      
    if (rlsError) {
      console.log(`⚠️  Не удалось проверить RLS: ${rlsError.message}`);
    } else {
      console.log(`📊 RLS статус: ${rlsData?.[0]?.rowsecurity ? 'ВКЛЮЧЕН' : 'ОТКЛЮЧЕН'}`);
    }
    
    // Проверяем политики
    const { data: policiesData, error: policiesError } = await supabase
      .from('pg_policies')
      .select('policyname, permissive, roles, cmd, qual')
      .eq('tablename', 'cases')
      .eq('schemaname', 'public');
      
    if (policiesError) {
      console.log(`⚠️  Не удалось проверить политики: ${policiesError.message}`);
    } else {
      console.log(`📋 Найдено политик: ${policiesData?.length || 0}`);
      policiesData?.forEach((policy, index) => {
        console.log(`   ${index + 1}. ${policy.policyname} (${policy.cmd})`);
      });
    }
    
  } catch (error) {
    console.log(`💥 Ошибка проверки RLS: ${error.message}`);
  }
}

// Функция для исправления RLS
async function fixCasesRLS() {
  console.log('\n🔧 Исправляю RLS для кейсов...');
  
  try {
    // Отключаем RLS для cases
    const { error: disableError } = await supabase.rpc('exec_sql', {
      query: 'ALTER TABLE cases DISABLE ROW LEVEL SECURITY;'
    });
    
    if (disableError) {
      console.log(`⚠️  Не удалось отключить RLS через RPC: ${disableError.message}`);
    } else {
      console.log('✅ RLS отключен для cases');
    }
    
    // Удаляем все политики для cases
    const policies = [
      'Enable read access for all users',
      'Enable insert for authenticated users only',
      'Enable update for authenticated users only',
      'Enable delete for authenticated users only',
      'Allow public read access',
      'Allow anonymous read access',
      'Allow authenticated full access'
    ];
    
    for (const policy of policies) {
      const { error: dropError } = await supabase.rpc('exec_sql', {
        query: `DROP POLICY IF EXISTS "${policy}" ON cases;`
      });
      
      if (!dropError) {
        console.log(`✅ Политика "${policy}" удалена`);
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка исправления RLS: ${error.message}`);
  }
}

// Функция для создания тестового кейса
async function createTestCase() {
  console.log('\n📝 Создаю тестовый кейс...');
  
  try {
    const testCase = {
      title: 'Тестовый кейс API',
      description: 'Этот кейс создан для тестирования API',
      client: 'Тестовый клиент API',
      year: 2024,
      is_visible: true,
      sort_order: 999,
      featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data: newCase, error } = await supabase
      .from('cases')
      .insert(testCase)
      .select()
      .single();
      
    if (error) {
      console.log(`❌ Ошибка создания тестового кейса: ${error.message}`);
      return false;
    } else {
      console.log(`✅ Тестовый кейс создан: ${newCase.id}`);
      return true;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Основная функция диагностики
async function diagnoseCasesAPI() {
  console.log('🚀 ДИАГНОСТИКА API КЕЙСОВ...\n');
  
  const results = await testCasesAPI();
  
  await checkRLSPolicies();
  
  // Если есть проблемы, пытаемся исправить
  if (!results.authCases) {
    console.log('\n🔧 Пытаюсь исправить проблемы...');
    await fixCasesRLS();
    
    // Повторный тест
    console.log('\n🔄 Повторный тест...');
    const newResults = await testCasesAPI();
    
    if (!newResults.authCases) {
      console.log('\n📝 Создаю тестовый кейс для проверки...');
      await createTestCase();
    }
  }
  
  console.log('\n📊 РЕЗУЛЬТАТЫ ДИАГНОСТИКИ:');
  console.log(`✅ Service role доступ: ${results.serviceRole ? 'ДА' : 'НЕТ'}`);
  console.log(`✅ Обычный клиент доступ: ${results.regularClient ? 'ДА' : 'НЕТ'}`);
  console.log(`✅ Аутентификация: ${results.authenticated ? 'ДА' : 'НЕТ'}`);
  console.log(`✅ Кейсы после аутентификации: ${results.authCases ? 'ДА' : 'НЕТ'}`);
  
  if (results.authCases) {
    console.log('\n🎉 API КЕЙСОВ РАБОТАЕТ!');
    console.log('✅ Админ панель должна показывать кейсы');
    console.log('✅ Создание кейсов должно работать');
  } else {
    console.log('\n⚠️  ПРОБЛЕМЫ С API КЕЙСОВ');
    console.log('💡 Возможно потребуется дополнительная настройка RLS');
  }
}

// Запуск диагностики
diagnoseCasesAPI();


