-- ===============================================
-- КОМПЛЕКСНОЕ ИСПРАВЛЕНИЕ АДМИН ПАНЕЛИ - ФИНАЛЬНОЕ
-- Отключаем RLS для всех таблиц админ панели
-- ===============================================

-- 1. ОТКЛЮЧАЕМ RLS ДЛЯ ВСЕХ ТАБЛИЦ АДМИН ПАНЕЛИ
-- ===============================================

-- Основные таблицы админ панели
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE estimates DISABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_catalog DISABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE logos DISABLE ROW LEVEL SECURITY;
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE quote_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE quotes DISABLE ROW LEVEL SECURITY;
ALTER TABLE services_blocks DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_equipment DISABLE ROW LEVEL SECURITY;
ALTER TABLE images DISABLE ROW LEVEL SECURITY;

-- 2. УДАЛЯЕМ ВСЕ ПОЛИТИКИ БЕЗОПАСНОСТИ
-- ===============================================

-- Политики для users
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON users;
DROP POLICY IF EXISTS "Allow public read access" ON users;
DROP POLICY IF EXISTS "Allow anonymous read access" ON users;
DROP POLICY IF EXISTS "Allow authenticated full access" ON users;

-- Политики для estimates
DROP POLICY IF EXISTS "Enable read access for all users" ON estimates;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON estimates;
DROP POLICY IF EXISTS "Allow public read access" ON estimates;
DROP POLICY IF EXISTS "Allow anonymous read access" ON estimates;
DROP POLICY IF EXISTS "Allow authenticated full access" ON estimates;

-- Политики для estimate_items
DROP POLICY IF EXISTS "Enable read access for all users" ON estimate_items;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON estimate_items;
DROP POLICY IF EXISTS "Allow public read access" ON estimate_items;
DROP POLICY IF EXISTS "Allow anonymous read access" ON estimate_items;
DROP POLICY IF EXISTS "Allow authenticated full access" ON estimate_items;

-- Политики для equipment_catalog
DROP POLICY IF EXISTS "Enable read access for all users" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON equipment_catalog;
DROP POLICY IF EXISTS "Allow public read access" ON equipment_catalog;
DROP POLICY IF EXISTS "Allow anonymous read access" ON equipment_catalog;
DROP POLICY IF EXISTS "Allow authenticated full access" ON equipment_catalog;

-- Политики для equipment_categories
DROP POLICY IF EXISTS "Enable read access for all users" ON equipment_categories;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON equipment_categories;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON equipment_categories;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON equipment_categories;
DROP POLICY IF EXISTS "Allow public read access" ON equipment_categories;
DROP POLICY IF EXISTS "Allow anonymous read access" ON equipment_categories;
DROP POLICY IF EXISTS "Allow authenticated full access" ON equipment_categories;

-- Политики для cases
DROP POLICY IF EXISTS "Enable read access for all users" ON cases;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON cases;
DROP POLICY IF EXISTS "Allow public read access" ON cases;
DROP POLICY IF EXISTS "Allow anonymous read access" ON cases;
DROP POLICY IF EXISTS "Allow authenticated full access" ON cases;

-- Политики для logos
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;
DROP POLICY IF EXISTS "Allow authenticated full access" ON logos;

-- Политики для articles
DROP POLICY IF EXISTS "Enable read access for all users" ON articles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON articles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON articles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON articles;
DROP POLICY IF EXISTS "Allow public read access" ON articles;
DROP POLICY IF EXISTS "Allow anonymous read access" ON articles;
DROP POLICY IF EXISTS "Allow authenticated full access" ON articles;

-- Политики для article_categories
DROP POLICY IF EXISTS "Enable read access for all users" ON article_categories;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON article_categories;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON article_categories;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON article_categories;
DROP POLICY IF EXISTS "Allow public read access" ON article_categories;
DROP POLICY IF EXISTS "Allow anonymous read access" ON article_categories;
DROP POLICY IF EXISTS "Allow authenticated full access" ON article_categories;

-- Политики для blog_posts
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access" ON blog_posts;
DROP POLICY IF EXISTS "Allow anonymous read access" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated full access" ON blog_posts;

