-- ЭКСТРЕННОЕ ИСПРАВЛЕНИЕ ДЛЯ ПОРТА 8085
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- БЫСТРОЕ ИСПРАВЛЕНИЕ RLS ПОЛИТИК
-- ==============================================

-- 1. LOGOS - Логотипы (критично для главной страницы)
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Authenticated users can manage logos" ON logos;
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;

CREATE POLICY "Allow public read access" ON logos
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage logos" ON logos
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 2. HOMEPAGE_EQUIPMENT - Блоки оборудования (критично для админ панели)
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;

CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 3. USER_PROFILES - Профили пользователей (критично для входа в админ)
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
-- ПРОВЕРКА РЕЗУЛЬТАТА
-- ==============================================

-- Проверяем количество записей в критических таблицах
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment
UNION ALL
SELECT 'user_profiles' as table_name, COUNT(*) as record_count FROM user_profiles;

-- Проверяем политики
SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN ('logos', 'homepage_equipment', 'user_profiles')
ORDER BY tablename, policyname;

-- Финальное сообщение
SELECT '🚀 КРИТИЧЕСКИЕ RLS ПОЛИТИКИ ИСПРАВЛЕНЫ! Сайт на порту 8085 должен работать!' as status;
