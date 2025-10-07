-- ВРЕМЕННОЕ отключение RLS для Storage (ТОЛЬКО ДЛЯ ТЕСТИРОВАНИЯ!)
-- ВНИМАНИЕ: Это отключает безопасность! Используйте только для тестирования!

-- Отключаем RLS для storage.objects (ВРЕМЕННО!)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Проверяем статус RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- ВАЖНО: После тестирования обязательно включите RLS обратно:
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
