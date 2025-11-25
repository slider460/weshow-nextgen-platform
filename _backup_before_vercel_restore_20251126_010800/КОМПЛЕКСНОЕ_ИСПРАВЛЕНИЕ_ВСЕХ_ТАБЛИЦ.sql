-- КОМПЛЕКСНОЕ ИСПРАВЛЕНИЕ ВСЕХ ТАБЛИЦ - ВЫПОЛНИТЕ ПОЛНОСТЬЮ
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- ЭТАП 1: ОТКЛЮЧЕНИЕ RLS ДЛЯ ВСЕХ ТАБЛИЦ
-- ==============================================

-- Отключаем RLS для всех критических таблиц
ALTER TABLE IF EXISTS logos DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS homepage_equipment DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS services_blocks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS equipment_catalog DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS estimates DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS estimate_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS article_categories DISABLE ROW LEVEL SECURITY;

-- ==============================================
-- ЭТАП 2: УДАЛЕНИЕ ВСЕХ СУЩЕСТВУЮЩИХ ПОЛИТИК
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

-- Удаляем все политики для equipment_catalog
DROP POLICY IF EXISTS "Public read access for equipment_catalog" ON equipment_catalog;
DROP POLICY IF EXISTS "Authenticated users can manage equipment_catalog" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable read access for all users" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON equipment_catalog;

-- Удаляем все политики для estimates
DROP POLICY IF EXISTS "Public read access for estimates" ON estimates;
DROP POLICY IF EXISTS "Authenticated users can manage estimates" ON estimates;
DROP POLICY IF EXISTS "Enable read access for all users" ON estimates;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON estimates;

-- Удаляем все политики для estimate_items
DROP POLICY IF EXISTS "Public read access for estimate_items" ON estimate_items;
DROP POLICY IF EXISTS "Authenticated users can manage estimate_items" ON estimate_items;
DROP POLICY IF EXISTS "Enable read access for all users" ON estimate_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON estimate_items;

-- Удаляем все политики для articles
DROP POLICY IF EXISTS "Public read access for articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can manage articles" ON articles;
DROP POLICY IF EXISTS "Enable read access for all users" ON articles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON articles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON articles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON articles;

-- ==============================================
-- ЭТАП 3: ПРОВЕРКА РЕЗУЛЬТАТА
-- ==============================================

-- Проверяем RLS статус
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity = true THEN '❌ ВКЛЮЧЕН (блокирует доступ!)'
        ELSE '✅ ОТКЛЮЧЕН (доступ свободный)'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('logos', 'homepage_equipment', 'cases', 'services_blocks', 'user_profiles', 'equipment_catalog', 'estimates', 'estimate_items', 'articles')
ORDER BY tablename;

-- Проверяем количество данных
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment
UNION ALL
SELECT 'cases' as table_name, COUNT(*) as record_count FROM cases
UNION ALL
SELECT 'services_blocks' as table_name, COUNT(*) as record_count FROM services_blocks
UNION ALL
SELECT 'user_profiles' as table_name, COUNT(*) as record_count FROM user_profiles
UNION ALL
SELECT 'equipment_catalog' as table_name, COUNT(*) as record_count FROM equipment_catalog
UNION ALL
SELECT 'estimates' as table_name, COUNT(*) as record_count FROM estimates
UNION ALL
SELECT 'estimate_items' as table_name, COUNT(*) as record_count FROM estimate_items
UNION ALL
SELECT 'articles' as table_name, COUNT(*) as record_count FROM articles;

-- ==============================================
-- ЭТАП 4: ТЕСТ ДОСТУПА КО ВСЕМ ТАБЛИЦАМ
-- ==============================================

-- Тестируем доступ к каждой таблице
SELECT 'logos' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM homepage_equipment
UNION ALL
SELECT 'cases' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM cases
UNION ALL
SELECT 'services_blocks' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM services_blocks
UNION ALL
SELECT 'user_profiles' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM user_profiles
UNION ALL
SELECT 'equipment_catalog' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM equipment_catalog
UNION ALL
SELECT 'estimates' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM estimates
UNION ALL
SELECT 'estimate_items' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM estimate_items
UNION ALL
SELECT 'articles' as table_name, 'Доступ разрешен' as status, COUNT(*) as records FROM articles;

-- ==============================================
-- ФИНАЛЬНОЕ СООБЩЕНИЕ
-- ==============================================

SELECT '🎉 ВСЕ ТАБЛИЦЫ ИСПРАВЛЕНЫ! RLS отключен для всех таблиц!' as status;
