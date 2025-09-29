-- ИСПРАВЛЕНИЕ RLS ПОЛИТИК ДЛЯ ТАБЛИЦЫ HOMEPAGE_EQUIPMENT
-- Удаляем существующие политики
DROP POLICY IF EXISTS "Allow anonymous read access" ON homepage_equipment;
DROP POLICY IF EXISTS "Allow authenticated full access" ON homepage_equipment;

-- Создаем новые политики
-- 1. Политика для чтения - все могут читать
CREATE POLICY "Public read access for homepage_equipment" ON homepage_equipment
    FOR SELECT USING (true);

-- 2. Политика для записи - только аутентифицированные пользователи
CREATE POLICY "Authenticated users can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (
        auth.uid() IS NOT NULL
    );

-- Альтернативная политика для админов (если есть таблица users с ролями)
-- Раскомментируйте, если хотите ограничить доступ только админам
/*
CREATE POLICY "Admins can manage homepage_equipment" ON homepage_equipment
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );
*/

-- Сообщение об успешном исправлении
SELECT 'RLS политики для homepage_equipment исправлены!' as status;
