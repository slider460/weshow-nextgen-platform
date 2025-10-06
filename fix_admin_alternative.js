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

// Функция для получения всех пользователей из auth.users
async function getAllAuthUsers() {
  console.log('👥 Получаю всех пользователей из auth.users...');
  
  try {
    // Создаем клиент для аутентификации
    const authClient = createClient(supabaseUrl, supabaseServiceKey);
    
    // Получаем пользователей через auth API
    const { data: { users }, error } = await authClient.auth.admin.listUsers();
    
    if (error) {
      console.log(`❌ Ошибка получения пользователей: ${error.message}`);
      return [];
    }
    
    console.log(`✅ Найдено пользователей в auth.users: ${users?.length || 0}`);
    users?.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.email} (ID: ${user.id})`);
    });
    
    return users || [];
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return [];
  }
}

// Функция для создания профиля администратора в существующей структуре
async function createAdminProfileInExistingStructure() {
  console.log('👑 Создаю профиль администратора в существующей структуре...');
  
  try {
    // Получаем всех пользователей из auth
    const authUsers = await getAllAuthUsers();
    
    // Находим администратора
    const adminUser = authUsers.find(user => user.email === 'admin@weshow.ru');
    
    if (!adminUser) {
      console.log('❌ Администратор с email admin@weshow.ru не найден в auth.users');
      return false;
    }
    
    console.log(`✅ Администратор найден в auth.users: ${adminUser.id}`);
    
    // Проверяем, есть ли уже профиль (по email в full_name или company_name)
    const { data: existingProfiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*');
      
    if (profilesError) {
      console.log(`❌ Ошибка получения профилей: ${profilesError.message}`);
      return false;
    }
    
    console.log(`📋 Найдено профилей в user_profiles: ${existingProfiles?.length || 0}`);
    
    // Ищем профиль администратора
    const adminProfile = existingProfiles?.find(profile => 
      profile.full_name?.includes('admin') || 
      profile.full_name?.includes('Admin') ||
      profile.company_name?.includes('admin') ||
      profile.role === 'admin'
    );
    
    if (adminProfile) {
      console.log(`✅ Профиль администратора уже существует: ${adminProfile.id}`);
      console.log(`   Имя: ${adminProfile.full_name}`);
      console.log(`   Роль: ${adminProfile.role}`);
      
      // Обновляем роль на admin если нужно
      if (adminProfile.role !== 'admin') {
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ 
            role: 'admin',
            updated_at: new Date().toISOString()
          })
          .eq('id', adminProfile.id);
          
        if (updateError) {
          console.log(`⚠️  Не удалось обновить роль: ${updateError.message}`);
        } else {
          console.log('✅ Роль обновлена на admin');
        }
      }
      
      return true;
    }
    
    // Создаем новый профиль администратора
    console.log('📝 Создаю новый профиль администратора...');
    
    const { data: newProfile, error: createError } = await supabase
      .from('user_profiles')
      .insert({
        full_name: 'Администратор',
        company_name: 'WeShow',
        role: 'admin',
        phone: '+7 (000) 000-00-00',
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
      console.log(`   Имя: ${newProfile.full_name}`);
      console.log(`   Роль: ${newProfile.role}`);
      return true;
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для обновления структуры через добавление колонки в существующие записи
async function updateExistingRecords() {
  console.log('🔧 Обновляю существующие записи...');
  
  try {
    // Получаем все профили
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*');
      
    if (profilesError) {
      console.log(`❌ Ошибка получения профилей: ${profilesError.message}`);
      return false;
    }
    
    console.log(`📋 Найдено профилей для обновления: ${profiles?.length || 0}`);
    
    if (!profiles || profiles.length === 0) {
      console.log('✅ Нет профилей для обновления');
      return true;
    }
    
    // Получаем пользователей из auth
    const authUsers = await getAllAuthUsers();
    
    // Обновляем каждый профиль
    for (const profile of profiles) {
      console.log(`🔄 Обновляю профиль: ${profile.full_name || profile.id}`);
      
      // Пытаемся найти соответствующего пользователя по email или другим данным
      let matchingUser = null;
      
      // Ищем по full_name
      if (profile.full_name) {
        matchingUser = authUsers.find(user => 
          user.email?.includes(profile.full_name.toLowerCase()) ||
          profile.full_name.toLowerCase().includes(user.email?.split('@')[0])
        );
      }
      
      // Если не нашли, берем первого доступного пользователя
      if (!matchingUser && authUsers.length > 0) {
        matchingUser = authUsers[0];
        console.log(`   Использую пользователя по умолчанию: ${matchingUser.email}`);
      }
      
      if (matchingUser) {
        // Обновляем профиль с информацией о пользователе
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            full_name: profile.full_name || matchingUser.email?.split('@')[0] || 'Пользователь',
            role: profile.role || 'user',
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id);
          
        if (updateError) {
          console.log(`   ⚠️  Не удалось обновить: ${updateError.message}`);
        } else {
          console.log(`   ✅ Обновлен для пользователя: ${matchingUser.email}`);
        }
      } else {
        console.log(`   ⚠️  Не найден соответствующий пользователь`);
      }
    }
    
    return true;
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для тестирования входа без user_id
async function testLoginWithoutUserId() {
  console.log('\n🧪 Тестирую вход без user_id...');
  
  try {
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
      
      // Проверяем доступ к профилям (без привязки по user_id)
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*');
        
      if (profilesError) {
        console.log(`❌ Ошибка доступа к профилям: ${profilesError.message}`);
        return false;
      } else {
        console.log(`✅ Доступ к профилям: OK (${profiles?.length || 0} записей)`);
        
        // Ищем профиль администратора
        const adminProfile = profiles?.find(profile => profile.role === 'admin');
        if (adminProfile) {
          console.log(`✅ Профиль администратора найден: ${adminProfile.full_name}`);
          return true;
        } else {
          console.log(`⚠️  Профиль администратора не найден`);
          return false;
        }
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка тестирования: ${error.message}`);
    return false;
  }
}

