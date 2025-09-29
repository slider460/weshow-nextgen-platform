-- Исправленный SQL скрипт для создания таблицы logos в Supabase
-- Выполните этот скрипт в Supabase Dashboard -> SQL Editor

-- Создаем таблицу logos (если не существует)
CREATE TABLE IF NOT EXISTS logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  website TEXT,
  description TEXT,
  category VARCHAR(50) NOT NULL DEFAULT 'other',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создаем индексы для быстрого поиска (если не существуют)
CREATE INDEX IF NOT EXISTS idx_logos_active ON logos(is_active);
CREATE INDEX IF NOT EXISTS idx_logos_category ON logos(category);
CREATE INDEX IF NOT EXISTS idx_logos_sort_order ON logos(sort_order);

-- Вставляем базовые логотипы (только если таблица пустая)
INSERT INTO logos (name, logo_url, category, is_active, sort_order) 
SELECT * FROM (VALUES
  ('ВТБ', '/placeholder.svg', 'banking', true, 1),
  ('Сбербанк', '/placeholder.svg', 'banking', true, 2),
  ('Газпром', '/placeholder.svg', 'energy', true, 3),
  ('МТС', '/placeholder.svg', 'telecom', true, 4),
  ('Лукойл', '/placeholder.svg', 'energy', true, 5),
  ('Ростелеком', '/placeholder.svg', 'telecom', true, 6),
  ('Аэрофлот', '/placeholder.svg', 'aviation', true, 7),
  ('Яндекс', '/placeholder.svg', 'tech', true, 8)
) AS v(name, logo_url, category, is_active, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM logos LIMIT 1);

-- Включаем RLS (если не включен)
ALTER TABLE logos ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики (если есть)
DROP POLICY IF EXISTS "Allow public read access" ON logos;
DROP POLICY IF EXISTS "Allow public write access" ON logos;

-- Создаем новые политики
CREATE POLICY "Allow public read access" ON logos
    FOR SELECT USING (true);

CREATE POLICY "Allow public write access" ON logos
    FOR ALL USING (true);

-- Создаем функцию для автоматического обновления updated_at (если не существует)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Удаляем существующий триггер (если есть)
DROP TRIGGER IF EXISTS update_logos_updated_at ON logos;

-- Создаем триггер для автоматического обновления updated_at
CREATE TRIGGER update_logos_updated_at 
    BEFORE UPDATE ON logos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Проверяем результат
SELECT 
  id, 
  name, 
  category, 
  is_active, 
  sort_order,
  created_at
FROM logos 
ORDER BY sort_order;
