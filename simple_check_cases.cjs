const { createClient } = require('@supabase/supabase-js');

// Конфигурация Supabase
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

// Создаем клиент с правами администратора
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkCasesDatabase() {
  console.log('🔍 Проверяем базу данных кейсов...\n');

  try {
    // 1. Прямая проверка таблицы cases
    console.log('1. Проверяем таблицу cases...');
    
    const { data: cases, error: casesError } = await supabase
      .from('cases')
      .select('*')
      .limit(1);

    if (casesError) {
      console.log('❌ Таблица cases не существует или недоступна:', casesError.message);
      
      if (casesError.message.includes('relation "public.cases" does not exist')) {
        console.log('\n📝 Создаем таблицу cases...');
        
        // Создаем таблицу через REST API
        const createTableResponse = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'apikey': SUPABASE_SERVICE_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sql: `
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
            `
          })
        });

        if (createTableResponse.ok) {
          console.log('✅ Таблица cases создана');
        } else {
          const errorText = await createTableResponse.text();
          console.log('❌ Ошибка создания таблицы:', errorText);
        }
      }
    } else {
      console.log('✅ Таблица cases существует');
      console.log('📊 Количество записей:', cases.length);
    }

    // 2. Проверяем данные в таблице
    console.log('\n2. Проверяем данные в таблице...');
    
    const { data: allCases, error: allCasesError } = await supabase
      .from('cases')
      .select('*')
      .order('sort_order', { ascending: true });

    if (allCasesError) {
      console.error('❌ Ошибка при получении кейсов:', allCasesError);
      return;
    }

    console.log('📊 Общее количество кейсов:', allCases.length);
    
    if (allCases.length === 0) {
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
      allCases.forEach((caseItem, index) => {
        console.log(`${index + 1}. ${caseItem.title} (${caseItem.year})`);
        console.log(`   Клиент: ${caseItem.client}`);
        console.log(`   Видимый: ${caseItem.is_visible ? 'Да' : 'Нет'}`);
        console.log(`   Порядок: ${caseItem.sort_order}`);
        console.log('');
      });
    }

    // 3. Проверяем видимые кейсы (как в хуке useCases)
    console.log('3. Проверяем видимые кейсы...');
    
    const { data: visibleCases, error: visibleError } = await supabase
      .from('cases')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (visibleError) {
      console.error('❌ Ошибка при получении видимых кейсов:', visibleError);
    } else {
      console.log('✅ Видимых кейсов:', visibleCases.length);
      
      if (visibleCases.length > 0) {
        console.log('\n📋 Видимые кейсы:');
        visibleCases.forEach((caseItem, index) => {
          console.log(`${index + 1}. ${caseItem.title}`);
          console.log(`   ID: ${caseItem.id}`);
          console.log(`   Клиент: ${caseItem.client}`);
          console.log(`   Год: ${caseItem.year}`);
          console.log(`   Порядок: ${caseItem.sort_order}`);
          console.log('');
        });
      }
    }

    // 4. Тестируем REST API (как в хуке useCases)
    console.log('4. Тестируем REST API...');
    
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
    
    const url = `${SUPABASE_URL}/rest/v1/cases?select=*&is_visible=eq.true&order=sort_order.asc`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const restData = await response.json();
      console.log('✅ REST API работает, получено кейсов:', restData.length);
    } else {
      const errorText = await response.text();
      console.log('❌ REST API ошибка:', response.status, errorText);
    }

    console.log('\n🎉 Проверка завершена!');

  } catch (error) {
    console.error('❌ Общая ошибка:', error);
  }
}

// Запускаем проверку
checkCasesDatabase();









