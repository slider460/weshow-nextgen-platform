-- =============================================================================
-- КРИТИЧЕСКИ ВАЖНЫЕ ИНДЕКСЫ ДЛЯ ОПТИМИЗАЦИИ ПРОИЗВОДИТЕЛЬНОСТИ
-- =============================================================================
-- Этот скрипт создает индексы для ускорения самых частых запросов

-- 1. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ОБОРУДОВАНИЯ
-- =============================================================================

-- Индекс по имени (для поиска и сортировки)
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_name 
ON equipment_catalog(name);

-- Проверяем наличие колонки active и создаем индекс только если она существует
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'equipment_catalog' 
        AND column_name = 'active' 
        AND table_schema = 'public'
    ) THEN
        -- Индекс по статусу активности
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_active ON equipment_catalog(active) WHERE active = true';
        
        -- Составной индекс для частых запросов: категория + активность
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_category_active ON equipment_catalog(category_id, active) WHERE active = true';
    ELSE
        -- Если колонки active нет, создаем только индекс по категории
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_category_id ON equipment_catalog(category_id)';
    END IF;
END $$;

-- Индекс для поиска по названию (text search) - только если колонка name существует
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'equipment_catalog' 
        AND column_name = 'name' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_name_gin ON equipment_catalog USING gin(to_tsvector(''russian'', name))';
    END IF;
END $$;

-- Индекс для поиска по описанию (text search) - только если колонка description существует
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'equipment_catalog' 
        AND column_name = 'description' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_catalog_description_gin ON equipment_catalog USING gin(to_tsvector(''russian'', description))';
    END IF;
END $$;

-- 2. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ КАТЕГОРИЙ
-- =============================================================================

-- Индекс по slug (для URL маршрутизации) - только если колонка существует
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'equipment_categories' 
        AND column_name = 'slug' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_categories_slug ON equipment_categories(slug)';
    END IF;
END $$;

-- Индекс по порядку сортировки - только если колонка существует
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'equipment_categories' 
        AND column_name = 'sort_order' 
        AND table_schema = 'public'
    ) THEN
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_equipment_categories_sort_order ON equipment_categories(sort_order)';
    END IF;
END $$;

-- 3. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ СТАТЕЙ
-- =============================================================================

-- Индекс по дате публикации (для сортировки)
CREATE INDEX IF NOT EXISTS idx_articles_published_at 
ON articles(published_at DESC);

-- Индекс по статусу публикации
CREATE INDEX IF NOT EXISTS idx_articles_published 
ON articles(published) WHERE published = true;

-- Составной индекс: категория + публикация + дата
CREATE INDEX IF NOT EXISTS idx_articles_category_published_date 
ON articles(category_id, published, published_at DESC) WHERE published = true;

-- Индекс для поиска по заголовку
CREATE INDEX IF NOT EXISTS idx_articles_title_gin 
ON articles USING gin(to_tsvector('russian', title));

-- 4. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ СМЕТ
-- =============================================================================

-- Индекс по пользователю (самый важный)
CREATE INDEX IF NOT EXISTS idx_estimates_user_id 
ON estimates(user_id);

-- Индекс по дате создания
CREATE INDEX IF NOT EXISTS idx_estimates_created_at 
ON estimates(created_at DESC);

-- Составной индекс: пользователь + дата
CREATE INDEX IF NOT EXISTS idx_estimates_user_created 
ON estimates(user_id, created_at DESC);

-- 5. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ПОЗИЦИЙ СМЕТ
-- =============================================================================

-- Индекс по смете
CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate_id 
ON estimate_items(estimate_id);

-- Индекс по оборудованию
CREATE INDEX IF NOT EXISTS idx_estimate_items_equipment_id 
ON estimate_items(equipment_id);

-- 6. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ПОЛЬЗОВАТЕЛЕЙ
-- =============================================================================

-- Индекс по email (для аутентификации)
CREATE INDEX IF NOT EXISTS idx_users_email 
ON users(email);

