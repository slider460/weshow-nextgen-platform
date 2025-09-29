import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';

const CopyServicesBlocksSQL: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sqlScript = `-- Создание таблицы для блоков услуг на главной странице
CREATE TABLE IF NOT EXISTS services_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Monitor',
  color VARCHAR(50) NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  link VARCHAR(255) NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_services_blocks_sort_order ON services_blocks(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_blocks_visible ON services_blocks(is_visible);

-- Вставка начальных данных
INSERT INTO services_blocks (title, description, icon, color, link, features, is_visible, sort_order) VALUES
('Мультимедийные решения', 'Интерактивные дисплеи, видеостены и проекционные системы для вашего бизнеса', 'Monitor', 'from-blue-500 to-cyan-500', 'multimedia', ARRAY['LED-видеостены', 'Интерактивные панели', 'Проекционные системы'], true, 1),
('Разработка ПО и игр', 'Создание современных приложений, игр и интерактивных решений', 'Smartphone', 'from-purple-500 to-pink-500', 'development', ARRAY['Мобильные приложения', 'Интерактивные игры', 'AR/VR решения'], true, 2),
('Техническое сопровождение', 'Полная поддержка и обслуживание всех установленных систем', 'Users', 'from-green-500 to-emerald-500', 'technical-support', ARRAY['24/7 мониторинг', 'Профилактика', 'Экстренная поддержка'], true, 3),
('Интеграция мультимедии', 'Объединение различных систем в единую экосистему', 'Settings', 'from-orange-500 to-red-500', 'complex-solutions', ARRAY['Системная интеграция', 'Автоматизация', 'Управление контентом'], true, 4),
('Брендинг мероприятий', 'Создание уникального визуального образа для ваших событий', 'Palette', 'from-indigo-500 to-purple-500', 'design', ARRAY['Визуальная идентичность', 'Интерактивные элементы', 'Цифровые решения'], true, 5),
('Аренда оборудования', 'Временное использование профессионального мультимедийного оборудования', 'Zap', 'from-yellow-500 to-orange-500', 'equipment-rental', ARRAY['Гибкие условия', 'Техподдержка', 'Быстрая доставка'], true, 6)
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
DROP TRIGGER IF EXISTS update_services_blocks_updated_at ON services_blocks;
CREATE TRIGGER update_services_blocks_updated_at
    BEFORE UPDATE ON services_blocks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Включение RLS (Row Level Security)
ALTER TABLE services_blocks ENABLE ROW LEVEL SECURITY;

-- Создание политик RLS для анонимного доступа (только чтение)
CREATE POLICY "Allow anonymous read access" ON services_blocks
    FOR SELECT USING (true);

-- Создание политик RLS для аутентифицированных пользователей (полный доступ)
CREATE POLICY "Allow authenticated full access" ON services_blocks
    FOR ALL USING (auth.role() = 'authenticated');`;

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
            SQL скрипт для создания таблицы services_blocks
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
                      <li>• title (заголовок блока)</li>
                      <li>• description (описание)</li>
                      <li>• icon (иконка)</li>
                      <li>• color (цветовая схема)</li>
                      <li>• link (ссылка)</li>
                      <li>• features (особенности)</li>
                      <li>• is_visible (видимость)</li>
                      <li>• sort_order (порядок)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Начальные данные</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Мультимедийные решения</li>
                      <li>• Разработка ПО и игр</li>
                      <li>• Техническое сопровождение</li>
                      <li>• Интеграция мультимедии</li>
                      <li>• Брендинг мероприятий</li>
                      <li>• Аренда оборудования</li>
                    </ul>
                  </div>
                </div>
                
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-800">
                    После выполнения SQL скрипта админ-панель для управления блоками услуг будет работать корректно!
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Ссылки */}
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="/admin/services-blocks">
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

export default CopyServicesBlocksSQL;
