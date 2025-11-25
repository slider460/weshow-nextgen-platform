-- ЭКСТРЕННОЕ ИСПРАВЛЕНИЕ ЗАВИСАНИЯ ОБОРУДОВАНИЯ
-- Проблема: VerySimpleEquipment зависает после создания клиента
-- Решение: Отключить RLS для homepage_equipment

-- Отключаем RLS для таблицы homepage_equipment
ALTER TABLE public.homepage_equipment DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для homepage_equipment
DROP POLICY IF EXISTS "homepage_equipment_select_policy" ON public.homepage_equipment;
DROP POLICY IF EXISTS "homepage_equipment_insert_policy" ON public.homepage_equipment;
DROP POLICY IF EXISTS "homepage_equipment_update_policy" ON public.homepage_equipment;
DROP POLICY IF EXISTS "homepage_equipment_delete_policy" ON public.homepage_equipment;

-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'homepage_equipment';

-- Проверяем политики
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'homepage_equipment';
