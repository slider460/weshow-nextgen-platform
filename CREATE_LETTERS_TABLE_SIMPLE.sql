-- Простое создание таблицы letters_certificates
-- Выполните этот код в Supabase SQL Editor

-- 1. Создаем таблицу
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

-- 2. Включаем RLS
ALTER TABLE letters_certificates ENABLE ROW LEVEL SECURITY;

-- 3. Создаем политики безопасности
CREATE POLICY "Anyone can view visible letters and certificates" 
ON letters_certificates FOR SELECT 
USING (is_visible = true);

CREATE POLICY "Service role can manage letters and certificates" 
ON letters_certificates FOR ALL 
USING (true);

-- 4. Добавляем тестовые данные
INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4);

-- 5. Создаем функцию для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Создаем триггер
DROP TRIGGER IF EXISTS update_letters_certificates_updated_at ON letters_certificates;
CREATE TRIGGER update_letters_certificates_updated_at
  BEFORE UPDATE ON letters_certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Готово! Таблица создана с тестовыми данными
