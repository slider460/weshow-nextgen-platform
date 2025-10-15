import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, Copy, ExternalLink, AlertTriangle } from 'lucide-react';

const SimpleStorageFix: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const simpleSqlScript = `-- Упрощенное исправление Storage политик
-- Выполните этот скрипт, если основной скрипт не работает

-- Отключаем RLS временно для удаления политик
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Удаляем все политики вручную
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;

-- Включаем RLS обратно
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Создаем новые политики
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'public');

CREATE POLICY "Anyone can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'public');

CREATE POLICY "Anyone can update" ON storage.objects
FOR UPDATE USING (bucket_id = 'public');

CREATE POLICY "Anyone can delete" ON storage.objects
FOR DELETE USING (bucket_id = 'public');

-- Сообщение об успешном исправлении
SELECT 'Storage политики исправлены!' as status;`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(simpleSqlScript);
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
            Упрощенное исправление Storage
          </h1>
          <p className="text-gray-600">
            Используйте этот скрипт, если основной скрипт не работает из-за существующих политик
          </p>
        </div>

        <div className="space-y-6">
          {/* Предупреждение */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Внимание:</strong> Этот скрипт временно отключает RLS для удаления политик. 
              Используйте его только если основной скрипт не работает.
            </AlertDescription>
          </Alert>

          {/* Инструкции */}
          <Card>
            <CardHeader>
              <CardTitle>Когда использовать этот скрипт</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Если возникает ошибка "policy already exists"</li>
                <li>Если основной скрипт не может удалить существующие политики</li>
                <li>Если нужно полностью пересоздать политики Storage</li>
                <li>Если у вас есть проблемы с RLS настройками</li>
              </ul>
            </CardContent>
          </Card>

          {/* SQL скрипт */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Упрощенный SQL скрипт</CardTitle>
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
                  <code>{simpleSqlScript}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Пошаговая инструкция */}
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
                <li>Скопируйте упрощенный SQL скрипт выше и вставьте в редактор</li>
                <li>Нажмите <strong>"Run"</strong> для выполнения</li>
                <li>Дождитесь сообщения <strong>"Storage политики исправлены!"</strong></li>
                <li>Вернитесь в админ-панель и попробуйте загрузить файл</li>
              </ol>
            </CardContent>
          </Card>

          {/* Что делает скрипт */}
          <Card>
            <CardHeader>
              <CardTitle>Что делает этот скрипт</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Шаг 1: Отключение RLS</h3>
                    <p className="text-sm text-gray-600">
                      Временно отключает Row Level Security для возможности удаления политик
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Шаг 2: Удаление политик</h3>
                    <p className="text-sm text-gray-600">
                      Удаляет все существующие политики для таблицы storage.objects
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Шаг 3: Включение RLS</h3>
                    <p className="text-sm text-gray-600">
                      Включает Row Level Security обратно
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Шаг 4: Создание политик</h3>
                    <p className="text-sm text-gray-600">
                      Создает новые политики с правильными настройками
                    </p>
                  </div>
                </div>
                
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    После выполнения этого скрипта загрузка файлов в кейсах должна работать корректно!
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Ссылки */}
          <div className="flex justify-center gap-4">
            <Button asChild>
              <a href="/admin/cases">
                Перейти к управлению кейсами
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/setup-supabase-storage">
                Основной скрипт настройки
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

export default SimpleStorageFix;
