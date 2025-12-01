-- 🔍 Скрипт для проверки и исправления профиля администратора

-- 1. Проверяем всех пользователей в user_profiles
SELECT 
  id,
  full_name,
  company_name,
  phone_number,
  role,
  created_at
FROM user_profiles
ORDER BY created_at DESC;

-- 2. Проверяем пользователей в auth.users
SELECT 
  id,
  email,
  created_at,
  confirmed_at
FROM auth.users
WHERE email LIKE '%@weshow.ru'
ORDER BY created_at DESC;

-- 3. Ищем пользователей без профиля
SELECT 
  au.id,
  au.email,
  au.created_at
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE up.id IS NULL
  AND au.email LIKE '%@weshow.ru';

-- 4. Если нужно создать профиль для существующего пользователя:
-- РАСКОММЕНТИРУЙТЕ СЛЕДУЮЩУЮ КОМАНДУ И ЗАМЕНИТЕ 'USER_ID_HERE' на реальный ID из auth.users

-- INSERT INTO user_profiles (id, full_name, company_name, phone_number, role)
-- SELECT 
--   id,
--   'Администратор',
--   'WeShow',
--   '+7 (495) 580-75-37',
--   'admin'
-- FROM auth.users
-- WHERE email = 'admin@weshow.ru';

-- 5. Если нужно обновить роль существующего профиля:
-- РАСКОММЕНТИРУЙТЕ СЛЕДУЮЩУЮ КОМАНДУ

-- UPDATE user_profiles
-- SET role = 'admin'
-- WHERE id IN (
--   SELECT id FROM auth.users WHERE email = 'admin@weshow.ru'
-- );

-- 6. Проверяем результат
SELECT 
  au.email,
  up.full_name,
  up.role,
  up.company_name
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE au.email = 'admin@weshow.ru';


