# Ручная настройка Supabase Storage для изображений

## Проблема
SQL скрипт не может выполниться из-за ограничений прав доступа к таблице `storage.objects`.

## Решение 1: Упрощенный SQL скрипт

Выполните файл `setup_images_storage_simple.sql` в Supabase SQL Editor.

## Решение 2: Настройка через веб-интерфейс

### 1. Создание Storage Bucket
1. Откройте Supabase Dashboard
2. Перейдите в раздел **Storage**
3. Нажмите **"New bucket"**
4. Заполните поля:
   - **Name**: `images`
   - **Public bucket**: ✅ Включено
   - **File size limit**: `5 MB`
   - **Allowed MIME types**: `image/*`

### 2. Настройка политик безопасности
1. В разделе Storage → Buckets → `images`
2. Перейдите на вкладку **"Policies"**
3. Создайте следующие политики:

#### Политика 1: Публичный доступ к чтению
- **Policy name**: `Public read access`
- **Operation**: `SELECT`
- **Target roles**: `public`
- **Policy definition**:
```sql
bucket_id = 'images'
```

#### Политика 2: Загрузка для аутентифицированных пользователей
- **Policy name**: `Authenticated upload`
- **Operation**: `INSERT`
- **Target roles**: `authenticated`
- **Policy definition**:
```sql
bucket_id = 'images'
```

#### Политика 3: Обновление для аутентифицированных пользователей
- **Policy name**: `Authenticated update`
- **Operation**: `UPDATE`
- **Target roles**: `authenticated`
- **Policy definition**:
```sql
bucket_id = 'images'
```

#### Политика 4: Удаление для аутентифицированных пользователей
- **Policy name**: `Authenticated delete`
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

### 2. Тестирование загрузки
1. Откройте `http://localhost:8083/test-image-upload`
2. Попробуйте загрузить изображение
3. Проверьте, что файл появился в Storage → `images`

### 3. Тестирование в админке
1. Перейдите в админку новостей
2. Создайте новую новость с изображением
3. Проверьте отображение на странице новостей

## Альтернативное решение: Использование внешних URL

Если настройка Storage вызывает проблемы, можно использовать внешние URL изображений:

1. Загрузите изображения на внешний сервис (например, imgur.com, cloudinary.com)
2. Скопируйте URL изображения
3. Вставьте URL в поле "URL изображения" в админке

## Структура файлов после настройки

```
Storage Bucket: images/
├── news/
│   ├── 1703123456789_abc123.jpg
│   ├── 1703123456790_def456.png
│   └── ...
```

## Устранение неполадок

### Ошибка "Bucket not found"
- Убедитесь, что bucket `images` создан
- Проверьте, что bucket публичный

### Ошибка "Permission denied"
- Проверьте политики RLS для bucket
- Убедитесь, что пользователь аутентифицирован

### Ошибка "File too large"
- Проверьте лимит размера файла (должен быть 5MB)
- Сожмите изображение перед загрузкой

После настройки система загрузки изображений будет полностью функциональна! 🎉
