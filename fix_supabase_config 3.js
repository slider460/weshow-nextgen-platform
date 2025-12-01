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

// Функция для получения правильного anon key
async function getCorrectAnonKey() {
  console.log('🔍 Получаю правильный anon key...');
  
  try {
    // Тестируем разные anon keys
    const testKeys = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE', // Текущий
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.Vy7LdF6xJYVhVvQnKqBqJXzJYVhVvQnKqBqJXzJYVhVvQnKqBqJXz', // Тестовый
    ];
    
    for (let i = 0; i < testKeys.length; i++) {
      const key = testKeys[i];
      console.log(`\n🧪 Тестирую ключ ${i + 1}:`);
      
      const testClient = createClient(supabaseUrl, key);
      
      // Тестируем простой запрос
      const { data, error } = await testClient
        .from('cases')
        .select('count')
        .limit(1);
        
      if (error) {
        console.log(`❌ Ключ ${i + 1}: ${error.message}`);
      } else {
        console.log(`✅ Ключ ${i + 1}: работает!`);
        return key;
      }
    }
    
    return null;
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return null;
  }
}

// Функция для тестирования аутентификации с правильным ключом
async function testAuthWithCorrectKey(anonKey) {
  console.log('\n🔐 Тестирую аутентификацию с правильным ключом...');
  
  try {
    const client = createClient(supabaseUrl, anonKey);
    
    // Тестируем аутентификацию
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: 'admin@weshow.ru',
      password: 'password'
    });
    
    if (authError) {
      console.log(`❌ Ошибка аутентификации: ${authError.message}`);
      return false;
    } else {
      console.log(`✅ Аутентификация успешна: ${authData.user?.email}`);
      
      // Тестируем получение кейсов после аутентификации
      const { data: casesData, error: casesError } = await client
        .from('cases')
        .select('*')
        .order('sort_order', { ascending: true });
        
      if (casesError) {
        console.log(`❌ Ошибка получения кейсов: ${casesError.message}`);
        return false;
      } else {
        console.log(`✅ Кейсы получены: ${casesData?.length || 0} записей`);
        return true;
      }
    }
    
  } catch (error) {
    console.log(`💥 Ошибка: ${error.message}`);
    return false;
  }
}

// Функция для исправления конфигурации
async function fixSupabaseConfig() {
  console.log('🚀 ИСПРАВЛЕНИЕ КОНФИГУРАЦИИ SUPABASE...\n');
  
  const correctKey = await getCorrectAnonKey();
  
  if (!correctKey) {
    console.log('❌ Не удалось найти правильный anon key');
    return;
  }
  
  console.log(`\n✅ Найден правильный anon key: ${correctKey.slice(0, 50)}...`);
  
  const authWorks = await testAuthWithCorrectKey(correctKey);
  
  if (authWorks) {
    console.log('\n🎉 ПРОБЛЕМА НАЙДЕНА!');
    console.log('✅ Правильный anon key найден');
    console.log('✅ Аутентификация работает');
    console.log('✅ Кейсы доступны');
    console.log('\n🔧 Нужно обновить конфигурацию в src/config/supabase.ts');
    console.log(`\n📝 Новый anon key: ${correctKey}`);
  } else {
    console.log('\n⚠️  Проблема не только в anon key');
  }
}

// Запуск исправления
fixSupabaseConfig();


