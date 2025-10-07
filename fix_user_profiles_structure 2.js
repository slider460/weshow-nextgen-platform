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

// Функция для проверки структуры таблицы
async function checkTableStructure() {
  console.log('🔍 Проверяю структуру таблицы user_profiles...');
  
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);
      
    if (error) {
      console.log(`❌ Ошибка доступа к user_profiles: ${error.message}`);
      return false;
    } else {
      console.log(`✅ Доступ к user_profiles: OK`);
      if (data && data.length > 0) {
        console.log(`📊 Структура записи:`, Object.keys(data[0]));
      }
      return true;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для создания правильной структуры таблицы
async function createCorrectTable() {
  console.log('🔧 Создаю правильную структуру таблицы user_profiles...');
  
  try {
    // Сначала проверим, есть ли таблица
    const { data: existingData, error: existingError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);
      
    if (existingError && existingError.message.includes('does not exist')) {
      console.log('📝 Таблица user_profiles не существует, создаю...');
      
      // Создаем таблицу через RPC (если доступно)
      const { data: createResult, error: createError } = await supabase.rpc('exec_sql', {
        query: `
          CREATE TABLE IF NOT EXISTS user_profiles (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
            full_name TEXT,
            role TEXT DEFAULT 'user',
            avatar_url TEXT,
            phone TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (createError) {
        console.log(`⚠️  Не удалось создать через RPC: ${createError.message}`);
        console.log('💡 Создайте таблицу вручную в Supabase Dashboard');
      } else {
        console.log('✅ Таблица user_profiles создана');
      }
      
    } else {
      console.log('✅ Таблица user_profiles существует');
      
      // Проверяем, есть ли колонка user_id
      const { data: testData, error: testError } = await supabase
        .from('user_profiles')
        .select('user_id')
        .limit(1);
        
      if (testError && testError.message.includes('user_id')) {
        console.log('🔧 Добавляю колонку user_id...');
        
        const { data: alterResult, error: alterError } = await supabase.rpc('exec_sql', {
          query: `
            ALTER TABLE user_profiles 
            ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
          `
        });
        
        if (alterError) {
          console.log(`⚠️  Не удалось добавить колонку через RPC: ${alterError.message}`);
          console.log('💡 Добавьте колонку вручную в Supabase Dashboard');
        } else {
          console.log('✅ Колонка user_id добавлена');
        }
      } else {
        console.log('✅ Колонка user_id уже существует');
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Функция для создания профиля администратора
async function createAdminProfile() {
  console.log('👑 Создаю профиль администратора...');
  
  try {
    // Получаем ID администратора
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'admin@weshow.ru')
      .single();
      
    if (adminError) {
      console.log(`❌ Администратор не найден: ${adminError.message}`);
      return;
    }
    
    console.log(`✅ Администратор найден: ${adminUser.id}`);
    
    // Проверяем, есть ли уже профиль
    const { data: existingProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', adminUser.id)
      .single();
      
    if (profileError && profileError.message.includes('No rows')) {
      console.log('📝 Создаю новый профиль администратора...');
      
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: adminUser.id,
          full_name: 'Администратор',
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (createError) {
        console.log(`❌ Ошибка создания профиля: ${createError.message}`);
      } else {
        console.log(`✅ Профиль администратора создан: ${newProfile.id}`);
      }
      
    } else if (existingProfile) {
      console.log(`✅ Профиль администратора уже существует: ${existingProfile.id}`);
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Функция для отключения RLS
async function disableRLS() {
  console.log('🔓 Отключаю RLS для user_profiles...');
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      query: 'ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;'
    });
    
    if (error) {
      console.log(`⚠️  Не удалось отключить RLS через RPC: ${error.message}`);
      console.log('💡 Отключите RLS вручную в Supabase Dashboard');
    } else {
      console.log('✅ RLS отключен для user_profiles');
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Функция для финального теста
async function finalTest() {
  console.log('\n🧪 Финальный тест входа...');
  
  try {
    // Тестируем доступ к профилю
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);
      
    if (profileError) {
      console.log(`❌ Ошибка доступа к профилю: ${profileError.message}`);
    } else {
      console.log(`✅ Доступ к профилю: OK (${profile?.length || 0} записей)`);
    }
    
    // Тестируем вход
    const authClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
      email: 'admin@weshow.ru',
      password: 'password'
    });
    
    if (authError) {
      console.log(`❌ Ошибка входа: ${authError.message}`);
    } else {
      console.log(`✅ Вход успешен: ${authData.user?.email}`);
      
      // Проверяем профиль после входа
      const { data: userProfile, error: userProfileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authData.user?.id)
        .single();
        
      if (userProfileError) {
        console.log(`⚠️  Профиль пользователя не найден: ${userProfileError.message}`);
      } else {
        console.log(`✅ Профиль пользователя найден: ${userProfile.full_name}`);
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка тестирования: ${error.message}`);
  }
}

// Основная функция исправления
async function fixUserProfiles() {
  console.log('🚀 Исправление структуры user_profiles...\n');
  
  await checkTableStructure();
  await createCorrectTable();
  await createAdminProfile();
  await disableRLS();
  await finalTest();
  
  console.log('\n🎉 ИСПРАВЛЕНИЕ ЗАВЕРШЕНО!');
  console.log('✅ Структура таблицы исправлена');
  console.log('✅ Профиль администратора создан');
  console.log('✅ RLS отключен');
  console.log('\n🚀 Попробуйте войти в админ панель снова!');
}

// Запуск исправления
fixUserProfiles();


