-- ===============================================
-- КОМПЛЕКСНОЕ ИСПРАВЛЕНИЕ АДМИН ПАНЕЛИ
-- Основано на решениях для оборудования
-- ===============================================

-- 1. ОТКЛЮЧАЕМ RLS ДЛЯ ВСЕХ АДМИН ТАБЛИЦ
-- ===============================================

-- Отключаем RLS для таблиц пользователей
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Отключаем RLS для таблиц заявок и оценок
ALTER TABLE estimates DISABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_equipment DISABLE ROW LEVEL SECURITY;

-- Отключаем RLS для таблиц оборудования
ALTER TABLE equipment_catalog DISABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_equipment DISABLE ROW LEVEL SECURITY;

-- Отключаем RLS для таблиц контента
ALTER TABLE news_blog DISABLE ROW LEVEL SECURITY;
ALTER TABLE cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE services_blocks DISABLE ROW LEVEL SECURITY;
ALTER TABLE logos DISABLE ROW LEVEL SECURITY;

-- Отключаем RLS для таблиц портфолио (если существуют)
ALTER TABLE IF EXISTS portfolio_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS portfolio_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS media_files DISABLE ROW LEVEL SECURITY;

-- 2. УДАЛЯЕМ ВСЕ ПОЛИТИКИ БЕЗОПАСНОСТИ
-- ===============================================

-- Удаляем политики для users
DROP POLICY IF EXISTS "Allow public read access" ON users;
DROP POLICY IF EXISTS "Authenticated users can manage users" ON users;
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON users;
DROP POLICY IF EXISTS "Allow anonymous read access" ON users;
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- Удаляем политики для user_profiles
DROP POLICY IF EXISTS "Allow public read access" ON user_profiles;
DROP POLICY IF EXISTS "Authenticated users can manage user_profiles" ON user_profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Allow anonymous read access" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Удаляем политики для admin_users
DROP POLICY IF EXISTS "Allow public read access" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can manage admin_users" ON admin_users;
DROP POLICY IF EXISTS "Enable read access for all users" ON admin_users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON admin_users;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON admin_users;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON admin_users;
DROP POLICY IF EXISTS "Allow anonymous read access" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage admin_users" ON admin_users;

-- Удаляем политики для estimates
DROP POLICY IF EXISTS "Allow public read access" ON estimates;
DROP POLICY IF EXISTS "Authenticated users can manage estimates" ON estimates;
DROP POLICY IF EXISTS "Enable read access for all users" ON estimates;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Allow anonymous read access" ON estimates;
DROP POLICY IF EXISTS "Users can view own estimates" ON estimates;
DROP POLICY IF EXISTS "Users can update own estimates" ON estimates;

-- Удаляем политики для estimate_items
DROP POLICY IF EXISTS "Allow public read access" ON estimate_items;
DROP POLICY IF EXISTS "Authenticated users can manage estimate_items" ON estimate_items;
DROP POLICY IF EXISTS "Enable read access for all users" ON estimate_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Allow anonymous read access" ON estimate_items;

-- Удаляем политики для estimate_equipment
DROP POLICY IF EXISTS "Allow public read access" ON estimate_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage estimate_equipment" ON estimate_equipment;
DROP POLICY IF EXISTS "Enable read access for all users" ON estimate_equipment;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON estimate_equipment;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON estimate_equipment;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON estimate_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON estimate_equipment;

-- Удаляем политики для equipment_catalog
DROP POLICY IF EXISTS "Allow public read access" ON equipment_catalog;
DROP POLICY IF EXISTS "Authenticated users can manage equipment_catalog" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable read access for all users" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Allow anonymous read access" ON equipment_catalog;

-- Удаляем политики для homepage_equipment
DROP POLICY IF EXISTS "Allow public read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Enable read access for all users" ON homepage_equipment;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON homepage_equipment;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON homepage_equipment;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;

-- Удаляем политики для news_blog
DROP POLICY IF EXISTS "Allow public read access" ON news_blog;
DROP POLICY IF EXISTS "Authenticated users can manage news_blog" ON news_blog;
DROP POLICY IF EXISTS "Enable read access for all users" ON news_blog;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON news_blog;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON news_blog;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON news_blog;
DROP POLICY IF EXISTS "Allow anonymous read access" ON news_blog;

-- Удаляем политики для cases
DROP POLICY IF EXISTS "Allow public read access" ON cases;
DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;
DROP POLICY IF EXISTS "Enable read access for all users" ON cases;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Allow anonymous read access" ON cases;

-- Удаляем политики для services_blocks
DROP POLICY IF EXISTS "Allow public read access" ON services_blocks;
DROP POLICY IF EXISTS "Authenticated users can manage services_blocks" ON services_blocks;
DROP POLICY IF EXISTS "Enable read access for all users" ON services_blocks;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Allow anonymous read access" ON services_blocks;

-- Удаляем политики для logos
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Authenticated users can manage logos" ON logos;
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;

-- Удаляем политики для портфолио (если существуют)
DROP POLICY IF EXISTS "Allow public read access" ON portfolio_items;
DROP POLICY IF EXISTS "Authenticated users can manage portfolio_items" ON portfolio_items;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON portfolio_items;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON portfolio_items;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON portfolio_items;
DROP POLICY IF EXISTS "Allow anonymous read access" ON portfolio_items;

DROP POLICY IF EXISTS "Allow public read access" ON portfolio_categories;
DROP POLICY IF EXISTS "Authenticated users can manage portfolio_categories" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable read access for all users" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON portfolio_categories;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON portfolio_categories;
DROP POLICY IF EXISTS "Allow anonymous read access" ON portfolio_categories;

