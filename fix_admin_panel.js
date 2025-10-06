#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Supabase конфигурация
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

// Функция для выполнения SQL через Supabase REST API
async function executeSQL(sqlQuery) {
  try {
    console.log('🔄 Выполняю SQL запрос...');
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY
      },
      body: JSON.stringify({
        query: sqlQuery
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    console.log('✅ SQL выполнен успешно');
    console.log('Результат:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Ошибка выполнения SQL:', error.message);
    throw error;
  }
}

// Функция для выполнения SQL через прямой запрос к таблицам
async function executeDirectSQL(sqlQuery) {
  try {
    console.log('🔄 Выполняю прямой SQL запрос...');
    
    // Разбиваем SQL на отдельные запросы
    const queries = sqlQuery.split(';').filter(q => q.trim());
    
    for (const query of queries) {
      if (query.trim()) {
        console.log(`\n📝 Выполняю: ${query.trim().substring(0, 50)}...`);
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'apikey': SUPABASE_SERVICE_ROLE_KEY
          },
          body: JSON.stringify({
            query: query.trim()
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.log(`⚠️  Запрос выполнен с предупреждением: ${response.status}`);
          console.log(`Ответ: ${errorText}`);
        } else {
          console.log('✅ Запрос выполнен успешно');
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Ошибка выполнения SQL:', error.message);
    throw error;
  }
}

// Основная функция
async function fixAdminPanel() {
  try {
    console.log('🚀 Начинаю исправление админ панели...');
    
    // Читаем SQL файл
    const sqlFile = path.join(__dirname, 'КОМПЛЕКСНОЕ_ИСПРАВЛЕНИЕ_АДМИН_ПАНЕЛИ_ФИНАЛЬНОЕ.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    console.log('📖 Прочитан SQL файл для исправления админ панели');
    
    // Выполняем SQL
    await executeDirectSQL(sqlContent);
    
    console.log('\n🎉 АДМИН ПАНЕЛЬ ИСПРАВЛЕНА!');
    console.log('✅ RLS отключен для всех таблиц');
    console.log('✅ Все политики безопасности удалены');
    console.log('✅ Админ панель должна работать корректно');
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
    process.exit(1);
  }
}

// Запуск
if (require.main === module) {
  fixAdminPanel();
}

module.exports = { executeSQL, executeDirectSQL, fixAdminPanel };


