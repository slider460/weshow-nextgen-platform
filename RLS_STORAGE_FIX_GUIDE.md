# Исправление ошибки RLS для загрузки изображений

## Проблема
Ошибка: `"new row violates row-level security policy"` при загрузке изображений в Supabase Storage.

## Причина
Политики Row Level Security (RLS) блокируют загрузку файлов в Storage bucket.

## Решения

### Решение 1: Исправление политик RLS (рекомендуется)

1. **Выполните SQL скрипт** `fix_storage_rls_policies.sql` в Supabase SQL Editor
2. **Проверьте результат** - должны появиться 4 политики для bucket `images`

### Решение 2: Временное отключение RLS (только для тестирования)

⚠️ **ВНИМАНИЕ**: Это отключает безопасность! Используйте только для тестирования!

1. **Выполните скрипт** `disable_storage_rls_temporarily.sql`
2. **Протестируйте загрузку** изображений
3. **Обязательно включите RLS обратно** после тестирования:
   ```sql
   ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
   ```

### Решение 3: Настройка через веб-интерфейс

1. Откройте Supabase Dashboard
2. Перейдите в **Storage** → **Policies**
3. Создайте следующие политики для таблицы `storage.objects`:

#### Политика 1: Публичное чтение
- **Name**: `Images are publicly accessible`
- **Operation**: `SELECT`
- **Target roles**: `public`
- **Policy definition**:
  ```sql
  bucket_id = 'images'
  ```

#### Политика 2: Загрузка для аутентифицированных
- **Name**: `Authenticated users can upload images`
- **Operation**: `INSERT`
- **Target roles**: `authenticated`
- **Policy definition**:
  ```sql
  bucket_id = 'images'
  ```

#### Политика 3: Обновление для аутентифицированных
- **Name**: `Authenticated users can update images`
- **Operation**: `UPDATE`
- **Target roles**: `authenticated`
- **Policy definition**:
  ```sql
  bucket_id = 'images'
  ```

#### Политика 4: Удаление для аутентифицированных
- **Name**: `Authenticated users can delete images`
- **Operation**: `DELETE`
- **Target roles**: `authenticated`
- **Policy definition**:
  ```sql
  bucket_id = 'images'
  ```

## Проверка настройки

### 1. Проверка bucket
```sql
SELECT * FROM storage.buckets WHERE id = 'images';
```

### 2. Проверка политик
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
```

### 3. Проверка статуса RLS
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';
```

## Тестирование

1. **Откройте тестовую страницу**: `http://localhost:8083/test-image-upload`
2. **Попробуйте загрузить изображение**
3. **Проверьте, что файл появился в Storage**

## Альтернативное решение

Если проблемы с Storage продолжаются, используйте внешние URL изображений:

1. Загрузите изображение на внешний сервис (imgur.com, cloudinary.com)
2. Скопируйте URL изображения
3. Вставьте URL в поле "URL изображения" в админке

## Структура файлов

```
📁 SQL скрипты:
├── fix_storage_rls_policies.sql          # Исправление политик RLS
├── disable_storage_rls_temporarily.sql   # Временное отключение RLS
└── setup_images_storage_simple.sql       # Создание bucket

📁 Документация:
├── RLS_STORAGE_FIX_GUIDE.md              # Эта инструкция
├── STORAGE_SETUP_MANUAL.md               # Ручная настройка
└── IMAGE_UPLOAD_SETUP_COMPLETE.md        # Общая настройка
```

## После исправления

После выполнения любого из решений:
1. ✅ Загрузка файлов будет работать
2. ✅ Изображения будут сохраняться в Storage
3. ✅ URL изображений будут корректно отображаться в новостях
4. ✅ Админка будет синхронизироваться с БД

## Безопасность

⚠️ **Важно**: После тестирования обязательно включите RLS обратно для безопасности:
```sql
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

Система загрузки изображений будет полностью функциональна! 🎉
