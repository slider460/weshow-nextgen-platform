-- Создание таблиц для WeShow

-- 1. Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  company_name VARCHAR(255),
  phone_number VARCHAR(50),
  role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('client', 'manager', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Категории оборудования
CREATE TABLE IF NOT EXISTS equipment_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Каталог оборудования
CREATE TABLE IF NOT EXISTS equipment_catalog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  specifications JSONB,
  main_image_url VARCHAR(500),
  price_per_day DECIMAL(10,2),
  category_id UUID REFERENCES equipment_categories(id) ON DELETE SET NULL,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Сметы/заявки
CREATE TABLE IF NOT EXISTS estimates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'confirmed', 'canceled')),
  event_date DATE,
  client_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Позиции в смете
CREATE TABLE IF NOT EXISTS estimate_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE,
  equipment_id UUID REFERENCES equipment_catalog(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_creation DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Категории статей
CREATE TABLE IF NOT EXISTS article_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Статьи/блог
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  preview_text TEXT,
  cover_image_url VARCHAR(500),
  category_id UUID REFERENCES article_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views_count INTEGER DEFAULT 0
);

-- Создание индексов для производительности
CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment_catalog(category_id);
CREATE INDEX IF NOT EXISTS idx_estimates_user ON estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_estimates_status ON estimates(status);
CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate ON estimate_items(estimate_id);
CREATE INDEX IF NOT EXISTS idx_estimate_items_equipment ON estimate_items(equipment_id);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);

-- Включение RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Политики RLS для анонимного доступа (публичные данные)
CREATE POLICY "Public read access for equipment_categories" ON equipment_categories FOR SELECT USING (true);
CREATE POLICY "Public read access for equipment_catalog" ON equipment_catalog FOR SELECT USING (true);
CREATE POLICY "Public read access for articles" ON articles FOR SELECT USING (true);
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

-- Политики для админов и менеджеров
CREATE POLICY "Admins can do everything" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage equipment" ON equipment_catalog FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage estimates" ON estimates FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage estimate items" ON estimate_items FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage articles" ON articles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Admins can manage article categories" ON article_categories FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_equipment_catalog_updated_at BEFORE UPDATE ON equipment_catalog FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_estimates_updated_at BEFORE UPDATE ON estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
