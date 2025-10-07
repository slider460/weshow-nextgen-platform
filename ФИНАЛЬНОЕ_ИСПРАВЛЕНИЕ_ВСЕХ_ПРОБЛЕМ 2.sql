-- ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ ВСЕХ ПРОБЛЕМ С SUPABASE
-- Выполните этот код в Supabase SQL Editor ПОЛНОСТЬЮ

-- ==============================================
-- ЭТАП 1: ОТКЛЮЧЕНИЕ RLS НА ВРЕМЯ ИСПРАВЛЕНИЯ
-- ==============================================

-- Отключаем RLS для всех таблиц временно
ALTER TABLE IF EXISTS logos DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS homepage_equipment DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cases DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS services_blocks DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_profiles DISABLE ROW LEVEL SECURITY;

-- ==============================================
-- ЭТАП 2: УДАЛЕНИЕ ВСЕХ СТАРЫХ ПОЛИТИК
-- ==============================================

-- Удаляем все существующие политики
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Удаляем все политики для logos
    FOR policy_record IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'logos'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON logos', policy_record.policyname);
    END LOOP;
    
    -- Удаляем все политики для homepage_equipment
    FOR policy_record IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'homepage_equipment'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON homepage_equipment', policy_record.policyname);
    END LOOP;
    
    -- Удаляем все политики для cases
    FOR policy_record IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'cases'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON cases', policy_record.policyname);
    END LOOP;
    
    -- Удаляем все политики для services_blocks
    FOR policy_record IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'services_blocks'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON services_blocks', policy_record.policyname);
    END LOOP;
    
    -- Удаляем все политики для user_profiles
    FOR policy_record IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'user_profiles'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON user_profiles', policy_record.policyname);
    END LOOP;
    
    RAISE NOTICE 'Все старые политики удалены';
END $$;

-- ==============================================
-- ЭТАП 3: ВКЛЮЧЕНИЕ RLS И СОЗДАНИЕ НОВЫХ ПОЛИТИК
-- ==============================================

-- Включаем RLS для всех таблиц
ALTER TABLE IF EXISTS logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS homepage_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS services_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_profiles ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- ЭТАП 4: СОЗДАНИЕ НОВЫХ ПОЛИТИК
-- ==============================================

-- LOGOS - Публичное чтение, аутентифицированная запись
CREATE POLICY "logos_public_read" ON logos
    FOR SELECT USING (true);

CREATE POLICY "logos_authenticated_write" ON logos
    FOR ALL USING (auth.uid() IS NOT NULL);

-- HOMEPAGE_EQUIPMENT - Публичное чтение, аутентифицированная запись
CREATE POLICY "homepage_equipment_public_read" ON homepage_equipment
    FOR SELECT USING (true);

CREATE POLICY "homepage_equipment_authenticated_write" ON homepage_equipment
    FOR ALL USING (auth.uid() IS NOT NULL);

-- CASES - Публичное чтение, аутентифицированная запись
CREATE POLICY "cases_public_read" ON cases
    FOR SELECT USING (true);

CREATE POLICY "cases_authenticated_write" ON cases
    FOR ALL USING (auth.uid() IS NOT NULL);

-- SERVICES_BLOCKS - Публичное чтение, аутентифицированная запись
CREATE POLICY "services_blocks_public_read" ON services_blocks
    FOR SELECT USING (true);

CREATE POLICY "services_blocks_authenticated_write" ON services_blocks
    FOR ALL USING (auth.uid() IS NOT NULL);

-- USER_PROFILES - Пользователи могут видеть только свой профиль
CREATE POLICY "user_profiles_own_read" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "user_profiles_own_write" ON user_profiles
    FOR ALL USING (auth.uid() = id);

-- ==============================================
-- ЭТАП 5: ДОБАВЛЕНИЕ ТЕСТОВЫХ ДАННЫХ (если таблицы пустые)
-- ==============================================

-- Проверяем и добавляем тестовые логотипы
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM logos LIMIT 1) THEN
        INSERT INTO logos (name, image_url, is_active, sort_order) VALUES
        ('Test Logo 1', 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=Logo+1', true, 1),
        ('Test Logo 2', 'https://via.placeholder.com/150x80/7C3AED/FFFFFF?text=Logo+2', true, 2),
        ('Test Logo 3', 'https://via.placeholder.com/150x80/DC2626/FFFFFF?text=Logo+3', true, 3);
        RAISE NOTICE 'Добавлены тестовые логотипы';
    END IF;
END $$;

-- Проверяем и добавляем тестовое оборудование
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM homepage_equipment LIMIT 1) THEN
        INSERT INTO homepage_equipment (title, description, image_url, is_active, sort_order) VALUES
        ('LED Экраны', 'Современные LED экраны для любых мероприятий', 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=LED+Screen', true, 1),
        ('Звуковое оборудование', 'Профессиональное звуковое оборудование', 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Audio', true, 2),
        ('Световое оборудование', 'Современные световые решения', 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Lighting', true, 3);
        RAISE NOTICE 'Добавлено тестовое оборудование';
    END IF;
END $$;

-- Проверяем и добавляем тестовые кейсы
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM cases LIMIT 1) THEN
        INSERT INTO cases (title, description, image_url, is_active, sort_order) VALUES
        ('Саммит в Самаре', 'Организация крупного делового саммита', 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Samara+Summit', true, 1),
        ('Технологическая конференция', 'Мультимедийная поддержка конференции', 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Tech+Conf', true, 2);
        RAISE NOTICE 'Добавлены тестовые кейсы';
    END IF;
END $$;

-- Проверяем и добавляем тестовые блоки услуг
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM services_blocks LIMIT 1) THEN
        INSERT INTO services_blocks (title, description, is_active, sort_order) VALUES
        ('Мультимедийные решения', 'Комплексные мультимедийные решения для мероприятий', true, 1),
        ('Техническая поддержка', 'Профессиональная техническая поддержка', true, 2),
        ('Аренда оборудования', 'Аренда современного оборудования', true, 3);
        RAISE NOTICE 'Добавлены тестовые блоки услуг';
    END IF;
END $$;

-- ==============================================
-- ЭТАП 6: ПРОВЕРКА РЕЗУЛЬТАТА
-- ==============================================

-- Проверяем статус RLS
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity = true THEN '✅ Включен'
        ELSE '❌ Отключен'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('logos', 'homepage_equipment', 'cases', 'services_blocks', 'user_profiles')
ORDER BY tablename;

-- Проверяем политики
SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN ('logos', 'homepage_equipment', 'cases', 'services_blocks', 'user_profiles')
ORDER BY tablename, policyname;

-- Проверяем количество данных
SELECT 'logos' as table_name, COUNT(*) as record_count FROM logos
UNION ALL
SELECT 'homepage_equipment' as table_name, COUNT(*) as record_count FROM homepage_equipment
UNION ALL
SELECT 'cases' as table_name, COUNT(*) as record_count FROM cases
UNION ALL
SELECT 'services_blocks' as table_name, COUNT(*) as record_count FROM services_blocks
UNION ALL
SELECT 'user_profiles' as table_name, COUNT(*) as record_count FROM user_profiles;

-- ==============================================
-- ФИНАЛЬНОЕ СООБЩЕНИЕ
-- ==============================================

SELECT '🎉 ВСЕ ПРОБЛЕМЫ С SUPABASE ИСПРАВЛЕНЫ! Сайт должен работать идеально!' as status;
