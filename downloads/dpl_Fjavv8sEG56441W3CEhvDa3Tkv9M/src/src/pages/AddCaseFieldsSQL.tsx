import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Copy, Check, Database, ArrowRight } from 'lucide-react';

const AddCaseFieldsSQL = () => {
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- SQL скрипт для добавления новых полей в таблицу cases
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
ORDER BY sort_order;`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Обновление структуры таблицы cases
          </h1>
          <p className="text-slate-600">
            Этот SQL скрипт добавляет новые поля для расширенной функциональности кейсов, 
            включая галерею изображений, видео, подробные описания и многое другое.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                SQL скрипт для Supabase
              </CardTitle>
              <Button onClick={handleCopy} variant="outline">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Копировать
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm">
              <code>{sqlScript}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Инструкция по выполнению</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Откройте Supabase Dashboard</h3>
                <p className="text-slate-600">
                  Перейдите на <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://supabase.com/dashboard</a> и войдите в свой проект WESHOW
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Перейдите в SQL Editor</h3>
                <p className="text-slate-600">
                  В левом меню выберите "SQL Editor" для выполнения SQL запросов
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Скопируйте и выполните скрипт</h3>
                <p className="text-slate-600">
                  Скопируйте SQL скрипт выше, вставьте его в редактор и нажмите "Run" для выполнения
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                4
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Проверьте результат</h3>
                <p className="text-slate-600">
                  После выполнения скрипта проверьте, что новые поля добавлены в таблицу cases
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Что добавляет этот скрипт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Основные поля</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• detailed_description - Подробное описание</li>
                  <li>• project_duration - Длительность проекта</li>
                  <li>• team_size - Размер команды</li>
                  <li>• budget_range - Бюджет проекта</li>
                  <li>• featured - Рекомендуемый проект</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Дополнительные поля</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• gallery_images[] - Галерея изображений</li>
                  <li>• gallery_videos[] - Галерея видео</li>
                  <li>• technologies_used[] - Используемые технологии</li>
                  <li>• awards[] - Награды и достижения</li>
                  <li>• client_feedback - Отзыв клиента</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
              <Database className="w-4 h-4 mr-2" />
              Открыть Supabase Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          
          <Button variant="outline" asChild>
            <a href="/admin/cases">
              Перейти к управлению кейсами
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCaseFieldsSQL;
