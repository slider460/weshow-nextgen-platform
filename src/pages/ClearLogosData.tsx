import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Trash2, RefreshCw, Database, CheckCircle } from 'lucide-react';

const ClearLogosData = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearLocalStorage = () => {
    try {
      // Очищаем все данные логотипов из localStorage
      localStorage.removeItem('logos');
      localStorage.removeItem('logos_data');
      localStorage.removeItem('logos_state');
      
      // Очищаем все ключи, которые могут содержать данные логотипов
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('logo') || key.includes('Logos')) {
          localStorage.removeItem(key);
        }
      });
      
      addResult('✅ localStorage очищен от старых данных логотипов');
    } catch (error) {
      addResult(`❌ Ошибка очистки localStorage: ${error}`);
    }
  };

  const clearSessionStorage = () => {
    try {
      sessionStorage.clear();
      addResult('✅ sessionStorage очищен');
    } catch (error) {
      addResult(`❌ Ошибка очистки sessionStorage: ${error}`);
    }
  };

  const forceRefresh = () => {
    try {
      // Принудительно обновляем страницу
      window.location.reload();
      addResult('✅ Страница обновлена');
    } catch (error) {
      addResult(`❌ Ошибка обновления: ${error}`);
    }
  };

  const handleClearAll = async () => {
    setIsClearing(true);
    setResults([]);
    
    addResult('🚀 Начинаем очистку данных...');
    
    // Очищаем localStorage
    clearLocalStorage();
    
    // Очищаем sessionStorage
    clearSessionStorage();
    
    // Ждем немного
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addResult('✅ Очистка завершена');
    setIsClearing(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setResults([]);
    
    addResult('🔄 Принудительно обновляем данные...');
    
    // Очищаем кэш браузера
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      addResult('✅ Кэш браузера очищен');
    }
    
    // Обновляем страницу
    await new Promise(resolve => setTimeout(resolve, 1000));
    forceRefresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Очистка данных логотипов
          </h1>
          <p className="text-slate-600">
            Эта страница поможет очистить старые данные логотипов и синхронизировать все компоненты.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="w-5 h-5 mr-2 text-red-500" />
                Очистка данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Очищает localStorage и sessionStorage от старых данных логотипов
              </p>
              <Button 
                onClick={handleClearAll}
                disabled={isClearing}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isClearing ? 'Очистка...' : 'Очистить все данные'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-blue-500" />
                Принудительное обновление
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Очищает кэш и принудительно обновляет страницу
              </p>
              <Button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isRefreshing ? 'Обновление...' : 'Обновить и очистить кэш'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Результаты операций
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className="text-sm font-mono bg-slate-100 p-2 rounded">
                    {result}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-8">
                Нажмите кнопку выше, чтобы начать очистку
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Следующие шаги</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Очистите данные</h4>
                  <p className="text-sm text-slate-600">
                    Нажмите "Очистить все данные" для удаления старых данных из браузера
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Создайте таблицу в Supabase</h4>
                  <p className="text-sm text-slate-600">
                    Выполните SQL скрипт из <a href="/create-logos-table-sql" className="text-blue-600 hover:underline">этой страницы</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Проверьте синхронизацию</h4>
                  <p className="text-sm text-slate-600">
                    Откройте <a href="/admin/logos" className="text-blue-600 hover:underline">админ-панель</a> и <a href="/" className="text-blue-600 hover:underline">главную страницу</a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <a href="/admin/logos">
              <CheckCircle className="w-4 h-4 mr-2" />
              Перейти к админ-панели
            </a>
          </Button>
          
          <Button variant="outline" asChild>
            <a href="/">
              Проверить главную страницу
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClearLogosData;
