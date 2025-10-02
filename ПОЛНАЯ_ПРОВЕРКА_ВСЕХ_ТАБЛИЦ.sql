-- ПОЛНАЯ ПРОВЕРКА ВСЕХ ТАБЛИЦ И ИХ ДАННЫХ
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- 1. ПРОВЕРКА ВСЕХ СУЩЕСТВУЮЩИХ ТАБЛИЦ
-- ==============================================

SELECT 
    table_name,
    CASE 
        WHEN table_name IN ('logos', 'homepage_equipment', 'cases', 'services_blocks', 'user_profiles') 
        THEN '✅ Используется в приложении'
        ELSE '⚠️ Не используется'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ==============================================
-- 2. ПРОВЕРКА RLS СТАТУСА ДЛЯ ВСЕХ ТАБЛИЦ
-- ==============================================

SELECT 
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity = true THEN '❌ ВКЛЮЧЕН (блокирует доступ!)'
        ELSE '✅ ОТКЛЮЧЕН (доступ свободный)'
    END as status
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ==============================================
-- 3. ПРОВЕРКА ПОЛИТИК БЕЗОПАСНОСТИ
-- ==============================================

SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ==============================================
-- 4. ПРОВЕРКА СТРУКТУРЫ КРИТИЧЕСКИХ ТАБЛИЦ
-- ==============================================

-- Структура logos
SELECT 'logos' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'logos'
ORDER BY ordinal_position;

-- Структура homepage_equipment
SELECT 'homepage_equipment' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'homepage_equipment'
ORDER BY ordinal_position;

-- Структура cases
SELECT 'cases' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'cases'
ORDER BY ordinal_position;

-- Структура services_blocks
SELECT 'services_blocks' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'services_blocks'
ORDER BY ordinal_position;

-- Структура user_profiles
SELECT 'user_profiles' as table_name, column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'user_profiles'
ORDER BY ordinal_position;

-- ==============================================
-- 5. ПРОВЕРКА ДАННЫХ ВО ВСЕХ ТАБЛИЦАХ
-- ==============================================

-- Количество записей в каждой таблице
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
SELECT 'articles' as table_name, COUNT(*) as record_count FROM articles;

-- ==============================================
-- 6. ТЕСТ ДОСТУПА К КРИТИЧЕСКИМ ТАБЛИЦАМ
-- ==============================================

-- Тест logos
SELECT 'logos' as table_name, 'Доступ разрешен' as status, COUNT(*) as records
FROM logos
UNION ALL
-- Тест homepage_equipment
SELECT 'homepage_equipment' as table_name, 'Доступ разрешен' as status, COUNT(*) as records
FROM homepage_equipment
UNION ALL
-- Тест cases
SELECT 'cases' as table_name, 'Доступ разрешен' as status, COUNT(*) as records
FROM cases
UNION ALL
-- Тест services_blocks
SELECT 'services_blocks' as table_name, 'Доступ разрешен' as status, COUNT(*) as records
FROM services_blocks
UNION ALL
-- Тест user_profiles
SELECT 'user_profiles' as table_name, 'Доступ разрешен' as status, COUNT(*) as records
FROM user_profiles;

-- ==============================================
-- ФИНАЛЬНАЯ ПРОВЕРКА
-- ==============================================

SELECT 'Проверка всех таблиц завершена. Изучите результаты выше.' as status;
