-- ===============================================
-- ИСПРАВЛЕНИЕ ТАБЛИЦЫ USER_PROFILES
-- Добавляем колонку user_id и исправляем структуру
-- ===============================================

-- 1. ДОБАВЛЯЕМ КОЛОНКУ USER_ID
-- ===============================================
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. ОТКЛЮЧАЕМ RLS ДЛЯ USER_PROFILES
-- ===============================================
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- 3. УДАЛЯЕМ ПОЛИТИКИ БЕЗОПАСНОСТИ
-- ===============================================
DROP POLICY IF EXISTS "Enable read access for all users" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON user_profiles;
DROP POLICY IF EXISTS "Allow public read access" ON user_profiles;
DROP POLICY IF EXISTS "Allow anonymous read access" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated full access" ON user_profiles;

-- 4. СОЗДАЕМ ПРОФИЛЬ ДЛЯ АДМИНИСТРАТОРА
-- ===============================================
-- Находим ID администратора
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Получаем ID администратора
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'admin@weshow.ru';
    
    -- Если администратор найден и у него нет профиля
    IF admin_user_id IS NOT NULL THEN
        -- Проверяем, есть ли уже профиль
        IF NOT EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_id = admin_user_id
        ) THEN
            -- Создаем профиль
            INSERT INTO user_profiles (
                user_id, 
                full_name, 
                role, 
                created_at, 
                updated_at
            ) VALUES (
                admin_user_id,
                'Администратор',
                'admin',
                NOW(),
                NOW()
            );
            
            RAISE NOTICE 'Профиль администратора создан для user_id: %', admin_user_id;
        ELSE
            RAISE NOTICE 'Профиль администратора уже существует';
        END IF;
    ELSE
        RAISE NOTICE 'Администратор с email admin@weshow.ru не найден';
    END IF;
END $$;

-- 5. ПРОВЕРЯЕМ РЕЗУЛЬТАТ
-- ===============================================
-- Проверяем структуру таблицы
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
    AND table_schema = 'public'
ORDER BY ordinal_position;

-- Проверяем профили
SELECT 
    up.id,
    up.user_id,
    up.full_name,
    up.role,
    u.email
FROM user_profiles up
LEFT JOIN auth.users u ON up.user_id = u.id
ORDER BY up.created_at;

-- Проверяем статус RLS
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename = 'user_profiles';

-- Финальное сообщение
SELECT '🎉 USER_PROFILES ИСПРАВЛЕНА! Теперь вход должен работать' as status;


