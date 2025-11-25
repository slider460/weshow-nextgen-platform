const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

// Создаем клиент с правами администратора
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkCasesRLS() {
  console.log('🔍 Проверяем RLS политики для таблицы cases...\n');

  try {
    // 1. Проверяем, включен ли RLS для таблицы cases
    console.log('1. Проверяем статус RLS для таблицы cases...');
    
    const { data: rlsStatus, error: rlsError } = await supabase
      .rpc('sql', {
        query: `
          SELECT schemaname, tablename, rowsecurity 
          FROM pg_tables 
          WHERE tablename = 'cases' AND schemaname = 'public';
        `
      });

    if (rlsError) {
      console.log('⚠️ Не удалось проверить RLS статус:', rlsError.message);
    } else {
      console.log('📋 RLS статус:', rlsStatus);
    }

    // 2. Проверяем существующие политики
    console.log('\n2. Проверяем существующие RLS политики...');
    
    const { data: policies, error: policiesError } = await supabase
      .rpc('sql', {
        query: `
          SELECT policyname, permissive, roles, cmd, qual, with_check
          FROM pg_policies 
          WHERE tablename = 'cases' AND schemaname = 'public';
        `
      });

    if (policiesError) {
      console.log('⚠️ Не удалось получить политики:', policiesError.message);
    } else {
      console.log('🔒 Найденные политики:', policies.length);
      policies.forEach(policy => {
        console.log(`  - ${policy.policyname}: ${policy.cmd} для ${policy.roles}`);
      });
    }

    // 3. Тестируем операции с разными ключами
    console.log('\n3. Тестируем операции с Service Role...');
    
    // Тест создания
    const testData = {
      title: `RLS тест ${Date.now()}`,
      client: 'RLS тест клиент',
      year: 2024,
      description: 'Тест RLS политик',
      is_visible: true,
      sort_order: 9999
    };

    console.log('📤 Пробуем создать кейс с Service Role...');
    const { data: createResult, error: createError } = await supabase
      .from('cases')
      .insert(testData)
      .select();

    if (createError) {
      console.error('❌ Ошибка создания с Service Role:', createError);
    } else {
      console.log('✅ Кейс создан с Service Role:', createResult?.[0]?.id);
      
      // Тест обновления
      console.log('📤 Пробуем обновить кейс...');
      const { data: updateResult, error: updateError } = await supabase
        .from('cases')
        .update({ title: `${testData.title} (обновлено)` })
        .eq('id', createResult[0].id)
        .select();

      if (updateError) {
        console.error('❌ Ошибка обновления:', updateError);
      } else {
        console.log('✅ Кейс обновлен:', updateResult?.[0]?.title);
      }

      // Тест удаления
      console.log('📤 Пробуем удалить тестовый кейс...');
      const { error: deleteError } = await supabase
        .from('cases')
        .delete()
        .eq('id', createResult[0].id);

      if (deleteError) {
        console.error('❌ Ошибка удаления:', deleteError);
      } else {
        console.log('✅ Тестовый кейс удален');
      }
    }

    // 4. Тестируем с anon ключом
    console.log('\n4. Тестируем с anon ключом...');
    
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
    
    const anonSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Тест чтения
    console.log('📤 Пробуем прочитать кейсы с anon ключом...');
    const { data: readResult, error: readError } = await anonSupabase
      .from('cases')
      .select('*')
      .eq('is_visible', true)
      .limit(1);

    if (readError) {
      console.error('❌ Ошибка чтения с anon ключом:', readError);
    } else {
      console.log('✅ Чтение с anon ключом работает:', readResult?.length || 0, 'кейсов');
    }

    // Тест создания с anon ключом (должно не работать)
    console.log('📤 Пробуем создать кейс с anon ключом (должно не работать)...');
    const { data: anonCreateResult, error: anonCreateError } = await anonSupabase
      .from('cases')
      .insert(testData)
      .select();

    if (anonCreateError) {
      console.log('✅ Создание с anon ключом заблокировано (как и должно быть):', anonCreateError.message);
    } else {
      console.log('⚠️ Создание с anon ключом работает (неожиданно):', anonCreateResult);
    }

    console.log('\n🎉 Проверка RLS завершена!');

  } catch (error) {
    console.error('❌ Общая ошибка:', error);
  }
}

// Запускаем проверку
checkCasesRLS();























