-- Создание функций для новостей и блога

-- Функция для увеличения просмотров новости
CREATE OR REPLACE FUNCTION increment_news_views(news_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE news 
    SET views = views + 1 
    WHERE id = news_id;
END;
$$ LANGUAGE plpgsql;

-- Функция для увеличения просмотров статьи блога
CREATE OR REPLACE FUNCTION increment_blog_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE blog_posts 
    SET views = views + 1 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Функция для получения статистики новостей
CREATE OR REPLACE FUNCTION get_news_stats()
RETURNS TABLE(
    total_count BIGINT,
    published_count BIGINT,
    draft_count BIGINT,
    archived_count BIGINT,
    featured_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_count,
        COUNT(*) FILTER (WHERE status = 'published') as published_count,
        COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
        COUNT(*) FILTER (WHERE status = 'archived') as archived_count,
        COUNT(*) FILTER (WHERE featured = true) as featured_count
    FROM news;
END;
$$ LANGUAGE plpgsql;

-- Функция для получения статистики блога
CREATE OR REPLACE FUNCTION get_blog_stats()
RETURNS TABLE(
    total_count BIGINT,
    published_count BIGINT,
    draft_count BIGINT,
    archived_count BIGINT,
    featured_count BIGINT,
    total_views BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_count,
        COUNT(*) FILTER (WHERE status = 'published') as published_count,
        COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
        COUNT(*) FILTER (WHERE status = 'archived') as archived_count,
        COUNT(*) FILTER (WHERE featured = true) as featured_count,
        COALESCE(SUM(views), 0) as total_views
    FROM blog_posts;
END;
$$ LANGUAGE plpgsql;

-- Функция для поиска по новостям
CREATE OR REPLACE FUNCTION search_news(
    search_query TEXT,
    category_filter TEXT DEFAULT NULL,
    featured_filter BOOLEAN DEFAULT NULL,
    status_filter TEXT DEFAULT 'published',
    limit_count INTEGER DEFAULT 10,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE(
    id UUID,
    title VARCHAR,
    content TEXT,
    excerpt TEXT,
    category VARCHAR,
    author VARCHAR,
    image_url VARCHAR,
    tags TEXT[],
    views INTEGER,
    featured BOOLEAN,
    status VARCHAR,
    published_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        n.id,
        n.title,
        n.content,
        n.excerpt,
        n.category,
        n.author,
        n.image_url,
        n.tags,
        n.views,
        n.featured,
        n.status,
        n.published_at,
        n.created_at,
        n.updated_at
    FROM news n
    WHERE 
        (search_query IS NULL OR 
         n.title ILIKE '%' || search_query || '%' OR 
         n.content ILIKE '%' || search_query || '%' OR 
         n.excerpt ILIKE '%' || search_query || '%')
        AND (category_filter IS NULL OR n.category = category_filter)
        AND (featured_filter IS NULL OR n.featured = featured_filter)
        AND (status_filter IS NULL OR n.status = status_filter)
    ORDER BY n.published_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Функция для поиска по блогу
CREATE OR REPLACE FUNCTION search_blog_posts(
    search_query TEXT,
    category_filter TEXT DEFAULT NULL,
    featured_filter BOOLEAN DEFAULT NULL,
    status_filter TEXT DEFAULT 'published',
    limit_count INTEGER DEFAULT 10,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE(
    id UUID,
    title VARCHAR,
    excerpt VARCHAR,
    content TEXT,
    category VARCHAR,
    author VARCHAR,
    read_time VARCHAR,
    image_url VARCHAR,
    tags TEXT[],
    views INTEGER,
    featured BOOLEAN,
    status VARCHAR,
    published_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bp.id,
        bp.title,
        bp.excerpt,
        bp.content,
        bp.category,
        bp.author,
        bp.read_time,
        bp.image_url,
        bp.tags,
        bp.views,
        bp.featured,
        bp.status,
        bp.published_at,
        bp.created_at,
        bp.updated_at
    FROM blog_posts bp
    WHERE 
        (search_query IS NULL OR 
         bp.title ILIKE '%' || search_query || '%' OR 
         bp.content ILIKE '%' || search_query || '%' OR 
         bp.excerpt ILIKE '%' || search_query || '%')
        AND (category_filter IS NULL OR bp.category = category_filter)
        AND (featured_filter IS NULL OR bp.featured = featured_filter)
        AND (status_filter IS NULL OR bp.status = status_filter)
    ORDER BY bp.published_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Функция для получения рекомендуемых статей блога
CREATE OR REPLACE FUNCTION get_featured_blog_posts(limit_count INTEGER DEFAULT 3)
RETURNS TABLE(
    id UUID,
    title VARCHAR,
    excerpt VARCHAR,
    content TEXT,
    category VARCHAR,
    author VARCHAR,
    read_time VARCHAR,
    image_url VARCHAR,
    tags TEXT[],
    views INTEGER,
    featured BOOLEAN,
    status VARCHAR,
    published_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bp.id,
        bp.title,
        bp.excerpt,
        bp.content,
        bp.category,
        bp.author,
        bp.read_time,
        bp.image_url,
        bp.tags,
        bp.views,
        bp.featured,
        bp.status,
        bp.published_at,
        bp.created_at,
        bp.updated_at
    FROM blog_posts bp
    WHERE bp.featured = true 
        AND bp.status = 'published'
    ORDER BY bp.published_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Функция для получения похожих статей
CREATE OR REPLACE FUNCTION get_related_blog_posts(
    exclude_id UUID,
    category_filter VARCHAR,
    limit_count INTEGER DEFAULT 3
)
RETURNS TABLE(
    id UUID,
    title VARCHAR,
    excerpt VARCHAR,
    content TEXT,
    category VARCHAR,
    author VARCHAR,
    read_time VARCHAR,
    image_url VARCHAR,
    tags TEXT[],
    views INTEGER,
    featured BOOLEAN,
    status VARCHAR,
    published_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bp.id,
        bp.title,
        bp.excerpt,
        bp.content,
        bp.category,
        bp.author,
        bp.read_time,
        bp.image_url,
        bp.tags,
        bp.views,
        bp.featured,
        bp.status,
        bp.published_at,
        bp.created_at,
        bp.updated_at
    FROM blog_posts bp
    WHERE bp.category = category_filter 
        AND bp.id != exclude_id
        AND bp.status = 'published'
    ORDER BY bp.published_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
