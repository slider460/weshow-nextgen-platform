-- Исправление RLS политик для таблицы news
-- Позволяет анонимным пользователям создавать, обновлять и удалять новости

-- Удаляем существующие политики
DROP POLICY IF EXISTS "News is viewable by everyone" ON news;
DROP POLICY IF EXISTS "News is insertable by authenticated users" ON news;
DROP POLICY IF EXISTS "News is updatable by authenticated users" ON news;
DROP POLICY IF EXISTS "News is deletable by authenticated users" ON news;

-- Создаем новые политики, разрешающие анонимным пользователям все операции
CREATE POLICY "News is viewable by everyone" ON news
    FOR SELECT USING (true);

CREATE POLICY "News is insertable by everyone" ON news
    FOR INSERT WITH CHECK (true);

CREATE POLICY "News is updatable by everyone" ON news
    FOR UPDATE USING (true);

CREATE POLICY "News is deletable by everyone" ON news
    FOR DELETE USING (true);

-- Аналогично для blog_posts
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are insertable by authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are updatable by authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are deletable by authenticated users" ON blog_posts;

CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Blog posts are insertable by everyone" ON blog_posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Blog posts are updatable by everyone" ON blog_posts
    FOR UPDATE USING (true);

CREATE POLICY "Blog posts are deletable by everyone" ON blog_posts
    FOR DELETE USING (true);

-- Аналогично для newsletter_subscribers
DROP POLICY IF EXISTS "Newsletter subscribers are viewable by authenticated users" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter subscribers are insertable by everyone" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter subscribers are updatable by authenticated users" ON newsletter_subscribers;

CREATE POLICY "Newsletter subscribers are viewable by everyone" ON newsletter_subscribers
    FOR SELECT USING (true);

CREATE POLICY "Newsletter subscribers are insertable by everyone" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Newsletter subscribers are updatable by everyone" ON newsletter_subscribers
    FOR UPDATE USING (true);

-- Проверяем, что политики созданы
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('news', 'blog_posts', 'newsletter_subscribers')
ORDER BY tablename, policyname;
