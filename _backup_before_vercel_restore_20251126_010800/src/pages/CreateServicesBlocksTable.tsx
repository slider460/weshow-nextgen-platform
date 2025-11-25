import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CreateServicesBlocksTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const sqlScript = `
-- Создание таблицы для блоков услуг на главной странице
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
    FOR ALL USING (auth.role() = 'authenticated');
`;

  const executeSQL = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Выполняем SQL скрипт по частям
      const statements = sqlScript
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);

      for (const statement of statements) {
        if (statement.trim()) {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          if (error) {
            console.error('SQL Error:', error);
            throw error;
          }
        }
      }

      setResult({
        success: true,
        message: 'Таблица services_blocks успешно создана! Теперь можно перейти в админ-панель.'
      });
    } catch (error: any) {
      console.error('Error executing SQL:', error);
      setResult({
        success: false,
        message: `Ошибка выполнения SQL: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  const checkTableExists = async () => {
    try {
      const { data, error } = await supabase
        .from('services_blocks')
        .select('count')
        .limit(1);

      if (error) {
        setResult({
          success: false,
          message: 'Таблица services_blocks не существует. Необходимо выполнить SQL скрипт.'
        });
      } else {
        setResult({
          success: true,
          message: 'Таблица services_blocks уже существует!'
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: 'Таблица services_blocks не существует. Необходимо выполнить SQL скрипт.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Создание таблицы services_blocks
          </h1>
          <p className="text-gray-600">
            Эта страница поможет создать таблицу для управления блоками услуг в админ-панели
          </p>
        </div>

        <div className="space-y-6">
          {/* Проверка таблицы */}
          <Card>
            <CardHeader>
              <CardTitle>Проверка таблицы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Сначала проверим, существует ли таблица services_blocks в базе данных.
              </p>
              <Button onClick={checkTableExists} disabled={loading}>
                Проверить таблицу
              </Button>
            </CardContent>
          </Card>

          {/* Результат */}
          {result && (
            <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                )}
                <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                  {result.message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* SQL скрипт */}
          <Card>
            <CardHeader>
              <CardTitle>SQL скрипт для создания таблицы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Если таблица не существует, выполните следующий SQL скрипт:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{sqlScript}</code>
                </pre>
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={executeSQL} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Выполнить SQL скрипт
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigator.clipboard.writeText(sqlScript)}
                >
                  Копировать SQL
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Инструкции */}
          <Card>
            <CardHeader>
              <CardTitle>Инструкции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Способ 1: Через эту страницу</h3>
                  <p className="text-gray-600">
                    Нажмите кнопку "Выполнить SQL скрипт" выше. Это попытается создать таблицу автоматически.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Способ 2: Через Supabase Dashboard</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Откройте https://supabase.com/dashboard</li>
                    <li>Войдите в свой аккаунт и выберите проект WESHOW</li>
                    <li>Перейдите в SQL Editor</li>
                    <li>Скопируйте SQL скрипт выше и вставьте в редактор</li>
                    <li>Нажмите "Run" для выполнения</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">После создания таблицы</h3>
                  <p className="text-gray-600">
                    Перейдите в админ-панель: <a href="/admin/services-blocks" className="text-blue-600 hover:underline">/admin/services-blocks</a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateServicesBlocksTable;
