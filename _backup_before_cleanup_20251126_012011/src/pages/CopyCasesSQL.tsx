import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';

const CopyCasesSQL: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- Создание таблицы для кейсов (проектов)
CREATE TABLE IF NOT EXISTS cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  client VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  image_url TEXT,
  video_url TEXT,
  results TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_cases_sort_order ON cases(sort_order);
CREATE INDEX IF NOT EXISTS idx_cases_visible ON cases(is_visible);
CREATE INDEX IF NOT EXISTS idx_cases_year ON cases(year);

-- Вставка начальных данных
INSERT INTO cases (title, description, client, year, image_url, results, is_visible, sort_order) VALUES
('Мультимедийная инсталляция для банка ВТБ', 'Комплексное оснащение головного офиса интерактивными LED-панелями и системами управления', 'ВТБ', 2024, '/images/cases/vtb-2024.jpg', 'Повышение эффективности презентаций на 40%, улучшение клиентского опыта', true, 1),
('3D-маппинг для корпоративного мероприятия Сбербанка', 'Проекционный маппинг для презентации новых технологических решений на конференции', 'Сбербанк', 2024, '/images/cases/sberbank-2024.jpg', 'Успешная презентация инноваций, положительные отзывы участников', true, 2),
('Стенд Самарской области на выставке-форуме «Россия»', 'Интерактивный мультимедийный стенд с цифровыми решениями для представления региона', 'ВДНХ', 2024, '/images/cases/vdnh-2024.jpg', 'Привлечение внимания к региону, новые партнерские связи', true, 3)
ON CONFLICT DO NOTHING;

-- Создание функции для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггера для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_cases_updated_at ON cases;
CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Включение RLS (Row Level Security)
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики (если есть)
DROP POLICY IF EXISTS "Allow anonymous read access" ON cases;
DROP POLICY IF EXISTS "Allow authenticated full access" ON cases;

-- Создание политик RLS для анонимного доступа (только чтение)
CREATE POLICY "Allow anonymous read access" ON cases
    FOR SELECT USING (true);

-- Создание политик RLS для полного доступа (все могут создавать, обновлять, удалять)
CREATE POLICY "Allow full access" ON cases
    FOR ALL USING (true);`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sqlScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            SQL скрипт для создания таблицы cases
          </h1>
          <p className="text-gray-600">
            Скопируйте этот SQL скрипт и выполните его в Supabase Dashboard
          </p>
        </div>

        <div className="space-y-6">
          {/* Инструкции */}
          <Card>
            <CardHeader>
              <CardTitle>Пошаговая инструкция</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  <strong>Откройте Supabase Dashboard:</strong>{' '}
                  <a 
                    href="https://supabase.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    https://supabase.com/dashboard
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
                <li>Войдите в свой аккаунт и выберите проект <strong>WESHOW</strong></li>
                <li>В левом меню нажмите <strong>"SQL Editor"</strong></li>
                <li>Нажмите <strong>"New query"</strong></li>
                <li>Скопируйте SQL скрипт ниже и вставьте в редактор</li>
                <li>Нажмите <strong>"Run"</strong> для выполнения</li>
                <li>Вернитесь в админ-панель и обновите страницу</li>
              </ol>
            </CardContent>
          </Card>

          {/* SQL скрипт */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>SQL скрипт</CardTitle>
                <Button 
                  onClick={handleCopy}
                  className="flex items-center gap-2"
                  variant={copied ? "default" : "outline"}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Скопировано!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Копировать
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{sqlScript}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Результат */}
          <Card>
            <CardHeader>
              <CardTitle>Что будет создано</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Структура таблицы</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• id (UUID, первичный ключ)</li>
                      <li>• title (заголовок кейса)</li>
                      <li>• description (описание)</li>
                      <li>• client (клиент)</li>
                      <li>• year (год)</li>
                      <li>• image_url (URL изображения)</li>
                      <li>• video_url (URL видео)</li>
                      <li>• results (результаты)</li>
                      <li>• is_visible (видимость)</li>
                      <li>• sort_order (порядок)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Начальные данные</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• ВТБ 2024 - Мультимедийная инсталляция</li>
                      <li>• Сбербанк 2024 - 3D-маппинг</li>
                      <li>• ВДНХ 2024 - Интерактивный стенд</li>
                    </ul>
                  </div>
                </div>
                
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-800">
                    После выполнения SQL скрипта админ-панель для управления кейсами будет работать корректно!
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Ссылки */}
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="/admin/cases">
                Перейти в админ-панель
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/admin/">
                Главная админ-панель
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyCasesSQL;
