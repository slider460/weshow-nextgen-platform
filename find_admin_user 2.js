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

// Функция для поиска админа в разных таблицах
async function findAdminUser() {
  console.log('🔍 Ищу админа в разных таблицах...');
  
  try {
    // 1. Проверяем auth.users (системная таблица Supabase)
    console.log('\n1️⃣ Проверяю auth.users:');
    const { data: authUsers, error: authUsersError } = await supabase.auth.admin.listUsers();
    
    if (authUsersError) {
      console.log(`❌ Ошибка получения auth.users: ${authUsersError.message}`);
    } else {
      console.log(`✅ Найдено пользователей в auth.users: ${authUsers.users?.length || 0}`);
      
      const adminAuthUser = authUsers.users?.find(u => u.email === 'admin@weshow.ru');
      if (adminAuthUser) {
        console.log(`✅ Админ найден в auth.users: ${adminAuthUser.email} (ID: ${adminAuthUser.id})`);
      } else {
        console.log(`❌ Админ НЕ найден в auth.users`);
      }
    }
    
    // 2. Проверяем таблицу users
    console.log('\n2️⃣ Проверяю таблицу users:');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*');
      
    if (usersError) {
      console.log(`❌ Ошибка получения users: ${usersError.message}`);
    } else {
      console.log(`✅ Найдено пользователей в users: ${users?.length || 0}`);
      users?.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email || 'No email'} (ID: ${user.id})`);
      });
      
      const adminUser = users?.find(u => u.email === 'admin@weshow.ru');
      if (adminUser) {
        console.log(`✅ Админ найден в users: ${adminUser.email} (ID: ${adminUser.id})`);
      } else {
        console.log(`❌ Админ НЕ найден в users`);
      }
    }
    
    // 3. Проверяем таблицу user_profiles
    console.log('\n3️⃣ Проверяю таблицу user_profiles:');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*');
      
    if (profilesError) {
      console.log(`❌ Ошибка получения user_profiles: ${profilesError.message}`);
    } else {
      console.log(`✅ Найдено профилей в user_profiles: ${profiles?.length || 0}`);
      profiles?.forEach((profile, index) => {
        console.log(`   ${index + 1}. ID: ${profile.id}, User ID: ${profile.user_id}, Name: ${profile.full_name}, Role: ${profile.role}`);
      });
    }
    
    // 4. Создаем админа если его нет
    if (!authUsers.users?.find(u => u.email === 'admin@weshow.ru')) {
      console.log('\n4️⃣ Создаю админа в auth.users...');
      
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: 'admin@weshow.ru',
        password: 'password',
        email_confirm: true,
        user_metadata: {
          full_name: 'Администратор'
        }
      });
      
      if (createError) {
        console.log(`❌ Ошибка создания админа: ${createError.message}`);
      } else {
        console.log(`✅ Админ создан: ${newUser.user?.email} (ID: ${newUser.user?.id})`);
        
        // Создаем профиль для нового админа
        if (newUser.user?.id) {
          const { data: newProfile, error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: newUser.user.id,
              user_id: newUser.user.id,
              full_name: 'Администратор',
              role: 'admin'
            })
            .select()
            .single();
            
          if (profileError) {
            console.log(`❌ Ошибка создания профиля: ${profileError.message}`);
          } else {
            console.log(`✅ Профиль создан: ${newProfile.full_name}`);
          }
        }
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Функция для тестирования входа
async function testLogin() {
  console.log('\n🧪 Тестирую вход админа...');
  
  try {
    // Создаем обычный клиент для тестирования входа
    const client = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE');
    
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: 'admin@weshow.ru',
      password: 'password'
    });
    
    if (authError) {
      console.log(`❌ Ошибка входа: ${authError.message}`);
      return false;
    } else {
      console.log(`✅ Вход успешен: ${authData.user?.email} (ID: ${authData.user?.id})`);
      
      // Проверяем профиль после входа
      const { data: profile, error: profileError } = await client
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user?.id)
        .maybeSingle();
        
      if (profileError) {
        console.log(`❌ Ошибка получения профиля: ${profileError.message}`);
        return false;
      } else if (profile) {
        console.log(`✅ Профиль найден: ${profile.full_name} (${profile.role})`);
        return true;
      } else {
        console.log(`❌ Профиль не найден`);
        return false;
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка теста: ${error.message}`);
    return false;
  }
}

// Основная функция
async function findAndFixAdmin() {
  console.log('🚀 ПОИСК И ИСПРАВЛЕНИЕ АДМИНА...\n');
  
  await findAdminUser();
  
  const loginWorks = await testLogin();
  
  if (loginWorks) {
    console.log('\n🎉 АДМИН ГОТОВ К РАБОТЕ!');
    console.log('✅ Пользователь создан в auth.users');
    console.log('✅ Профиль создан в user_profiles');
    console.log('✅ Вход работает');
    console.log('✅ Профиль найден');
    console.log('\n🚀 Теперь админ панель должна работать!');
  } else {
    console.log('\n⚠️  Проблемы остались');
  }
}

// Запуск
findAndFixAdmin();


