import React, { useState } from 'react';

export const SimpleConnectionTest: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testDirectConnection = async () => {
    setIsLoading(true);
    setResults([]);

    const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

    try {
      addResult('🔄 Тестируем прямое подключение к Supabase...');
      
      // Тест 1: Простой GET запрос
      addResult('📡 Отправляем GET запрос к /rest/v1...');
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      addResult(`📊 Получен ответ: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        addResult('✅ Базовое подключение работает!');
        
        // Тест 2: Запрос к таблице logos
        addResult('🔄 Тестируем запрос к таблице logos...');
        
        const logosResponse = await fetch(`${SUPABASE_URL}/rest/v1/logos?select=*&limit=1`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        addResult(`📊 Logos ответ: ${logosResponse.status} ${logosResponse.statusText}`);
        
        if (logosResponse.ok) {
          const data = await logosResponse.json();
          addResult(`✅ Logos загружены: ${data.length} записей`);
          addResult(`📋 Данные: ${JSON.stringify(data)}`);
        } else {
          const errorText = await logosResponse.text();
          addResult(`❌ Ошибка logos: ${errorText}`);
        }

        // Тест 3: Запрос к таблице homepage_equipment
        addResult('🔄 Тестируем запрос к таблице homepage_equipment...');
        
        const equipmentResponse = await fetch(`${SUPABASE_URL}/rest/v1/homepage_equipment?select=*&limit=1`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        addResult(`📊 Equipment ответ: ${equipmentResponse.status} ${equipmentResponse.statusText}`);
        
        if (equipmentResponse.ok) {
          const data = await equipmentResponse.json();
          addResult(`✅ Equipment загружено: ${data.length} записей`);
          addResult(`📋 Данные: ${JSON.stringify(data)}`);
        } else {
          const errorText = await equipmentResponse.text();
          addResult(`❌ Ошибка equipment: ${errorText}`);
        }

      } else {
        const errorText = await response.text();
        addResult(`❌ Ошибка подключения: ${errorText}`);
      }

    } catch (error) {
      addResult(`❌ Исключение: ${error}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 Простой тест подключения
          </h1>
          
          <div className="mb-6">
            <button
              onClick={testDirectConnection}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Тестируем...' : 'Запустить тест подключения'}
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
              <li>• Этот тест проверяет прямое подключение к Supabase REST API</li>
              <li>• Если тест показывает ошибки - проблема в настройках Supabase</li>
              <li>• Если тест работает - проблема в коде приложения</li>
              <li>• Проверьте настройки в Supabase Dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
