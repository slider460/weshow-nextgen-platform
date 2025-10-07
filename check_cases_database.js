const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

// Создаем клиент с правами администратора
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkCasesDatabase() {
  console.log('🔍 Проверяем базу данных кейсов...\n');

  try {
    // 1. Проверяем существование таблицы cases
    console.log('1. Проверяем существование таблицы cases...');
    
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .like('table_name', '%case%');

    if (tablesError) {
      console.error('❌ Ошибка при проверке таблиц:', tablesError);
      return;
    }

    console.log('📋 Найденные таблицы с "case":', tables);
    
    const hasCasesTable = tables.some(table => table.table_name === 'cases');
    console.log('✅ Таблица cases существует:', hasCasesTable);

    if (!hasCasesTable) {
      console.log('\n📝 Создаем таблицу cases...');
      
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS cases (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          client TEXT NOT NULL,
          year TEXT NOT NULL,
          description TEXT,
          results TEXT[],
          technologies TEXT[],
          image_url TEXT,
          video_url TEXT,
          is_visible BOOLEAN DEFAULT true,
          sort_order INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: createTableSQL
      });

      if (createError) {
        console.error('❌ Ошибка создания таблицы:', createError);
        
        // Пробуем через REST API
        console.log('🔄 Пробуем создать через REST API...');
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'apikey': SUPABASE_SERVICE_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sql: createTableSQL })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ REST API ошибка:', response.status, errorText);
        } else {
          console.log('✅ Таблица создана через REST API');
        }
      } else {
        console.log('✅ Таблица создана успешно');
      }
    }

    // 2. Проверяем данные в таблице
    console.log('\n2. Проверяем данные в таблице cases...');
    
    const { data: cases, error: casesError } = await supabase
      .from('cases')
      .select('*')
      .order('sort_order', { ascending: true });

    if (casesError) {
      console.error('❌ Ошибка при получении кейсов:', casesError);
      return;
    }

    console.log('📊 Количество кейсов в базе:', cases.length);
    
    if (cases.length === 0) {
      console.log('\n📝 Добавляем тестовые кейсы...');
      
      const testCases = [
        {
          title: 'Интерактивная выставка "Цифровое будущее"',
          client: 'Технопарк "Сколково"',
          year: '2024',
          description: 'Создание иммерсивного пространства с использованием 3D-проекций, интерактивных стен и VR-зоны для выставки технологий будущего',
          results: ['15,000+ посетителей', '98% положительных отзывов', 'Увеличение времени пребывания на 40%'],
          technologies: ['3D Mapping', 'VR/AR', 'Интерактивные сенсоры', 'Проекционное оборудование'],
          image_url: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
          is_visible: true,
          sort_order: 1
        },
        {
          title: 'Корпоративное мероприятие Samsung',
          client: 'Samsung Electronics',
          year: '2024',
          description: 'Организация масштабного корпоративного события с интерактивными зонами и мультимедийными презентациями',
          results: ['2,500 участников', '15 интерактивных зон', 'Прямая трансляция для 10,000+ зрителей'],
          technologies: ['LED экраны', 'Интерактивные панели', 'Системы звука', 'Световое оформление'],
          image_url: '/lovable-uploads/samsung-event.jpg',
          is_visible: true,
          sort_order: 2
        },
        {
          title: 'Выставка "Нефть и газ"',
          client: 'ООО "Газпром"',
          year: '2023',
          description: 'Создание интерактивного стенда с 3D-визуализацией производственных процессов',
          results: ['50,000+ посетителей', 'Увеличение интереса к стенду на 60%', 'Получение награды "Лучший стенд"'],
          technologies: ['3D визуализация', 'Интерактивные экраны', 'Системы навигации'],
          image_url: '/lovable-uploads/gazprom-stand.jpg',
          is_visible: true,
          sort_order: 3
        }
      ];

      for (const testCase of testCases) {
        const { error: insertError } = await supabase
          .from('cases')
          .insert(testCase);

        if (insertError) {
          console.error('❌ Ошибка добавления кейса:', insertError);
        } else {
          console.log(`✅ Добавлен кейс: ${testCase.title}`);
        }
      }
    } else {
      console.log('\n📋 Существующие кейсы:');
      cases.forEach((caseItem, index) => {
        console.log(`${index + 1}. ${caseItem.title} (${caseItem.year})`);
        console.log(`   Клиент: ${caseItem.client}`);
        console.log(`   Видимый: ${caseItem.is_visible ? 'Да' : 'Нет'}`);
        console.log(`   Порядок: ${caseItem.sort_order}`);
        console.log('');
      });
    }

    // 3. Проверяем RLS политики
    console.log('3. Проверяем RLS политики...');
    
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'cases');

    if (policiesError) {
      console.log('⚠️ Не удалось проверить RLS политики:', policiesError.message);
    } else {
      console.log('🔒 RLS политики для таблицы cases:', policies.length);
      
      if (policies.length === 0) {
        console.log('📝 Создаем RLS политики...');
        
        const rlsSQL = `
          ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
          
          CREATE POLICY "Enable read access for all users" ON cases
            FOR SELECT USING (true);
            
          CREATE POLICY "Enable insert for authenticated users only" ON cases
            FOR INSERT WITH CHECK (auth.role() = 'authenticated');
            
          CREATE POLICY "Enable update for authenticated users only" ON cases
            FOR UPDATE USING (auth.role() = 'authenticated');
            
          CREATE POLICY "Enable delete for authenticated users only" ON cases
            FOR DELETE USING (auth.role() = 'authenticated');
        `;

        const { error: rlsError } = await supabase.rpc('exec_sql', {
          sql: rlsSQL
        });

        if (rlsError) {
          console.error('❌ Ошибка создания RLS политик:', rlsError);
        } else {
          console.log('✅ RLS политики созданы');
        }
      }
    }

    // 4. Финальная проверка
    console.log('\n4. Финальная проверка загрузки кейсов...');
    
    const { data: finalCases, error: finalError } = await supabase
      .from('cases')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (finalError) {
      console.error('❌ Финальная ошибка:', finalError);
    } else {
      console.log('✅ Успешно загружено кейсов:', finalCases.length);
      console.log('🎉 База данных кейсов готова к работе!');
    }

  } catch (error) {
    console.error('❌ Общая ошибка:', error);
  }
}

// Запускаем проверку
checkCasesDatabase();



