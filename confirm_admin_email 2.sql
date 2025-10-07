-- 🔧 Скрипт для подтверждения email и создания профиля администратора

-- 1. Проверяем, существует ли пользователь admin@weshow.ru
SELECT 
  id,
  email,
  email_confirmed_at,
  confirmed_at,
  created_at
FROM auth.users
WHERE email = 'admin@weshow.ru';

-- 2. Подтверждаем email для admin@weshow.ru (БЕЗ confirmed_at - она генерируется автоматически!)
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@weshow.ru';

-- 3. Проверяем результат
SELECT 
  id,
  email,
  email_confirmed_at,
  confirmed_at,
  created_at
FROM auth.users
WHERE email = 'admin@weshow.ru';

-- 4. Создаем профиль, если его нет
INSERT INTO public.user_profiles (id, full_name, company_name, phone_number, role)
SELECT 
  id,
  'Администратор',
  'WeShow',
  '+7 (495) 580-75-37',
  'admin'
FROM auth.users
WHERE email = 'admin@weshow.ru'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';

-- 5. Проверяем итоговый результат
SELECT 
  au.id,
  au.email,
  au.email_confirmed_at IS NOT NULL as email_confirmed,
  up.full_name,
  up.role,
  up.company_name
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE au.email = 'admin@weshow.ru';

-- ✅ Если всё правильно, вы должны увидеть:
-- - email_confirmed: true
-- - role: admin
-- - full_name: Администратор

