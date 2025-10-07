-- ИСПРАВЛЕНИЕ RLS ДЛЯ АДМИН ПАНЕЛИ
-- Этот скрипт отключает RLS для всех таблиц, используемых админ панелью

-- Отключаем RLS для homepage_equipment
ALTER TABLE public.homepage_equipment DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для homepage_equipment
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'homepage_equipment'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON public.homepage_equipment;';
        RAISE NOTICE 'Политика RLS удалена: % на таблице homepage_equipment', policy_name;
    END LOOP;
END $$;

-- Отключаем RLS для cases
ALTER TABLE public.cases DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для cases
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'cases'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON public.cases;';
        RAISE NOTICE 'Политика RLS удалена: % на таблице cases', policy_name;
    END LOOP;
END $$;

-- Отключаем RLS для estimates
ALTER TABLE public.estimates DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для estimates
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'estimates'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON public.estimates;';
        RAISE NOTICE 'Политика RLS удалена: % на таблице estimates', policy_name;
    END LOOP;
END $$;

-- Отключаем RLS для equipment_catalog
ALTER TABLE public.equipment_catalog DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для equipment_catalog
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'equipment_catalog'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON public.equipment_catalog;';
        RAISE NOTICE 'Политика RLS удалена: % на таблице equipment_catalog', policy_name;
    END LOOP;
END $$;

-- Отключаем RLS для users
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для users
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'users'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON public.users;';
        RAISE NOTICE 'Политика RLS удалена: % на таблице users', policy_name;
    END LOOP;
END $$;

-- Отключаем RLS для user_profiles
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для user_profiles
DO $$
DECLARE
    policy_name text;
BEGIN
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'user_profiles'
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON public.user_profiles;';
        RAISE NOTICE 'Политика RLS удалена: % на таблице user_profiles', policy_name;
    END LOOP;
END $$;

-- Проверяем статус RLS для всех таблиц
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('homepage_equipment', 'cases', 'estimates', 'equipment_catalog', 'users', 'user_profiles')
ORDER BY tablename;

-- Финальное сообщение
SELECT '🚀 RLS ПОЛИТИКИ ДЛЯ АДМИН ПАНЕЛИ ОТКЛЮЧЕНЫ!' as status;
