-- СРОЧНОЕ ИСПРАВЛЕНИЕ RLS ДЛЯ АДМИН ПАНЕЛИ
-- Выполните этот скрипт в Supabase SQL Editor для исправления зависания загрузки

-- ==============================================
-- 1. ИСПРАВЛЕНИЕ ТАБЛИЦЫ HOMEPAGE_EQUIPMENT
-- ==============================================

-- Удаляем проблемные политики
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;

-- Создаем правильные политики
CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (auth.uid() IS NOT NULL);

-- ==============================================
-- 2. ИСПРАВЛЕНИЕ ТАБЛИЦЫ LOGOS
-- ==============================================

-- Удаляем все существующие политики
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Authenticated users can manage logos" ON logos;

-- Создаем правильные политики
CREATE POLICY "Allow public read access" ON logos
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage logos" ON logos
    FOR ALL USING (auth.uid() IS NOT NULL);

-- ==============================================
-- 3. ИСПРАВЛЕНИЕ ТАБЛИЦЫ CASES
-- ==============================================

-- Удаляем существующие политики
DROP POLICY IF EXISTS "Enable read access for all users" ON cases;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Public read access for cases" ON cases;
DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;

-- Создаем новые политики
CREATE POLICY "Public read access for cases" ON cases
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage cases" ON cases
    FOR ALL USING (auth.uid() IS NOT NULL);

-- ==============================================
-- 4. ИСПРАВЛЕНИЕ ТАБЛИЦЫ NEWS_BLOG
-- ==============================================

-- Удаляем существующие политики
DROP POLICY IF EXISTS "Enable read access for all users" ON news_blog;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON news_blog;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON news_blog;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON news_blog;
DROP POLICY IF EXISTS "Public read access for news_blog" ON news_blog;
DROP POLICY IF EXISTS "Authenticated users can manage news_blog" ON news_blog;

-- Создаем новые политики
CREATE POLICY "Public read access for news_blog" ON news_blog
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage news_blog" ON news_blog
    FOR ALL USING (auth.uid() IS NOT NULL);

-- ==============================================
-- 5. ИСПРАВЛЕНИЕ ТАБЛИЦЫ SERVICES_BLOCKS
-- ==============================================

-- Удаляем существующие политики
DROP POLICY IF EXISTS "Enable read access for all users" ON services_blocks;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Public read access for services_blocks" ON services_blocks;
DROP POLICY IF EXISTS "Authenticated users can manage services_blocks" ON services_blocks;

-- Создаем новые политики
CREATE POLICY "Public read access for services_blocks" ON services_blocks
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage services_blocks" ON services_blocks
    FOR ALL USING (auth.uid() IS NOT NULL);

-- ==============================================
-- 6. ПРОВЕРКА РЕЗУЛЬТАТА
-- ==============================================

-- Проверяем статус RLS для всех таблиц
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('homepage_equipment', 'logos', 'cases', 'news_blog', 'services_blocks')
ORDER BY tablename;

-- Проверяем политики для всех таблиц
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN ('homepage_equipment', 'logos', 'cases', 'news_blog', 'services_blocks')
ORDER BY tablename, policyname;

-- Сообщение об успешном исправлении
SELECT 'RLS политики для админ панели исправлены! Загрузка должна работать!' as status;
