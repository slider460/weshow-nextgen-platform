-- ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦ - ВЫПОЛНИТЕ СНАЧАЛА
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ LOGOS
-- ==============================================

-- Проверяем структуру таблицы logos
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'logos'
ORDER BY ordinal_position;

-- ==============================================
-- ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ HOMEPAGE_EQUIPMENT
-- ==============================================

-- Проверяем структуру таблицы homepage_equipment
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'homepage_equipment'
ORDER BY ordinal_position;

-- ==============================================
-- ПРОВЕРКА СУЩЕСТВУЮЩИХ ДАННЫХ
-- ==============================================

-- Проверяем существующие данные в logos
SELECT * FROM logos LIMIT 5;

-- Проверяем существующие данные в homepage_equipment
SELECT * FROM homepage_equipment LIMIT 5;

-- ==============================================
-- ПРОВЕРКА RLS СТАТУСА
-- ==============================================

-- Проверяем статус RLS
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('logos', 'homepage_equipment')
ORDER BY tablename;
