-- =============================================================================
-- ФИНАЛЬНЫЙ SQL СКРИПТ ДЛЯ ОПТИМИЗАЦИИ БАЗЫ ДАННЫХ
-- =============================================================================
-- Этот скрипт создает только самые критически важные индексы

-- 1. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ОБОРУДОВАНИЯ (equipment_catalog)
-- =============================================================================

-- Индекс по category_id (самый важный для фильтрации)
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_category_id 
ON equipment_catalog(category_id);

-- Индекс по name (для поиска и сортировки)
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_name 
ON equipment_catalog(name);

-- 2. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ КАТЕГОРИЙ (equipment_categories)
-- =============================================================================

-- Индекс по name (для сортировки)
CREATE INDEX IF NOT EXISTS idx_equipment_categories_name 
ON equipment_categories(name);

-- 3. ИНДЕКСЫ ДЛЯ ДОПОЛНИТЕЛЬНЫХ ТАБЛИЦ (если существуют)
-- =============================================================================

-- Для таблицы articles
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'articles' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id)';
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_title ON articles(title)';
    END IF;
END $$;

-- Для таблицы estimates
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'estimates' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimates_user_id ON estimates(user_id)';
    END IF;
END $$;

-- Для таблицы users
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'users' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)';
    END IF;
END $$;

-- Для таблицы estimate_items
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'estimate_items' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate_id ON estimate_items(estimate_id)';
    END IF;
END $$;

-- =============================================================================
-- ОБНОВЛЕНИЕ СТАТИСТИКИ
-- =============================================================================

ANALYZE equipment_catalog;
ANALYZE equipment_categories;

-- =============================================================================
-- ПРОВЕРКА РЕЗУЛЬТАТОВ
-- =============================================================================

-- Показываем созданные индексы
SELECT 
    'Созданные индексы' as info,
    tablename,
    indexname
FROM pg_indexes 
WHERE schemaname = 'public'
AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;

-- Показываем количество записей в основных таблицах
SELECT 'Статистика equipment_catalog' as info, COUNT(*) as row_count FROM equipment_catalog;
SELECT 'Статистика equipment_categories' as info, COUNT(*) as row_count FROM equipment_categories;




