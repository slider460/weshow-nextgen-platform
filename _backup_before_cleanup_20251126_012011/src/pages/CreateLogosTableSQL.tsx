import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Copy, Check, Database, ArrowRight } from 'lucide-react';

const CreateLogosTableSQL = () => {
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- Исправленный SQL скрипт для создания таблицы logos в Supabase
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
            Исправленный SQL скрипт для таблицы logos
          </h1>
          <p className="text-slate-600">
            Этот исправленный SQL скрипт создает таблицу для хранения логотипов компаний в базе данных Supabase. 
            Скрипт проверяет существование объектов перед их созданием, что предотвращает ошибки.
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
                  После выполнения скрипта проверьте, что таблица logos создана и содержит базовые логотипы
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Что создает этот скрипт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Структура таблицы</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• id - Уникальный идентификатор</li>
                  <li>• name - Название компании</li>
                  <li>• logo_url - URL логотипа</li>
                  <li>• website - Сайт компании</li>
                  <li>• description - Описание</li>
                  <li>• category - Категория</li>
                  <li>• is_active - Активность</li>
                  <li>• sort_order - Порядок сортировки</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Дополнительно</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Индексы для быстрого поиска</li>
                  <li>• RLS политики для безопасности</li>
                  <li>• Автоматическое обновление updated_at</li>
                  <li>• Базовые логотипы по умолчанию</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Исправления в этой версии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Проверка существования политик</h4>
                  <p className="text-sm text-slate-600">
                    Скрипт сначала удаляет существующие политики, а затем создает новые. Это предотвращает ошибку "policy already exists".
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Безопасная вставка данных</h4>
                  <p className="text-sm text-slate-600">
                    Базовые логотипы добавляются только если таблица пустая, что предотвращает дублирование данных.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Проверка триггеров</h4>
                  <p className="text-sm text-slate-600">
                    Скрипт удаляет существующий триггер перед созданием нового, что предотвращает конфликты.
                  </p>
                </div>
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
            <a href="/admin/logos">
              Перейти к управлению логотипами
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLogosTableSQL;
