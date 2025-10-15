import React, { useState, useEffect } from 'react';
import { useLogos } from '../contexts/LogosContextDB';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const DebugLogos = () => {
  const { state, getActiveLogos } = useLogos();
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const activeLogos = getActiveLogos();
    setDebugInfo({
      allLogos: state.logos,
      activeLogos: activeLogos,
      loading: state.loading,
      error: state.error
    });
  }, [state, getActiveLogos]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Отладка логотипов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Всего логотипов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {debugInfo?.allLogos?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Активных логотипов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {debugInfo?.activeLogos?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статус</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-lg font-bold ${debugInfo?.loading ? 'text-yellow-600' : debugInfo?.error ? 'text-red-600' : 'text-green-600'}`}>
                {debugInfo?.loading ? 'Загрузка...' : debugInfo?.error ? 'Ошибка' : 'Готово'}
              </div>
              {debugInfo?.error && (
                <div className="text-sm text-red-500 mt-2">
                  {debugInfo.error}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Все логотипы из базы данных</CardTitle>
          </CardHeader>
          <CardContent>
            {debugInfo?.allLogos?.length > 0 ? (
              <div className="space-y-4">
                {debugInfo.allLogos.map((logo: any, index: number) => (
                  <div key={logo.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-slate-200 rounded mr-4 flex items-center justify-center">
                          {logo.logo_url && logo.logo_url !== '/placeholder.svg' ? (
                            <img 
                              src={logo.logo_url} 
                              alt={logo.name}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <span className="text-xs font-bold">
                              {logo.name ? logo.name.substring(0, 2).toUpperCase() : 'LO'}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{logo.name}</div>
                          <div className="text-sm text-slate-500">
                            {logo.category} • {logo.is_active ? 'Активен' : 'Неактивен'}
                          </div>
                          <div className="text-xs text-slate-400">
                            URL: {logo.logo_url || 'Нет URL'}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${logo.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {logo.is_active ? 'Активен' : 'Неактивен'}
                      </div>
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Активные логотипы (для отображения)</CardTitle>
          </CardHeader>
          <CardContent>
            {debugInfo?.activeLogos?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {debugInfo.activeLogos.map((logo: any, index: number) => (
                  <div key={logo.id} className="p-4 bg-white border border-slate-200 rounded-lg text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      {logo.logo_url && logo.logo_url !== '/placeholder.svg' ? (
                        <img 
                          src={logo.logo_url} 
                          alt={logo.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold">
                          {logo.name ? logo.name.substring(0, 3).toUpperCase() : 'LOGO'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium">{logo.name}</div>
                    <div className="text-xs text-slate-500">{logo.category}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-center py-8">
                Активных логотипов не найдено
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>JSON данные (для отладки)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-100 p-4 rounded-lg overflow-auto text-xs">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebugLogos;
