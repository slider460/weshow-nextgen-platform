-- Создание таблицы для кейсов (проектов)
CREATE TABLE IF NOT EXISTS cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  client VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  image_url TEXT,
  video_url TEXT,
  results TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_cases_sort_order ON cases(sort_order);
CREATE INDEX IF NOT EXISTS idx_cases_visible ON cases(is_visible);
CREATE INDEX IF NOT EXISTS idx_cases_year ON cases(year);

-- Вставка начальных данных
INSERT INTO cases (title, description, client, year, image_url, results, is_visible, sort_order) VALUES
('Мультимедийная инсталляция для банка ВТБ', 'Комплексное оснащение головного офиса интерактивными LED-панелями и системами управления', 'ВТБ', 2024, '/images/cases/vtb-2024.jpg', 'Повышение эффективности презентаций на 40%, улучшение клиентского опыта', true, 1),
('3D-маппинг для корпоративного мероприятия Сбербанка', 'Проекционный маппинг для презентации новых технологических решений на конференции', 'Сбербанк', 2024, '/images/cases/sberbank-2024.jpg', 'Успешная презентация инноваций, положительные отзывы участников', true, 2),
('Стенд Самарской области на выставке-форуме «Россия»', 'Интерактивный мультимедийный стенд с цифровыми решениями для представления региона', 'ВДНХ', 2024, '/images/cases/vdnh-2024.jpg', 'Привлечение внимания к региону, новые партнерские связи', true, 3)
ON CONFLICT DO NOTHING;

-- Создание функции для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггера для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_cases_updated_at ON cases;
CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Включение RLS (Row Level Security)
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики (если есть)
DROP POLICY IF EXISTS "Allow anonymous read access" ON cases;
DROP POLICY IF EXISTS "Allow authenticated full access" ON cases;

-- Создание политик RLS для анонимного доступа (только чтение)
CREATE POLICY "Allow anonymous read access" ON cases
    FOR SELECT USING (true);

-- Создание политик RLS для полного доступа (все могут создавать, обновлять, удалять)
CREATE POLICY "Allow full access" ON cases
    FOR ALL USING (true);

-- Сообщение об успешном создании
SELECT 'Таблица cases успешно создана!' as status;
