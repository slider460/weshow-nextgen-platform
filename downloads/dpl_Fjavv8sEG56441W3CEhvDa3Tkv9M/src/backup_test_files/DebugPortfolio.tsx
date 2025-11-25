import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const DebugPortfolio = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        console.log('🔍 Начинаем загрузку кейсов...');
        
        const { data, error: fetchError } = await supabase
          .from('cases')
          .select('*')
          .eq('is_visible', true)
          .order('sort_order', { ascending: true });

        if (fetchError) {
          console.error('❌ Ошибка Supabase:', fetchError);
          setError(fetchError.message);
          return;
        }

        console.log('✅ Кейсы загружены:', data);
        setCases(data || []);
      } catch (err) {
        console.error('💥 Исключение:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const processCases = (cases) => {
    return cases.map(caseItem => {
      // Обрабатываем results
      let results = [];
      if (Array.isArray(caseItem.results)) {
        results = caseItem.results;
      } else if (typeof caseItem.results === 'string' && caseItem.results.trim()) {
        try {
          const parsed = JSON.parse(caseItem.results);
          if (Array.isArray(parsed)) {
            results = parsed;
          } else {
            results = caseItem.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
          }
        } catch {
          results = caseItem.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
        }
      }
      
      return {
        title: caseItem.title,
        description: caseItem.description,
        year: caseItem.year,
        results: results,
        image: caseItem.image_url
      };
    });
  };

  const processedCases = processCases(cases);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Отладка портфолио</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Статус загрузки</h2>
            <p>Загрузка: {loading ? 'Да' : 'Нет'}</p>
            <p>Ошибка: {error || 'Нет'}</p>
            <p>Кейсов в БД: {cases.length}</p>
            <p>Обработано кейсов: {processedCases.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Консоль</h2>
            <p className="text-sm text-gray-600">Откройте консоль браузера (F12) для просмотра логов</p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Загрузка кейсов...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-red-800 font-semibold mb-2">Ошибка:</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && processedCases.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Обработанные кейсы</h2>
            {processedCases.map((caseItem, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{caseItem.title}</h3>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Описание:</p>
                  <p className="text-gray-800">{caseItem.description}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 mb-2">Год:</p>
                  <p className="text-gray-800">{caseItem.year}</p>
                </div>

                {caseItem.results && caseItem.results.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-600 mb-2">Результаты ({caseItem.results.length}):</p>
                    <ul className="list-disc list-inside space-y-1">
                      {caseItem.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="text-sm text-gray-700">{result}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {caseItem.image && (
                  <div className="mb-4">
                    <p className="text-gray-600 mb-2">Изображение:</p>
                    <img 
                      src={caseItem.image} 
                      alt={caseItem.title}
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && !error && processedCases.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-yellow-800 font-semibold mb-2">Кейсы не найдены</h3>
            <p className="text-yellow-600">В базе данных нет видимых кейсов или произошла ошибка при обработке.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugPortfolio;
