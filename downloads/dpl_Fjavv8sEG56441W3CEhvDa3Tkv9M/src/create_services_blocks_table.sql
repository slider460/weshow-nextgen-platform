-- Создание таблицы для блоков услуг на главной странице
CREATE TABLE IF NOT EXISTS services_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Monitor',
  color VARCHAR(50) NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  link VARCHAR(255) NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_services_blocks_sort_order ON services_blocks(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_blocks_visible ON services_blocks(is_visible);

-- Вставка начальных данных
INSERT INTO services_blocks (title, description, icon, color, link, features, is_visible, sort_order) VALUES
('Мультимедийные решения', 'Интерактивные дисплеи, видеостены и проекционные системы для вашего бизнеса', 'Monitor', 'from-blue-500 to-cyan-500', 'multimedia', ARRAY['LED-видеостены', 'Интерактивные панели', 'Проекционные системы'], true, 1),
('Разработка ПО и игр', 'Создание современных приложений, игр и интерактивных решений', 'Smartphone', 'from-purple-500 to-pink-500', 'development', ARRAY['Мобильные приложения', 'Интерактивные игры', 'AR/VR решения'], true, 2),
('Техническое сопровождение', 'Полная поддержка и обслуживание всех установленных систем', 'Users', 'from-green-500 to-emerald-500', 'technical-support', ARRAY['24/7 мониторинг', 'Профилактика', 'Экстренная поддержка'], true, 3),
('Интеграция мультимедии', 'Объединение различных систем в единую экосистему', 'Settings', 'from-orange-500 to-red-500', 'complex-solutions', ARRAY['Системная интеграция', 'Автоматизация', 'Управление контентом'], true, 4),
('Брендинг мероприятий', 'Создание уникального визуального образа для ваших событий', 'Palette', 'from-indigo-500 to-purple-500', 'design', ARRAY['Визуальная идентичность', 'Интерактивные элементы', 'Цифровые решения'], true, 5),
('Аренда оборудования', 'Временное использование профессионального мультимедийного оборудования', 'Zap', 'from-yellow-500 to-orange-500', 'equipment-rental', ARRAY['Гибкие условия', 'Техподдержка', 'Быстрая доставка'], true, 6)
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
DROP TRIGGER IF EXISTS update_services_blocks_updated_at ON services_blocks;
CREATE TRIGGER update_services_blocks_updated_at
    BEFORE UPDATE ON services_blocks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Включение RLS (Row Level Security)
ALTER TABLE services_blocks ENABLE ROW LEVEL SECURITY;

-- Создание политик RLS для анонимного доступа (только чтение)
CREATE POLICY "Allow anonymous read access" ON services_blocks
    FOR SELECT USING (true);

-- Создание политик RLS для аутентифицированных пользователей (полный доступ)
CREATE POLICY "Allow authenticated full access" ON services_blocks
    FOR ALL USING (auth.role() = 'authenticated');

-- Сообщение об успешном создании
SELECT 'Таблица services_blocks успешно создана!' as status;
