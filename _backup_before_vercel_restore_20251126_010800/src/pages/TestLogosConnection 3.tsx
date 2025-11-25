import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const TestLogosConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Проверка...');
  const [logosData, setLogosData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Тестирование подключения к Supabase...');
        
        // Проверяем подключение к Supabase
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        console.log('Auth status:', { user, authError });
        
        // Проверяем таблицу logos
        const { data, error: tableError } = await supabase
          .from('logos')
          .select('*')
          .limit(10);
        
        console.log('Table query result:', { data, tableError });
        
        if (tableError) {
          setError(`Ошибка таблицы: ${tableError.message}`);
          setConnectionStatus('Ошибка подключения к таблице');
        } else {
          setLogosData(data || []);
          setConnectionStatus(`Успешно! Найдено логотипов: ${data?.length || 0}`);
        }
      } catch (err) {
        console.error('Ошибка подключения:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setConnectionStatus('Ошибка подключения');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Тест подключения к Supabase
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Статус подключения</h2>
          <div className={`p-4 rounded-lg ${
            connectionStatus.includes('Успешно') 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {connectionStatus}
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
              <strong>Ошибка:</strong> {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Данные из таблицы logos</h2>
          {logosData.length > 0 ? (
            <div className="space-y-2">
              {logosData.map((logo, index) => (
                <div key={logo.id || index} className="p-3 bg-slate-50 rounded border">
                  <div className="font-medium">{logo.name}</div>
                  <div className="text-sm text-slate-600">
                    ID: {logo.id} | Категория: {logo.category} | Активен: {logo.is_active ? 'Да' : 'Нет'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-500">
              {connectionStatus.includes('Успешно') ? 'Таблица пуста' : 'Не удалось загрузить данные'}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Рекомендации</h2>
          <div className="space-y-2 text-sm">
            <div>1. Если таблица не существует, выполните SQL скрипт из <a href="/create-logos-table-sql" className="text-blue-600 hover:underline">этой страницы</a></div>
            <div>2. Проверьте настройки Supabase в файле config/supabase.ts</div>
            <div>3. Убедитесь, что RLS политики настроены правильно</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLogosConnection;
