-- ПОЛНАЯ ДИАГНОСТИКА SUPABASE - ВЫПОЛНИТЕ ВСЕ ПО ЭТАПАМ
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- ЭТАП 1: ПРОВЕРКА СУЩЕСТВУЮЩИХ ТАБЛИЦ
-- ==============================================

-- Проверяем все таблицы в схеме public
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ==============================================
-- ЭТАП 2: ПРОВЕРКА RLS СТАТУСА
-- ==============================================

-- Проверяем статус RLS для всех таблиц
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity = true THEN '✅ Включен'
        ELSE '❌ Отключен'
    END as status
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ==============================================
-- ЭТАП 3: ПРОВЕРКА СУЩЕСТВУЮЩИХ ПОЛИТИК
-- ==============================================

-- Проверяем все существующие политики
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
ORDER BY tablename, policyname;

-- ==============================================
-- ЭТАП 4: ПРОВЕРКА КОЛИЧЕСТВА ДАННЫХ
-- ==============================================

-- Проверяем количество записей в каждой таблице
DO $$
DECLARE
    table_name text;
    record_count integer;
    query_text text;
BEGIN
    -- Создаем временную таблицу для результатов
    CREATE TEMP TABLE IF NOT EXISTS table_counts (
        table_name text,
        record_count integer
    );
    
    -- Очищаем предыдущие результаты
    DELETE FROM table_counts;
    
    -- Получаем список всех таблиц
    FOR table_name IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
    LOOP
        -- Формируем запрос для подсчета записей
        query_text := format('SELECT COUNT(*) FROM %I', table_name);
        
        -- Выполняем запрос и получаем количество записей
        EXECUTE query_text INTO record_count;
        
        -- Вставляем результат в временную таблицу
        INSERT INTO table_counts (table_name, record_count) 
        VALUES (table_name, record_count);
    END LOOP;
    
    -- Выводим результаты
    RAISE NOTICE 'Результаты подсчета записей:';
END $$;

-- Выводим результаты подсчета
SELECT 
    table_name,
    record_count,
    CASE 
        WHEN record_count > 0 THEN '✅ Есть данные'
        ELSE '❌ Нет данных'
    END as status
FROM table_counts
ORDER BY record_count DESC, table_name;

-- ==============================================
-- ЭТАП 5: ПРОВЕРКА ПОДКЛЮЧЕНИЯ К API
-- ==============================================

-- Тестируем доступ к таблице logos через API
SELECT 'Тестирование таблицы logos:' as test_name;

-- Проверяем структуру таблицы logos
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'logos'
ORDER BY ordinal_position;

-- ==============================================
-- ЭТАП 6: ПРОВЕРКА АУТЕНТИФИКАЦИИ
-- ==============================================

-- Проверяем настройки аутентификации
SELECT 
    'auth.users' as table_name,
    COUNT(*) as user_count
FROM auth.users;

-- Проверяем профили пользователей
SELECT 
    'user_profiles' as table_name,
    COUNT(*) as profile_count
FROM public.user_profiles;

-- ==============================================
-- ФИНАЛЬНЫЙ ОТЧЕТ
-- ==============================================

SELECT '🔍 ДИАГНОСТИКА ЗАВЕРШЕНА! Проверьте результаты выше.' as status;
