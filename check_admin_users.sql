-- Проверка существующих администраторов и менеджеров

-- 1. Проверяем всех пользователей с их профилями
SELECT 
  au.id,
  au.email,
  au.email_confirmed_at,
  au.created_at as user_created_at,
  up.full_name,
  up.company_name,
  up.role,
  up.created_at as profile_created_at
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
ORDER BY au.created_at DESC;

-- 2. Проверяем только админов и менеджеров
SELECT 
  au.id,
  au.email,
  up.full_name,
  up.role
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE up.role IN ('admin', 'manager')
  OR au.email IN ('admin@weshow.ru', 'manager@weshow.ru');

-- 3. Если нужно создать тестового администратора (выполнить только если нет):
-- ВАЖНО: Сначала создайте пользователя через Supabase Dashboard!
-- Authentication -> Users -> Create user
-- Email: admin@weshow.ru
-- Password: password
-- Затем выполните:

/*
INSERT INTO user_profiles (id, full_name, company_name, phone, role)
SELECT 
  id,
  'Администратор WeShow',
  'WeShow',
  '+7 (999) 123-45-67',
  'admin'::user_role
FROM auth.users
WHERE email = 'admin@weshow.ru'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin'::user_role,
  updated_at = NOW();
*/

-- 4. Если нужно создать тестового менеджера:
/*
INSERT INTO user_profiles (id, full_name, company_name, phone, role)
SELECT 
  id,
  'Менеджер WeShow',
  'WeShow',
  '+7 (999) 123-45-68',
  'manager'::user_role
FROM auth.users
WHERE email = 'manager@weshow.ru'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'manager'::user_role,
  updated_at = NOW();
*/

-- 5. Проверка RLS политик для user_profiles
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
WHERE tablename = 'user_profiles';

-- 6. Проверка, что таблица user_profiles существует
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'user_profiles'
ORDER BY ordinal_position;










