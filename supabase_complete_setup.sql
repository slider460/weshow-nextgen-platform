-- =====================================================
-- ПОЛНАЯ НАСТРОЙКА SUPABASE ДЛЯ WESHOW
-- =====================================================

-- 1. СОЗДАНИЕ ТАБЛИЦ
-- =====================================================

-- Пользователи
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  company_name VARCHAR(255),
  phone_number VARCHAR(50),
  role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('client', 'manager', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Категории оборудования
CREATE TABLE IF NOT EXISTS equipment_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Каталог оборудования
CREATE TABLE IF NOT EXISTS equipment_catalog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  specifications JSONB,
  main_image_url VARCHAR(500),
  price_per_day DECIMAL(10,2),
  category_id UUID REFERENCES equipment_categories(id) ON DELETE SET NULL,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Сметы/заявки
CREATE TABLE IF NOT EXISTS estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'confirmed', 'canceled')),
  event_date DATE,
  client_notes TEXT,
  total_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Позиции в смете
CREATE TABLE IF NOT EXISTS estimate_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE,
  equipment_id UUID REFERENCES equipment_catalog(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_creation DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price_at_creation) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Категории статей
CREATE TABLE IF NOT EXISTS article_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Статьи/блог
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  preview_text TEXT,
  cover_image_url VARCHAR(500),
  category_id UUID REFERENCES article_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views_count INTEGER DEFAULT 0
);

-- 2. СОЗДАНИЕ ИНДЕКСОВ
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment_catalog(category_id);
CREATE INDEX IF NOT EXISTS idx_equipment_active ON equipment_catalog(is_active);
CREATE INDEX IF NOT EXISTS idx_estimates_user ON estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_estimates_status ON estimates(status);
CREATE INDEX IF NOT EXISTS idx_estimates_date ON estimates(event_date);
CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate ON estimate_items(estimate_id);
CREATE INDEX IF NOT EXISTS idx_estimate_items_equipment ON estimate_items(equipment_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views_count);

-- 3. ФУНКЦИИ И ТРИГГЕРЫ
-- =====================================================

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Функция для обновления общей суммы сметы
CREATE OR REPLACE FUNCTION update_estimate_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE estimates 
    SET total_amount = (
        SELECT COALESCE(SUM(total_price), 0) 
        FROM estimate_items 
        WHERE estimate_id = COALESCE(NEW.estimate_id, OLD.estimate_id)
    )
    WHERE id = COALESCE(NEW.estimate_id, OLD.estimate_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Триггеры для обновления updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_catalog_updated_at BEFORE UPDATE ON equipment_catalog FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_estimates_updated_at BEFORE UPDATE ON estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Триггеры для обновления общей суммы сметы
CREATE TRIGGER update_estimate_total_on_insert AFTER INSERT ON estimate_items FOR EACH ROW EXECUTE FUNCTION update_estimate_total();
CREATE TRIGGER update_estimate_total_on_update AFTER UPDATE ON estimate_items FOR EACH ROW EXECUTE FUNCTION update_estimate_total();
CREATE TRIGGER update_estimate_total_on_delete AFTER DELETE ON estimate_items FOR EACH ROW EXECUTE FUNCTION update_estimate_total();

-- 4. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Включение RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Политики для публичного доступа (каталог и статьи)
CREATE POLICY "Public read access for equipment_categories" ON equipment_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for equipment_catalog" ON equipment_catalog FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access for articles" ON articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public read access for article_categories" ON article_categories FOR SELECT USING (true);

-- Политики для пользователей (только свои данные)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own estimates" ON estimates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create estimates" ON estimates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own estimates" ON estimates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own estimate items" ON estimate_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM estimates WHERE id = estimate_items.estimate_id AND user_id = auth.uid())
);
CREATE POLICY "Users can create estimate items" ON estimate_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM estimates WHERE id = estimate_items.estimate_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own estimate items" ON estimate_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM estimates WHERE id = estimate_items.estimate_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own estimate items" ON estimate_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM estimates WHERE id = estimate_items.estimate_id AND user_id = auth.uid())
);

-- Политики для админов и менеджеров (полный доступ)
CREATE POLICY "Admins can do everything on users" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage equipment_categories" ON equipment_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage equipment_catalog" ON equipment_catalog FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage estimates" ON estimates FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage estimate_items" ON estimate_items FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage articles" ON articles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage article_categories" ON article_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);

-- 5. ТЕСТОВЫЕ ДАННЫЕ
-- =====================================================

-- Пользователи
INSERT INTO users (id, name, email, role, company_name, phone_number) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Администратор', 'admin@weshow.ru', 'admin', 'WESHOW', '+7 (495) 123-45-67'),
  ('00000000-0000-0000-0000-000000000002', 'Менеджер', 'manager@weshow.ru', 'manager', 'WESHOW', '+7 (495) 123-45-68'),
  ('00000000-0000-0000-0000-000000000003', 'Иван Петров', 'ivan@company.ru', 'client', 'ООО "Технологии"', '+7 (495) 987-65-43'),
  ('00000000-0000-0000-0000-000000000004', 'Мария Сидорова', 'maria@event.ru', 'client', 'Event Agency', '+7 (495) 555-12-34')
ON CONFLICT (email) DO NOTHING;

-- Категории оборудования
INSERT INTO equipment_categories (id, name, slug, description) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Проекционное оборудование', 'projectors', 'Проекторы, экраны, системы отображения'),
  ('10000000-0000-0000-0000-000000000002', 'Звуковое оборудование', 'audio', 'Микрофоны, колонки, микшеры'),
  ('10000000-0000-0000-0000-000000000003', 'Световое оборудование', 'lighting', 'Прожекторы, LED-панели, световые эффекты'),
  ('10000000-0000-0000-0000-000000000004', 'Интерактивные решения', 'interactive', 'Интерактивные панели, сенсорные экраны'),
  ('10000000-0000-0000-0000-000000000005', 'Спецэффекты', 'special-effects', 'Дым, огонь, пиротехника')
