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

// Функция для диагностики проблемы с профилем
async function diagnoseProfileIssue() {
  console.log('🔍 Диагностирую проблему с профилем...');
  
  try {
    // 1. Получаем пользователя admin@weshow.ru
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', 'admin@weshow.ru');
      
    if (usersError) {
      console.log(`❌ Ошибка получения пользователей: ${usersError.message}`);
      return;
    }
    
    console.log(`✅ Найдено пользователей: ${users?.length || 0}`);
    
    if (!users || users.length === 0) {
      console.log('❌ Пользователь admin@weshow.ru не найден');
      return;
    }
    
    const adminUser = users[0];
    console.log(`✅ Админ пользователь: ${adminUser.email} (ID: ${adminUser.id})`);
    
    // 2. Проверяем профиль по id (как сейчас в коде)
    console.log('\n🔍 Проверяю профиль по id (текущий способ):');
    const { data: profileById, error: profileByIdError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', adminUser.id)
      .maybeSingle();
      
    if (profileByIdError) {
      console.log(`❌ Ошибка поиска по id: ${profileByIdError.message}`);
    } else if (profileById) {
      console.log(`✅ Профиль найден по id: ${profileById.full_name}`);
    } else {
      console.log(`❌ Профиль НЕ найден по id`);
    }
    
    // 3. Проверяем профиль по user_id (правильный способ)
    console.log('\n🔍 Проверяю профиль по user_id (правильный способ):');
    const { data: profileByUserId, error: profileByUserIdError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', adminUser.id)
      .maybeSingle();
      
    if (profileByUserIdError) {
      console.log(`❌ Ошибка поиска по user_id: ${profileByUserIdError.message}`);
    } else if (profileByUserId) {
      console.log(`✅ Профиль найден по user_id: ${profileByUserId.full_name}`);
    } else {
      console.log(`❌ Профиль НЕ найден по user_id`);
    }
    
    // 4. Показываем все профили для диагностики
    console.log('\n📋 Все профили в user_profiles:');
    const { data: allProfiles, error: allProfilesError } = await supabase
      .from('user_profiles')
      .select('*');
      
    if (allProfilesError) {
      console.log(`❌ Ошибка получения всех профилей: ${allProfilesError.message}`);
    } else {
      console.log(`✅ Всего профилей: ${allProfiles?.length || 0}`);
      allProfiles?.forEach((profile, index) => {
        console.log(`   ${index + 1}. ID: ${profile.id}, User ID: ${profile.user_id}, Name: ${profile.full_name}, Role: ${profile.role}`);
      });
    }
    
    return {
      adminUser,
      profileById: !!profileById,
      profileByUserId: !!profileByUserId
    };
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return null;
  }
}

// Функция для исправления профиля
async function fixProfileLookup(adminUser) {
  console.log('\n🔧 Исправляю профиль для правильного поиска...');
  
  try {
    // Обновляем профиль так, чтобы id совпадал с user_id
    const { data: updatedProfile, error: updateError } = await supabase
      .from('user_profiles')
      .update({ 
        id: adminUser.id,  // Устанавливаем id равным user_id
        user_id: adminUser.id,
        full_name: 'Администратор',
        role: 'admin'
      })
      .eq('user_id', adminUser.id)
      .select()
      .single();
      
    if (updateError) {
      console.log(`❌ Ошибка обновления профиля: ${updateError.message}`);
      return false;
    } else {
      console.log(`✅ Профиль обновлен: ${updatedProfile.full_name}`);
      return true;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для тестирования исправления
async function testFix(adminUser) {
  console.log('\n🧪 Тестирую исправление...');
  
  try {
    // Тестируем поиск профиля по id (как в AuthContext)
    const { data: testProfile, error: testError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', adminUser.id)
      .maybeSingle();
      
    if (testError) {
      console.log(`❌ Ошибка теста: ${testError.message}`);
      return false;
    } else if (testProfile) {
      console.log(`✅ Тест успешен: профиль найден по id`);
      console.log(`   Имя: ${testProfile.full_name}`);
      console.log(`   Роль: ${testProfile.role}`);
      return true;
    } else {
      console.log(`❌ Тест не прошел: профиль не найден по id`);
      return false;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка теста: ${error.message}`);
    return false;
  }
}

// Основная функция исправления
async function fixAuthProfileLookup() {
  console.log('🚀 ИСПРАВЛЕНИЕ ПОИСКА ПРОФИЛЯ В АВТОРИЗАЦИИ...\n');
  
  const diagnosis = await diagnoseProfileIssue();
  
  if (!diagnosis) {
    console.log('❌ Диагностика не удалась');
    return;
  }
  
  if (!diagnosis.profileById) {
    console.log('\n🔧 Профиль не найден по id, исправляю...');
    const fixed = await fixProfileLookup(diagnosis.adminUser);
    
    if (fixed) {
      const testPassed = await testFix(diagnosis.adminUser);
      
      if (testPassed) {
        console.log('\n🎉 ПРОБЛЕМА ИСПРАВЛЕНА!');
        console.log('✅ Профиль теперь найден по id');
        console.log('✅ Авторизация в админ панели должна работать');
        console.log('✅ Кейсы должны отображаться');
        console.log('\n🚀 Обновите страницу админ панели и попробуйте снова!');
      } else {
        console.log('\n⚠️  Исправление не помогло');
      }
    } else {
      console.log('\n❌ Не удалось исправить профиль');
    }
  } else {
    console.log('\n✅ Профиль уже найден по id, проблема в другом месте');
  }
}

// Запуск исправления
fixAuthProfileLookup();


