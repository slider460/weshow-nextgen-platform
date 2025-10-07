# 🗑️ Исправление проблемы удаления новостей

## 🚨 Проблема
Не удается удалить новости из админ-панели. Кнопки удаления (красные иконки корзины) не работают.

## 🔍 Причина
**RLS (Row Level Security) политики** блокируют операции удаления для анонимных пользователей. В текущих политиках только аутентифицированные пользователи могут удалять записи, но админ-панель работает без аутентификации.

## ✅ Решение

### 1. Откройте Supabase Dashboard
🌐 **Перейдите по ссылке:** https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt

### 2. Перейдите в SQL Editor
1. В левом меню нажмите **"SQL Editor"**
2. Нажмите **"New query"**

### 3. Выполните SQL скрипт
Скопируйте и вставьте весь код из файла `fix_news_rls_policies.sql`:

```sql
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
```

### 4. Нажмите "Run"
Нажмите кнопку **"Run"** для выполнения SQL скрипта.

### 5. Проверьте результат
После выполнения вы должны увидеть список политик для всех таблиц.

## 🔍 Проверка

После исправления RLS политик:

1. **Обновите админ-панель** - http://localhost:8082/admin/news
2. **Попробуйте удалить новость** - нажмите на красную кнопку с корзиной
3. **Подтвердите удаление** - в диалоге подтверждения
4. **Проверьте результат** - новость должна исчезнуть из списка

## 🚨 Альтернативное решение (если не помогло)

Если RLS политики не помогают, можно временно отключить RLS:

```sql
-- ВНИМАНИЕ: Это отключает безопасность на уровне строк!
-- Используйте только для разработки

ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
```

## 🔧 Отладка

Если удаление все еще не работает:

1. **Откройте консоль браузера** (F12 → Console)
2. **Попробуйте удалить новость**
3. **Посмотрите на сообщения** - должны быть логи:
   - `🗑️ Удаляем новость с ID: ...`
   - `🔍 API: Удаляем новость с ID: ...`
   - `✅ API: Новость успешно удалена`
   - `✅ Новость успешно удалена`

4. **Если есть ошибки** - скопируйте их и проверьте:
   - Ошибки RLS (permission denied)
   - Ошибки сети (network error)
   - Ошибки API (API error)

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте файл `fix_news_rls_policies.sql` в корне проекта
2. Убедитесь, что подключение к Supabase работает
3. Проверьте консоль браузера на ошибки
4. Убедитесь, что таблицы `news` и `blog_posts` существуют

---
**Время исправления: 2-3 минуты** ⏱️
