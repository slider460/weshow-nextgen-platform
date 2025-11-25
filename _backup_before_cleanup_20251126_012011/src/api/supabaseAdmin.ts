import { createClient } from '@supabase/supabase-js';

// ⚠️ БЕЗОПАСНОСТЬ: Service Role ключ НЕ ДОЛЖЕН использоваться в клиентском коде!
// Этот файл должен использоваться ТОЛЬКО на backend (Node.js/Edge Functions)
// Для клиентских операций используйте обычный supabase client с RLS

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn('⚠️ ПРЕДУПРЕЖДЕНИЕ: Service Role credentials не найдены. Административные функции недоступны. Это нормально для клиентского приложения.');
}

// Создаем клиент с Service Role для административных операций (ТОЛЬКО для backend!)
export const supabaseAdmin = SUPABASE_SERVICE_KEY ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-admin-client'
    }
  }
}) : null as any;

// Функция для выполнения SQL команд через RPC
export const executeSQL = async (sql: string) => {
  try {
    const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (err) {
    console.error('Ошибка выполнения SQL:', err);
    return { data: null, error: err };
  }
};

// Функция для создания таблицы letters_certificates
export const createLettersCertificatesTable = async () => {
  const sql = `
    -- Создание таблицы letters_certificates
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

    -- Создание индексов
    CREATE INDEX IF NOT EXISTS idx_letters_certificates_type ON letters_certificates(type);
    CREATE INDEX IF NOT EXISTS idx_letters_certificates_visible ON letters_certificates(is_visible);
    CREATE INDEX IF NOT EXISTS idx_letters_certificates_sort ON letters_certificates(sort_order);

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

    -- Функция обновления
    CREATE OR REPLACE FUNCTION update_letters_certificates_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Триггер
    CREATE TRIGGER update_letters_certificates_updated_at
      BEFORE UPDATE ON letters_certificates
      FOR EACH ROW
      EXECUTE FUNCTION update_letters_certificates_updated_at();
  `;

  return await executeSQL(sql);
};

// Функция для добавления тестовых данных
export const addTestLettersData = async () => {
  const sql = `
    INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
    ('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
    ('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
    ('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
    ('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4)
    ON CONFLICT DO NOTHING;
  `;

  return await executeSQL(sql);
};

// Функция для проверки существования таблицы
export const checkTableExists = async (tableName: string) => {
  try {
    // Используем более простой запрос для проверки
    const { data, error } = await supabaseAdmin
      .from(tableName)
      .select('id')
      .limit(1);

    if (error) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        return { exists: false, error: null };
      }
      if (error.message.includes('permission denied')) {
        return { exists: false, error: null };
      }
      throw error;
    }

    return { exists: true, error: null };
  } catch (err) {
    // Если любая ошибка - считаем что таблица не существует
    return { exists: false, error: null };
  }
};

// Функция для создания таблицы через простую вставку данных
export const createTableByInsertingData = async () => {
  try {
    console.log('🔧 Создаю таблицу через вставку тестовых данных...');
    
    // Пробуем вставить данные - если таблица не существует, получим ошибку
    const testData = {
      id: '00000000-0000-0000-0000-000000000001',
      title: 'Тестовое письмо',
      description: 'Тестовое описание',
      type: 'letter',
      issuer: 'Тестовая организация',
      issued_date: '2024-01-01',
      is_visible: true,
      sort_order: 0
    };

    const { data, error } = await supabaseAdmin
      .from('letters_certificates')
      .insert([testData]);

    if (error) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        return { 
          success: false, 
          message: 'Таблица не существует. Создайте её вручную в Supabase Dashboard.' 
        };
      }
      throw error;
    }

    // Если вставка прошла успешно, удаляем тестовую запись
    await supabaseAdmin
      .from('letters_certificates')
      .delete()
      .eq('id', testData.id);

    return { success: true, message: 'Таблица существует и готова к работе' };
  } catch (error) {
    console.error('❌ Ошибка проверки таблицы:', error);
    return { 
      success: false, 
      message: 'Таблица не существует. Создайте её вручную в Supabase Dashboard.' 
    };
  }
};


// Функция для создания таблицы letters_certificates через API
export const createLettersCertificatesTableViaAPI = async () => {
  try {
    console.log('🔧 Создаю таблицу letters_certificates через API...');
    
    const { data, error } = await supabaseAdmin.rpc('create_letters_certificates_table');
    
    if (error) {
      throw error;
    }
    
    return { success: true, message: data.message, data };
  } catch (error) {
    console.error('❌ Ошибка создания таблицы:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    };
  }
};

// Функция для полного создания таблицы с данными
export const setupLettersCertificatesTable = async () => {
  try {
    console.log('🔧 Проверяю существование таблицы letters_certificates...');
    
    // Сначала проверяем, существует ли таблица
    const { data: existingData, error: checkError } = await supabaseAdmin
      .from('letters_certificates')
      .select('id')
      .limit(1);

    if (checkError) {
      if (checkError.message.includes('relation') && checkError.message.includes('does not exist')) {
        console.log('📋 Таблица не существует. Создаю через API...');
        
        // Пробуем создать через API
        const createResult = await createLettersCertificatesTableViaAPI();
        
        if (createResult.success) {
          console.log('✅ Таблица letters_certificates создана через API');
          return { success: true, message: 'Таблица успешно создана через API' };
        } else {
          console.log('❌ Ошибка создания через API:', createResult.message);
          return { 
            success: false, 
            message: 'Не удалось создать таблицу через API. Создайте её вручную в Supabase Dashboard.' 
          };
        }
      } else {
        throw checkError;
      }
    } else {
      console.log('✅ Таблица letters_certificates уже существует');
      return { success: true, message: 'Таблица уже существует и готова к использованию' };
    }

  } catch (error) {
    console.error('❌ Ошибка при проверке таблицы:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    };
  }
};
