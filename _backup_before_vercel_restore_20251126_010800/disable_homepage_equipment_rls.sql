-- ВРЕМЕННОЕ ОТКЛЮЧЕНИЕ RLS ДЛЯ HOMEPAGE_EQUIPMENT
-- Это поможет протестировать функциональность без RLS

-- Отключаем RLS для таблицы homepage_equipment
ALTER TABLE homepage_equipment DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Admins can manage homepage_equipment" ON homepage_equipment;

-- Сообщение об успешном отключении
SELECT 'RLS для homepage_equipment отключен для тестирования!' as status;
