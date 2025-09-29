# 🔧 Исправление RLS ошибки для homepage_equipment

## ❌ Проблема
При попытке добавить новый блок оборудования возникает ошибка:
```
new row violates row-level security policy for table "homepage_equipment"
```

## 🔍 Диагностика
- ✅ Подключение к Supabase работает
- ✅ Таблица `homepage_equipment` существует
- ✅ Данные в таблице есть (можно читать)
- ❌ RLS политики блокируют добавление новых записей

## 🛠️ Решение

### Вариант 1: Временное отключение RLS (рекомендуется для тестирования)

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql)
2. Перейдите в **SQL Editor**
3. Выполните следующий SQL:

```sql
-- ВРЕМЕННОЕ ОТКЛЮЧЕНИЕ RLS ДЛЯ HOMEPAGE_EQUIPMENT
ALTER TABLE homepage_equipment DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Admins can manage homepage_equipment" ON homepage_equipment;

-- Сообщение об успешном отключении
SELECT 'RLS для homepage_equipment отключен для тестирования!' as status;
```

### Вариант 2: Исправление RLS политик (рекомендуется для продакшена)

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt/sql)
2. Перейдите в **SQL Editor**
3. Выполните следующий SQL:

```sql
-- ИСПРАВЛЕНИЕ RLS ПОЛИТИК ДЛЯ HOMEPAGE_EQUIPMENT
-- Удаляем существующие политики
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;

-- Создаем новые политики
-- 1. Политика для чтения - все могут читать
CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);

-- 2. Политика для записи - только аутентифицированные пользователи
CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (
        auth.uid() IS NOT NULL
    );

-- Сообщение об успешном исправлении
SELECT 'RLS политики для homepage_equipment исправлены!' as status;
```

## 🧪 Тестирование

После выполнения одного из вариантов:

1. Обновите страницу админ-панели
2. Попробуйте добавить новый блок оборудования
3. Ошибка RLS должна исчезнуть

## 📋 Проверка результата

Выполните этот SQL для проверки:

```sql
-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'homepage_equipment';

-- Проверяем политики
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'homepage_equipment';
```

## 🔄 Восстановление RLS (если нужно)

Если вы отключили RLS и хотите его включить обратно:

```sql
-- Включаем RLS обратно
ALTER TABLE homepage_equipment ENABLE ROW LEVEL SECURITY;

-- Создаем правильные политики
CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (auth.uid() IS NOT NULL);
```

## 📝 Примечания

- **Вариант 1** подходит для разработки и тестирования
- **Вариант 2** подходит для продакшена
- После исправления все функции админ-панели должны работать корректно
- RLS политики защищают данные от несанкционированного доступа