-- Политики для news
DROP POLICY IF EXISTS "Enable read access for all users" ON news;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON news;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON news;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON news;
DROP POLICY IF EXISTS "Allow public read access" ON news;
DROP POLICY IF EXISTS "Allow anonymous read access" ON news;
DROP POLICY IF EXISTS "Allow authenticated full access" ON news;

-- Политики для newsletter_subscribers
DROP POLICY IF EXISTS "Enable read access for all users" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public read access" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow anonymous read access" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow authenticated full access" ON newsletter_subscribers;

-- Политики для quote_templates
DROP POLICY IF EXISTS "Enable read access for all users" ON quote_templates;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON quote_templates;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON quote_templates;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON quote_templates;
DROP POLICY IF EXISTS "Allow public read access" ON quote_templates;
DROP POLICY IF EXISTS "Allow anonymous read access" ON quote_templates;
DROP POLICY IF EXISTS "Allow authenticated full access" ON quote_templates;

-- Политики для quotes
DROP POLICY IF EXISTS "Enable read access for all users" ON quotes;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON quotes;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON quotes;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON quotes;
DROP POLICY IF EXISTS "Allow public read access" ON quotes;
DROP POLICY IF EXISTS "Allow anonymous read access" ON quotes;
DROP POLICY IF EXISTS "Allow authenticated full access" ON quotes;

-- Политики для services_blocks
DROP POLICY IF EXISTS "Enable read access for all users" ON services_blocks;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON services_blocks;
DROP POLICY IF EXISTS "Allow public read access" ON services_blocks;
DROP POLICY IF EXISTS "Allow anonymous read access" ON services_blocks;
DROP POLICY IF EXISTS "Allow authenticated full access" ON services_blocks;

-- Политики для user_profiles
DROP POLICY IF EXISTS "Enable read access for all users" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Allow public read access" ON user_profiles;
DROP POLICY IF EXISTS "Allow anonymous read access" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated full access" ON user_profiles;

-- Политики для homepage_equipment
DROP POLICY IF EXISTS "Enable read access for all users" ON homepage_equipment;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON homepage_equipment;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON homepage_equipment;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow public read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;

-- Политики для images
DROP POLICY IF EXISTS "Enable read access for all users" ON images;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON images;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON images;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON images;
DROP POLICY IF EXISTS "Allow public read access" ON images;
DROP POLICY IF EXISTS "Allow anonymous read access" ON images;
DROP POLICY IF EXISTS "Allow authenticated full access" ON images;

-- 3. ПРОВЕРЯЕМ РЕЗУЛЬТАТ
-- ===============================================

-- Проверяем статус RLS для всех таблиц
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN (
        'users', 'estimates', 'estimate_items', 'equipment_catalog', 
        'equipment_categories', 'cases', 'logos', 'articles', 
        'article_categories', 'blog_posts', 'news', 'newsletter_subscribers',
        'quote_templates', 'quotes', 'services_blocks', 'user_profiles',
        'homepage_equipment', 'images'
    )
ORDER BY tablename;

-- Проверяем что политики удалены
SELECT 
    schemaname,
    tablename,
    policyname
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN (
        'users', 'estimates', 'estimate_items', 'equipment_catalog', 
        'equipment_categories', 'cases', 'logos', 'articles', 
        'article_categories', 'blog_posts', 'news', 'newsletter_subscribers',
        'quote_templates', 'quotes', 'services_blocks', 'user_profiles',
        'homepage_equipment', 'images'
    );

-- Тестируем доступ к данным
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'estimates', COUNT(*) FROM estimates
UNION ALL
SELECT 'equipment_catalog', COUNT(*) FROM equipment_catalog
UNION ALL
SELECT 'cases', COUNT(*) FROM cases
UNION ALL
SELECT 'logos', COUNT(*) FROM logos
UNION ALL
SELECT 'articles', COUNT(*) FROM articles
UNION ALL
SELECT 'blog_posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'news', COUNT(*) FROM news
UNION ALL
SELECT 'services_blocks', COUNT(*) FROM services_blocks
UNION ALL
SELECT 'user_profiles', COUNT(*) FROM user_profiles
UNION ALL
SELECT 'homepage_equipment', COUNT(*) FROM homepage_equipment;

-- Финальное сообщение
SELECT '🎉 АДМИН ПАНЕЛЬ ИСПРАВЛЕНА! RLS отключен для всех таблиц' as status;
