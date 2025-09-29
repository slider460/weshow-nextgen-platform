-- ПОЛНОЕ ИСПРАВЛЕНИЕ RLS ПОЛИТИК
-- Сначала удаляем ВСЕ существующие политики

-- Удаляем все политики для users
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Managers can view all users" ON users;
DROP POLICY IF EXISTS "Admins can manage users" ON users;

-- Удаляем все политики для equipment_catalog
DROP POLICY IF EXISTS "Anyone can view equipment" ON equipment_catalog;
DROP POLICY IF EXISTS "Managers can manage equipment" ON equipment_catalog;
DROP POLICY IF EXISTS "Public read access for equipment" ON equipment_catalog;
DROP POLICY IF EXISTS "Admins can manage equipment" ON equipment_catalog;

-- Удаляем все политики для equipment_categories
DROP POLICY IF EXISTS "Anyone can view categories" ON equipment_categories;
DROP POLICY IF EXISTS "Managers can manage categories" ON equipment_categories;
DROP POLICY IF EXISTS "Public read access for equipment_categories" ON equipment_categories;
DROP POLICY IF EXISTS "Admins can manage equipment_categories" ON equipment_categories;

-- Удаляем все политики для estimates
DROP POLICY IF EXISTS "Users can view own estimates" ON estimates;
DROP POLICY IF EXISTS "Users can create estimates" ON estimates;
DROP POLICY IF EXISTS "Users can update own estimates" ON estimates;
DROP POLICY IF EXISTS "Managers can view all estimates" ON estimates;
DROP POLICY IF EXISTS "Managers can update all estimates" ON estimates;
DROP POLICY IF EXISTS "Public read access for estimates" ON estimates;
DROP POLICY IF EXISTS "Admins can manage estimates" ON estimates;

-- Удаляем все политики для estimate_items
DROP POLICY IF EXISTS "Users can view own estimate items" ON estimate_items;
DROP POLICY IF EXISTS "Users can create estimate items" ON estimate_items;
DROP POLICY IF EXISTS "Users can update own estimate items" ON estimate_items;
DROP POLICY IF EXISTS "Users can delete own estimate items" ON estimate_items;
DROP POLICY IF EXISTS "Managers can manage all estimate items" ON estimate_items;
DROP POLICY IF EXISTS "Public read access for estimate_items" ON estimate_items;
DROP POLICY IF EXISTS "Admins can manage estimate_items" ON estimate_items;

-- Удаляем все политики для articles
DROP POLICY IF EXISTS "Anyone can view published articles" ON articles;
DROP POLICY IF EXISTS "Authors can view own articles" ON articles;
DROP POLICY IF EXISTS "Managers can create articles" ON articles;
DROP POLICY IF EXISTS "Authors can update own articles" ON articles;
DROP POLICY IF EXISTS "Managers can update all articles" ON articles;
DROP POLICY IF EXISTS "Public read access for articles" ON articles;
DROP POLICY IF EXISTS "Admins can manage articles" ON articles;

-- Удаляем все политики для article_categories
DROP POLICY IF EXISTS "Anyone can view article categories" ON article_categories;
DROP POLICY IF EXISTS "Managers can manage article categories" ON article_categories;
DROP POLICY IF EXISTS "Public read access for article_categories" ON article_categories;
DROP POLICY IF EXISTS "Admins can manage article_categories" ON article_categories;

-- Удаляем проблемные функции
DROP FUNCTION IF EXISTS get_user_role() CASCADE;
DROP FUNCTION IF EXISTS is_manager_or_admin() CASCADE;

-- Теперь создаем простые политики без рекурсии

-- 1. USERS - только админы могут управлять
CREATE POLICY "Admins can manage users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- 2. EQUIPMENT_CATALOG - все могут читать, админы управляют
CREATE POLICY "Public read access for equipment" ON equipment_catalog
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage equipment" ON equipment_catalog
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- 3. EQUIPMENT_CATEGORIES - все могут читать, админы управляют
CREATE POLICY "Public read access for equipment_categories" ON equipment_categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage equipment_categories" ON equipment_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- 4. ESTIMATES - все могут читать, админы управляют
CREATE POLICY "Public read access for estimates" ON estimates
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage estimates" ON estimates
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- 5. ESTIMATE_ITEMS - все могут читать, админы управляют
CREATE POLICY "Public read access for estimate_items" ON estimate_items
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage estimate_items" ON estimate_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- 6. ARTICLES - все могут читать, админы управляют
CREATE POLICY "Public read access for articles" ON articles
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage articles" ON articles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- 7. ARTICLE_CATEGORIES - все могут читать, админы управляют
CREATE POLICY "Public read access for article_categories" ON article_categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage article_categories" ON article_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Сообщение об успешном завершении
SELECT 'RLS политики успешно исправлены!' as status;
