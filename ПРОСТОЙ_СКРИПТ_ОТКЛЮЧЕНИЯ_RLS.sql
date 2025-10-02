-- ПРОСТОЙ СКРИПТ ОТКЛЮЧЕНИЯ RLS - ВЫПОЛНИТЕ ЭТОТ КОД
-- Выполните в Supabase SQL Editor

-- Отключаем RLS для всех таблиц
ALTER TABLE logos DISABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_equipment DISABLE ROW LEVEL SECURITY;
ALTER TABLE cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE services_blocks DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики для logos
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Authenticated users can manage logos" ON logos;
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;

-- Удаляем все политики для homepage_equipment
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;

-- Проверяем результат
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment;

SELECT '🚀 RLS ОТКЛЮЧЕН! Теперь обновите страницы (F5)' as status;
