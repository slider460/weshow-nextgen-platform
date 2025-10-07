-- ===============================================
-- СОЗДАНИЕ ТАБЛИЦ ДЛЯ АДМИН ПАНЕЛИ
-- Основано на структуре из AdminContext и AdminDashboard
-- ===============================================

-- 1. ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ (если не существует)
-- ===============================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    company_name VARCHAR(255),
    role VARCHAR(20) DEFAULT 'client' CHECK (role IN ('client', 'admin', 'super_admin')),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. ТАБЛИЦА АДМИН ПОЛЬЗОВАТЕЛЕЙ
-- ===============================================

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'moderator')),
    permissions TEXT[] DEFAULT ARRAY['read', 'write'],
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ТАБЛИЦА ЗАЯВОК (ESTIMATES)
-- ===============================================

CREATE TABLE IF NOT EXISTS estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE,
    event_location VARCHAR(255),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'confirmed', 'canceled')),
    total_amount DECIMAL(12,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ТАБЛИЦА ПОЗИЦИЙ ЗАЯВОК
-- ===============================================

CREATE TABLE IF NOT EXISTS estimate_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE,
    equipment_id UUID REFERENCES equipment_catalog(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price_at_creation DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(12,2) GENERATED ALWAYS AS (quantity * price_at_creation) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ТАБЛИЦА ОБОРУДОВАНИЯ В ЗАЯВКАХ
-- ===============================================

CREATE TABLE IF NOT EXISTS estimate_equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES estimates(id) ON DELETE CASCADE,
    equipment_id UUID REFERENCES equipment_catalog(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    rental_days INTEGER NOT NULL DEFAULT 1,
    daily_rate DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(12,2) GENERATED ALWAYS AS (quantity * rental_days * daily_rate) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ТАБЛИЦА КАТАЛОГА ОБОРУДОВАНИЯ
-- ===============================================

CREATE TABLE IF NOT EXISTS equipment_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    model VARCHAR(100),
    description TEXT,
    specifications JSONB,
    pricing JSONB,
    availability JSONB,
    media JSONB,
    requirements JSONB,
    tags TEXT[],
    rating JSONB,
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ТАБЛИЦА ПОРТФОЛИО (из AdminContext)
-- ===============================================

CREATE TABLE IF NOT EXISTS portfolio_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    description TEXT,
    short_description TEXT,
    content TEXT,
    cover_image TEXT,
    thumbnail TEXT,
    photos TEXT[],
    videos TEXT[],
    gallery TEXT[],
    year VARCHAR(4),
    client VARCHAR(255),
    location VARCHAR(255),
    duration VARCHAR(100),
    budget VARCHAR(100),
    results TEXT[],
    technologies TEXT[],
    tags TEXT[],
    featured BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    seo JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    author VARCHAR(100),
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    version INTEGER DEFAULT 1,
    previous_versions JSONB DEFAULT '[]'::jsonb
);

-- 8. ТАБЛИЦА КАТЕГОРИЙ ПОРТФОЛИО
-- ===============================================

CREATE TABLE IF NOT EXISTS portfolio_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7),
    icon VARCHAR(10),
    order_index INTEGER DEFAULT 0,
    count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. ТАБЛИЦА МЕДИА ФАЙЛОВ
-- ===============================================

CREATE TABLE IF NOT EXISTS media_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    file_type VARCHAR(20) CHECK (file_type IN ('image', 'video', 'document', 'audio')),
    width INTEGER,
    height INTEGER,
    duration INTEGER, -- для видео/аудио в секундах
    alt_text TEXT,
    caption TEXT,
    tags TEXT[],
    folder_id UUID,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. СОЗДАЕМ ИНДЕКСЫ ДЛЯ ПРОИЗВОДИТЕЛЬНОСТИ
-- ===============================================

-- Индексы для users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Индексы для admin_users
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Индексы для estimates
CREATE INDEX IF NOT EXISTS idx_estimates_user_id ON estimates(user_id);
CREATE INDEX IF NOT EXISTS idx_estimates_status ON estimates(status);
CREATE INDEX IF NOT EXISTS idx_estimates_created_at ON estimates(created_at);
CREATE INDEX IF NOT EXISTS idx_estimates_event_date ON estimates(event_date);

-- Индексы для estimate_items
CREATE INDEX IF NOT EXISTS idx_estimate_items_estimate_id ON estimate_items(estimate_id);
CREATE INDEX IF NOT EXISTS idx_estimate_items_equipment_id ON estimate_items(equipment_id);

-- Индексы для estimate_equipment
CREATE INDEX IF NOT EXISTS idx_estimate_equipment_estimate_id ON estimate_equipment(estimate_id);
CREATE INDEX IF NOT EXISTS idx_estimate_equipment_equipment_id ON estimate_equipment(equipment_id);

-- Индексы для equipment_catalog
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_category ON equipment_catalog(category);
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_brand ON equipment_catalog(brand);
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_featured ON equipment_catalog(featured);
CREATE INDEX IF NOT EXISTS idx_equipment_catalog_is_active ON equipment_catalog(is_active);

-- Индексы для portfolio_items
CREATE INDEX IF NOT EXISTS idx_portfolio_items_slug ON portfolio_items(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_status ON portfolio_items(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_featured ON portfolio_items(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_published_at ON portfolio_items(published_at);

-- Индексы для portfolio_categories
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_slug ON portfolio_categories(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_categories_order ON portfolio_categories(order_index);

-- Индексы для media_files
CREATE INDEX IF NOT EXISTS idx_media_files_file_type ON media_files(file_type);
CREATE INDEX IF NOT EXISTS idx_media_files_uploaded_by ON media_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_files_folder_id ON media_files(folder_id);
CREATE INDEX IF NOT EXISTS idx_media_files_is_public ON media_files(is_public);

-- 11. СОЗДАЕМ ТРИГГЕРЫ ДЛЯ АВТОМАТИЧЕСКОГО ОБНОВЛЕНИЯ
-- ===============================================

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_estimates_updated_at BEFORE UPDATE ON estimates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_catalog_updated_at BEFORE UPDATE ON equipment_catalog
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON portfolio_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_categories_updated_at BEFORE UPDATE ON portfolio_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON media_files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 12. ПРОВЕРЯЕМ СОЗДАННЫЕ ТАБЛИЦЫ
-- ===============================================

-- Проверяем существование всех таблиц
SELECT 
    table_name,
    CASE 
        WHEN table_name IN (
            'users', 'admin_users', 'estimates', 'estimate_items', 
            'estimate_equipment', 'equipment_catalog', 'portfolio_items',
            'portfolio_categories', 'media_files'
        ) THEN '✅ Создана'
        ELSE '❌ Отсутствует'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN (
        'users', 'admin_users', 'estimates', 'estimate_items', 
        'estimate_equipment', 'equipment_catalog', 'portfolio_items',
        'portfolio_categories', 'media_files'
    )
ORDER BY table_name;

-- Проверяем индексы
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN (
    'users', 'admin_users', 'estimates', 'estimate_items', 
    'estimate_equipment', 'equipment_catalog', 'portfolio_items',
    'portfolio_categories', 'media_files'
)
ORDER BY tablename, indexname;

-- Финальное сообщение
SELECT '🚀 ВСЕ ТАБЛИЦЫ АДМИН ПАНЕЛИ СОЗДАНЫ! Структура готова для работы' as status;
