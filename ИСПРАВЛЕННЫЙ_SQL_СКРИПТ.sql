-- ИСПРАВЛЕННЫЙ SQL СКРИПТ ДЛЯ СУЩЕСТВУЮЩИХ ТАБЛИЦ
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- ПРОВЕРКА СУЩЕСТВУЮЩИХ ТАБЛИЦ
-- ==============================================

-- Сначала проверим, какие таблицы существуют
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ==============================================
-- ИСПРАВЛЕНИЕ RLS ПОЛИТИК ДЛЯ СУЩЕСТВУЮЩИХ ТАБЛИЦ
-- ==============================================

-- 1. HOMEPAGE_EQUIPMENT - Блоки оборудования
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;

CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 2. LOGOS - Логотипы партнеров
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Authenticated users can manage logos" ON logos;
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;

CREATE POLICY "Allow public read access" ON logos
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage logos" ON logos
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 3. CASES - Кейсы и проекты
DROP POLICY IF EXISTS "Public read access for cases" ON cases;
DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;
DROP POLICY IF EXISTS "Enable read access for all users" ON cases;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON cases;

CREATE POLICY "Public read access for cases" ON cases
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage cases" ON cases
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 4. SERVICES_BLOCKS - Блоки услуг
DROP POLICY IF EXISTS "Public read access for services_blocks" ON services_blocks;
DROP POLICY IF EXISTS "Authenticated users can manage services_blocks" ON services_blocks;
DROP POLICY IF EXISTS "Enable read access for all users" ON services_blocks;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON services_blocks;

CREATE POLICY "Public read access for services_blocks" ON services_blocks
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage services_blocks" ON services_blocks
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 5. USER_PROFILES - Профили пользователей
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Authenticated users can insert profiles" ON user_profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON user_profiles;

CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Authenticated users can insert profiles" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ==============================================
-- ПРОВЕРКА РЕЗУЛЬТАТА ДЛЯ СУЩЕСТВУЮЩИХ ТАБЛИЦ
-- ==============================================

-- Проверяем статус RLS для существующих таблиц
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('homepage_equipment', 'logos', 'cases', 'services_blocks', 'user_profiles')
ORDER BY tablename;

-- Проверяем политики для существующих таблиц
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN ('homepage_equipment', 'logos', 'cases', 'services_blocks', 'user_profiles')
ORDER BY tablename, policyname;

-- Проверяем количество записей в существующих таблицах
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment
UNION ALL
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'cases' as table_name, COUNT(*) as record_count FROM cases
UNION ALL
SELECT 'services_blocks' as table_name, COUNT(*) as record_count FROM services_blocks
UNION ALL
SELECT 'user_profiles' as table_name, COUNT(*) as record_count FROM user_profiles;

-- Финальное сообщение
SELECT '🚀 RLS ПОЛИТИКИ ДЛЯ СУЩЕСТВУЮЩИХ ТАБЛИЦ ИСПРАВЛЕНЫ! Сайт должен работать стабильно!' as status;
