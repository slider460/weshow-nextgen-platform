# 🗄️ Настройка таблиц Supabase

## 🚨 Проблема
Админ-панель показывает ошибку: **"Could not find the table 'public.news' in the schema cache"**

Это означает, что таблицы `news` и `blog_posts` не созданы в базе данных Supabase.

## ✅ Решение

### 1. Откройте Supabase Dashboard
🌐 **Перейдите по ссылке:** https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt

### 2. Перейдите в SQL Editor
1. В левом меню нажмите **"SQL Editor"**
2. Нажмите **"New query"**

### 3. Выполните SQL скрипт
Скопируйте и вставьте весь код из файла `create_news_blog_tables.sql`:

```sql
-- Создание таблиц для новостей и блога WESHOW

-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(200) NOT NULL,
    image_url VARCHAR(500),
    tags TEXT[], -- массив тегов
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица статей блога
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(200) NOT NULL,
    read_time VARCHAR(20), -- например "10 мин"
    image_url VARCHAR(500),
    tags TEXT[], -- массив тегов
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица подписчиков на рассылку
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(200),
    language VARCHAR(10) DEFAULT 'ru' CHECK (language IN ('ru', 'en')),
    categories TEXT[] DEFAULT '{}', -- интересующие категории
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT NOW(),
    unsubscribed_at TIMESTAMP,
    last_activity TIMESTAMP DEFAULT NOW(),
    source VARCHAR(100), -- откуда подписался
    metadata JSONB DEFAULT '{}'
);

-- Создание индексов для производительности
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news(published_at);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured);
CREATE INDEX IF NOT EXISTS idx_news_views ON news(views);

CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_views ON blog_posts(views);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers(is_active);
CREATE INDEX IF NOT EXISTS idx_newsletter_language ON newsletter_subscribers(language);

-- Включение RLS (Row Level Security)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Политики RLS для новостей (все могут читать, только админы могут изменять)
CREATE POLICY "News is viewable by everyone" ON news
    FOR SELECT USING (true);

CREATE POLICY "News is insertable by authenticated users" ON news
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "News is updatable by authenticated users" ON news
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "News is deletable by authenticated users" ON news
    FOR DELETE USING (auth.role() = 'authenticated');

-- Политики RLS для блога
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Blog posts are insertable by authenticated users" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Blog posts are updatable by authenticated users" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Blog posts are deletable by authenticated users" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Политики RLS для подписчиков
CREATE POLICY "Newsletter subscribers are viewable by authenticated users" ON newsletter_subscribers
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Newsletter subscribers are insertable by everyone" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Newsletter subscribers are updatable by authenticated users" ON newsletter_subscribers
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Вставка тестовых данных
INSERT INTO news (title, content, excerpt, category, author, image_url, tags, views, featured) VALUES
('WESHOW запускает новую платформу мультимедийных решений', 
 'Мы рады представить нашу новую платформу, которая объединяет все наши услуги в единую экосистему. Платформа включает в себя интерактивные дисплеи, AR/VR решения, 3D маппинг и многое другое. Это революционный шаг в развитии мультимедийных технологий, который позволит нашим клиентам создавать еще более впечатляющие проекты.',
 'Новая платформа объединяет все услуги WESHOW в единую экосистему с интерактивными дисплеями, AR/VR решениями и 3D маппингом...',
 'Технологии', 'Команда WESHOW', '/placeholder.svg', 
 ARRAY['платформа', 'мультимедиа', 'инновации'], 1247, true),
 
('Успешный запуск проекта для ВДНХ', 
 'Наша команда успешно реализовала масштабный проект для ВДНХ, создав интерактивную экспозицию с использованием передовых технологий. Проект получил высокую оценку от руководства выставки и посетителей.',
 'Масштабный проект для ВДНХ с интерактивной экспозицией и передовыми технологиями получил высокую оценку...',
 'Проекты', 'Александр Петров', '/placeholder.svg', 
 ARRAY['ВДНХ', 'интерактив', 'экспозиция'], 892, false);

INSERT INTO blog_posts (title, excerpt, content, category, author, read_time, image_url, tags, views, featured) VALUES
('AI в мультимедиа: Революция в создании контента 2024', 
 'Как искусственный интеллект трансформирует индустрию мультимедиа, от генерации контента до персонализации пользовательского опыта.',
 'Искусственный интеллект становится движущей силой в мультимедийной индустрии. Современные AI-алгоритмы способны создавать уникальный визуальный контент, генерировать музыку и даже писать сценарии. Особенно впечатляют возможности в области персонализации - AI анализирует поведение пользователей и адаптирует контент под их предпочтения в реальном времени. Это открывает новые горизонты для интерактивных мероприятий и иммерсивных проекций.',
 'ai', 'Александр Народецкий', '10 мин', '/placeholder.svg', 
 ARRAY['AI', 'мультимедиа', 'генерация контента', 'персонализация', '2024'], 1247, true),
 
('Как создать впечатляющий 3D-маппинг: Пошаговое руководство', 
 'Пошаговое руководство по созданию захватывающих 3D-маппинг проекций для ваших мероприятий и презентаций. От концепции до реализации.',
 '3D-маппинг - это искусство превращения обычных поверхностей в живые, динамичные произведения искусства. Процесс создания начинается с тщательного анализа архитектуры объекта, разработки концепции и создания 3D-моделей. Ключевым фактором успеха является точная калибровка проекторов и синхронизация с аудио-визуальным контентом. Современные технологии позволяют создавать проекции на зданиях, скульптурах и даже движущихся объектах.',
 'multimedia', 'Святослав Дементьев', '12 мин', '/placeholder.svg', 
 ARRAY['3D-маппинг', 'визуализация', 'мероприятия', 'проекции', 'творчество'], 892, false);

-- Вставка тестовых подписчиков
INSERT INTO newsletter_subscribers (email, name, language, categories, source) VALUES
('test@example.com', 'Тестовый пользователь', 'ru', ARRAY['Технологии', 'Проекты'], 'website'),
('admin@weshow.ru', 'Администратор', 'ru', ARRAY['Все'], 'admin_panel');
```

### 4. Нажмите "Run"
Нажмите кнопку **"Run"** для выполнения SQL скрипта.

### 5. Проверьте результат
После выполнения вы должны увидеть:
- ✅ Таблицы `news`, `blog_posts`, `newsletter_subscribers` созданы
- ✅ Индексы и политики RLS настроены
- ✅ Тестовые данные добавлены

## 🔍 Проверка

После создания таблиц:

1. **Обновите админ-панель** - ошибка должна исчезнуть
2. **Проверьте разделы:**
   - Управление новостями
   - Управление блогом
   - Статистика

## 🚨 Если что-то пошло не так

1. **Проверьте логи** в Supabase Dashboard → Logs
2. **Убедитесь в правильности SQL** - скопируйте точно из файла
3. **Проверьте права доступа** - убедитесь, что вы авторизованы в Supabase

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте файл `create_news_blog_tables.sql` в корне проекта
2. Убедитесь, что подключение к Supabase работает
3. Проверьте консоль браузера на ошибки

---
**Время настройки: 5-10 минут** ⏱️
