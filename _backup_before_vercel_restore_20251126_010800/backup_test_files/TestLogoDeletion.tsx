import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useLogos } from '../contexts/LogosContextDB';
import { Trash2, RefreshCw, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const TestLogoDeletion = () => {
  const { state, addLogo, deleteLogo, forceRefresh } = useLogos();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setTestResults(prev => [...prev, `${icon} ${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runDeletionTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    addResult('🚀 Начинаем тест удаления логотипов...');
    
    try {
      // Тест 1: Добавляем тестовый логотип
      addResult('Тест 1: Добавление тестового логотипа...');
      const testLogo = {
        name: `Тест удаления ${Date.now()}`,
        category: 'tech' as const,
        description: 'Тестовый логотип для проверки удаления',
        website_url: 'https://example.com',
        is_active: true,
        logo_url: 'https://via.placeholder.com/100x50/4F46E5/FFFFFF?text=DELETE'
      };
      
      await addLogo(testLogo);
      addResult(`Тестовый логотип добавлен. Всего логотипов: ${state.logos.length}`, 'success');
      
      // Ждем синхронизации
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Тест 2: Находим и удаляем тестовый логотип
      addResult('Тест 2: Поиск и удаление тестового логотипа...');
      const addedLogo = state.logos.find(logo => logo.name.includes('Тест удаления'));
      
      if (addedLogo) {
        addResult(`Найден логотип для удаления: ${addedLogo.name}`, 'info');
        const beforeCount = state.logos.length;
        
        await deleteLogo(addedLogo.id);
        addResult(`Логотип удален. Было: ${beforeCount}, стало: ${state.logos.length}`, 'success');
        
        // Тест 3: Проверяем, что логотип не вернулся
        addResult('Тест 3: Проверка, что логотип не вернулся...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const stillExists = state.logos.find(logo => logo.id === addedLogo.id);
        if (stillExists) {
          addResult('❌ ОШИБКА: Удаленный логотип вернулся!', 'error');
        } else {
          addResult('✅ Успешно: Удаленный логотип не вернулся', 'success');
        }
        
        // Тест 4: Принудительная синхронизация
        addResult('Тест 4: Принудительная синхронизация...');
        await forceRefresh();
        
        const afterSync = state.logos.find(logo => logo.id === addedLogo.id);
        if (afterSync) {
          addResult('❌ ОШИБКА: Удаленный логотип вернулся после синхронизации!', 'error');
        } else {
          addResult('✅ Успешно: Удаленный логотип не вернулся после синхронизации', 'success');
        }
        
      } else {
        addResult('❌ ОШИБКА: Не удалось найти тестовый логотип для удаления', 'error');
      }
      
      addResult('🎉 Тест удаления завершен!', 'success');
      
    } catch (error) {
      addResult(`❌ Ошибка во время теста: ${error}`, 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const addTestLogo = async () => {
    try {
      const testLogo = {
        name: `Ручной тест ${Date.now()}`,
        category: 'tech' as const,
        description: 'Логотип для ручного тестирования удаления',
        website_url: 'https://example.com',
        is_active: true,
        logo_url: 'https://via.placeholder.com/100x50/4F46E5/FFFFFF?text=MANUAL'
      };
      
      await addLogo(testLogo);
      addResult(`Добавлен логотип: ${testLogo.name}`, 'success');
    } catch (error) {
      addResult(`Ошибка добавления: ${error}`, 'error');
    }
  };

  const deleteLastLogo = async () => {
    if (state.logos.length === 0) {
      addResult('Нет логотипов для удаления', 'error');
      return;
    }
    
    const lastLogo = state.logos[state.logos.length - 1];
    try {
      await deleteLogo(lastLogo.id);
      addResult(`Удален логотип: ${lastLogo.name}`, 'success');
    } catch (error) {
      addResult(`Ошибка удаления: ${error}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Тест удаления логотипов
          </h1>
          <p className="text-slate-600">
            Эта страница тестирует корректность удаления логотипов и проверяет, что они не возвращаются.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="w-5 h-5 mr-2 text-red-500" />
                Текущие логотипы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{state.logos.length}</div>
              <p className="text-sm text-slate-600">Логотипов в системе</p>
              <div className="mt-4 space-y-2">
                {state.logos.slice(0, 3).map(logo => (
                  <div key={logo.id} className="text-sm bg-slate-100 p-2 rounded">
                    {logo.name}
                  </div>
                ))}
                {state.logos.length > 3 && (
                  <div className="text-sm text-slate-500">
                    ... и еще {state.logos.length - 3}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-blue-500" />
                Ручное тестирование
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={addTestLogo} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить тестовый логотип
                </Button>
                <Button 
                  onClick={deleteLastLogo} 
                  variant="outline"
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить последний логотип
                </Button>
                <Button 
                  onClick={forceRefresh} 
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Принудительная синхронизация
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Автоматический тест удаления
              </span>
              <div className="flex gap-2">
                <Button 
                  onClick={runDeletionTest} 
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
                Нажмите "Запустить тест" для проверки удаления логотипов
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <a href="/admin/logos">
              <Trash2 className="w-4 h-4 mr-2" />
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

export default TestLogoDeletion;
