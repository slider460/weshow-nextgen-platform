-- Упрощенное исправление Storage политик
-- Выполните этот скрипт, если основной скрипт не работает

-- Отключаем RLS временно для удаления политик
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики вручную
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Включаем RLS обратно
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Создаем новые политики
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'public');

CREATE POLICY "Anyone can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'public');

CREATE POLICY "Anyone can update" ON storage.objects
FOR UPDATE USING (bucket_id = 'public');

CREATE POLICY "Anyone can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'public');

-- Сообщение об успешном исправлении
SELECT 'Storage политики исправлены!' as status;
