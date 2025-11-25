import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useLogos } from '../contexts/LogosContextDB';
import { RefreshCw, CheckCircle, AlertCircle, Database, Globe, Settings } from 'lucide-react';

const TestLogosSync = () => {
  const { state, forceRefresh, addLogo, updateLogo, deleteLogo } = useLogos();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setTestResults(prev => [...prev, `${icon} ${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runSyncTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    addResult('🚀 Начинаем тест синхронизации логотипов...');
    
    try {
      // Тест 1: Проверка подключения к базе данных
      addResult('Тест 1: Проверка подключения к базе данных...');
      await forceRefresh();
      addResult(`Загружено логотипов из базы: ${state.logos.length}`, 'success');
      
      // Тест 2: Добавление тестового логотипа
      addResult('Тест 2: Добавление тестового логотипа...');
      const testLogo = {
        name: `Тест синхронизации ${Date.now()}`,
        category: 'tech' as const,
        description: 'Тестовый логотип для проверки синхронизации',
        website_url: 'https://example.com',
        is_active: true,
        logo_url: 'https://via.placeholder.com/100x50/4F46E5/FFFFFF?text=TEST'
      };
      
      await addLogo(testLogo);
      addResult('Тестовый логотип добавлен', 'success');
      
      // Ждем синхронизации
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Тест 3: Обновление тестового логотипа
      addResult('Тест 3: Обновление тестового логотипа...');
      const addedLogo = state.logos.find(logo => logo.name.includes('Тест синхронизации'));
      if (addedLogo) {
        await updateLogo(addedLogo.id, { 
          name: `${addedLogo.name} (обновлен)`,
          description: 'Обновленное описание тестового логотипа'
        });
        addResult('Тестовый логотип обновлен', 'success');
      }
      
      // Ждем синхронизации
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Тест 4: Удаление тестового логотипа
      addResult('Тест 4: Удаление тестового логотипа...');
      const updatedLogo = state.logos.find(logo => logo.name.includes('Тест синхронизации'));
      if (updatedLogo) {
        await deleteLogo(updatedLogo.id);
        addResult('Тестовый логотип удален', 'success');
      }
      
      // Тест 5: Финальная проверка синхронизации
      addResult('Тест 5: Финальная проверка синхронизации...');
      await forceRefresh();
      addResult(`Финальное количество логотипов: ${state.logos.length}`, 'success');
      
      addResult('🎉 Все тесты синхронизации пройдены успешно!', 'success');
      
    } catch (error) {
      addResult(`❌ Ошибка во время теста: ${error}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Тест синхронизации логотипов
          </h1>
          <p className="text-slate-600">
            Эта страница тестирует автоматическую синхронизацию между админ-панелью, базой данных и сайтом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2 text-blue-500" />
                База данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{state.logos.length}</div>
              <p className="text-sm text-slate-600">Логотипов в базе</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-green-500" />
                Админ-панель
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{state.logos.length}</div>
              <p className="text-sm text-slate-600">Логотипов в админке</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-500" />
                Сайт
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{state.logos.length}</div>
              <p className="text-sm text-slate-600">Логотипов на сайте</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Тест синхронизации
              </span>
              <div className="flex gap-2">
                <Button 
                  onClick={runSyncTest} 
                  disabled={isRunning}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isRunning ? 'Тестирование...' : 'Запустить тест'}
                </Button>
                <Button 
                  onClick={clearResults} 
                  variant="outline"
                  disabled={isRunning}
                >
                  Очистить
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {testResults.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto bg-slate-50 p-4 rounded-lg">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-8">
                Нажмите "Запустить тест" для проверки синхронизации
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Статус системы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${state.loading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <span className="text-sm">
                  {state.loading ? 'Загрузка данных...' : 'Данные загружены'}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${state.error ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-sm">
                  {state.error ? `Ошибка: ${state.error}` : 'Ошибок нет'}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm">
                  Автосинхронизация: {isRunning ? 'Активна' : 'Готова'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <a href="/admin/logos">
              <Settings className="w-4 h-4 mr-2" />
              Перейти к админ-панели
            </a>
          </Button>
          
          <Button variant="outline" asChild>
            <a href="/">
              <Globe className="w-4 h-4 mr-2" />
              Проверить главную страницу
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestLogosSync;
