-- Row Level Security (RLS) Policies for WeShow Database
-- Настройка политик безопасности для доступа к данным

-- Включаем RLS для всех таблиц
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE estimate_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;

-- 1. ПОЛИТИКИ ДЛЯ USERS
-- Пользователи могут видеть только свои данные
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Пользователи могут обновлять только свои данные
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Менеджеры и админы могут видеть всех пользователей
CREATE POLICY "Managers can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- 2. ПОЛИТИКИ ДЛЯ EQUIPMENT_CATALOG
-- Все могут читать каталог оборудования
CREATE POLICY "Anyone can view equipment" ON equipment_catalog
    FOR SELECT USING (is_active = true);

-- Только менеджеры и админы могут изменять каталог
CREATE POLICY "Managers can manage equipment" ON equipment_catalog
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- 3. ПОЛИТИКИ ДЛЯ EQUIPMENT_CATEGORIES
-- Все могут читать категории
CREATE POLICY "Anyone can view categories" ON equipment_categories
    FOR SELECT USING (true);

-- Только менеджеры и админы могут изменять категории
CREATE POLICY "Managers can manage categories" ON equipment_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- 4. ПОЛИТИКИ ДЛЯ ESTIMATES
-- Пользователи могут видеть только свои сметы
CREATE POLICY "Users can view own estimates" ON estimates
    FOR SELECT USING (auth.uid() = user_id);

-- Пользователи могут создавать сметы
CREATE POLICY "Users can create estimates" ON estimates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Пользователи могут обновлять только свои сметы
CREATE POLICY "Users can update own estimates" ON estimates
    FOR UPDATE USING (auth.uid() = user_id);

-- Менеджеры и админы могут видеть все сметы
CREATE POLICY "Managers can view all estimates" ON estimates
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- Менеджеры и админы могут обновлять все сметы
CREATE POLICY "Managers can update all estimates" ON estimates
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- 5. ПОЛИТИКИ ДЛЯ ESTIMATE_ITEMS
-- Пользователи могут видеть позиции своих смет
CREATE POLICY "Users can view own estimate items" ON estimate_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM estimates 
            WHERE id = estimate_id 
            AND user_id = auth.uid()
        )
    );

-- Пользователи могут создавать позиции для своих смет
CREATE POLICY "Users can create estimate items" ON estimate_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM estimates 
            WHERE id = estimate_id 
            AND user_id = auth.uid()
        )
    );

-- Пользователи могут обновлять позиции своих смет
CREATE POLICY "Users can update own estimate items" ON estimate_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM estimates 
            WHERE id = estimate_id 
            AND user_id = auth.uid()
        )
    );

-- Пользователи могут удалять позиции своих смет
CREATE POLICY "Users can delete own estimate items" ON estimate_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM estimates 
            WHERE id = estimate_id 
            AND user_id = auth.uid()
        )
    );

-- Менеджеры и админы могут управлять всеми позициями
CREATE POLICY "Managers can manage all estimate items" ON estimate_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- 6. ПОЛИТИКИ ДЛЯ ARTICLES
-- Все могут читать опубликованные статьи
CREATE POLICY "Anyone can view published articles" ON articles
    FOR SELECT USING (is_published = true);

-- Авторы могут видеть свои статьи (включая неопубликованные)
CREATE POLICY "Authors can view own articles" ON articles
    FOR SELECT USING (auth.uid() = author_id);

-- Только менеджеры и админы могут создавать статьи
CREATE POLICY "Managers can create articles" ON articles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- Авторы могут обновлять свои статьи
CREATE POLICY "Authors can update own articles" ON articles
    FOR UPDATE USING (auth.uid() = author_id);

-- Менеджеры и админы могут обновлять все статьи
CREATE POLICY "Managers can update all articles" ON articles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- 7. ПОЛИТИКИ ДЛЯ ARTICLE_CATEGORIES
-- Все могут читать категории статей
CREATE POLICY "Anyone can view article categories" ON article_categories
    FOR SELECT USING (true);

-- Только менеджеры и админы могут управлять категориями
CREATE POLICY "Managers can manage article categories" ON article_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role IN ('manager', 'admin')
        )
    );

-- Создаем функцию для проверки роли пользователя
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT role FROM users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Создаем функцию для проверки, является ли пользователь менеджером или админом
CREATE OR REPLACE FUNCTION is_manager_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role IN ('manager', 'admin') 
        FROM users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
