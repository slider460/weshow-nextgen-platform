import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useLogos } from '../contexts/LogosContextDB';
import { RefreshCw, CheckCircle, AlertCircle, Database, Globe, Settings } from 'lucide-react';

const ForceRefreshLogos = () => {
  const { state, forceRefresh, getActiveLogos } = useLogos();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshResults, setRefreshResults] = useState<string[]>([]);

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setRefreshResults(prev => [...prev, `${icon} ${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleForceRefresh = async () => {
    setIsRefreshing(true);
    setRefreshResults([]);
    
    addResult('🚀 Начинаем принудительное обновление логотипов...');
    
    try {
      // Принудительно обновляем данные
      await forceRefresh();
      addResult('Данные обновлены из базы данных', 'success');
      
      // Получаем активные логотипы
      const activeLogos = getActiveLogos();
      addResult(`Найдено активных логотипов: ${activeLogos.length}`, 'info');
      
      if (activeLogos.length > 0) {
        addResult('Логотипы:', 'info');
        activeLogos.forEach((logo, index) => {
          addResult(`${index + 1}. ${logo.name} (${logo.is_active ? 'активен' : 'неактивен'})`, 'info');
        });
      } else {
        addResult('⚠️ Активных логотипов не найдено!', 'error');
      }
      
      addResult('🎉 Обновление завершено!', 'success');
      
    } catch (error) {
      addResult(`❌ Ошибка обновления: ${error}`, 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  const clearResults = () => {
    setRefreshResults([]);
  };

  // Автоматически обновляем при загрузке страницы
  useEffect(() => {
    handleForceRefresh();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Принудительное обновление логотипов
          </h1>
          <p className="text-slate-600">
            Эта страница принудительно обновляет логотипы из базы данных и показывает их статус.
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
              <p className="text-sm text-slate-600">Всего логотипов</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-green-500" />
                Активные
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{getActiveLogos().length}</div>
              <p className="text-sm text-slate-600">Активных логотипов</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-500" />
                Статус
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${state.loading ? 'text-yellow-600' : state.error ? 'text-red-600' : 'text-green-600'}`}>
                {state.loading ? 'Загрузка...' : state.error ? 'Ошибка' : 'Готово'}
              </div>
              <p className="text-sm text-slate-600">Состояние системы</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Принудительное обновление
              </span>
              <div className="flex gap-2">
                <Button 
                  onClick={handleForceRefresh} 
                  disabled={isRefreshing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isRefreshing ? 'Обновление...' : 'Обновить сейчас'}
                </Button>
                <Button 
                  onClick={clearResults} 
                  variant="outline"
                  disabled={isRefreshing}
                >
                  Очистить
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {refreshResults.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto bg-slate-50 p-4 rounded-lg">
                {refreshResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-8">
                Нажмите "Обновить сейчас" для принудительного обновления
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Список логотипов</CardTitle>
          </CardHeader>
          <CardContent>
            {state.logos.length > 0 ? (
              <div className="space-y-3">
                {state.logos.map((logo, index) => (
                  <div key={logo.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-slate-200 rounded mr-3 flex items-center justify-center">
                        {logo.logo_url && logo.logo_url !== '/placeholder.svg' ? (
                          <img 
                            src={logo.logo_url} 
                            alt={logo.name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xs">LOGO</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{logo.name}</div>
                        <div className="text-sm text-slate-500">
                          {logo.category} • {logo.is_active ? 'Активен' : 'Неактивен'}
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${logo.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {logo.is_active ? 'Активен' : 'Неактивен'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-8">
                Логотипы не найдены
              </div>
            )}
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

export default ForceRefreshLogos;
