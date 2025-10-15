import React, { useState, useEffect } from 'react';
import { useLettersCertificates } from '../hooks/useLettersCertificates';

const TestLettersHook: React.FC = () => {
  const { letters, loading, error, fetchAllLetters } = useLettersCertificates();
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    console.log('🔍 Тестирую хук useLettersCertificates...');
    console.log('📊 Loading:', loading);
    console.log('❌ Error:', error);
    console.log('📋 Letters:', letters);
    
    setDebugInfo({
      loading,
      error,
      lettersCount: letters.length,
      letters: letters
    });
  }, [letters, loading, error]);

  const handleRefresh = () => {
    console.log('🔄 Обновляю данные...');
    fetchAllLetters();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            🔍 Тест хука useLettersCertificates
          </h1>
          
          <div className="mb-6">
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Обновить данные
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Статус загрузки:</h3>
              <p className={`text-lg ${loading ? 'text-yellow-600' : 'text-green-600'}`}>
                {loading ? '⏳ Загружается...' : '✅ Загружено'}
              </p>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Ошибки:</h3>
              <p className={`text-lg ${error ? 'text-red-600' : 'text-green-600'}`}>
                {error ? `❌ ${error}` : '✅ Нет ошибок'}
              </p>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Количество записей:</h3>
              <p className="text-lg text-slate-600">{letters.length}</p>
            </div>

            <div className="bg-slate-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Время последнего обновления:</h3>
              <p className="text-lg text-slate-600">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {letters.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Данные:</h3>
              <div className="space-y-4">
                {letters.map((letter, index) => (
                  <div key={letter.id} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-blue-800">{letter.title}</h4>
                        <p className="text-blue-600 text-sm">{letter.issuer}</p>
                        <p className="text-blue-500 text-xs">Тип: {letter.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-600 text-sm">Порядок: {letter.sort_order}</p>
                        <p className="text-blue-500 text-xs">
                          {letter.is_visible ? '👁️ Видимо' : '🙈 Скрыто'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Отладочная информация:</h3>
            <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{JSON.stringify(debugInfo, null, 2)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLettersHook;
