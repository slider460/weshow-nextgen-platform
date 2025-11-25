-- Настройка Supabase Storage для изображений новостей и блога

-- Создание bucket для изображений
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB в байтах
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Политики RLS для bucket images
-- Все могут читать изображения
CREATE POLICY "Images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Аутентифицированные пользователи могут загружать изображения
CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Аутентифицированные пользователи могут обновлять свои изображения
CREATE POLICY "Authenticated users can update images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Аутентифицированные пользователи могут удалять изображения
CREATE POLICY "Authenticated users can delete images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Функция для очистки старых изображений (опционально)
CREATE OR REPLACE FUNCTION cleanup_old_images()
RETURNS void AS $$
BEGIN
  -- Удаляем изображения старше 30 дней, которые не используются в новостях или блоге
  DELETE FROM storage.objects 
  WHERE bucket_id = 'images'
    AND created_at < NOW() - INTERVAL '30 days'
    AND name NOT IN (
      SELECT image_url FROM news WHERE image_url IS NOT NULL
      UNION
      SELECT image_url FROM blog_posts WHERE image_url IS NOT NULL
    );
END;
$$ LANGUAGE plpgsql;

-- Создание индекса для быстрого поиска по bucket_id
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_id ON storage.objects(bucket_id);

-- Создание индекса для быстрого поиска по created_at
CREATE INDEX IF NOT EXISTS idx_storage_objects_created_at ON storage.objects(created_at);

-- Проверка, что bucket создан
SELECT * FROM storage.buckets WHERE id = 'images';
