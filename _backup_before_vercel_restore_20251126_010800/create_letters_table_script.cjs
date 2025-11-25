const { createClient } = require('@supabase/supabase-js');

// Создаем клиент Supabase
const supabase = createClient(
  'https://zbykhdjqrtqftfitbvbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'
);

async function createTableAndData() {
  try {
    console.log('🔧 Создаю таблицу letters_certificates...');
    
    // Попробуем создать таблицу через SQL запрос
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'letters_certificates');
    
    if (error) {
      console.log('❌ Ошибка при проверке таблицы:', error.message);
      console.log('');
      console.log('📝 Таблица не существует. Создайте её вручную в Supabase Dashboard:');
      console.log('');
      console.log('1. Откройте https://supabase.com/dashboard');
      console.log('2. Выберите проект zbykhdjqrtqftfitbvbt');
      console.log('3. Перейдите в SQL Editor');
      console.log('4. Выполните SQL из файла СОЗДАНИЕ_ТАБЛИЦЫ_ПИСЕМ_И_ГРАМОТ.md');
      console.log('');
      console.log('🔗 После создания таблицы перейдите на: http://localhost:8083/test-letters-table');
      return;
    }
    
    if (data && data.length > 0) {
      console.log('✅ Таблица letters_certificates уже существует!');
      
      // Проверяем данные
      const { data: letters, error: lettersError } = await supabase
        .from('letters_certificates')
        .select('*')
        .limit(5);
      
      if (lettersError) {
        console.log('❌ Ошибка при загрузке данных:', lettersError.message);
      } else {
        console.log('📊 Найдено записей:', letters?.length || 0);
        if (letters && letters.length > 0) {
          console.log('📋 Примеры записей:');
          letters.forEach((letter, index) => {
            console.log(`${index + 1}. ${letter.title} (${letter.type})`);
          });
        }
      }
    } else {
      console.log('📋 Таблица letters_certificates не найдена.');
      console.log('');
      console.log('🔧 Создайте таблицу в Supabase Dashboard:');
      console.log('');
      console.log('SQL для выполнения:');
      console.log(`
CREATE TABLE letters_certificates (
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

-- Индексы
CREATE INDEX idx_letters_certificates_type ON letters_certificates(type);
CREATE INDEX idx_letters_certificates_visible ON letters_certificates(is_visible);
CREATE INDEX idx_letters_certificates_sort ON letters_certificates(sort_order);

-- RLS
ALTER TABLE letters_certificates ENABLE ROW LEVEL SECURITY;

-- Политики
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

-- Тестовые данные
INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4);
      `);
    }
    
  } catch (err) {
    console.log('❌ Ошибка:', err.message);
  }
}

createTableAndData();
