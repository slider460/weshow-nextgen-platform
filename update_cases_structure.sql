-- Обновление структуры таблицы cases для поддержки галереи и видео

-- Добавляем новые поля для галереи изображений
ALTER TABLE cases ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS gallery_videos TEXT[] DEFAULT '{}';
ALTER TABLE cases ADD COLUMN IF NOT EXISTS detailed_description TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS project_duration TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS team_size INTEGER;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS budget_range TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS challenges TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS solutions TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS technologies_used TEXT[];
ALTER TABLE cases ADD COLUMN IF NOT EXISTS project_scope TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS client_feedback TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS awards TEXT[];
ALTER TABLE cases ADD COLUMN IF NOT EXISTS case_study_url TEXT;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Обновляем существующие кейсы с базовыми данными
UPDATE cases SET 
  detailed_description = description,
  project_duration = '3-6 месяцев',
  team_size = 5,
  budget_range = 'Средний',
  challenges = 'Техническая сложность проекта',
  solutions = 'Инновационные решения',
  technologies_used = ARRAY['React', 'Node.js', 'Supabase'],
  project_scope = 'Полный цикл разработки',
  client_feedback = 'Отличная работа команды',
  featured = true
WHERE id IS NOT NULL;

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_cases_featured ON cases(featured);
CREATE INDEX IF NOT EXISTS idx_cases_year ON cases(year);
CREATE INDEX IF NOT EXISTS idx_cases_visible ON cases(is_visible);
