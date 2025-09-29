import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { useLogos } from '../contexts/LogosContextDB';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trash2, RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const QuickClearLogos = () => {
  const { forceRefresh } = useLogos();
  const [isClearing, setIsClearing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    deletedCount?: number;
  } | null>(null);

  const handleQuickClear = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ логотипы из базы данных и очистит кэш. Продолжить?')) {
      return;
    }

    setIsClearing(true);
    setResult(null);

    try {
      console.log('QuickClearLogos: Начинаем быструю очистку...');

      // 1. Получаем количество логотипов до очистки
      const { data: beforeData, error: beforeError } = await supabase
        .from('logos')
        .select('id');

      if (beforeError) {
        throw new Error(`Ошибка получения данных: ${beforeError.message}`);
      }

      const beforeCount = beforeData?.length || 0;
      console.log(`QuickClearLogos: Логотипов до очистки: ${beforeCount}`);

      // 2. Удаляем все логотипы
      const { error: deleteError } = await supabase
        .from('logos')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        throw new Error(`Ошибка удаления: ${deleteError.message}`);
      }

      // 3. Проверяем результат
      const { data: afterData, error: afterError } = await supabase
        .from('logos')
        .select('id');

      if (afterError) {
        throw new Error(`Ошибка проверки результата: ${afterError.message}`);
      }

      const afterCount = afterData?.length || 0;
      console.log(`QuickClearLogos: Логотипов после очистки: ${afterCount}`);

      // 4. Принудительно обновляем контекст
      console.log('QuickClearLogos: Принудительное обновление контекста...');
      await forceRefresh();

      setResult({
        success: true,
        message: `Быстрая очистка завершена! Удалено ${beforeCount} логотипов. Осталось: ${afterCount}`,
        deletedCount: beforeCount
      });

    } catch (error) {
      console.error('QuickClearLogos: Ошибка быстрой очистки:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Неизвестная ошибка при быстрой очистке'
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleForceRefresh = async () => {
    try {
      console.log('QuickClearLogos: Принудительное обновление...');
      await forceRefresh();
      setResult({
        success: true,
        message: 'Принудительное обновление выполнено!'
      });
    } catch (error) {
      console.error('QuickClearLogos: Ошибка обновления:', error);
      setResult({
        success: false,
        message: 'Ошибка при принудительном обновлении'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Быстрая очистка логотипов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Быстрая очистка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-4">
                Удаляет ВСЕ логотипы из базы данных и очищает кэш приложения.
              </p>
              <Button
                onClick={handleQuickClear}
                disabled={isClearing}
                className="bg-red-600 hover:bg-red-700 text-white w-full"
              >
                <Trash2 className={`w-4 h-4 mr-2 ${isClearing ? 'animate-spin' : ''}`} />
                {isClearing ? 'Очистка...' : 'Быстрая очистка'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Принудительное обновление
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Очищает кэш и загружает свежие данные из базы данных.
              </p>
              <Button
                onClick={handleForceRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Принудительное обновление
              </Button>
            </CardContent>
          </Card>
        </div>

        {result && (
          <Card className={`${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardHeader>
              <CardTitle className={`flex items-center ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                {result.success ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 mr-2" />
                )}
                Результат операции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`${result.success ? 'text-green-700' : 'text-red-700'} mb-4`}>
                {result.message}
              </p>
              
              {result.success && result.deletedCount !== undefined && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-slate-800 mb-2">Статистика:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Удалено логотипов: <strong>{result.deletedCount}</strong></li>
                    <li>• Статус: {result.success ? 'Успешно' : 'Ошибка'}</li>
                    <li>• Время: {new Date().toLocaleTimeString()}</li>
                  </ul>
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
                  <li><a href="/" className="text-blue-600 hover:underline">Главная страница</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Другие инструменты:</h4>
                <ul className="space-y-1">
                  <li><a href="/force-clear-logos" className="text-blue-600 hover:underline">Принудительная очистка</a></li>
                  <li><a href="/execute-force-clear-sql" className="text-blue-600 hover:underline">SQL очистка</a></li>
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

export default QuickClearLogos;
