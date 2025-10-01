-- Проверка пользователя admin@weshow.ru
-- Запустите этот скрипт в Supabase SQL Editor

-- 1. Проверка существования пользователя в auth.users
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  raw_user_meta_data
FROM auth.users
WHERE email = 'admin@weshow.ru';

-- 2. Проверка профиля в user_profiles
SELECT 
  id,
  full_name,
  company_name,
  role,
  created_at
FROM user_profiles
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'admin@weshow.ru'
);

-- 3. Проверка всех пользователей с ролью admin
SELECT 
  up.id,
  au.email,
  up.full_name,
  up.role,
  au.email_confirmed_at
FROM user_profiles up
JOIN auth.users au ON up.id = au.id
WHERE up.role = 'admin';

