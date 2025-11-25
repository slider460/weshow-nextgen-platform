-- SQL скрипт для добавления новых полей в таблицу cases
-- Выполните этот скрипт в Supabase Dashboard -> SQL Editor

-- Добавляем новые поля для расширенной функциональности кейсов
ALTER TABLE cases ADD COLUMN IF NOT EXISTS detailed_description TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS gallery_videos TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS project_duration TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS team_size INTEGER;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS budget_range TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS challenges TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS solutions TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS technologies_used TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS project_scope TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS client_feedback TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS awards TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS case_study_url TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Обновляем существующие кейсы с базовыми данными
UPDATE cases SET 
  detailed_description = COALESCE(detailed_description, description || ' - Подробное описание проекта с техническими деталями и результатами.'),
  project_duration = COALESCE(project_duration, '3-6 месяцев'),
  team_size = COALESCE(team_size, 5),
  budget_range = COALESCE(budget_range, 'Средний'),
  challenges = COALESCE(challenges, 'Техническая сложность проекта, интеграция различных систем'),
  solutions = COALESCE(solutions, 'Инновационные решения, использование современных технологий'),
  technologies_used = COALESCE(technologies_used, ARRAY['React', 'Node.js', 'Supabase', 'TypeScript']),
  project_scope = COALESCE(project_scope, 'Полный цикл разработки от концепции до реализации'),
  client_feedback = COALESCE(client_feedback, 'Отличная работа команды, проект выполнен в срок и с высоким качеством'),
  featured = COALESCE(featured, true)
WHERE id IS NOT NULL;

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_cases_featured ON cases(featured);
CREATE INDEX IF NOT EXISTS idx_cases_year ON cases(year);
CREATE INDEX IF NOT EXISTS idx_cases_visible ON cases(is_visible);
CREATE INDEX IF NOT EXISTS idx_cases_client ON cases(client);

-- Обновляем RLS политики для новых полей
DROP POLICY IF EXISTS "Allow anonymous read access" ON cases;
DROP POLICY IF EXISTS "Allow full access" ON cases;

CREATE POLICY "Allow anonymous read access" ON cases
    FOR SELECT USING (true);

CREATE POLICY "Allow full access" ON cases
    FOR ALL USING (true);

-- Проверяем результат
SELECT 
  id, 
  title, 
  client, 
  year,
  featured,
  is_visible,
  array_length(technologies_used, 1) as tech_count,
  array_length(gallery_images, 1) as gallery_count
FROM cases 
ORDER BY sort_order;