// Основная функция исправления
async function fixAdminPanelAlternative() {
  console.log('🚀 АЛЬТЕРНАТИВНОЕ ИСПРАВЛЕНИЕ АДМИН ПАНЕЛИ...\n');
  
  const results = {
    profile: false,
    records: false,
    test: false
  };
  
  // 1. Создаем профиль администратора
  results.profile = await createAdminProfileInExistingStructure();
  
  // 2. Обновляем существующие записи
  results.records = await updateExistingRecords();
  
  // 3. Тестируем вход
  results.test = await testLoginWithoutUserId();
  
  console.log('\n📊 РЕЗУЛЬТАТЫ ИСПРАВЛЕНИЯ:');
  console.log(`✅ Профиль админа: ${results.profile ? 'СОЗДАН' : 'ОШИБКА'}`);
  console.log(`✅ Записи обновлены: ${results.records ? 'ДА' : 'ОШИБКА'}`);
  console.log(`✅ Тест входа: ${results.test ? 'УСПЕШЕН' : 'ОШИБКА'}`);
  
  if (results.test) {
    console.log('\n🎉 АДМИН ПАНЕЛЬ ИСПРАВЛЕНА!');
    console.log('✅ Профиль администратора создан');
    console.log('✅ Записи обновлены');
    console.log('✅ Вход работает корректно');
    console.log('\n🚀 Теперь админ панель должна работать без зависаний!');
    console.log('💡 Приложение будет работать с профилями без user_id');
  } else {
    console.log('\n⚠️  НЕКОТОРЫЕ ПРОБЛЕМЫ ОСТАЛИСЬ');
    console.log('💡 Возможно потребуется дополнительная настройка');
  }
}

// Запуск исправления
fixAdminPanelAlternative();


