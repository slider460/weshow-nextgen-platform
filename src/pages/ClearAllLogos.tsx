import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ClearAllLogos = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    deletedCount?: number;
  } | null>(null);

  const handleClearAllLogos = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ логотипы из базы данных. Продолжить?')) {
      return;
    }

    setIsClearing(true);
    setResult(null);

    try {
      console.log('ClearAllLogos: Начинаем очистку всех логотипов...');

      // Получаем все логотипы для подсчета
      const { data: logos, error: fetchError } = await supabase
        .from('logos')
        .select('id');

      if (fetchError) {
        throw new Error(`Ошибка получения логотипов: ${fetchError.message}`);
      }

      const logoCount = logos?.length || 0;
      console.log(`ClearAllLogos: Найдено логотипов для удаления: ${logoCount}`);

      if (logoCount === 0) {
        setResult({
          success: true,
          message: 'Логотипы уже отсутствуют в базе данных',
          deletedCount: 0
        });
        setIsClearing(false);
        return;
      }

      // Удаляем все логотипы
      const { error: deleteError } = await supabase
        .from('logos')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Удаляем все записи

      if (deleteError) {
        throw new Error(`Ошибка удаления логотипов: ${deleteError.message}`);
      }

      console.log(`ClearAllLogos: Успешно удалено ${logoCount} логотипов`);

      setResult({
        success: true,
        message: `Успешно удалено ${logoCount} логотипов из базы данных`,
        deletedCount: logoCount
      });

    } catch (error) {
      console.error('ClearAllLogos: Ошибка очистки:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Неизвестная ошибка при очистке логотипов'
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleRefresh = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Очистка всех логотипов
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
                Эта операция удалит <strong>ВСЕ</strong> логотипы из базы данных без возможности восстановления.
              </p>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• Все логотипы будут удалены навсегда</li>
                <li>• Данные не подлежат восстановлению</li>
                <li>• Сайт останется без логотипов</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">
                Что произойдет
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                После очистки:
              </p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• База данных будет полностью очищена</li>
                <li>• Админ-панель покажет 0 логотипов</li>
                <li>• На сайте не будет отображаться логотипов</li>
                <li>• Можно будет добавить новые логотипы</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Очистка базы данных</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={handleClearAllLogos}
                disabled={isClearing}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className={`w-4 h-4 mr-2 ${isClearing ? 'animate-spin' : ''}`} />
                {isClearing ? 'Удаление...' : 'Удалить ВСЕ логотипы'}
              </Button>

              <Button
                onClick={handleRefresh}
                variant="outline"
                className="ml-4"
              >
                Обновить
              </Button>
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
                    <li>• Время выполнения: {isClearing ? 'В процессе...' : 'Завершено'}</li>
                    <li>• Статус: {result.success ? 'Успешно' : 'Ошибка'}</li>
                  </ul>
                </div>
              )}

              {result.success && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Следующие шаги:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>1. Проверьте админ-панель: <a href="/admin/logos" className="underline">/admin/logos</a></li>
                    <li>2. Проверьте главную страницу: <a href="/" className="underline">/</a></li>
                    <li>3. При необходимости добавьте новые логотипы</li>
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
                <h4 className="font-semibold text-slate-800 mb-2">Администрирование:</h4>
                <ul className="space-y-1">
                  <li><a href="/admin/logos" className="text-blue-600 hover:underline">Управление логотипами</a></li>
                  <li><a href="/debug-logos" className="text-blue-600 hover:underline">Отладка логотипов</a></li>
                  <li><a href="/force-refresh-logos" className="text-blue-600 hover:underline">Принудительное обновление</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Проверка:</h4>
                <ul className="space-y-1">
                  <li><a href="/" className="text-blue-600 hover:underline">Главная страница</a></li>
                  <li><a href="/test-logos-connection" className="text-blue-600 hover:underline">Тест подключения</a></li>
                  <li><a href="/create-logos-table-sql" className="text-blue-600 hover:underline">SQL скрипты</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClearAllLogos;
