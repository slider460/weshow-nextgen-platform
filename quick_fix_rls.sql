-- БЫСТРОЕ ИСПРАВЛЕНИЕ RLS ДЛЯ ТАБЛИЦЫ LOGOS
-- Выполните этот скрипт в Supabase SQL Editor

-- 1. Проверяем текущий статус RLS
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'logos';

-- 2. Проверяем существующие политики
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'logos';

-- 3. Удаляем все существующие политики (если есть)
DROP POLICY IF EXISTS "Enable read access for all users" ON logos;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON logos;
DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;
DROP POLICY IF EXISTS "Allow public read access" ON logos;

-- 4. Создаем простую политику для чтения для всех
CREATE POLICY "Allow public read access" ON logos
  FOR SELECT 
  USING (true);

-- 5. Проверяем данные
SELECT COUNT(*) as total_records FROM logos;
SELECT id, name, logo_url, is_active FROM logos LIMIT 5;

-- 6. Проверяем финальный статус
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'logos';

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename = 'logos';

