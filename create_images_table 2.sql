-- Создание таблицы для хранения изображений в БД
-- Изображения будут храниться как BYTEA (BLOB) данные

-- Таблица для хранения изображений
CREATE TABLE IF NOT EXISTS images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size_bytes INTEGER NOT NULL,
    data BYTEA NOT NULL, -- BLOB данные изображения
    thumbnail_data BYTEA, -- миниатюра для быстрого отображения
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_images_filename ON images(filename);
CREATE INDEX IF NOT EXISTS idx_images_mime_type ON images(mime_type);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at);

-- Включение RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Политики RLS для изображений
-- Все могут читать изображения
CREATE POLICY "Images are viewable by everyone" ON images
    FOR SELECT USING (true);

-- Аутентифицированные пользователи могут загружать
CREATE POLICY "Images are insertable by authenticated users" ON images
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Аутентифицированные пользователи могут обновлять
CREATE POLICY "Images are updatable by authenticated users" ON images
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Аутентифицированные пользователи могут удалять
CREATE POLICY "Images are deletable by authenticated users" ON images
    FOR DELETE USING (auth.role() = 'authenticated');

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images
    FOR EACH ROW EXECUTE FUNCTION update_images_updated_at();

-- Функция для создания миниатюры (опционально)
CREATE OR REPLACE FUNCTION create_image_thumbnail(image_data BYTEA, max_width INTEGER DEFAULT 300, max_height INTEGER DEFAULT 300)
RETURNS BYTEA AS $$
BEGIN
    -- В реальном приложении здесь была бы обработка изображения
    -- Пока возвращаем оригинальные данные
    RETURN image_data;
END;
$$ LANGUAGE plpgsql;

-- Проверяем создание таблицы
SELECT * FROM information_schema.tables WHERE table_name = 'images';
