-- ИСПРАВЛЕНИЕ RLS ДЛЯ ТАБЛИЦЫ CASES (ПОРТФОЛИО)
-- Проблема: Портфолио не загружается из-за RLS политик
-- Решение: Отключить RLS для таблицы cases

-- Отключаем RLS для таблицы cases
ALTER TABLE public.cases DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики RLS для cases
DROP POLICY IF EXISTS "cases_select_policy" ON public.cases;
DROP POLICY IF EXISTS "cases_insert_policy" ON public.cases;
DROP POLICY IF EXISTS "cases_update_policy" ON public.cases;
DROP POLICY IF EXISTS "cases_delete_policy" ON public.cases;

-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'cases';

-- Проверяем политики
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'cases';
