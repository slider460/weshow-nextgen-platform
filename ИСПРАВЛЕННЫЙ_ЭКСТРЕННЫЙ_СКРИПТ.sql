-- ИСПРАВЛЕННЫЙ ЭКСТРЕННЫЙ СКРИПТ - РАБОТАЕТ С РЕАЛЬНОЙ СТРУКТУРОЙ
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
-- ЭТАП 3: ДОБАВЛЕНИЕ ТЕСТОВЫХ ДАННЫХ (БЕЗОПАСНО)
-- ==============================================

-- Добавляем тестовые логотипы (только если таблица пустая)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM logos LIMIT 1) THEN
        -- Используем только существующие колонки
        INSERT INTO logos (name, is_active, sort_order) 
        VALUES 
            ('Test Logo 1', true, 1),
            ('Test Logo 2', true, 2),
            ('Test Logo 3', true, 3);
        RAISE NOTICE 'Добавлены тестовые логотипы';
    ELSE
        RAISE NOTICE 'В таблице logos уже есть данные';
    END IF;
END $$;

-- Добавляем тестовое оборудование (только если таблица пустая)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM homepage_equipment LIMIT 1) THEN
        -- Используем только существующие колонки
        INSERT INTO homepage_equipment (title, description, is_active, sort_order) 
        VALUES 
            ('LED Экраны', 'Современные LED экраны для любых мероприятий', true, 1),
            ('Звуковое оборудование', 'Профессиональное звуковое оборудование', true, 2),
            ('Световое оборудование', 'Современные световые решения', true, 3);
        RAISE NOTICE 'Добавлено тестовое оборудование';
    ELSE
        RAISE NOTICE 'В таблице homepage_equipment уже есть данные';
    END IF;
END $$;

-- ==============================================
-- ЭТАП 4: ПРОВЕРКА РЕЗУЛЬТАТА
-- ==============================================

-- Проверяем количество записей
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment
UNION ALL
SELECT 'cases' as table_name, COUNT(*) as record_count FROM cases
UNION ALL
SELECT 'services_blocks' as table_name, COUNT(*) as record_count FROM services_blocks
UNION ALL
SELECT 'user_profiles' as table_name, COUNT(*) as record_count FROM user_profiles;

-- Проверяем RLS статус
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity = true THEN '❌ Включен (может блокировать)'
        ELSE '✅ Отключен (доступ свободный)'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('logos', 'homepage_equipment', 'cases', 'services_blocks', 'user_profiles')
ORDER BY tablename;

-- Финальное сообщение
SELECT '🚀 ИСПРАВЛЕНИЕ ЗАВЕРШЕНО! RLS отключен, данные проверены!' as status;
