import React, { useState } from 'react';

const RestApiEquipmentTest = () => {
  const [result, setResult] = useState<string>('Готов к тестированию');
  const [loading, setLoading] = useState(false);

  const testRestApi = async () => {
    setLoading(true);
    setResult('Тестируем REST API...');
    
    try {
      console.log('🔄 RestApiEquipmentTest: Начинаем тест REST API...');
      
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      const url = `${SUPABASE_URL}/rest/v1/homepage_equipment?select=*&is_visible=eq.true&order=sort_order.asc&limit=5`;
      
      console.log('🔄 RestApiEquipmentTest: Делаем REST запрос...');
      console.log('🔄 RestApiEquipmentTest: URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('🔄 RestApiEquipmentTest: Ответ получен, статус:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ RestApiEquipmentTest: HTTP ошибка:', response.status, errorText);
        setResult(`❌ HTTP ошибка ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('✅ RestApiEquipmentTest: Данные получены:', data);
      console.log('✅ RestApiEquipmentTest: Количество записей:', data?.length || 0);
      
      setResult(`✅ Успех! Загружено ${data?.length || 0} записей через REST API`);
      
    } catch (err) {
      console.error('❌ RestApiEquipmentTest: Исключение:', err);
      setResult(`❌ Исключение: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔧 Тест REST API для оборудования
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Результат теста:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">{result}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={testRestApi}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading ? '🔄 Тестируем...' : '🚀 Тест REST API'}
          </button>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📋 Этот тест использует:</h3>
          <ul className="text-blue-700 space-y-1">
            <li>• Прямой REST API вызов (как LogosContextRest)</li>
            <li>• Обходит Supabase клиент</li>
            <li>• Должен работать даже при проблемах с клиентом</li>
            <li>• Показывает точный HTTP статус ответа</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestApiEquipmentTest;
