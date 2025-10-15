import React, { useState } from 'react';

const UltraSimpleTest = () => {
  const [result, setResult] = useState<string>('Готов к тестированию');
  const [loading, setLoading] = useState(false);

  const testSupabase = async () => {
    setLoading(true);
    setResult('Тестируем...');
    
    try {
      console.log('🔄 UltraSimpleTest: Начинаем тест...');
      
      // Создаем клиент напрямую
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      console.log('🔄 UltraSimpleTest: Создаем клиент...');
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      
      console.log('🔄 UltraSimpleTest: Делаем запрос...');
      const { data, error } = await supabase
        .from('homepage_equipment')
        .select('*')
        .limit(5);

      if (error) {
        console.error('❌ UltraSimpleTest: Ошибка:', error);
        setResult(`❌ Ошибка: ${error.message}`);
        return;
      }

      console.log('✅ UltraSimpleTest: Данные получены:', data);
      setResult(`✅ Успех! Загружено ${data?.length || 0} записей`);
      
    } catch (err) {
      console.error('❌ UltraSimpleTest: Исключение:', err);
      setResult(`❌ Исключение: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🔧 Ультра-простой тест Supabase
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Результат теста:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">{result}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={testSupabase}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? '🔄 Тестируем...' : '🚀 Запустить тест'}
          </button>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">📋 Что проверяет этот тест:</h3>
          <ul className="text-yellow-700 space-y-1">
            <li>• Подключение к Supabase</li>
            <li>• Доступ к таблице homepage_equipment</li>
            <li>• RLS политики</li>
            <li>• Загрузку данных</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UltraSimpleTest;