-- =============================================================================
-- ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦ
-- =============================================================================

-- Проверяем структуру таблицы equipment_catalog
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'equipment_catalog' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Проверяем структуру таблицы equipment_categories
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'equipment_categories' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Проверяем структуру таблицы articles
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'articles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Проверяем структуру таблицы estimates
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'estimates' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Проверяем структуру таблицы users
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Проверяем все существующие таблицы
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;




