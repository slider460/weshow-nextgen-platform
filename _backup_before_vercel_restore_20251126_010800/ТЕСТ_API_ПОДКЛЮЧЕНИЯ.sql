-- ===============================================
-- ТЕСТ ПОДКЛЮЧЕНИЯ К API
-- ===============================================

-- 1. Проверяем что данные есть в таблице
SELECT 
    'Данные в таблице' as test,
    COUNT(*) as count,
    MIN(created_at) as first_record,
    MAX(created_at) as last_record
FROM equipment_catalog;

-- 2. Проверяем структуру таблицы
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'equipment_catalog'
ORDER BY ordinal_position;

-- 3. Показываем последние добавленные записи
SELECT 
    id,
    name,
    description,
    created_at
FROM equipment_catalog 
ORDER BY created_at DESC 
LIMIT 10;

-- 4. Проверяем есть ли проблемы с данными
SELECT 
    'Проверка данных' as test,
    COUNT(*) as total,
    COUNT(name) as has_name,
    COUNT(description) as has_description,
    COUNT(CASE WHEN name IS NULL THEN 1 END) as null_names,
    COUNT(CASE WHEN description IS NULL THEN 1 END) as null_descriptions
FROM equipment_catalog;

-- 5. Проверяем доступность через REST API (симуляция)
-- Это должно работать в браузере: 
-- https://zbykhdjqrtqftfitbvbt.supabase.co/rest/v1/equipment_catalog?select=*
