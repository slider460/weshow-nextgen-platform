# Исправление ошибки RLS для Storage

## Проблема
Ошибка: "new row violates row-level security policy" при загрузке файлов в кейсы.

## Причина
RLS политики для таблицы `storage.objects` не настроены правильно или отсутствуют.

## Решение

### 🚀 Быстрое решение

**Откройте страницу настройки Storage**: `http://localhost:8083/setup-supabase-storage`

Эта страница содержит обновленный SQL скрипт с правильными RLS политиками.

### 📋 Пошаговая инструкция

1. **Откройте Supabase Dashboard**: https://supabase.com/dashboard
2. **Войдите в проект WESHOW**
3. **Перейдите в SQL Editor**
4. **Скопируйте обновленный SQL скрипт** с страницы `/setup-supabase-storage`
5. **Выполните скрипт** в Supabase Dashboard
6. **Вернитесь в админ-панель** и попробуйте загрузить файл

### 🔧 Что исправляет обновленный скрипт

```sql
-- Удаляем существующие политики (если есть)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Создаем новые политики с правильными настройками
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'public');

CREATE POLICY "Anyone can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'public');

CREATE POLICY "Anyone can update" ON storage.objects
FOR UPDATE USING (bucket_id = 'public');

CREATE POLICY "Anyone can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'public');
```

### ✅ Ключевые изменения

1. **Удаление старых политик** - сначала удаляем существующие политики
2. **Упрощенные политики** - убираем проверку аутентификации для загрузки
3. **Публичный доступ** - разрешаем всем загружать файлы в bucket 'public'
4. **Правильный синтаксис** - используем корректный синтаксис для RLS политик

### 🎯 Результат

После выполнения обновленного скрипта:

- ✅ Загрузка изображений будет работать
- ✅ Загрузка видео будет работать
- ✅ RLS ошибки исчезнут
- ✅ Файлы будут сохраняться в Storage

### 🔍 Проверка результата

1. **Выполните SQL скрипт** в Supabase Dashboard
2. **Вернитесь в админ-панель**: `http://localhost:8083/admin/cases`
3. **Попробуйте загрузить изображение** в кейсе
4. **Ошибка RLS должна исчезнуть**

### 🆘 Если проблема остается

1. **Проверьте, что политики созданы** в Supabase Dashboard → Authentication → Policies
2. **Убедитесь, что bucket 'public' существует** в Storage
3. **Проверьте, что RLS включен** для таблицы storage.objects
4. **Очистите кэш браузера** (Ctrl+Shift+R)

### 📖 Альтернативный способ

Если SQL Editor не работает, можно настроить политики через Supabase Dashboard:

1. **Перейдите в Authentication → Policies**
2. **Найдите таблицу storage.objects**
3. **Создайте политики вручную**:
   - Public Access (SELECT)
   - Anyone can upload (INSERT)
   - Anyone can update (UPDATE)
   - Anyone can delete (DELETE)

### 🎉 Готово!

После исправления RLS политик загрузка файлов в кейсах будет работать корректно!
