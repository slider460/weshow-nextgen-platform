-- ИСПРАВЛЕНИЕ RLS ДЛЯ ТАБЛИЦ ОБОРУДОВАНИЯ
-- Проблема: Страница /equipment не загружает данные из-за RLS политик
-- Решение: Отключить RLS для таблиц equipment_catalog и equipment_categories

-- Отключаем RLS для таблицы equipment_catalog
ALTER TABLE public.equipment_catalog DISABLE ROW LEVEL SECURITY;

-- Отключаем RLS для таблицы equipment_categories
ALTER TABLE public.equipment_categories DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для equipment_catalog
DROP POLICY IF EXISTS "equipment_catalog_select_policy" ON public.equipment_catalog;
DROP POLICY IF EXISTS "equipment_catalog_insert_policy" ON public.equipment_catalog;
DROP POLICY IF EXISTS "equipment_catalog_update_policy" ON public.equipment_catalog;
DROP POLICY IF EXISTS "equipment_catalog_delete_policy" ON public.equipment_catalog;

-- Удаляем все политики RLS для equipment_categories
DROP POLICY IF EXISTS "equipment_categories_select_policy" ON public.equipment_categories;
DROP POLICY IF EXISTS "equipment_categories_insert_policy" ON public.equipment_categories;
DROP POLICY IF EXISTS "equipment_categories_update_policy" ON public.equipment_categories;
DROP POLICY IF EXISTS "equipment_categories_delete_policy" ON public.equipment_categories;

-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('equipment_catalog', 'equipment_categories');

-- Проверяем политики
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('equipment_catalog', 'equipment_categories');
