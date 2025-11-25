import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

const TestDirectSupabase: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Тестирую прямое подключение к Supabase...');
        setLoading(true);
        setError(null);
        
        const { data: letters, error: lettersError } = await supabase
          .from('letters_certificates')
          .select('*')
          .order('sort_order', { ascending: true });

        if (lettersError) {
          console.error('❌ Ошибка Supabase:', lettersError);
          setError(lettersError.message);
          return;
        }

        console.log('✅ Данные получены:', letters);
        setData(letters || []);
      } catch (err) {
        console.error('❌ Общая ошибка:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            🔍 Тест прямого подключения к Supabase
          </h1>
          
          <div className="mb-6">
            <div className="bg-slate-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Статус:</h3>
              <p className={`text-lg ${loading ? 'text-yellow-600' : error ? 'text-red-600' : 'text-green-600'}`}>
                {loading ? '⏳ Загружается...' : error ? `❌ ${error}` : '✅ Загружено'}
              </p>
            </div>
          </div>

          {data.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">
                Данные ({data.length} записей):
              </h3>
              <div className="space-y-4">
                {data.map((letter, index) => (
                  <div key={letter.id} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-blue-800">{letter.title}</h4>
                        <p className="text-blue-600 text-sm">{letter.issuer}</p>
                        <p className="text-blue-500 text-xs">Тип: {letter.type}</p>
                        <p className="text-blue-500 text-xs">Описание: {letter.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-600 text-sm">Порядок: {letter.sort_order}</p>
                        <p className="text-blue-500 text-xs">
                          {letter.is_visible ? '👁️ Видимо' : '🙈 Скрыто'}
                        </p>
                        <p className="text-blue-500 text-xs">
                          Дата: {letter.issued_date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Отладочная информация:</h3>
            <pre className="text-sm overflow-x-auto">
              <code>{JSON.stringify({ loading, error, dataCount: data.length }, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDirectSupabase;
