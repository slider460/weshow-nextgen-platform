-- ===============================================
-- ПРОВЕРКА RLS ДЛЯ ТАБЛИЦЫ EQUIPMENT_CATALOG
-- ===============================================

-- 1. Проверяем включен ли RLS для таблицы equipment_catalog
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'equipment_catalog';

-- 2. Проверяем политики безопасности для таблицы equipment_catalog
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'equipment_catalog';

-- 3. Проверяем доступ к данным через анонимного пользователя
SELECT COUNT(*) as total_records FROM equipment_catalog;

-- 4. Проверяем первые записи
SELECT id, name, description FROM equipment_catalog LIMIT 5;

-- 5. Если RLS включен, отключаем его
ALTER TABLE equipment_catalog DISABLE ROW LEVEL SECURITY;

-- 6. Удаляем все политики безопасности (если есть)
DROP POLICY IF EXISTS "Enable read access for all users" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Allow public read access" ON equipment_catalog;
DROP POLICY IF EXISTS "Allow anonymous read access" ON equipment_catalog;

-- 7. Проверяем результат после отключения RLS
SELECT 
    'RLS отключен' as status,
    COUNT(*) as total_records 
FROM equipment_catalog;

-- 8. Показываем все записи
SELECT id, name, description, created_at FROM equipment_catalog ORDER BY created_at DESC LIMIT 10;
