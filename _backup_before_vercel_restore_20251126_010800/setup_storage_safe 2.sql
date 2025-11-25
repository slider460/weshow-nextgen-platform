-- Безопасная настройка Storage без изменения RLS
-- Этот скрипт работает с обычными правами пользователя

-- 1. Создаем bucket images, если его нет
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB в байтах
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- 2. Проверяем, что bucket создан
SELECT * FROM storage.buckets WHERE id = 'images';

-- 3. Проверяем текущие политики (только чтение)
SELECT 
    policyname,
    cmd,
    qual,
    roles
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage'
ORDER BY policyname;

-- 4. Проверяем статус RLS
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    relforcerowsecurity
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';
