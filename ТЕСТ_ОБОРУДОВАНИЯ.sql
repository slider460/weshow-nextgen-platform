-- ТЕСТ ОБОРУДОВАНИЯ - ПРОВЕРЯЕМ ТОЛЬКО HOMEPAGE_EQUIPMENT
-- Выполните этот код в Supabase SQL Editor

-- ==============================================
-- 1. ПРОВЕРКА СТРУКТУРЫ ТАБЛИЦЫ HOMEPAGE_EQUIPMENT
-- ==============================================

SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'homepage_equipment'
ORDER BY ordinal_position;

-- ==============================================
-- 2. ПРОВЕРКА RLS СТАТУСА
-- ==============================================

SELECT 
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity = true THEN '❌ ВКЛЮЧЕН (блокирует доступ!)'
        ELSE '✅ ОТКЛЮЧЕН (доступ свободный)'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename = 'homepage_equipment';

-- ==============================================
-- 3. ПРОВЕРКА ПОЛИТИК БЕЗОПАСНОСТИ
-- ==============================================

SELECT 
    policyname,
    cmd,
    permissive,
    roles
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename = 'homepage_equipment'
ORDER BY policyname;

-- ==============================================
-- 4. ПРОВЕРКА ДАННЫХ В ТАБЛИЦЕ
-- ==============================================

-- Количество записей
SELECT COUNT(*) as total_records FROM homepage_equipment;

-- Все записи
SELECT * FROM homepage_equipment ORDER BY sort_order;

-- Только активные записи
SELECT * FROM homepage_equipment WHERE is_active = true ORDER BY sort_order;

-- ==============================================
-- 5. ТЕСТ ПРОСТОГО ЗАПРОСА
-- ==============================================

-- Тестируем запрос который использует приложение
SELECT 
    id,
    title,
    description,
    image_url,
    is_active,
    sort_order
FROM homepage_equipment 
WHERE is_active = true 
ORDER BY sort_order 
LIMIT 10;

-- ==============================================
-- 6. ПРОВЕРКА ПОЛЕЙ КОТОРЫЕ ИСПОЛЬЗУЕТ ПРИЛОЖЕНИЕ
-- ==============================================

-- Проверяем есть ли поле image_url
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'homepage_equipment'
    AND column_name IN ('image_url', 'logo_url', 'picture_url', 'photo_url');

-- ==============================================
-- ФИНАЛЬНАЯ ПРОВЕРКА
-- ==============================================

SELECT 'Проверка оборудования завершена. Изучите результаты выше.' as status;
