import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Database, AlertTriangle, CheckCircle, XCircle, Copy } from 'lucide-react';

const ExecuteForceClearSQL = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    data?: any[];
  } | null>(null);

  const sqlScript = `-- ПРИНУДИТЕЛЬНАЯ ОЧИСТКА ВСЕХ ЛОГОТИПОВ
-- ВНИМАНИЕ: Этот скрипт удалит ВСЕ логотипы без возможности восстановления!

-- 1. Проверяем текущее состояние
SELECT 
  'ДО ОЧИСТКИ' as status,
  COUNT(*) as total_logos,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_logos,
  COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_logos
FROM logos;

-- 2. Показываем все логотипы перед удалением
SELECT 
  id,
  name,
  category,
  is_active,
  created_at
FROM logos
ORDER BY created_at DESC;

-- 3. УДАЛЯЕМ ВСЕ ЛОГОТИПЫ
DELETE FROM logos;

-- 4. Проверяем результат удаления
SELECT 
  'ПОСЛЕ ОЧИСТКИ' as status,
  COUNT(*) as remaining_logos
FROM logos;

-- 5. Финальная проверка
SELECT 
  'ОЧИСТКА ЗАВЕРШЕНА' as status,
  'Все логотипы удалены из базы данных' as message,
  'Теперь можно добавлять новые логотипы' as next_step;`;

  const handleExecuteSQL = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ логотипы из базы данных. Продолжить?')) {
      return;
    }

    setIsExecuting(true);
    setResult(null);

    try {
      console.log('ExecuteForceClearSQL: Выполняем принудительную очистку...');

      // Выполняем SQL скрипт
      const { data, error } = await supabase.rpc('exec_sql', { sql: sqlScript });

      if (error) {
        // Если exec_sql не работает, выполняем операции по отдельности
        console.log('ExecuteForceClearSQL: exec_sql не работает, выполняем по отдельности...');
        
        // 1. Проверяем текущее состояние
        const { data: beforeData } = await supabase
          .from('logos')
          .select('id, name, category, is_active, created_at')
          .order('created_at', { ascending: false });

        console.log('ExecuteForceClearSQL: Логотипы до очистки:', beforeData?.length || 0);

        // 2. Удаляем все логотипы
        const { error: deleteError } = await supabase
          .from('logos')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000');

        if (deleteError) {
          throw new Error(`Ошибка удаления: ${deleteError.message}`);
        }

        // 3. Проверяем результат
        const { data: afterData } = await supabase
          .from('logos')
          .select('id');

        console.log('ExecuteForceClearSQL: Логотипы после очистки:', afterData?.length || 0);

        setResult({
          success: true,
          message: `Принудительная очистка завершена! Удалено ${beforeData?.length || 0} логотипов. Осталось: ${afterData?.length || 0}`,
          data: beforeData
        });

      } else {
        setResult({
          success: true,
          message: 'SQL скрипт выполнен успешно!',
          data: data
        });
      }

    } catch (error) {
      console.error('ExecuteForceClearSQL: Ошибка выполнения:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Неизвестная ошибка при выполнении SQL'
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlScript);
    alert('SQL скрипт скопирован в буфер обмена!');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Выполнение принудительной очистки SQL
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
                Автоматическое выполнение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Нажмите кнопку для автоматического выполнения SQL скрипта.
              </p>
              <Button
                onClick={handleExecuteSQL}
                disabled={isExecuting}
                className="bg-red-600 hover:bg-red-700 text-white w-full"
              >
                <Database className={`w-4 h-4 mr-2 ${isExecuting ? 'animate-spin' : ''}`} />
                {isExecuting ? 'Выполнение...' : 'Выполнить принудительную очистку'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>SQL скрипт для принудительной очистки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-slate-600">
                  SQL скрипт для принудительной очистки всех логотипов
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

        {result && (
          <Card className={`${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                {result.success ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                Результат выполнения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`${result.success ? 'text-green-700' : 'text-red-700'} mb-4`}>
                {result.message}
              </p>
              
              {result.success && result.data && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-slate-800 mb-2">Удаленные логотипы:</h4>
                  <div className="text-sm text-slate-600">
                    {result.data.length > 0 ? (
                      <ul className="space-y-1">
                        {result.data.map((logo: any, index: number) => (
                          <li key={logo.id || index}>
                            • {logo.name} ({logo.category}) - {logo.is_active ? 'Активен' : 'Неактивен'}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Логотипы не найдены</p>
                    )}
                  </div>
                </div>
              )}

              {result.success && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Следующие шаги:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>1. Проверьте админ-панель: <a href="/admin/logos" className="underline">/admin/logos</a></li>
                    <li>2. Проверьте главную страницу: <a href="/" className="underline">/</a></li>
                    <li>3. Добавьте новые логотипы через админ-панель</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Полезные ссылки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Проверка результата:</h4>
                <ul className="space-y-1">
                  <li><a href="/admin/logos" className="text-blue-600 hover:underline">Админ-панель</a></li>
                  <li><a href="/debug-logos" className="text-blue-600 hover:underline">Отладка логотипов</a></li>
                  <li><a href="/force-clear-logos" className="text-blue-600 hover:underline">Принудительная очистка</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Добавление логотипов:</h4>
                <ul className="space-y-1">
                  <li><a href="/admin/logos" className="text-blue-600 hover:underline">Управление логотипами</a></li>
                  <li><a href="/" className="text-blue-600 hover:underline">Главная страница</a></li>
                  <li><a href="/test-logos-connection" className="text-blue-600 hover:underline">Тест подключения</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExecuteForceClearSQL;
