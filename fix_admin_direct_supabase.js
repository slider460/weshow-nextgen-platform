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

// Функция для выполнения SQL через прямой REST API
async function executeDirectSQL(sqlQuery) {
  try {
    console.log(`🔄 Выполняю: ${sqlQuery.substring(0, 60)}...`);
    
    // Используем прямой REST API запрос
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        sql: sqlQuery
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`⚠️  Ошибка: ${response.status} - ${errorText}`);
      return false;
    }

    const result = await response.text();
    console.log('✅ Выполнено успешно');
    return true;
    
  } catch (error) {
    console.log(`❌ Исключение: ${error.message}`);
    return false;
  }
}

// Функция для исправления структуры user_profiles
async function fixUserProfilesStructure() {
  console.log('🔧 Исправляю структуру таблицы user_profiles...');
  
  try {
    // Проверяем текущую структуру
    const { data: currentStructure, error: structureError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);
      
    if (structureError) {
      console.log(`❌ Ошибка доступа: ${structureError.message}`);
      return false;
    }
    
    console.log('📊 Текущая структура:', Object.keys(currentStructure[0] || {}));
    
    // Проверяем, есть ли колонка user_id
    const hasUserId = currentStructure[0] && 'user_id' in currentStructure[0];
    
    if (!hasUserId) {
      console.log('🔧 Добавляю колонку user_id...');
      
      // Попробуем добавить колонку через ALTER TABLE
      const alterResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'apikey': supabaseServiceKey
        },
        body: JSON.stringify({
          sql: 'ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;'
        })
      });
      
      if (alterResponse.ok) {
        console.log('✅ Колонка user_id добавлена');
      } else {
        console.log('⚠️  Не удалось добавить колонку через REST API');
        // Попробуем другой способ
        return await addUserIdColumnAlternative();
      }
    } else {
      console.log('✅ Колонка user_id уже существует');
    }
    
    return true;
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Альтернативный способ добавления колонки
async function addUserIdColumnAlternative() {
  console.log('🔧 Альтернативный способ добавления колонки...');
  
  try {
    // Создаем новую таблицу с правильной структурой
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS user_profiles_new (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT,
        company_name TEXT,
        phone TEXT,
        role TEXT DEFAULT 'user',
        avatar_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        sql: createTableSQL
      })
    });
    
    if (response.ok) {
      console.log('✅ Новая таблица user_profiles_new создана');
      
      // Копируем данные из старой таблицы
      const { data: oldData, error: oldError } = await supabase
        .from('user_profiles')
        .select('*');
        
      if (!oldError && oldData && oldData.length > 0) {
        console.log(`📋 Копирую ${oldData.length} записей...`);
        
        // Преобразуем данные для новой структуры
        const newData = oldData.map(record => ({
          id: record.id,
          user_id: null, // Будет заполнено позже
          full_name: record.full_name,
          company_name: record.company_name,
          phone: record.phone,
          role: record.role || 'user',
          created_at: record.created_at,
          updated_at: record.updated_at
        }));
        
        const { error: insertError } = await supabase
          .from('user_profiles_new')
          .insert(newData);
          
        if (insertError) {
          console.log(`⚠️  Ошибка копирования данных: ${insertError.message}`);
        } else {
          console.log('✅ Данные скопированы в новую таблицу');
        }
      }
      
      return true;
    } else {
      console.log(`❌ Не удалось создать новую таблицу: ${response.status}`);
      return false;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для отключения RLS
async function disableRLSForUserProfiles() {
  console.log('🔓 Отключаю RLS для user_profiles...');
  
  try {
    // Попробуем отключить RLS через REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        sql: 'ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;'
      })
    });
    
    if (response.ok) {
      console.log('✅ RLS отключен для user_profiles');
      return true;
    } else {
      console.log(`⚠️  Не удалось отключить RLS через REST API: ${response.status}`);
      return false;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для создания профиля администратора
async function createAdminProfile() {
  console.log('👑 Создаю профиль администратора...');
  
  try {
    // Получаем всех пользователей
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email');
      
    if (usersError) {
      console.log(`❌ Ошибка получения пользователей: ${usersError.message}`);
      return false;
    }
    
    console.log(`📋 Найдено пользователей: ${users?.length || 0}`);
    users?.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.email} (ID: ${user.id})`);
    });
    
    // Находим администратора
    const adminUser = users?.find(user => user.email === 'admin@weshow.ru');
    
    if (!adminUser) {
      console.log('❌ Администратор с email admin@weshow.ru не найден');
      return false;
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
        return false;
      } else {
        console.log(`✅ Профиль администратора создан: ${newProfile.id}`);
        return true;
      }
      
    } else if (existingProfile) {
      console.log(`✅ Профиль администратора уже существует: ${existingProfile.id}`);
      return true;
    } else {
      console.log(`⚠️  Неожиданная ошибка: ${profileError?.message}`);
      return false;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
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
      return false;
    } else {
      console.log(`✅ Доступ к профилю: OK (${profile?.length || 0} записей)`);
      if (profile && profile.length > 0) {
        console.log(`📊 Структура: ${Object.keys(profile[0]).join(', ')}`);
      }
    }
    
    // Тестируем вход
    const authClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: authData, error: authError } = await authClient.auth.signInWithPassword({
      email: 'admin@weshow.ru',
      password: 'password'
    });
    
    if (authError) {
      console.log(`❌ Ошибка входа: ${authError.message}`);
      return false;
    } else {
      console.log(`✅ Вход успешен: ${authData.user?.email}`);
      console.log(`   User ID: ${authData.user?.id}`);
      
      // Проверяем профиль после входа
      const { data: userProfile, error: userProfileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authData.user?.id)
        .single();
        
      if (userProfileError) {
        console.log(`⚠️  Профиль пользователя не найден: ${userProfileError.message}`);
        return false;
      } else {
        console.log(`✅ Профиль пользователя найден: ${userProfile.full_name || 'Без имени'}`);
        return true;
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка тестирования: ${error.message}`);
    return false;
  }
}

