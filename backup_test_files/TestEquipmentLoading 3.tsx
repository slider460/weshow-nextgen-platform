import React, { useState } from 'react';

export const TestEquipmentLoading: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testEquipmentLoading = async () => {
    setIsLoading(true);
    setResults([]);

    const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

    try {
      addResult('🔄 Тестируем загрузку оборудования из БД...');
      
      // Тест 1: Простой запрос к homepage_equipment
      addResult('📡 Запрос: GET /rest/v1/homepage_equipment');
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/homepage_equipment?select=*&order=sort_order.asc`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      addResult(`📊 Ответ: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        addResult(`✅ Загружено записей: ${data.length}`);
        
        if (data.length > 0) {
          addResult(`📋 Структура первой записи:`);
          addResult(`   - id: ${data[0].id}`);
          addResult(`   - title: ${data[0].title}`);
          addResult(`   - description: ${data[0].description}`);
          addResult(`   - image_url: ${data[0].image_url || 'НЕТ ПОЛЯ'}`);
          addResult(`   - is_active: ${data[0].is_active}`);
          addResult(`   - sort_order: ${data[0].sort_order}`);
          
          addResult(`📋 Полная структура:`);
          addResult(JSON.stringify(data[0], null, 2));
        } else {
          addResult('⚠️ Таблица пустая - нет данных');
        }

        // Тест 2: Запрос только активных записей
        addResult('🔄 Тестируем запрос только активных записей...');
        
        const activeResponse = await fetch(`${SUPABASE_URL}/rest/v1/homepage_equipment?select=*&is_active=eq.true&order=sort_order.asc`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        addResult(`📊 Активные записи: ${activeResponse.status} ${activeResponse.statusText}`);
        
        if (activeResponse.ok) {
          const activeData = await activeResponse.json();
          addResult(`✅ Активных записей: ${activeData.length}`);
        }

        // Тест 3: Проверяем поля которые может искать приложение
        addResult('🔄 Проверяем все поля записи...');
        
        if (data.length > 0) {
          const record = data[0];
          const fields = Object.keys(record);
          addResult(`📋 Доступные поля: ${fields.join(', ')}`);
          
          // Проверяем наличие image_url
          if ('image_url' in record) {
            addResult(`✅ Поле image_url найдено: ${record.image_url}`);
          } else {
            addResult(`❌ Поле image_url НЕ найдено!`);
          }
        }

      } else {
        const errorText = await response.text();
        addResult(`❌ Ошибка загрузки: ${response.status} - ${errorText}`);
      }

    } catch (error) {
      addResult(`❌ Исключение: ${error}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 Тест загрузки оборудования из БД
          </h1>
          
          <div className="mb-6">
            <button
              onClick={testEquipmentLoading}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Тестируем оборудование...' : 'Запустить тест оборудования'}
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
              <li>• Этот тест проверяет загрузку оборудования из таблицы homepage_equipment</li>
              <li>• Если есть ошибки - проблема в RLS политиках</li>
              <li>• Если нет поля image_url - проблема в структуре БД</li>
              <li>• Если данные есть, но не отображаются - проблема в коде приложения</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
