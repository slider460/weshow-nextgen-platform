-- Проверка конкретного пользователя d5aab107-869a-4d25-8693-f14706904a8f
-- Запустите этот скрипт в Supabase SQL Editor

-- 1. Проверка в auth.users
SELECT 
    'AUTH USER' as source,
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE id = 'd5aab107-869a-4d25-8693-f14706904a8f';

-- 2. Проверка в user_profiles
SELECT 
    'USER PROFILE' as source,
    id,
    full_name,
    company_name,
    role,
    created_at
FROM user_profiles
WHERE id = 'd5aab107-869a-4d25-8693-f14706904a8f';

-- 3. Если профиля нет - создаем его
INSERT INTO user_profiles (id, full_name, company_name, role)
VALUES (
    'd5aab107-869a-4d25-8693-f14706904a8f',
    'Администратор',
    'WeShow',
    'admin'
)
ON CONFLICT (id) DO UPDATE 
SET 
    role = 'admin',
    full_name = 'Администратор',
    company_name = 'WeShow';

-- 4. Проверка после создания
SELECT 
    'FINAL CHECK' as source,
    up.id,
    au.email,
    up.full_name,
    up.role
FROM user_profiles up
JOIN auth.users au ON up.id = au.id
WHERE up.id = 'd5aab107-869a-4d25-8693-f14706904a8f';

