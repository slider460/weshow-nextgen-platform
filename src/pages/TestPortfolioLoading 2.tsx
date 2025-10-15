import React, { useState } from 'react';

const TestPortfolioLoading = () => {
  const [result, setResult] = useState<string>('Готов к тестированию');
  const [loading, setLoading] = useState(false);

  const testPortfolio = async () => {
    setLoading(true);
    setResult('Тестируем загрузку портфолио...');
    
    try {
      console.log('🔄 TestPortfolioLoading: Начинаем тест портфолио...');
      
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      const url = `${SUPABASE_URL}/rest/v1/cases?select=*&is_visible=eq.true&order=sort_order.asc&limit=10`;
      
      console.log('🔄 TestPortfolioLoading: Делаем REST запрос...');
      console.log('🔄 TestPortfolioLoading: URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('🔄 TestPortfolioLoading: Ответ получен, статус:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ TestPortfolioLoading: HTTP ошибка:', response.status, errorText);
        setResult(`❌ HTTP ошибка ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('✅ TestPortfolioLoading: Данные получены:', data);
      console.log('✅ TestPortfolioLoading: Количество записей:', data?.length || 0);
      
      if (data && data.length > 0) {
        const firstCase = data[0];
        console.log('✅ TestPortfolioLoading: Первый кейс:', firstCase);
        console.log('✅ TestPortfolioLoading: Поля:', Object.keys(firstCase));
      }
      
      setResult(`✅ Успех! Загружено ${data?.length || 0} кейсов портфолио`);
      
    } catch (err) {
      console.error('❌ TestPortfolioLoading: Исключение:', err);
      setResult(`❌ Исключение: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔧 Тест загрузки портфолио
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Результат теста:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">{result}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={testPortfolio}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {loading ? '🔄 Тестируем...' : '🚀 Тест портфолио'}
          </button>
        </div>

        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">📋 Этот тест проверяет:</h3>
          <ul className="text-purple-700 space-y-1">
            <li>• Подключение к таблице cases</li>
            <li>• RLS политики для портфолио</li>
            <li>• Загрузку кейсов из БД</li>
            <li>• Структуру данных портфолио</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestPortfolioLoading;