ON CONFLICT (slug) DO NOTHING;

-- Оборудование
INSERT INTO equipment_catalog (id, name, description, specifications, price_per_day, category_id, stock_quantity) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Проектор Panasonic PT-RZ970', '4K лазерный проектор для профессиональных презентаций', 
   '{"resolution": "4K UHD", "brightness": "10000 лм", "contrast": "20000:1", "weight": "12 кг"}', 
   15000.00, '10000000-0000-0000-0000-000000000001', 3),
  
  ('20000000-0000-0000-0000-000000000002', 'Экран 300x225 см', 'Натяжной экран для проекций', 
   '{"size": "300x225 см", "material": "PVC", "gain": "1.0", "aspect": "4:3"}', 
   2000.00, '10000000-0000-0000-0000-000000000001', 5),
  
  ('20000000-0000-0000-0000-000000000003', 'Микрофон Shure SM58', 'Вокальный микрофон', 
   '{"type": "динамический", "частотный_диапазон": "50Hz-15kHz", "направленность": "кардиоидная"}', 
   500.00, '10000000-0000-0000-0000-000000000002', 10),
  
  ('20000000-0000-0000-0000-000000000004', 'LED-панель 100x100 см', 'Светодиодная панель для освещения', 
   '{"мощность": "100W", "цветовая_температура": "3000K-6500K", "управление": "DMX"}', 
   3000.00, '10000000-0000-0000-0000-000000000003', 8),
  
  ('20000000-0000-0000-0000-000000000005', 'Интерактивная панель 65"', 'Сенсорная панель для презентаций', 
   '{"размер": "65 дюймов", "разрешение": "4K", "сенсор": "мультитач", "ОС": "Android"}', 
   8000.00, '10000000-0000-0000-0000-000000000004', 2)
ON CONFLICT (id) DO NOTHING;

-- Категории статей
INSERT INTO article_categories (id, name, slug, description) VALUES
  ('30000000-0000-0000-0000-000000000001', 'Кейсы', 'cases', 'Примеры реализованных проектов'),
  ('30000000-0000-0000-0000-000000000002', 'Технологии', 'technology', 'Обзоры нового оборудования'),
  ('30000000-0000-0000-0000-000000000003', 'Советы', 'tips', 'Практические рекомендации')
ON CONFLICT (slug) DO NOTHING;

-- Статьи
INSERT INTO articles (id, title, slug, content, preview_text, category_id, author_id, is_published, views_count) VALUES
  ('40000000-0000-0000-0000-000000000001', 'Проект Samsung Galaxy S24 Launch', 'samsung-galaxy-s24-launch', 
   '<h2>Описание проекта</h2><p>Организация презентации нового смартфона Samsung Galaxy S24 с использованием интерактивных технологий...</p>', 
   'Как мы организовали презентацию Samsung Galaxy S24 с использованием современных мультимедийных технологий', 
   '30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', true, 156),
   
  ('40000000-0000-0000-0000-000000000002', 'Новые тренды в проекционном маппинге', 'projection-mapping-trends', 
   '<h2>Актуальные технологии</h2><p>Обзор последних разработок в области проекционного маппинга...</p>', 
   'Обзор новых технологий и трендов в проекционном маппинге на 2024 год', 
   '30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', true, 89),
   
  ('40000000-0000-0000-0000-000000000003', 'Как выбрать проектор для мероприятия', 'how-to-choose-projector', 
   '<h2>Критерии выбора</h2><p>Подробное руководство по выбору проектора для различных типов мероприятий...</p>', 
   'Практическое руководство по выбору проектора для корпоративных мероприятий', 
   '30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', true, 234)
ON CONFLICT (id) DO NOTHING;

-- Сметы
INSERT INTO estimates (id, user_id, status, event_date, client_notes) VALUES
  ('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 'pending_review', '2024-02-15', 'Корпоративное мероприятие на 100 человек'),
  ('50000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'confirmed', '2024-02-20', 'Презентация продукта с интерактивными элементами'),
  ('50000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'draft', '2024-03-01', 'Конференция по IT-технологиям')
ON CONFLICT (id) DO NOTHING;

-- Позиции в сметах
INSERT INTO estimate_items (estimate_id, equipment_id, quantity, price_at_creation) VALUES
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 2, 15000.00),
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 2, 2000.00),
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 4, 500.00),
  
  ('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005', 1, 8000.00),
  ('50000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000004', 6, 3000.00),
  
  ('50000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 1, 15000.00),
  ('50000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 1, 2000.00);

-- 6. СОЗДАНИЕ ФУНКЦИЙ ДЛЯ API
-- =====================================================

-- Функция для увеличения просмотров статьи
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE articles 
  SET views_count = views_count + 1 
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Функция для получения статистики
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'new_estimates_today', (
      SELECT COUNT(*) FROM estimates 
      WHERE DATE(created_at) = CURRENT_DATE
    ),
    'total_estimates_in_progress', (
      SELECT COUNT(*) FROM estimates 
      WHERE status IN ('pending_review', 'confirmed')
    ),
    'total_equipment', (
      SELECT COUNT(*) FROM equipment_catalog 
      WHERE is_active = true
    ),
    'total_clients', (
      SELECT COUNT(*) FROM users 
      WHERE role = 'client'
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- НАСТРОЙКА ЗАВЕРШЕНА!
-- =====================================================
