-- Исправление политик RLS для Supabase Storage
-- Этот скрипт должен решить проблему с загрузкой изображений

-- Сначала создаем bucket, если его нет
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB в байтах
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Удаляем существующие политики, если они есть
DROP POLICY IF EXISTS "Images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Создаем новые политики для bucket images
-- Политика 1: Все могут читать изображения
CREATE POLICY "Images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Политика 2: Аутентифицированные пользователи могут загружать
CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Политика 3: Аутентифицированные пользователи могут обновлять
CREATE POLICY "Authenticated users can update images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Политика 4: Аутентифицированные пользователи могут удалять
CREATE POLICY "Authenticated users can delete images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Проверяем, что bucket создан
SELECT * FROM storage.buckets WHERE id = 'images';

-- Проверяем политики
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
