-- ЭКСТРЕННОЕ ИСПРАВЛЕНИЕ RLS
-- Выполните этот скрипт в Supabase SQL Editor

-- 1. ВРЕМЕННО отключаем RLS полностью
ALTER TABLE logos DISABLE ROW LEVEL SECURITY;

-- 2. Проверяем данные
SELECT COUNT(*) as total_records FROM logos;
SELECT id, name, is_active FROM logos LIMIT 5;

-- 3. Включаем RLS обратно
ALTER TABLE logos ENABLE ROW LEVEL SECURITY;

-- 4. Создаем простую политику для всех
CREATE POLICY "Allow all operations" ON logos
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- 5. Проверяем финальный результат
SELECT COUNT(*) as final_count FROM logos;










