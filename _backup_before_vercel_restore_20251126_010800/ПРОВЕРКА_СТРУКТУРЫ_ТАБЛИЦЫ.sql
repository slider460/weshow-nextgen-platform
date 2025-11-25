-- ===============================================
-- ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ EQUIPMENT_CATALOG
-- ===============================================

-- 1. Проверяем существование таблицы
SELECT 
    table_name,
    table_schema
FROM information_schema.tables 
WHERE table_name = 'equipment_catalog';

-- 2. Проверяем структуру таблицы (колонки)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'equipment_catalog'
ORDER BY ordinal_position;

-- 3. Проверяем существующие данные
SELECT COUNT(*) as total_records FROM equipment_catalog;

-- 4. Проверяем первые несколько записей
SELECT * FROM equipment_catalog LIMIT 3;
