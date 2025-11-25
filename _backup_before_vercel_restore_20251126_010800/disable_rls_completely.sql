-- ПОЛНОЕ ОТКЛЮЧЕНИЕ RLS ДЛЯ ТЕСТИРОВАНИЯ
-- Отключаем RLS для всех таблиц

ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_catalog DISABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE estimates DISABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories DISABLE ROW LEVEL SECURITY;

-- Удаляем ВСЕ политики
DROP POLICY IF EXISTS "Admins can manage users" ON users;
DROP POLICY IF EXISTS "Public read access for equipment" ON equipment_catalog;
DROP POLICY IF EXISTS "Admins can manage equipment" ON equipment_catalog;
DROP POLICY IF EXISTS "Public read access for equipment_categories" ON equipment_categories;
DROP POLICY IF EXISTS "Admins can manage equipment_categories" ON equipment_categories;
DROP POLICY IF EXISTS "Public read access for estimates" ON estimates;
DROP POLICY IF EXISTS "Admins can manage estimates" ON estimates;
DROP POLICY IF EXISTS "Public read access for estimate_items" ON estimate_items;
DROP POLICY IF EXISTS "Admins can manage estimate_items" ON estimate_items;
DROP POLICY IF EXISTS "Public read access for articles" ON articles;
DROP POLICY IF EXISTS "Admins can manage articles" ON articles;
DROP POLICY IF EXISTS "Public read access for article_categories" ON article_categories;
DROP POLICY IF EXISTS "Admins can manage article_categories" ON article_categories;

-- Удаляем все функции
DROP FUNCTION IF EXISTS get_user_role() CASCADE;
DROP FUNCTION IF EXISTS is_manager_or_admin() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS get_dashboard_stats() CASCADE;

-- Сообщение об успешном отключении
SELECT 'RLS полностью отключен для тестирования!' as status;
