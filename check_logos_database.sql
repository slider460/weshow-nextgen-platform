-- Проверка таблицы логотипов в базе данных

-- 1. Проверяем, существует ли таблица logos
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'logos'
ORDER BY ordinal_position;

-- 2. Проверяем количество записей в таблице
SELECT COUNT(*) as total_logos FROM logos;

-- 3. Проверяем все логотипы
SELECT 
  id,
  name,
  logo_url,
  is_active,
  category,
  sort_order,
  created_at,
  updated_at
FROM logos
ORDER BY sort_order ASC, created_at DESC;

-- 4. Проверяем только активные логотипы
SELECT 
  id,
  name,
  logo_url,
  category,
  sort_order
FROM logos
WHERE is_active = true
ORDER BY sort_order ASC;

-- 5. Проверяем RLS политики для таблицы logos
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
WHERE tablename = 'logos';

-- 6. Если таблица пуста, можно создать тестовые данные:
/*
INSERT INTO logos (name, logo_url, is_active, category, sort_order)
VALUES 
  ('Samsung', 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg', true, 'partner', 1),
  ('Apple', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', true, 'partner', 2),
  ('Google', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', true, 'partner', 3),
  ('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', true, 'partner', 4),
  ('Intel', 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg', true, 'partner', 5)
ON CONFLICT (name) DO UPDATE SET
  logo_url = EXCLUDED.logo_url,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();
*/

-- 7. Проверяем права доступа (если есть проблемы с RLS)
-- Отключаем RLS временно для диагностики (только для тестирования!)
-- ALTER TABLE logos DISABLE ROW LEVEL SECURITY;

-- Включаем RLS обратно после диагностики
-- ALTER TABLE logos ENABLE ROW LEVEL SECURITY;
