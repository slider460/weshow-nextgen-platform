-- ===============================================
-- ДИАГНОСТИКА АДМИН ПАНЕЛИ
-- Проверяем статус RLS и доступ к данным
-- ===============================================

-- 1. ПРОВЕРЯЕМ СТАТУС RLS ДЛЯ ОСНОВНЫХ ТАБЛИЦ
-- ===============================================
SELECT 
    'RLS Status' as check_type,
    tablename,
    CASE 
        WHEN rowsecurity = true THEN '🔒 ENABLED (блокирует доступ)'
        WHEN rowsecurity = false THEN '🔓 DISABLED (доступ открыт)'
        ELSE '❓ UNKNOWN'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN (
        'users', 'estimates', 'estimate_items', 'equipment_catalog', 
        'cases', 'logos', 'articles', 'news', 'services_blocks'
    )
ORDER BY tablename;

-- 2. ПРОВЕРЯЕМ ПОЛИТИКИ БЕЗОПАСНОСТИ
-- ===============================================
SELECT 
    'Policies' as check_type,
    tablename,
    COUNT(*) as policy_count,
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ Нет политик (хорошо)'
        ELSE '⚠️  Есть политики: ' || COUNT(*) || ' шт'
    END as status
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN (
        'users', 'estimates', 'estimate_items', 'equipment_catalog', 
        'cases', 'logos', 'articles', 'news', 'services_blocks'
    )
GROUP BY tablename
ORDER BY tablename;

-- 3. ТЕСТИРУЕМ ДОСТУП К ДАННЫМ
-- ===============================================
SELECT 'Data Access Test' as check_type, 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'Data Access Test', 'estimates', COUNT(*) FROM estimates
UNION ALL
SELECT 'Data Access Test', 'equipment_catalog', COUNT(*) FROM equipment_catalog
UNION ALL
SELECT 'Data Access Test', 'cases', COUNT(*) FROM cases
UNION ALL
SELECT 'Data Access Test', 'logos', COUNT(*) FROM logos
UNION ALL
SELECT 'Data Access Test', 'articles', COUNT(*) FROM articles
UNION ALL
SELECT 'Data Access Test', 'news', COUNT(*) FROM news
UNION ALL
SELECT 'Data Access Test', 'services_blocks', COUNT(*) FROM services_blocks;

-- 4. ПРОВЕРЯЕМ СТРУКТУРУ ТАБЛИЦЫ USERS
-- ===============================================
SELECT 
    'Table Structure' as check_type,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. ИТОГОВАЯ ДИАГНОСТИКА
-- ===============================================
SELECT 
    '🎯 ДИАГНОСТИКА ЗАВЕРШЕНА' as status,
    'Проверьте результаты выше' as instruction;
