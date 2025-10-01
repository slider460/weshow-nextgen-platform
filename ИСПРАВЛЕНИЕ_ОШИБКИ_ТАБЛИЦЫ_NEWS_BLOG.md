# 🔧 ИСПРАВЛЕНИЕ: Ошибка "relation news_blog does not exist"

## ⚡ Проблема: Таблица news_blog не существует в базе данных

**Ошибка:** `ERROR: 42P01: relation "news_blog" does not exist`

**Причина:** В SQL скрипте была ссылка на несуществующую таблицу `news_blog`

## 🛠️ РЕШЕНИЕ

### Используйте исправленный SQL скрипт:

1. **Откройте Supabase SQL Editor:**
   https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql

2. **Скопируйте и выполните код из файла:**
   `ИСПРАВЛЕННЫЙ_SQL_СКРИПТ.sql`

### Что исправлено в новом скрипте:

- ✅ Убрана ссылка на несуществующую таблицу `news_blog`
- ✅ Добавлена проверка существующих таблиц
- ✅ Исправлены политики только для реальных таблиц
- ✅ Проверка результата работает корректно

### Таблицы, которые будут исправлены:

1. **homepage_equipment** - Блоки оборудования
2. **logos** - Логотипы партнеров  
3. **cases** - Кейсы и проекты
4. **services_blocks** - Блоки услуг
5. **user_profiles** - Профили пользователей

## ✅ РЕЗУЛЬТАТ

После выполнения исправленного скрипта:
- Должно появиться: "🚀 RLS ПОЛИТИКИ ДЛЯ СУЩЕСТВУЮЩИХ ТАБЛИЦ ИСПРАВЛЕНЫ!"
- Все существующие таблицы будут работать корректно
- Доступ к БД будет стабильным

## 🔍 Если нужно создать таблицу news_blog

Если в будущем потребуется таблица news_blog, выполните:

```sql
-- Создание таблицы news_blog (если потребуется)
CREATE TABLE IF NOT EXISTS news_blog (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    excerpt TEXT,
    slug TEXT UNIQUE,
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS политики для news_blog
ALTER TABLE news_blog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for news_blog" ON news_blog
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage news_blog" ON news_blog
    FOR ALL USING (auth.uid() IS NOT NULL);
```

## 📋 Чек-лист

После выполнения исправленного скрипта:
- [ ] Нет ошибок в SQL Editor
- [ ] Показано сообщение об успешном исправлении
- [ ] Проверка показывает количество записей в таблицах
- [ ] RLS политики применены для всех таблиц

---

*Исправление создано: ${new Date().toLocaleString('ru-RU')}*  
*Статус: Готово к применению*
