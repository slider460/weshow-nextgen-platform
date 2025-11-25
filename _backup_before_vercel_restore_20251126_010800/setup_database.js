const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.YourServiceKeyHere'; // Нужен service key

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('🚀 Начинаем настройку базы данных...');
    
    // Читаем SQL файл
    const sqlContent = fs.readFileSync('create_news_blog_tables.sql', 'utf8');
    
    // Разбиваем на отдельные запросы
    const queries = sqlContent
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));
    
    console.log(`📝 Найдено ${queries.length} SQL запросов`);
    
    // Выполняем каждый запрос
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      if (query.trim()) {
        console.log(`⏳ Выполняем запрос ${i + 1}/${queries.length}...`);
        
        try {
          const { data, error } = await supabase.rpc('exec_sql', { sql: query });
          
          if (error) {
            console.error(`❌ Ошибка в запросе ${i + 1}:`, error.message);
            // Продолжаем выполнение других запросов
          } else {
            console.log(`✅ Запрос ${i + 1} выполнен успешно`);
          }
        } catch (err) {
          console.error(`❌ Исключение в запросе ${i + 1}:`, err.message);
        }
      }
    }
    
    console.log('🎉 Настройка базы данных завершена!');
    
  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
  }
}

// Запускаем настройку
setupDatabase();
