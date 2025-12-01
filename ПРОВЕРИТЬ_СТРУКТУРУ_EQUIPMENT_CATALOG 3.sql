-- ===============================================
-- ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ EQUIPMENT_CATALOG
-- ===============================================

-- 1. Получаем все колонки таблицы equipment_catalog
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'equipment_catalog'
ORDER BY ordinal_position;

-- 2. Проверяем существующие данные
SELECT COUNT(*) as total_records FROM equipment_catalog;

-- 3. Показываем пример существующих записей
SELECT * FROM equipment_catalog LIMIT 3;

-- 4. Проверяем структуру связанной таблицы equipment_categories
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'equipment_categories'
ORDER BY ordinal_position;

-- 5. Показываем категории оборудования
SELECT * FROM equipment_categories LIMIT 5;
