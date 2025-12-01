-- =============================================================================
-- БЕЗОПАСНЫЙ SQL СКРИПТ ДЛЯ ОПТИМИЗАЦИИ ПРОИЗВОДИТЕЛЬНОСТИ
-- =============================================================================
-- Этот скрипт проверяет существование колонок перед созданием индексов

-- 1. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ОБОРУДОВАНИЯ (equipment_catalog)
-- =============================================================================

-- Проверяем существование таблицы equipment_catalog
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'equipment_catalog' 
        AND table_schema = 'public'
    ) THEN
        
        -- Индекс по category_id (самый важный)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'equipment_catalog' 
            AND column_name = 'category_id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_category_id ON equipment_catalog(category_id)';
            RAISE NOTICE 'Создан индекс idx_equipment_catalog_category_id';
        END IF;
        
        -- Индекс по name
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'equipment_catalog' 
            AND column_name = 'name' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_name ON equipment_catalog(name)';
            RAISE NOTICE 'Создан индекс idx_equipment_catalog_name';
        END IF;
        
        -- Индекс по active (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'equipment_catalog' 
            AND column_name = 'active' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_active ON equipment_catalog(active) WHERE active = true';
            RAISE NOTICE 'Создан индекс idx_equipment_catalog_active';
        END IF;
        
        -- Индекс по id (если не существует первичный ключ)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'equipment_catalog' 
            AND column_name = 'id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_id ON equipment_catalog(id)';
            RAISE NOTICE 'Создан индекс idx_equipment_catalog_id';
        END IF;
        
    ELSE
        RAISE NOTICE 'Таблица equipment_catalog не найдена';
    END IF;
END $$;

-- 2. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ КАТЕГОРИЙ (equipment_categories)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'equipment_categories' 
        AND table_schema = 'public'
    ) THEN
        
        -- Индекс по name
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'equipment_categories' 
            AND column_name = 'name' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_categories_name ON equipment_categories(name)';
            RAISE NOTICE 'Создан индекс idx_equipment_categories_name';
        END IF;
        
        -- Индекс по slug (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'equipment_categories' 
            AND column_name = 'slug' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_categories_slug ON equipment_categories(slug)';
            RAISE NOTICE 'Создан индекс idx_equipment_categories_slug';
        END IF;
        
        -- Индекс по id
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'equipment_categories' 
            AND column_name = 'id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_categories_id ON equipment_categories(id)';
            RAISE NOTICE 'Создан индекс idx_equipment_categories_id';
        END IF;
        
    ELSE
        RAISE NOTICE 'Таблица equipment_categories не найдена';
    END IF;
END $$;

-- 3. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ СТАТЕЙ (articles)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'articles' 
        AND table_schema = 'public'
    ) THEN
        
        -- Индекс по published_at (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'articles' 
            AND column_name = 'published_at' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC)';
            RAISE NOTICE 'Создан индекс idx_articles_published_at';
        END IF;
        
        -- Индекс по category_id (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'articles' 
            AND column_name = 'category_id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id)';
            RAISE NOTICE 'Создан индекс idx_articles_category_id';
        END IF;
        
        -- Индекс по title (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'articles' 
            AND column_name = 'title' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_articles_title ON articles(title)';
            RAISE NOTICE 'Создан индекс idx_articles_title';
        END IF;
        
    ELSE
        RAISE NOTICE 'Таблица articles не найдена';
    END IF;
END $$;

-- 4. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ СМЕТ (estimates)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'estimates' 
        AND table_schema = 'public'
    ) THEN
        
        -- Индекс по user_id (самый важный)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'estimates' 
            AND column_name = 'user_id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimates_user_id ON estimates(user_id)';
            RAISE NOTICE 'Создан индекс idx_estimates_user_id';
        END IF;
        
        -- Индекс по created_at (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'estimates' 
            AND column_name = 'created_at' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimates_created_at ON estimates(created_at DESC)';
            RAISE NOTICE 'Создан индекс idx_estimates_created_at';
        END IF;
        
    ELSE
        RAISE NOTICE 'Таблица estimates не найдена';
    END IF;
END $$;

-- 5. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ПОЛЬЗОВАТЕЛЕЙ (users)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'users' 
        AND table_schema = 'public'
    ) THEN
        
        -- Индекс по email (для аутентификации)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name = 'email' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)';
            RAISE NOTICE 'Создан индекс idx_users_email';
        END IF;
        
        -- Индекс по role (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name = 'role' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)';
            RAISE NOTICE 'Создан индекс idx_users_role';
        END IF;
        
    ELSE
        RAISE NOTICE 'Таблица users не найдена';
    END IF;
END $$;

-- 6. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ПОЗИЦИЙ СМЕТ (estimate_items)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'estimate_items' 
        AND table_schema = 'public'
    ) THEN
        
        -- Индекс по estimate_id
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'estimate_items' 
            AND column_name = 'estimate_id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate_id ON estimate_items(estimate_id)';
            RAISE NOTICE 'Создан индекс idx_estimate_items_estimate_id';
        END IF;
        
        -- Индекс по equipment_id (если существует)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'estimate_items' 
            AND column_name = 'equipment_id' 
            AND table_schema = 'public'
        ) THEN
            EXECUTE 'CREATE INDEX IF NOT EXISTS idx_estimate_items_equipment_id ON estimate_items(equipment_id)';
            RAISE NOTICE 'Создан индекс idx_estimate_items_equipment_id';
        END IF;
        
    ELSE
        RAISE NOTICE 'Таблица estimate_items не найдена';
    END IF;
END $$;

-- =============================================================================
-- ОБНОВЛЕНИЕ СТАТИСТИКИ
-- =============================================================================

-- Обновляем статистику для всех существующих таблиц
DO $$
DECLARE
    table_name_var TEXT;
BEGIN
    FOR table_name_var IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
    LOOP
        EXECUTE 'ANALYZE ' || quote_ident(table_name_var);
        RAISE NOTICE 'Обновлена статистика для таблицы: %', table_name_var;
    END LOOP;
END $$;

-- =============================================================================
-- ПРОВЕРКА СОЗДАННЫХ ИНДЕКСОВ
-- =============================================================================

-- Показываем все созданные индексы
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Финальное сообщение
DO $$
BEGIN
    RAISE NOTICE 'Оптимизация завершена! Проверьте результаты выше.';
END $$;
