-- Создание таблицы для благодарственных писем и грамот
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

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_letters_certificates_type ON letters_certificates(type);
CREATE INDEX IF NOT EXISTS idx_letters_certificates_visible ON letters_certificates(is_visible);
CREATE INDEX IF NOT EXISTS idx_letters_certificates_sort ON letters_certificates(sort_order);

-- Создание RLS политик
ALTER TABLE letters_certificates ENABLE ROW LEVEL SECURITY;

-- Политика для чтения (все могут читать видимые записи)
CREATE POLICY "Anyone can view visible letters and certificates" ON letters_certificates
  FOR SELECT USING (is_visible = true);

-- Политика для админов (полный доступ)
CREATE POLICY "Admins can manage letters and certificates" ON letters_certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_letters_certificates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_letters_certificates_updated_at
  BEFORE UPDATE ON letters_certificates
  FOR EACH ROW
  EXECUTE FUNCTION update_letters_certificates_updated_at();

-- Вставка тестовых данных
INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4);
