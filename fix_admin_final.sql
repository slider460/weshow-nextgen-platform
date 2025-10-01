-- 🔧 ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ admin@weshow.ru (БЕЗ ОШИБОК!)

-- 1. Подтверждаем email
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'admin@weshow.ru';

-- 2. Создаем профиль с правильным именем колонки phone (НЕ phone_number!)
INSERT INTO public.user_profiles (id, full_name, company_name, phone, role)
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

-- 3. Проверяем результат
SELECT 
  au.id,
  au.email,
  au.email_confirmed_at IS NOT NULL as email_confirmed,
  up.full_name,
  up.role,
  up.company_name,
  up.phone
FROM auth.users au
LEFT JOIN public.user_profiles up ON au.id = up.id
WHERE au.email = 'admin@weshow.ru';

-- ✅ Ожидаемый результат:
-- email_confirmed: true
-- role: admin
-- full_name: Администратор
-- phone: +7 (495) 580-75-37

