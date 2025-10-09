-- =============================================================================
-- ПРОСТОЙ И БЕЗОПАСНЫЙ SQL СКРИПТ ДЛЯ ОПТИМИЗАЦИИ
-- =============================================================================
-- Этот скрипт создает только самые важные индексы без сложной логики

-- 1. БАЗОВЫЕ ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ОБОРУДОВАНИЯ
-- =============================================================================

-- Индекс по category_id (самый важный для фильтрации)
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_category_id 
ON equipment_catalog(category_id);

-- Индекс по name (для поиска и сортировки)
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_name 
ON equipment_catalog(name);

-- Индекс по id (если не является первичным ключом)
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_id 
ON equipment_catalog(id);

-- 2. БАЗОВЫЕ ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ КАТЕГОРИЙ
-- =============================================================================

-- Индекс по name (для сортировки)
CREATE INDEX IF NOT EXISTS idx_equipment_categories_name 
ON equipment_categories(name);

-- Индекс по id
CREATE INDEX IF NOT EXISTS idx_equipment_categories_id 
ON equipment_categories(id);

-- 3. БАЗОВЫЕ ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ СТАТЕЙ (если существует)
-- =============================================================================

-- Проверяем существование таблицы articles
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'articles' 
        AND table_schema = 'public'
    ) THEN
        -- Индекс по category_id
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id)';
        
        -- Индекс по title
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_title ON articles(title)';
        
        -- Индекс по created_at (если колонка существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'articles' 
            AND column_name = 'created_at' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC)';
        END IF;
        
        -- Индекс по published_at (если колонка существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'articles' 
            AND column_name = 'published_at' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC)';
        END IF;
    END IF;
END $$;

-- 4. БАЗОВЫЕ ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ СМЕТ (если существует)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'estimates' 
        AND table_schema = 'public'
    ) THEN
        -- Индекс по user_id (самый важный)
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimates_user_id ON estimates(user_id)';
        
        -- Индекс по created_at (если колонка существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'estimates' 
            AND column_name = 'created_at' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimates_created_at ON estimates(created_at DESC)';
        END IF;
    END IF;
END $$;

-- 5. БАЗОВЫЕ ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ПОЛЬЗОВАТЕЛЕЙ (если существует)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'users' 
        AND table_schema = 'public'
    ) THEN
        -- Индекс по email (для аутентификации)
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)';
        
        -- Индекс по id
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_users_id ON users(id)';
        
        -- Индекс по role (если колонка существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name = 'role' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)';
        END IF;
    END IF;
END $$;

-- 6. БАЗОВЫЕ ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ПОЗИЦИЙ СМЕТ (если существует)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'estimate_items' 
        AND table_schema = 'public'
    ) THEN
        -- Индекс по estimate_id
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate_id ON estimate_items(estimate_id)';
        
        -- Индекс по equipment_id (если колонка существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'estimate_items' 
            AND column_name = 'equipment_id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimate_items_equipment_id ON estimate_items(equipment_id)';
        END IF;
    END IF;
END $$;

-- =============================================================================
-- ОБНОВЛЕНИЕ СТАТИСТИКИ
-- =============================================================================

-- Обновляем статистику для основных таблиц
ANALYZE equipment_catalog;
ANALYZE equipment_categories;

-- Обновляем статистику для дополнительных таблиц (если существуют)
DO $$
DECLARE
    table_name_var TEXT;
BEGIN
    FOR table_name_var IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name IN ('articles', 'estimates', 'users', 'estimate_items')
    LOOP
        EXECUTE 'ANALYZE ' || quote_ident(table_name_var);
    END LOOP;
END $$;

-- =============================================================================
-- ПРОВЕРКА РЕЗУЛЬТАТОВ
-- =============================================================================

-- Показываем все созданные индексы
SELECT 
    'Созданные индексы:' as info,
    schemaname,
    tablename,
    indexname
FROM pg_indexes 
WHERE schemaname = 'public'
AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;

-- Показываем количество записей в основных таблицах
SELECT 
    'Статистика таблиц:' as info,
    table_name,
    CASE 
        WHEN table_name = 'equipment_catalog' THEN (SELECT COUNT(*)::text FROM equipment_catalog)
        WHEN table_name = 'equipment_categories' THEN (SELECT COUNT(*)::text FROM equipment_categories)
        ELSE 'N/A'
    END as row_count
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN ('equipment_catalog', 'equipment_categories')
ORDER BY table_name;
