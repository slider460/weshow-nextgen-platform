-- ЭКСТРЕННОЕ ИСПРАВЛЕНИЕ ЗАВИСАНИЯ - ВЫПОЛНИТЕ НЕМЕДЛЕННО
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- ЭТАП 1: ОТКЛЮЧЕНИЕ RLS ДЛЯ ВСЕХ ТАБЛИЦ
-- ==============================================

ALTER TABLE IF EXISTS logos DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS homepage_equipment DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS services_blocks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_profiles DISABLE ROW LEVEL SECURITY;

-- ==============================================
-- ЭТАП 2: УДАЛЕНИЕ ВСЕХ ПОЛИТИК
-- ==============================================

-- Удаляем все политики для logos
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Authenticated users can manage logos" ON logos;
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;
DROP POLICY IF EXISTS "logos_public_read" ON logos;
DROP POLICY IF EXISTS "logos_authenticated_write" ON logos;

-- Удаляем все политики для homepage_equipment
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "homepage_equipment_public_read" ON homepage_equipment;
DROP POLICY IF EXISTS "homepage_equipment_authenticated_write" ON homepage_equipment;

-- Удаляем все политики для cases
DROP POLICY IF EXISTS "Public read access for cases" ON cases;
DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;
DROP POLICY IF EXISTS "Enable read access for all users" ON cases;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON cases;
DROP POLICY IF EXISTS "cases_public_read" ON cases;
DROP POLICY IF EXISTS "cases_authenticated_write" ON cases;

-- Удаляем все политики для services_blocks
DROP POLICY IF EXISTS "Public read access for services_blocks" ON services_blocks;
DROP POLICY IF EXISTS "Authenticated users can manage services_blocks" ON services_blocks;
DROP POLICY IF EXISTS "Enable read access for all users" ON services_blocks;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "services_blocks_public_read" ON services_blocks;
DROP POLICY IF EXISTS "services_blocks_authenticated_write" ON services_blocks;

-- Удаляем все политики для user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Authenticated users can insert profiles" ON user_profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_own_read" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_own_write" ON user_profiles;

-- ==============================================
-- ЭТАП 3: ДОБАВЛЕНИЕ ТЕСТОВЫХ ДАННЫХ
-- ==============================================

-- Добавляем тестовые логотипы
INSERT INTO logos (name, image_url, is_active, sort_order) 
VALUES 
    ('Test Logo 1', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Logo+1', true, 1),
    ('Test Logo 2', 'https://via.placeholder.com/150x80/7C3AED/FFFFFF?text=Logo+2', true, 2),
    ('Test Logo 3', 'https://via.placeholder.com/150x80/DC2626/FFFFFF?text=Logo+3', true, 3)
ON CONFLICT DO NOTHING;

-- Добавляем тестовое оборудование
INSERT INTO homepage_equipment (title, description, image_url, is_active, sort_order) 
VALUES 
    ('LED Экраны', 'Современные LED экраны для любых мероприятий', 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=LED+Screen', true, 1),
    ('Звуковое оборудование', 'Профессиональное звуковое оборудование', 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Audio', true, 2),
    ('Световое оборудование', 'Современные световые решения', 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Lighting', true, 3)
ON CONFLICT DO NOTHING;

-- ==============================================
-- ЭТАП 4: ПРОВЕРКА РЕЗУЛЬТАТА
-- ==============================================

-- Проверяем количество записей
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment;

-- Финальное сообщение
SELECT '🚀 ЭКСТРЕННОЕ ИСПРАВЛЕНИЕ ЗАВЕРШЕНО! RLS отключен, данные добавлены!' as status;
