import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { useLogos } from '../contexts/LogosContextDB';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Trash2, AlertTriangle, CheckCircle, XCircle, Database, RefreshCw, Eye } from 'lucide-react';

const ForceRemoveAllLogos = () => {
  const { state, forceRefresh } = useLogos();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [dbLogos, setDbLogos] = useState<any[]>([]);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    removedCount?: number;
    dbCount?: number;
    contextCount?: number;
  } | null>(null);

  // Проверяем состояние базы данных
  const checkDatabaseStatus = async () => {
    setIsChecking(true);
    try {
      console.log('ForceRemoveAllLogos: Проверяем состояние базы данных...');
      
      const { data, error } = await supabase
        .from('logos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Ошибка подключения к БД: ${error.message}`);
      }

      setDbLogos(data || []);
      console.log('ForceRemoveAllLogos: Логотипы в БД:', data?.length || 0);
      
      setResult({
        success: true,
        message: `Проверка завершена. В БД: ${data?.length || 0} логотипов, в контексте: ${state.logos.length}`,
        dbCount: data?.length || 0,
        contextCount: state.logos.length
      });

    } catch (error) {
      console.error('ForceRemoveAllLogos: Ошибка проверки БД:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Ошибка проверки базы данных'
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Принудительно удаляем все логотипы
  const handleForceRemoveAll = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ логотипы из базы данных навсегда. Продолжить?')) {
      return;
    }

    setIsRemoving(true);
    setResult(null);

    try {
      console.log('ForceRemoveAllLogos: Начинаем принудительное удаление всех логотипов...');

      // 1. Получаем все логотипы перед удалением
      const { data: beforeData, error: beforeError } = await supabase
        .from('logos')
        .select('*');

      if (beforeError) {
        throw new Error(`Ошибка получения логотипов: ${beforeError.message}`);
      }

      const beforeCount = beforeData?.length || 0;
      console.log(`ForceRemoveAllLogos: Логотипов до удаления: ${beforeCount}`);

      if (beforeCount === 0) {
        setResult({
          success: true,
          message: 'Логотипы уже отсутствуют в базе данных',
          removedCount: 0,
          dbCount: 0,
          contextCount: state.logos.length
        });
        setIsRemoving(false);
        return;
      }

      // 2. Удаляем ВСЕ логотипы из базы данных
      const { error: deleteError } = await supabase
        .from('logos')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) {
        throw new Error(`Ошибка удаления логотипов: ${deleteError.message}`);
      }

      // 3. Проверяем результат удаления
      const { data: afterData, error: afterError } = await supabase
        .from('logos')
        .select('id');

      if (afterError) {
        throw new Error(`Ошибка проверки результата: ${afterError.message}`);
      }

      const afterCount = afterData?.length || 0;
      console.log(`ForceRemoveAllLogos: Логотипов после удаления: ${afterCount}`);

      // 4. Принудительно очищаем контекст приложения
      console.log('ForceRemoveAllLogos: Очищаем контекст приложения...');
      await forceRefresh();

      // 5. Обновляем список логотипов
      setDbLogos([]);

      setResult({
        success: true,
        message: `Принудительное удаление завершено! Удалено ${beforeCount} логотипов. Осталось в БД: ${afterCount}`,
        removedCount: beforeCount,
        dbCount: afterCount,
        contextCount: state.logos.length
      });

    } catch (error) {
      console.error('ForceRemoveAllLogos: Ошибка принудительного удаления:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Неизвестная ошибка при принудительном удалении'
      });
    } finally {
      setIsRemoving(false);
    }
  };

  // Принудительно обновляем контекст
  const handleForceRefresh = async () => {
    try {
      console.log('ForceRemoveAllLogos: Принудительное обновление контекста...');
      await forceRefresh();
      await checkDatabaseStatus();
    } catch (error) {
      console.error('ForceRemoveAllLogos: Ошибка обновления:', error);
    }
  };

  // Проверяем состояние при загрузке
  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Принудительное удаление всех логотипов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Принудительное удаление
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-4">
                Удаляет ВСЕ логотипы из базы данных и очищает контекст приложения.
              </p>
              <Button
                onClick={handleForceRemoveAll}
                disabled={isRemoving}
                className="bg-red-600 hover:bg-red-700 text-white w-full"
              >
                <Trash2 className={`w-4 h-4 mr-2 ${isRemoving ? 'animate-spin' : ''}`} />
                {isRemoving ? 'Удаление...' : 'Удалить ВСЕ логотипы'}
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
                Очищает контекст и загружает свежие данные из базы данных.
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

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Проверка состояния
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Проверяет текущее состояние базы данных и контекста.
              </p>
              <Button
                onClick={checkDatabaseStatus}
                disabled={isChecking}
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                <Database className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
                {isChecking ? 'Проверка...' : 'Проверить состояние'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Текущее состояние</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">База данных</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Логотипов в БД: <strong>{dbLogos.length}</strong></li>
                  <li>• Активных: <strong>{dbLogos.filter(logo => logo.is_active).length}</strong></li>
                  <li>• Неактивных: <strong>{dbLogos.filter(logo => !logo.is_active).length}</strong></li>
                </ul>
              </div>
              <div className="bg-slate-100 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Контекст приложения</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Логотипов в контексте: <strong>{state.logos.length}</strong></li>
                  <li>• Активных: <strong>{state.logos.filter(logo => logo.is_active).length}</strong></li>
                  <li>• Статус загрузки: <strong>{state.loading ? 'Загрузка...' : 'Готово'}</strong></li>
                  <li>• Ошибки: <strong>{state.error || 'Нет'}</strong></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {dbLogos.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Логотипы в базе данных</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dbLogos.map((logo, index) => (
                  <div key={logo.id} className="p-4 bg-white border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">#{index + 1}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${logo.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {logo.is_active ? 'Активен' : 'Неактивен'}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      {logo.logo_url && logo.logo_url !== '/placeholder.svg' ? (
                        <img 
                          src={logo.logo_url} 
                          alt={logo.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold">
                          {logo.name ? logo.name.substring(0, 3).toUpperCase() : 'LOGO'}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-slate-800">{logo.name}</div>
                      <div className="text-xs text-slate-500">{logo.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

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
              
              {result.success && (result.removedCount !== undefined || result.dbCount !== undefined) && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-slate-800 mb-2">Статистика:</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {result.removedCount !== undefined && (
                      <li>• Удалено логотипов: <strong>{result.removedCount}</strong></li>
                    )}
                    {result.dbCount !== undefined && (
                      <li>• Логотипов в БД: <strong>{result.dbCount}</strong></li>
                    )}
                    {result.contextCount !== undefined && (
                      <li>• Логотипов в контексте: <strong>{result.contextCount}</strong></li>
                    )}
                    <li>• Время: {new Date().toLocaleTimeString()}</li>
                  </ul>
                </div>
              )}

              {result.success && result.removedCount === 0 && (
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
                  <li><a href="/quick-clear-logos" className="text-blue-600 hover:underline">Быстрая очистка</a></li>
                  <li><a href="/force-clear-logos" className="text-blue-600 hover:underline">Принудительная очистка</a></li>
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

export default ForceRemoveAllLogos;
