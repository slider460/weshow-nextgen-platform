-- Настройка Supabase Storage для загрузки файлов

-- Создание bucket для публичных файлов
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public',
  'public',
  true,
  52428800, -- 50MB лимит
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
) ON CONFLICT (id) DO NOTHING;

-- Удаляем ВСЕ существующие политики для storage.objects
DO $$ 
DECLARE
    policy_name text;
BEGIN
    -- Получаем все политики для таблицы storage.objects
    FOR policy_name IN 
        SELECT policyname FROM pg_policies 
        WHERE tablename = 'objects' AND schemaname = 'storage'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_name);
    END LOOP;
END $$;

-- Создание политик RLS для bucket 'public'
-- Политика для чтения (все могут читать)
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'public');

-- Политика для загрузки (все могут загружать)
CREATE POLICY "Anyone can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'public');

-- Политика для обновления (все могут обновлять)
CREATE POLICY "Anyone can update" ON storage.objects
FOR UPDATE USING (bucket_id = 'public');

-- Политика для удаления (все могут удалять)
CREATE POLICY "Anyone can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'public');

-- Сообщение об успешной настройке
SELECT 'Supabase Storage настроен успешно!' as status;
