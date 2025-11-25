-- Проверка настройки Storage для изображений

-- 1. Проверяем, существует ли bucket images
SELECT * FROM storage.buckets WHERE id = 'images';

-- 2. Проверяем все политики для storage.objects
SELECT 
    policyname,
    cmd,
    qual,
    roles
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage'
ORDER BY policyname;

-- 3. Проверяем статус RLS для storage.objects
SELECT 
    schemaname, 
    tablename, 
    rowsecurity,
    relforcerowsecurity
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- 4. Если bucket images не существует, создаем его
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB в байтах
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- 5. Проверяем содержимое bucket (если есть файлы)
SELECT 
    name,
    bucket_id,
    created_at,
    size
FROM storage.objects 
WHERE bucket_id = 'images'
ORDER BY created_at DESC
LIMIT 10;
