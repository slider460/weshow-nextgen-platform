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

// Функция для проверки статуса RLS
async function checkRLSStatus() {
  console.log('🔍 Проверяю статус RLS для критических таблиц...');
  
  try {
    // Проверяем доступ к таблице users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
      
    if (usersError) {
      console.log(`❌ Ошибка доступа к users: ${usersError.message}`);
    } else {
      console.log(`✅ Доступ к users: OK (${users?.length || 0} записей)`);
    }
    
    // Проверяем доступ к таблице user_profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);
      
    if (profilesError) {
      console.log(`❌ Ошибка доступа к user_profiles: ${profilesError.message}`);
    } else {
      console.log(`✅ Доступ к user_profiles: OK (${profiles?.length || 0} записей)`);
    }
    
  } catch (error) {
    console.log(`💥 Критическая ошибка: ${error.message}`);
  }
}

// Функция для проверки пользователей
async function checkUsers() {
  console.log('\n👥 Проверяю пользователей в системе...');
  
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, created_at')
      .limit(5);
      
    if (error) {
      console.log(`❌ Ошибка получения пользователей: ${error.message}`);
    } else {
      console.log(`✅ Найдено пользователей: ${users?.length || 0}`);
      users?.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} (ID: ${user.id})`);
      });
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Функция для проверки профилей
async function checkProfiles() {
  console.log('\n👤 Проверяю профили пользователей...');
  
  try {
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('id, user_id, full_name, role')
      .limit(5);
      
    if (error) {
      console.log(`❌ Ошибка получения профилей: ${error.message}`);
    } else {
      console.log(`✅ Найдено профилей: ${profiles?.length || 0}`);
      profiles?.forEach((profile, index) => {
        console.log(`   ${index + 1}. ${profile.full_name || 'Без имени'} (Role: ${profile.role || 'Не указана'})`);
      });
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
  }
}

// Функция для тестирования входа
async function testLogin() {
  console.log('\n🔐 Тестирую вход администратора...');
  
  try {
    // Создаем клиент для аутентификации
    const authClient = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data, error } = await authClient.auth.signInWithPassword({
      email: 'admin@weshow.ru',
      password: 'password'
    });
    
    if (error) {
      console.log(`❌ Ошибка входа: ${error.message}`);
    } else {
      console.log(`✅ Вход успешен для: ${data.user?.email}`);
      console.log(`   User ID: ${data.user?.id}`);
      
      // Проверяем доступ к профилю после входа
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', data.user?.id)
        .single();
        
      if (profileError) {
        console.log(`⚠️  Профиль не найден: ${profileError.message}`);
      } else {
        console.log(`✅ Профиль найден: ${profile.full_name || 'Без имени'}`);
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка тестирования входа: ${error.message}`);
  }
}

// Основная функция диагностики
async function diagnoseLoginIssue() {
  console.log('🚀 Диагностика проблемы с зависанием при входе...\n');
  
  await checkRLSStatus();
  await checkUsers();
  await checkProfiles();
  await testLogin();
  
  console.log('\n📋 РЕКОМЕНДАЦИИ:');
  console.log('1. Если есть ошибки доступа - RLS блокирует вход');
  console.log('2. Если пользователи не найдены - нужно создать админа');
  console.log('3. Если профили отсутствуют - нужно создать профили');
  console.log('\n🔧 Для исправления выполните SQL скрипт в Supabase Dashboard');
}

// Запуск диагностики
diagnoseLoginIssue();


