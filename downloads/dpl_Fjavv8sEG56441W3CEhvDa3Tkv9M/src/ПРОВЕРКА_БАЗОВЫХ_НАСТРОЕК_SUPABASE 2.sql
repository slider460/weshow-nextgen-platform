-- ПРОВЕРКА БАЗОВЫХ НАСТРОЕК SUPABASE - КРИТИЧНО!
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- 1. ПРОВЕРКА СУЩЕСТВОВАНИЯ ТАБЛИЦ
-- ==============================================

-- Проверяем, какие таблицы вообще существуют
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ==============================================
-- 2. ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ LOGOS
-- ==============================================

-- Проверяем структуру таблицы logos
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'logos'
ORDER BY ordinal_position;

-- ==============================================
-- 3. ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ HOMEPAGE_EQUIPMENT
-- ==============================================

-- Проверяем структуру таблицы homepage_equipment
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'homepage_equipment'
ORDER BY ordinal_position;

-- ==============================================
-- 4. ПРОВЕРКА RLS СТАТУСА
-- ==============================================

-- Проверяем статус RLS для всех таблиц
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity = true THEN 'ВКЛЮЧЕН (блокирует доступ!)'
        ELSE 'ОТКЛЮЧЕН (доступ свободный)'
    END as status
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ==============================================
-- 5. ПРОВЕРКА ПОЛИТИК БЕЗОПАСНОСТИ
-- ==============================================

-- Проверяем все существующие политики
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ==============================================
-- 6. ПРОВЕРКА ДАННЫХ В ТАБЛИЦАХ
-- ==============================================

-- Проверяем количество записей в каждой таблице
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment
UNION ALL
SELECT 'cases' as table_name, COUNT(*) as record_count FROM cases
UNION ALL
SELECT 'services_blocks' as table_name, COUNT(*) as record_count FROM services_blocks
UNION ALL
SELECT 'user_profiles' as table_name, COUNT(*) as record_count FROM user_profiles;

-- ==============================================
-- 7. ТЕСТ ПРОСТОГО ЗАПРОСА
-- ==============================================

-- Тестируем простой запрос к таблице logos
SELECT * FROM logos LIMIT 3;

-- Тестируем простой запрос к таблице homepage_equipment
SELECT * FROM homepage_equipment LIMIT 3;

-- ==============================================
-- ФИНАЛЬНАЯ ПРОВЕРКА
-- ==============================================

SELECT 'Проверка базовых настроек завершена. Изучите результаты выше.' as status;
