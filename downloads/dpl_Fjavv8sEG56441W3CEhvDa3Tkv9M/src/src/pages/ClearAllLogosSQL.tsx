import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Copy, AlertTriangle, Database } from 'lucide-react';

const ClearAllLogosSQL = () => {
  const sqlScript = `-- Очистка всех логотипов из базы данных
-- ВНИМАНИЕ: Этот скрипт удалит ВСЕ логотипы без возможности восстановления!

-- Проверяем количество логотипов перед удалением
SELECT 
  COUNT(*) as total_logos,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_logos,
  COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_logos
FROM logos;

-- Удаляем все логотипы
DELETE FROM logos;

-- Проверяем результат
SELECT 
  COUNT(*) as remaining_logos
FROM logos;

-- Сбрасываем счетчик автоинкремента (если используется)
-- ALTER SEQUENCE logos_id_seq RESTART WITH 1;

-- Показываем статистику
SELECT 
  'Очистка завершена' as status,
  'Все логотипы удалены из базы данных' as message;`;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlScript);
    alert('SQL скрипт скопирован в буфер обмена!');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          SQL скрипт для очистки всех логотипов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Опасная операция
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-4">
                Этот SQL скрипт удалит <strong>ВСЕ</strong> логотипы из базы данных.
              </p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Выполните только если уверены</li>
                <li>• Данные не подлежат восстановлению</li>
                <li>• Сделайте резервную копию при необходимости</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Инструкции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Как использовать:
              </p>
              <ol className="text-sm text-blue-600 space-y-1">
                <li>1. Скопируйте SQL скрипт</li>
                <li>2. Откройте Supabase Dashboard</li>
                <li>3. Перейдите в SQL Editor</li>
                <li>4. Вставьте и выполните скрипт</li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>SQL скрипт для очистки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-slate-600">
                  Скопируйте этот скрипт и выполните в Supabase SQL Editor
                </p>
                <Button onClick={handleCopySQL} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Копировать SQL
                </Button>
              </div>
              
              <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-auto text-sm">
                <code>{sqlScript}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Что делает скрипт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">1. Проверка данных</h4>
                <p className="text-slate-600 text-sm">
                  Показывает количество логотипов перед удалением (всего, активных, неактивных)
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">2. Удаление логотипов</h4>
                <p className="text-slate-600 text-sm">
                  Удаляет все записи из таблицы logos
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">3. Проверка результата</h4>
                <p className="text-slate-600 text-sm">
                  Показывает количество оставшихся логотипов (должно быть 0)
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">4. Подтверждение</h4>
                <p className="text-slate-600 text-sm">
                  Выводит сообщение об успешном завершении операции
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Полезные ссылки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Альтернативные методы:</h4>
                <ul className="space-y-1">
                  <li><a href="/clear-all-logos" className="text-blue-600 hover:underline">Веб-интерфейс очистки</a></li>
                  <li><a href="/admin/logos" className="text-blue-600 hover:underline">Админ-панель</a></li>
                  <li><a href="/debug-logos" className="text-blue-600 hover:underline">Отладка логотипов</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Проверка результата:</h4>
                <ul className="space-y-1">
                  <li><a href="/" className="text-blue-600 hover:underline">Главная страница</a></li>
                  <li><a href="/test-logos-connection" className="text-blue-600 hover:underline">Тест подключения</a></li>
                  <li><a href="/force-refresh-logos" className="text-blue-600 hover:underline">Принудительное обновление</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClearAllLogosSQL;
