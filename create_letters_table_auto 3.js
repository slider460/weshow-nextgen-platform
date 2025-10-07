#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { exec } = require('child_process');

const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createLettersTable() {
  try {
    console.log('🔧 Проверяю существование таблицы letters_certificates...');
    
    // Проверяем, существует ли таблица
    const { data: existingData, error: checkError } = await supabaseAdmin
      .from('letters_certificates')
      .select('id')
      .limit(1);

    if (checkError) {
      if (checkError.message.includes('relation') && checkError.message.includes('does not exist')) {
        console.log('📋 Таблица не существует. Создаю автоматически...');
        
        // SQL код для создания таблицы
        const createSQL = `-- Создание таблицы letters_certificates
CREATE TABLE IF NOT EXISTS letters_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  document_url TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('letter', 'certificate', 'award', 'diploma')),
  issuer VARCHAR(255) NOT NULL,
  issued_date DATE,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS
ALTER TABLE letters_certificates ENABLE ROW LEVEL SECURITY;

-- Политики безопасности
CREATE POLICY "Anyone can view visible letters and certificates" ON letters_certificates
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Admins can manage letters and certificates" ON letters_certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Тестовые данные
INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4);`;

        // Сохраняем SQL в файл
        const fs = require('fs');
        fs.writeFileSync('CREATE_LETTERS_TABLE.sql', createSQL);
        console.log('✅ SQL код сохранен в файл CREATE_LETTERS_TABLE.sql');
        
        // Открываем Supabase Dashboard
        const dashboardUrl = 'https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql';
        console.log('🌐 Открываю Supabase Dashboard...');
        
        // Открываем браузер (работает на macOS, Windows, Linux)
        const openCommand = process.platform === 'darwin' ? 'open' : 
                           process.platform === 'win32' ? 'start' : 'xdg-open';
        
        exec(`${openCommand} "${dashboardUrl}"`, (error) => {
          if (error) {
            console.log('⚠️ Не удалось открыть браузер автоматически');
            console.log('🌐 Откройте вручную:', dashboardUrl);
          } else {
            console.log('✅ Supabase Dashboard открыт в браузере');
          }
        });
        
        console.log('\n📋 Инструкция:');
        console.log('1. Скопируйте содержимое файла CREATE_LETTERS_TABLE.sql');
        console.log('2. Вставьте в SQL Editor в Supabase Dashboard');
        console.log('3. Нажмите "Run" для выполнения');
        console.log('4. После создания таблицы вернитесь сюда');
        
        // Ждем 5 секунд и проверяем снова
        setTimeout(async () => {
          console.log('\n⏳ Проверяю создание таблицы...');
          await checkTableAfterCreation();
        }, 5000);
        
      } else {
        throw checkError;
      }
    } else {
      console.log('✅ Таблица letters_certificates уже существует');
      await addTestData();
    }

  } catch (error) {
    console.log('❌ Ошибка:', error.message);
  }
}

async function checkTableAfterCreation() {
  try {
    const { data, error } = await supabaseAdmin
      .from('letters_certificates')
      .select('id')
      .limit(1);

    if (error) {
      console.log('⏳ Таблица еще не создана. Попробуйте еще раз через несколько секунд...');
    } else {
      console.log('✅ Таблица letters_certificates успешно создана!');
      await addTestData();
    }
  } catch (error) {
    console.log('⏳ Таблица еще не создана. Попробуйте еще раз через несколько секунд...');
  }
}

async function addTestData() {
  try {
    console.log('🔧 Добавляю тестовые данные...');
    
    const testData = [
      {
        title: 'Благодарственное письмо от Газпром',
        description: 'За качественное выполнение мультимедийного проекта',
        type: 'letter',
        issuer: 'ПАО Газпром',
        issued_date: '2024-01-15',
        sort_order: 1
      },
      {
        title: 'Сертификат качества',
        description: 'Сертификат соответствия международным стандартам',
        type: 'certificate',
        issuer: 'ISO International',
        issued_date: '2024-02-20',
        sort_order: 2
      },
      {
        title: 'Диплом за инновации',
        description: 'Диплом за внедрение инновационных решений в мультимедиа',
        type: 'diploma',
        issuer: 'Российская ассоциация мультимедиа',
        issued_date: '2024-03-10',
        sort_order: 3
      },
      {
        title: 'Награда за лучший проект',
        description: 'Награда за лучший мультимедийный проект года',
        type: 'award',
        issuer: 'Московская ассоциация дизайнеров',
        issued_date: '2024-04-05',
        sort_order: 4
      }
    ];

    const { data, error } = await supabaseAdmin
      .from('letters_certificates')
      .insert(testData);

    if (error) {
      console.log('⚠️ Ошибка при добавлении тестовых данных:', error.message);
    } else {
      console.log('✅ Тестовые данные добавлены успешно!');
      console.log('🎉 Таблица letters_certificates готова к работе!');
    }
  } catch (error) {
    console.log('⚠️ Ошибка при добавлении данных:', error.message);
  }
}

// Запускаем создание таблицы
createLettersTable();
