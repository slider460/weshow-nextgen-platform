import React, { useState } from 'react';

export const TestAllDataLoading: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAllTables = async () => {
    setIsLoading(true);
    setResults([]);

    const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

    const tables = [
      'logos',
      'homepage_equipment', 
      'cases',
      'services_blocks',
      'user_profiles',
      'equipment_catalog',
      'estimates',
      'estimate_items',
      'articles'
    ];

    try {
      addResult('🔄 Тестируем загрузку данных из всех таблиц...');
      
      for (const table of tables) {
        try {
          addResult(`📡 Проверяем таблицу: ${table}`);
          
          const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*&limit=5`, {
            method: 'GET',
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
            },
          });

          addResult(`📊 ${table}: ${response.status} ${response.statusText}`);
          
          if (response.ok) {
            const data = await response.json();
            addResult(`✅ ${table}: Загружено ${data.length} записей`);
            
            if (data.length > 0) {
              addResult(`📋 ${table}: Пример данных - ${JSON.stringify(data[0], null, 2)}`);
            }
          } else {
            const errorText = await response.text();
            addResult(`❌ ${table}: Ошибка ${response.status} - ${errorText}`);
          }
          
        } catch (error) {
          addResult(`❌ ${table}: Исключение - ${error}`);
        }
      }

      addResult('🎉 Тестирование всех таблиц завершено!');

    } catch (error) {
      addResult(`❌ Общая ошибка: ${error}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 Тест загрузки всех данных из БД
          </h1>
          
          <div className="mb-6">
            <button
              onClick={testAllTables}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Тестируем все таблицы...' : 'Запустить тест всех таблиц'}
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Результаты тестирования:</h3>
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-gray-500">Нажмите кнопку для запуска теста</p>
              ) : (
                results.map((result, index) => (
                  <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                    {result}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Инструкции:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Этот тест проверяет загрузку данных из всех таблиц</li>
              <li>• Если какие-то таблицы не работают - проблема в RLS политиках</li>
              <li>• Если все таблицы работают - проблема в коде приложения</li>
              <li>• Выполните КОМПЛЕКСНОЕ_ИСПРАВЛЕНИЕ_ВСЕХ_ТАБЛИЦ.sql если есть ошибки</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