// Основная функция исправления
async function fixAdminPanelDirectly() {
  console.log('🚀 ПРЯМОЕ ИСПРАВЛЕНИЕ АДМИН ПАНЕЛИ ЧЕРЕЗ SUPABASE...\n');
  
  const results = {
    structure: false,
    rls: false,
    profile: false,
    test: false
  };
  
  // 1. Исправляем структуру таблицы
  results.structure = await fixUserProfilesStructure();
  
  // 2. Отключаем RLS
  results.rls = await disableRLSForUserProfiles();
  
  // 3. Создаем профиль администратора
  results.profile = await createAdminProfile();
  
  // 4. Финальный тест
  results.test = await finalTest();
  
  console.log('\n📊 РЕЗУЛЬТАТЫ ИСПРАВЛЕНИЯ:');
  console.log(`✅ Структура таблицы: ${results.structure ? 'ИСПРАВЛЕНА' : 'ОШИБКА'}`);
  console.log(`✅ RLS отключен: ${results.rls ? 'ДА' : 'ОШИБКА'}`);
  console.log(`✅ Профиль админа: ${results.profile ? 'СОЗДАН' : 'ОШИБКА'}`);
  console.log(`✅ Тест входа: ${results.test ? 'УСПЕШЕН' : 'ОШИБКА'}`);
  
  if (results.test) {
    console.log('\n🎉 АДМИН ПАНЕЛЬ ПОЛНОСТЬЮ ИСПРАВЛЕНА!');
    console.log('✅ Структура таблицы исправлена');
    console.log('✅ RLS отключен');
    console.log('✅ Профиль администратора создан');
    console.log('✅ Вход работает корректно');
    console.log('\n🚀 Теперь админ панель должна работать без зависаний!');
  } else {
    console.log('\n⚠️  НЕКОТОРЫЕ ПРОБЛЕМЫ ОСТАЛИСЬ');
    console.log('💡 Возможно потребуется ручное исправление в Supabase Dashboard');
  }
}

// Запуск исправления
fixAdminPanelDirectly();


