-- БЫСТРОЕ ИСПРАВЛЕНИЕ ЗАВИСАНИЯ АДМИН ПАНЕЛИ
-- Скопируйте и выполните этот код в Supabase SQL Editor

-- Исправляем таблицу homepage_equipment (блоки оборудования)
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Public read access for homepage_equipment" ON homepage_equipment;
DROP POLICY IF EXISTS "Authenticated users can manage homepage_equipment" ON homepage_equipment;

CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Проверяем результат
SELECT 'homepage_equipment исправлена!' as status;
SELECT COUNT(*) as total_equipment FROM homepage_equipment;