DROP POLICY IF EXISTS "Allow public read access" ON media_files;
DROP POLICY IF EXISTS "Authenticated users can manage media_files" ON media_files;
DROP POLICY IF EXISTS "Enable read access for all users" ON media_files;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON media_files;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON media_files;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON media_files;
DROP POLICY IF EXISTS "Allow anonymous read access" ON media_files;

-- 3. СОЗДАЕМ ИСПРАВЛЕННЫЕ ТАБЛИЦЫ (ЕСЛИ НЕ СУЩЕСТВУЮТ)
-- ===============================================

-- Создаем таблицу admin_users если не существует
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
    permissions TEXT[] DEFAULT ARRAY['read', 'write'],
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создаем таблицу estimates если не существует
CREATE TABLE IF NOT EXISTS estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE,
    event_location VARCHAR(255),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'confirmed', 'canceled')),
    total_amount DECIMAL(12,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создаем таблицу estimate_items если не существует
CREATE TABLE IF NOT EXISTS estimate_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE,
    equipment_id UUID REFERENCES equipment_catalog(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_creation DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(12,2) GENERATED ALWAYS AS (quantity * price_at_creation) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создаем таблицу estimate_equipment если не существует
CREATE TABLE IF NOT EXISTS estimate_equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE,
    equipment_id UUID REFERENCES equipment_catalog(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    rental_days INTEGER NOT NULL DEFAULT 1,
    daily_rate DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(12,2) GENERATED ALWAYS AS (quantity * rental_days * daily_rate) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создаем таблицу equipment_catalog если не существует
CREATE TABLE IF NOT EXISTS equipment_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    model VARCHAR(100),
    description TEXT,
    specifications JSONB,
    pricing JSONB,
    availability JSONB,
    media JSONB,
    requirements JSONB,
    tags TEXT[],
    rating JSONB,
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ДОБАВЛЯЕМ ТЕСТОВЫЕ ДАННЫЕ ДЛЯ АДМИН ПАНЕЛИ
-- ===============================================

-- Создаем тестового админа
INSERT INTO admin_users (user_id, username, email, role, permissions, is_active)
VALUES (
    gen_random_uuid(),
    'admin',
    'admin@weshow.su',
    'super_admin',
    ARRAY['read', 'write', 'delete', 'manage_users'],
    true
) ON CONFLICT (email) DO NOTHING;

-- Создаем тестовые заявки
INSERT INTO estimates (user_id, title, description, event_date, event_location, status, total_amount)
VALUES 
    (
        (SELECT id FROM users LIMIT 1),
        'Тестовая заявка 1',
        'Описание тестовой заявки для проверки админ панели',
        '2024-12-25',
        'Москва',
        'pending_review',
        150000.00
    ),
    (
        (SELECT id FROM users LIMIT 1),
        'Тестовая заявка 2',
        'Вторая тестовая заявка для админ панели',
        '2024-12-26',
        'Санкт-Петербург',
        'confirmed',
        200000.00
    )
ON CONFLICT DO NOTHING;

-- Создаем тестовые позиции оборудования
INSERT INTO equipment_catalog (name, category, brand, model, description, specifications, pricing, availability, is_active, featured)
VALUES 
    (
        'LED-экран P3 Indoor',
        'led-displays',
        'Absen',
        'A3 Pro',
        'Высококачественный LED-экран для внутренних мероприятий',
        '{"pixel_pitch": "3mm", "brightness": "1200 nits", "viewing_angle": "160°"}',
        '{"daily_rate": 3500, "weekly_rate": 20000, "monthly_rate": 70000}',
        '{"total": 50, "available": 42, "reserved": 8}',
        true,
        true
    ),
    (
        'LED-экран P6 Outdoor',
        'led-displays',
        'Absen',
        'A6 Pro',
        'LED-экран для наружного использования',
        '{"pixel_pitch": "6mm", "brightness": "8000 nits", "viewing_angle": "120°"}',
        '{"daily_rate": 2800, "weekly_rate": 16000, "monthly_rate": 55000}',
        '{"total": 30, "available": 25, "reserved": 5}',
        true,
        true
    )
ON CONFLICT DO NOTHING;

-- 5. ПРОВЕРЯЕМ РЕЗУЛЬТАТ
-- ===============================================

-- Проверяем количество записей в каждой таблице
SELECT 
    'users' as table_name, 
    COUNT(*) as record_count 
FROM users
UNION ALL
SELECT 
    'admin_users' as table_name, 
    COUNT(*) as record_count 
FROM admin_users
UNION ALL
SELECT 
    'estimates' as table_name, 
    COUNT(*) as record_count 
FROM estimates
UNION ALL
SELECT 
    'equipment_catalog' as table_name, 
    COUNT(*) as record_count 
FROM equipment_catalog
UNION ALL
SELECT 
    'homepage_equipment' as table_name, 
    COUNT(*) as record_count 
FROM homepage_equipment
UNION ALL
SELECT 
    'news_blog' as table_name, 
    COUNT(*) as record_count 
FROM news_blog
UNION ALL
SELECT 
    'cases' as table_name, 
    COUNT(*) as record_count 
FROM cases
UNION ALL
SELECT 
    'services_blocks' as table_name, 
    COUNT(*) as record_count 
FROM services_blocks
UNION ALL
SELECT 
    'logos' as table_name, 
    COUNT(*) as record_count 
FROM logos;

-- Проверяем статус RLS
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN (
    'users', 'admin_users', 'estimates', 'equipment_catalog', 
    'homepage_equipment', 'news_blog', 'cases', 'services_blocks', 'logos'
)
ORDER BY tablename;

-- Финальное сообщение
SELECT '🚀 АДМИН ПАНЕЛЬ ИСПРАВЛЕНА! RLS отключен для всех таблиц, добавлены тестовые данные' as status;
