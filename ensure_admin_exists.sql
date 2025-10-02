-- Скрипт для проверки и создания админа admin@weshow.ru
-- Запустите в Supabase SQL Editor

-- 1. Проверяем, существует ли пользователь
DO $$
DECLARE
    admin_user_id UUID;
    profile_exists BOOLEAN;
BEGIN
    -- Ищем пользователя в auth.users
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = 'admin@weshow.ru';
    
    IF admin_user_id IS NULL THEN
        RAISE NOTICE '❌ Пользователь admin@weshow.ru НЕ НАЙДЕН в auth.users';
        RAISE NOTICE '🔧 Создайте пользователя через: Authentication -> Users -> Add user';
        RAISE NOTICE '   Email: admin@weshow.ru';
        RAISE NOTICE '   Password: password';
        RAISE NOTICE '   Auto confirm: YES';
    ELSE
        RAISE NOTICE '✅ Пользователь найден с ID: %', admin_user_id;
        
        -- Проверяем профиль
        SELECT EXISTS(
            SELECT 1 FROM user_profiles WHERE id = admin_user_id
        ) INTO profile_exists;
        
        IF NOT profile_exists THEN
            RAISE NOTICE '❌ Профиль НЕ НАЙДЕН в user_profiles';
            RAISE NOTICE '🔧 Создаем профиль...';
            
            -- Создаем профиль
            INSERT INTO user_profiles (id, full_name, company_name, role)
            VALUES (admin_user_id, 'Администратор', 'WeShow', 'admin');
            
            RAISE NOTICE '✅ Профиль создан успешно!';
        ELSE
            RAISE NOTICE '✅ Профиль существует';
            
            -- Проверяем и обновляем роль
            UPDATE user_profiles
            SET role = 'admin'
            WHERE id = admin_user_id AND role != 'admin';
            
            IF FOUND THEN
                RAISE NOTICE '✅ Роль обновлена на admin';
            ELSE
                RAISE NOTICE '✅ Роль уже admin';
            END IF;
        END IF;
        
        -- Показываем финальные данные
        RAISE NOTICE '═══════════════════════════════════════';
        RAISE NOTICE 'ФИНАЛЬНЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ:';
    END IF;
END $$;

-- 2. Показываем полную информацию о пользователе
SELECT 
    '✅ AUTH USER' as type,
    au.id,
    au.email,
    au.email_confirmed_at,
    au.created_at
FROM auth.users au
WHERE au.email = 'admin@weshow.ru'

UNION ALL

SELECT 
    '✅ PROFILE' as type,
    up.id,
    up.full_name::text as email,
    up.role::text as email_confirmed_at,
    up.created_at
FROM user_profiles up
WHERE up.id IN (SELECT id FROM auth.users WHERE email = 'admin@weshow.ru');

-- 3. Если нужно создать профиль вручную (если пользователь существует, но профиль нет)
-- Раскомментируйте и запустите следующие строки:

/*
INSERT INTO user_profiles (id, full_name, company_name, role)
SELECT 
    id,
    'Администратор',
    'WeShow',
    'admin'
FROM auth.users 
WHERE email = 'admin@weshow.ru'
ON CONFLICT (id) DO UPDATE 
SET role = 'admin',
    full_name = 'Администратор',
    company_name = 'WeShow';
*/