-- Индекс по роли
CREATE INDEX IF NOT EXISTS idx_users_role 
ON users(role);

-- 7. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ КЕЙСОВ (если существует)
-- =============================================================================

-- Проверяем существование таблицы кейсов
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cases') THEN
        -- Индекс по пользователю
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_cases_user_id ON cases(user_id)';
        
        -- Индекс по статусу
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status)';
        
        -- Индекс по дате создания
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC)';
    END IF;
END $$;

-- 8. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ЛОГОТИПОВ (если существует)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'logos') THEN
        -- Индекс по типу
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_logos_type ON logos(type)';
        
        -- Индекс по активному статусу
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_logos_active ON logos(active) WHERE active = true';
    END IF;
END $$;

-- 9. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ НОВОСТЕЙ (если существует)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'news') THEN
        -- Индекс по дате публикации
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at DESC)';
        
        -- Индекс по статусу публикации
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_news_published ON news(published) WHERE published = true';
        
        -- Индекс для поиска по заголовку
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_news_title_gin ON news USING gin(to_tsvector(''russian'', title))';
    END IF;
END $$;

-- 10. ИНДЕКСЫ ДЛЯ ТАБЛИЦЫ ИЗОБРАЖЕНИЙ (если существует)
-- =============================================================================

DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'images') THEN
        -- Индекс по типу изображения
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_images_type ON images(type)';
        
        -- Индекс по связанной таблице
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_images_related_table ON images(related_table)';
        
        -- Составной индекс: таблица + ID
        EXECUTE 'CREATE INDEX IF NOT EXISTS idx_images_related_table_id ON images(related_table, related_id)';
    END IF;
END $$;

-- =============================================================================
-- АНАЛИЗ СТАТИСТИКИ ДЛЯ ОПТИМИЗАЦИИ ЗАПРОСОВ
-- =============================================================================

-- Обновляем статистику для всех таблиц
ANALYZE equipment_catalog;
ANALYZE equipment_categories;
ANALYZE articles;
ANALYZE estimates;
ANALYZE estimate_items;
ANALYZE users;

-- Проверяем существование и анализируем дополнительные таблицы
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'cases') THEN
        EXECUTE 'ANALYZE cases';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'logos') THEN
        EXECUTE 'ANALYZE logos';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'news') THEN
        EXECUTE 'ANALYZE news';
    END IF;
    
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'images') THEN
        EXECUTE 'ANALYZE images';
    END IF;
END $$;

-- =============================================================================
-- ПРОВЕРКА ЭФФЕКТИВНОСТИ ИНДЕКСОВ
-- =============================================================================

-- Запрос для проверки использования индексов
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_tup_read,
    idx_tup_fetch,
    idx_scan,
    idx_tup_read / NULLIF(idx_scan, 0) as avg_tuples_per_scan
FROM pg_stat_user_indexes 
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Запрос для проверки медленных запросов (если включен pg_stat_statements)
SELECT 
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    max_exec_time
FROM pg_stat_statements 
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY mean_exec_time DESC 
LIMIT 10;

-- =============================================================================
-- ОПТИМИЗАЦИЯ НАСТРОЕК POSTGRESQL
-- =============================================================================

-- Увеличиваем shared_buffers для лучшего кэширования (только для чтения)
-- Эти настройки нужно применять в конфигурации PostgreSQL
/*
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB
random_page_cost = 1.1
effective_io_concurrency = 200
*/

COMMENT ON INDEX idx_equipment_catalog_category_id IS 'Критически важный индекс для фильтрации оборудования по категориям';
COMMENT ON INDEX idx_equipment_catalog_name IS 'Индекс для поиска и сортировки оборудования по названию';
COMMENT ON INDEX idx_articles_published_at IS 'Индекс для сортировки статей по дате публикации';
COMMENT ON INDEX idx_estimates_user_id IS 'Индекс для быстрого доступа к сметам пользователя';
