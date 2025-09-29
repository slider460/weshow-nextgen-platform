-- Создание таблицы для блоков оборудования на главной странице
CREATE TABLE IF NOT EXISTS homepage_equipment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50) NOT NULL DEFAULT 'Monitor',
  gradient VARCHAR(50) NOT NULL DEFAULT 'gradient-card-purple',
  link VARCHAR(255) NOT NULL DEFAULT '',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_homepage_equipment_sort_order ON homepage_equipment(sort_order);
CREATE INDEX IF NOT EXISTS idx_homepage_equipment_visible ON homepage_equipment(is_visible);

-- Вставка начальных данных
INSERT INTO homepage_equipment (title, description, icon, gradient, link, is_visible, sort_order) VALUES
('Кинетический экран', 'Движущиеся интерактивные поверхности', 'Monitor', 'gradient-card-purple', '/services/kinetic-screen', true, 1),
('Матричный экран', 'Многосегментные LED дисплеи', 'Monitor', 'gradient-card-blue', '/services/matrix-screen', true, 2),
('Прозрачный экран', 'Полупрозрачные дисплеи', 'Eye', 'gradient-card-cyan', '/services/transparent-screen', true, 3),
('Информационные панели', 'Цифровые вывески', 'Monitor', 'gradient-card-dark', '/services/info-panels', true, 4),
('Проектора (от 10000 люмен)', 'Высокояркостная проекция', 'Projector', 'gradient-card-purple', '/services/projectors', true, 5),
('Гибкий неон', 'Эластичная LED подсветка', 'Zap', 'gradient-card-blue', '/services/flexible-neon', true, 6)
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
DROP TRIGGER IF EXISTS update_homepage_equipment_updated_at ON homepage_equipment;
CREATE TRIGGER update_homepage_equipment_updated_at
    BEFORE UPDATE ON homepage_equipment
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Включение RLS (Row Level Security)
ALTER TABLE homepage_equipment ENABLE ROW LEVEL SECURITY;

-- Создание политик RLS для анонимного доступа (только чтение)
CREATE POLICY "Allow anonymous read access" ON homepage_equipment
    FOR SELECT USING (true);

-- Создание политик RLS для аутентифицированных пользователей (полный доступ)
CREATE POLICY "Allow authenticated full access" ON homepage_equipment
    FOR ALL USING (auth.role() = 'authenticated');

-- Сообщение об успешном создании
SELECT 'Таблица homepage_equipment успешно создана!' as status;
