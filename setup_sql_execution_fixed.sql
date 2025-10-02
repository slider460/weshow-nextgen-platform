-- Настройка выполнения SQL через API (ИСПРАВЛЕННАЯ ВЕРСИЯ)
-- Выполните этот код в Supabase SQL Editor

-- 1. Создаем функцию для выполнения SQL
CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
BEGIN
    -- Выполняем SQL запрос
    EXECUTE sql_query;
    
    -- Возвращаем результат
    RETURN json_build_object('success', true, 'message', 'SQL executed successfully');
EXCEPTION
    WHEN OTHERS THEN
        -- В случае ошибки возвращаем информацию об ошибке
        RETURN json_build_object(
            'success', false, 
            'message', SQLERRM,
            'error_code', SQLSTATE
        );
END;
$$;

-- 2. Даем права на выполнение функции
GRANT EXECUTE ON FUNCTION exec_sql(text) TO service_role;
GRANT EXECUTE ON FUNCTION exec_sql(text) TO authenticated;

-- 3. Создаем функцию для создания таблиц
CREATE OR REPLACE FUNCTION create_table_safely(table_name text, table_definition text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
BEGIN
    -- Выполняем CREATE TABLE
    EXECUTE 'CREATE TABLE IF NOT EXISTS ' || table_name || ' (' || table_definition || ')';
    
    RETURN json_build_object(
        'success', true, 
        'message', 'Table ' || table_name || ' created successfully'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false, 
            'message', SQLERRM,
            'error_code', SQLSTATE
        );
END;
$$;

-- 4. Даем права на создание таблиц
GRANT EXECUTE ON FUNCTION create_table_safely(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION create_table_safely(text, text) TO authenticated;

-- 5. Создаем функцию для проверки существования таблицы
CREATE OR REPLACE FUNCTION table_exists(table_name text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    exists boolean;
BEGIN
    SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
    ) INTO exists;
    
    RETURN exists;
END;
$$;

-- 6. Даем права на проверку таблиц
GRANT EXECUTE ON FUNCTION table_exists(text) TO service_role;
GRANT EXECUTE ON FUNCTION table_exists(text) TO authenticated;

-- 7. Создаем функцию для получения списка таблиц
CREATE OR REPLACE FUNCTION get_tables()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
BEGIN
    SELECT json_agg(table_name) INTO result
    FROM information_schema.tables 
    WHERE table_schema = 'public';
    
    RETURN COALESCE(result, '[]'::json);
END;
$$;

-- 8. Даем права на получение списка таблиц
GRANT EXECUTE ON FUNCTION get_tables() TO service_role;
GRANT EXECUTE ON FUNCTION get_tables() TO authenticated;

-- 9. Создаем функцию для создания таблицы letters_certificates
CREATE OR REPLACE FUNCTION create_letters_certificates_table()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
BEGIN
    -- Создаем таблицу
    CREATE TABLE IF NOT EXISTS letters_certificates (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT,
        document_url TEXT,
        type VARCHAR(50) NOT NULL CHECK (type IN ('letter', 'certificate', 'award', 'diploma')),
        issuer VARCHAR(255) NOT NULL,
        issued_date DATE,
        is_visible BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Включаем RLS
    ALTER TABLE letters_certificates ENABLE ROW LEVEL SECURITY;
    
    -- Создаем политики безопасности
    -- Сначала удаляем существующие политики
    DROP POLICY IF EXISTS "Anyone can view visible letters and certificates" ON letters_certificates;
    DROP POLICY IF EXISTS "Admins can manage letters and certificates" ON letters_certificates;
    
    -- Создаем политики
    CREATE POLICY "Anyone can view visible letters and certificates" 
    ON letters_certificates FOR SELECT 
    USING (is_visible = true);
    
    CREATE POLICY "Admins can manage letters and certificates" 
    ON letters_certificates FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );
    
    -- Добавляем тестовые данные
    INSERT INTO letters_certificates (title, description, type, issuer, issued_date, sort_order) VALUES
    ('Благодарственное письмо от Газпром', 'За качественное выполнение мультимедийного проекта', 'letter', 'ПАО Газпром', '2024-01-15', 1),
    ('Сертификат качества', 'Сертификат соответствия международным стандартам', 'certificate', 'ISO International', '2024-02-20', 2),
    ('Диплом за инновации', 'Диплом за внедрение инновационных решений в мультимедиа', 'diploma', 'Российская ассоциация мультимедиа', '2024-03-10', 3),
    ('Награда за лучший проект', 'Награда за лучший мультимедийный проект года', 'award', 'Московская ассоциация дизайнеров', '2024-04-05', 4)
    ON CONFLICT DO NOTHING;
    
    RETURN json_build_object(
        'success', true, 
        'message', 'Table letters_certificates created successfully with test data'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false, 
            'message', SQLERRM,
            'error_code', SQLSTATE
        );
END;
$$;

-- 10. Даем права на создание таблицы letters_certificates
GRANT EXECUTE ON FUNCTION create_letters_certificates_table() TO service_role;
GRANT EXECUTE ON FUNCTION create_letters_certificates_table() TO authenticated;

-- 11. Создаем функцию для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Создаем триггер для автоматического обновления updated_at
-- Сначала удаляем триггер если он существует
DROP TRIGGER IF EXISTS update_letters_certificates_updated_at ON letters_certificates;

-- Создаем триггер
CREATE TRIGGER update_letters_certificates_updated_at
    BEFORE UPDATE ON letters_certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 13. Даем полные права service_role на все таблицы
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- 14. Создаем функцию для выполнения любых SQL команд
CREATE OR REPLACE FUNCTION execute_any_sql(sql_command text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
BEGIN
    -- Выполняем SQL команду
    EXECUTE sql_command;
    
    RETURN json_build_object(
        'success', true, 
        'message', 'SQL command executed successfully',
        'command', sql_command
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false, 
            'message', SQLERRM,
            'error_code', SQLSTATE,
            'command', sql_command
        );
END;
$$;

-- 15. Даем права на выполнение любых SQL команд
GRANT EXECUTE ON FUNCTION execute_any_sql(text) TO service_role;

-- Готово! Теперь можно выполнять SQL через API
