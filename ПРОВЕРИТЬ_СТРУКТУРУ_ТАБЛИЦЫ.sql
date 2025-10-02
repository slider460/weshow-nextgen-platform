-- ===============================================
-- ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ EQUIPMENT_CATALOG
-- ===============================================

-- 1. Проверяем существование таблицы
SELECT 
    'Таблица equipment_catalog' as info,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'equipment_catalog') 
        THEN 'СУЩЕСТВУЕТ' 
        ELSE 'НЕ СУЩЕСТВУЕТ' 
    END as status;

-- 2. Получаем все колонки таблицы
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_name = 'equipment_catalog'
ORDER BY ordinal_position;

-- 3. Проверяем существующие данные (если таблица существует)
SELECT COUNT(*) as total_records FROM equipment_catalog;

-- 4. Показываем пример существующих записей
SELECT * FROM equipment_catalog LIMIT 3;

-- 5. Проверяем все таблицы в схеме public
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
