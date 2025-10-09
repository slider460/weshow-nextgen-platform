import React, { useState } from 'react';
import { supabase } from '../config/supabase';
import useCases from '../hooks/useCases';

const TestCasesLoading: React.FC = () => {
  const [directTest, setDirectTest] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Тестируем хук useCases
  const { cases, loading: hookLoading, error: hookError } = useCases();

  const testDirectSupabase = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Тестируем прямое подключение к Supabase...');
      
      // Проверяем таблицу cases
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('❌ Ошибка Supabase:', error);
        setError(error.message);
        return;
      }

      console.log('✅ Данные получены:', data);
      setDirectTest(data);
      
    } catch (err) {
      console.error('❌ Ошибка:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const testRESTAPI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Тестируем REST API...');
      
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      const url = `${SUPABASE_URL}/rest/v1/cases?select=*&is_visible=eq.true&order=sort_order.asc`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('🔄 REST ответ:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ REST ошибка:', response.status, errorText);
        setError(`REST ошибка ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('✅ REST данные:', data);
      setDirectTest(data);
      
    } catch (err) {
      console.error('❌ REST ошибка:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const checkTableExists = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Проверяем существование таблицы cases...');
      
      const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
      
      // Проверяем таблицы в схеме public
      const url = `${SUPABASE_URL}/rest/v1/information_schema.tables?select=table_name&table_schema=eq.public`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Ошибка проверки таблиц: ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      console.log('✅ Таблицы в базе:', data);
      
      const caseTables = data.filter((table: any) => 
        table.table_name.toLowerCase().includes('case')
      );
      
      setDirectTest({
        allTables: data,
        caseTables: caseTables,
        hasCasesTable: caseTables.some((table: any) => table.table_name === 'cases')
      });
      
    } catch (err) {
      console.error('❌ Ошибка проверки таблиц:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Тестирование загрузки кейсов
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Хук useCases */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Тест хука useCases
            </h2>
            
            <div className="space-y-4">
              <div>
                <strong>Статус загрузки:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  hookLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {hookLoading ? 'Загружается...' : 'Завершено'}
                </span>
              </div>
              
              {hookError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                  <strong>Ошибка:</strong> {hookError}
                </div>
              )}
              
              <div>
                <strong>Количество кейсов:</strong> {cases.length}
              </div>
              
              {cases.length > 0 && (
                <div>
                  <strong>Кейсы:</strong>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {cases.map((caseItem) => (
                      <div key={caseItem.id} className="p-2 bg-slate-50 rounded text-sm">
                        <div><strong>ID:</strong> {caseItem.id}</div>
                        <div><strong>Название:</strong> {caseItem.title}</div>
                        <div><strong>Клиент:</strong> {caseItem.client}</div>
                        <div><strong>Год:</strong> {caseItem.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Прямые тесты */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Прямые тесты подключения
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={checkTableExists}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Проверить таблицы
                </button>
                
                <button
                  onClick={testDirectSupabase}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Тест Supabase клиента
                </button>
                
                <button
                  onClick={testRESTAPI}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                >
                  Тест REST API
                </button>
              </div>
              
              {loading && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-700">
                  Выполняется запрос...
                </div>
              )}
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                  <strong>Ошибка:</strong> {error}
                </div>
              )}
              
              {directTest && (
                <div>
                  <strong>Результат:</strong>
                  <pre className="mt-2 p-3 bg-slate-50 rounded text-xs overflow-auto max-h-60">
                    {JSON.stringify(directTest, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Инструкции */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Инструкции по диагностике
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>1. Сначала проверьте существование таблицы cases</li>
            <li>2. Если таблица не существует, создайте её в Supabase Dashboard</li>
            <li>3. Если таблица существует, проверьте данные через REST API</li>
            <li>4. Убедитесь, что RLS (Row Level Security) настроен правильно</li>
            <li>5. Проверьте, что есть данные с is_visible = true</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestCasesLoading;








