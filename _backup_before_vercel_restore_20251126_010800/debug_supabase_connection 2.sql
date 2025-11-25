-- Диагностика подключения к Supabase и RLS политик

-- 1. Проверяем подключение к базе данных
SELECT 'База данных доступна' as status;

-- 2. Проверяем существование таблицы logos
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'logos';

-- 3. Проверяем количество записей в таблице
SELECT COUNT(*) as total_records FROM logos;

-- 4. Проверяем RLS статус для таблицы logos
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'logos';

-- 5. Проверяем RLS политики
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

-- 6. ВРЕМЕННО отключаем RLS для диагностики (только для тестирования!)
-- ВНИМАНИЕ: Это отключит безопасность на уровне строк!
ALTER TABLE logos DISABLE ROW LEVEL SECURITY;

-- 7. Проверяем данные после отключения RLS
SELECT 
  id,
  name,
  logo_url,
  is_active,
  category,
  sort_order
FROM logos
ORDER BY sort_order;

-- 8. ВКЛЮЧАЕМ RLS обратно (ВАЖНО!)
ALTER TABLE logos ENABLE ROW LEVEL SECURITY;

-- 9. Создаем простую политику для анонимного доступа (если нужно)
-- DROP POLICY IF EXISTS "Allow anonymous read access" ON logos;
-- CREATE POLICY "Allow anonymous read access" ON logos
--   FOR SELECT 
--   USING (true);

-- 10. Проверяем финальный статус
SELECT 
  'RLS включен' as rls_status,
  COUNT(*) as record_count
FROM logos;



