import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useLogos } from '../contexts/LogosContextDB';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trash2, RefreshCw, AlertTriangle, CheckCircle, XCircle, Database } from 'lucide-react';

const ForceClearLogos = () => {
  const { state, forceRefresh } = useLogos();
  const [isClearing, setIsClearing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    deletedCount?: number;
    dbCount?: number;
  } | null>(null);

  const checkDatabaseStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('logos')
        .select('id, name, is_active')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Ошибка подключения к БД: ${error.message}`);
      }

      return {
        count: data?.length || 0,
        logos: data || []
      };
    } catch (error) {
      console.error('Ошибка проверки БД:', error);
      throw error;
    }
  };

  const handleForceClear = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ логотипы из базы данных и очистит кэш. Продолжить?')) {
      return;
    }

    setIsClearing(true);
    setResult(null);

    try {
      console.log('ForceClearLogos: Начинаем принудительную очистку...');

      // Проверяем состояние БД до очистки
      const beforeStatus = await checkDatabaseStatus();
      console.log('ForceClearLogos: Состояние БД до очистки:', beforeStatus);

      // Удаляем все логотипы из БД
      const { error: deleteError } = await supabase
        .from('logos')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        throw new Error(`Ошибка удаления из БД: ${deleteError.message}`);
      }

      // Проверяем состояние БД после очистки
      const afterStatus = await checkDatabaseStatus();
      console.log('ForceClearLogos: Состояние БД после очистки:', afterStatus);

      // Принудительно обновляем контекст
      console.log('ForceClearLogos: Принудительное обновление контекста...');
      await forceRefresh();

      setResult({
        success: true,
        message: `Принудительная очистка завершена. Удалено ${beforeStatus.count} логотипов из БД.`,
        deletedCount: beforeStatus.count,
        dbCount: afterStatus.count
      });

    } catch (error) {
      console.error('ForceClearLogos: Ошибка принудительной очистки:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Неизвестная ошибка при принудительной очистке'
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    setResult(null);

    try {
      console.log('ForceClearLogos: Принудительное обновление...');
      
      // Проверяем состояние БД
      const dbStatus = await checkDatabaseStatus();
      console.log('ForceClearLogos: Состояние БД:', dbStatus);

      // Принудительно обновляем контекст
      await forceRefresh();

      setResult({
        success: true,
        message: `Принудительное обновление завершено. В БД: ${dbStatus.count} логотипов, в контексте: ${state.logos.length}`,
        dbCount: dbStatus.count
      });

    } catch (error) {
      console.error('ForceClearLogos: Ошибка принудительного обновления:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Неизвестная ошибка при принудительном обновлении'
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCheckStatus = async () => {
    try {
      const dbStatus = await checkDatabaseStatus();
      setResult({
        success: true,
        message: `Проверка статуса завершена. В БД: ${dbStatus.count} логотипов, в контексте: ${state.logos.length}`,
        dbCount: dbStatus.count
      });
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Ошибка проверки статуса'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Принудительная очистка логотипов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Принудительная очистка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-4">
                Удаляет ВСЕ логотипы из БД и очищает кэш приложения.
              </p>
              <Button
                onClick={handleForceClear}
                disabled={isClearing}
                className="bg-red-600 hover:bg-red-700 text-white w-full"
              >
                <Trash2 className={`w-4 h-4 mr-2 ${isClearing ? 'animate-spin' : ''}`} />
                {isClearing ? 'Очистка...' : 'Принудительная очистка'}
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
                Очищает кэш и загружает свежие данные из БД.
              </p>
              <Button
                onClick={handleForceRefresh}
                disabled={isRefreshing}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Обновление...' : 'Принудительное обновление'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Проверка статуса
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Проверяет состояние БД и контекста приложения.
              </p>
              <Button
                onClick={handleCheckStatus}
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                <Database className="w-4 h-4 mr-2" />
                Проверить статус
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Текущий статус</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Контекст приложения</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Логотипов в контексте: <strong>{state.logos.length}</strong></li>
                  <li>• Активных логотипов: <strong>{state.logos.filter(logo => logo.is_active).length}</strong></li>
                  <li>• Статус загрузки: <strong>{state.loading ? 'Загрузка...' : 'Готово'}</strong></li>
                  <li>• Ошибки: <strong>{state.error || 'Нет'}</strong></li>
                </ul>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">База данных</h4>
                <p className="text-sm text-slate-600">
                  Нажмите "Проверить статус" для получения актуальной информации о БД.
                </p>
              </div>
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
              
              {result.success && (result.deletedCount !== undefined || result.dbCount !== undefined) && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-slate-800 mb-2">Статистика:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {result.deletedCount !== undefined && (
                      <li>• Удалено логотипов: <strong>{result.deletedCount}</strong></li>
                    )}
                    {result.dbCount !== undefined && (
                      <li>• Логотипов в БД: <strong>{result.dbCount}</strong></li>
                    )}
                    <li>• Логотипов в контексте: <strong>{state.logos.length}</strong></li>
                    <li>• Статус: {result.success ? 'Успешно' : 'Ошибка'}</li>
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
                  <li><a href="/clear-all-logos" className="text-blue-600 hover:underline">Обычная очистка</a></li>
                  <li><a href="/force-refresh-logos" className="text-blue-600 hover:underline">Принудительное обновление</a></li>
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

export default ForceClearLogos;
