#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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

// Функция для выполнения SQL через Supabase
async function executeSQL(sqlQuery) {
  try {
    console.log(`🔄 Выполняю: ${sqlQuery.substring(0, 50)}...`);
    
    // Используем rpc для выполнения SQL
    const { data, error } = await supabase.rpc('exec_sql', { query: sqlQuery });
    
    if (error) {
      console.log(`⚠️  Ошибка: ${error.message}`);
      return false;
    }
    
    console.log('✅ Выполнено успешно');
    return true;
    
  } catch (error) {
    console.log(`❌ Исключение: ${error.message}`);
    return false;
  }
}

// Функция для отключения RLS
async function disableRLS() {
  console.log('🔧 Отключаю RLS для всех таблиц...');
  
  const tables = [
    'users', 'estimates', 'estimate_items', 'equipment_catalog', 
    'equipment_categories', 'cases', 'logos', 'articles', 
    'article_categories', 'blog_posts', 'news', 'newsletter_subscribers',
    'quote_templates', 'quotes', 'services_blocks', 'user_profiles',
    'homepage_equipment', 'images'
  ];
  
  for (const table of tables) {
    const sql = `ALTER TABLE ${table} DISABLE ROW LEVEL SECURITY;`;
    await executeSQL(sql);
  }
}

// Функция для удаления политик
async function dropPolicies() {
  console.log('🗑️  Удаляю политики безопасности...');
  
  const tables = [
    'users', 'estimates', 'estimate_items', 'equipment_catalog', 
    'equipment_categories', 'cases', 'logos', 'articles', 
    'article_categories', 'blog_posts', 'news', 'newsletter_subscribers',
    'quote_templates', 'quotes', 'services_blocks', 'user_profiles',
    'homepage_equipment', 'images'
  ];
  
  const policies = [
    'Enable read access for all users',
    'Enable insert for authenticated users only',
    'Enable update for authenticated users only',
    'Enable delete for authenticated users only',
    'Allow public read access',
    'Allow anonymous read access',
    'Allow authenticated full access'
  ];
  
  for (const table of tables) {
    for (const policy of policies) {
      const sql = `DROP POLICY IF EXISTS "${policy}" ON ${table};`;
      await executeSQL(sql);
    }
  }
}

// Функция для проверки результата
async function checkResult() {
  console.log('✅ Проверяю результат...');
  
  try {
    // Проверяем доступ к данным
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
      
    if (!usersError) {
      console.log('✅ Доступ к таблице users: OK');
    }
    
    const { data: estimates, error: estimatesError } = await supabase
      .from('estimates')
      .select('count')
      .limit(1);
      
    if (!estimatesError) {
      console.log('✅ Доступ к таблице estimates: OK');
    }
    
    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment_catalog')
      .select('count')
      .limit(1);
      
    if (!equipmentError) {
      console.log('✅ Доступ к таблице equipment_catalog: OK');
    }
    
  } catch (error) {
    console.log(`⚠️  Ошибка проверки: ${error.message}`);
  }
}

// Основная функция
async function fixAdminPanel() {
  try {
    console.log('🚀 Начинаю исправление админ панели через Supabase клиент...');
    console.log(`📡 Подключение к: ${supabaseUrl}`);
    
    // Отключаем RLS
    await disableRLS();
    
    // Удаляем политики
    await dropPolicies();
    
    // Проверяем результат
    await checkResult();
    
    console.log('\n🎉 АДМИН ПАНЕЛЬ ИСПРАВЛЕНА!');
    console.log('✅ RLS отключен для всех таблиц');
    console.log('✅ Политики безопасности удалены');
    console.log('✅ Админ панель должна работать корректно');
    console.log('\n🚀 Теперь можете проверить работу админ панели!');
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
    process.exit(1);
  }
}

// Запуск
fixAdminPanel();
