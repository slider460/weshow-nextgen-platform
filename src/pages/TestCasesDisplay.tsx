import React from 'react';
import useCases from '../hooks/useCases';

const TestCasesDisplay = () => {
  const { cases, loading, error } = useCases();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Тест отображения кейсов</h1>
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Загрузка кейсов...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-red-800 font-semibold mb-2">Ошибка загрузки:</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Статус загрузки:</h2>
            <p className="text-gray-600">Кейсов найдено: <span className="font-bold text-blue-600">{cases.length}</span></p>
          </div>
        )}

        {!loading && !error && cases.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Кейсы из базы данных:</h2>
            {cases.map((caseItem, index) => (
              <div key={caseItem.id} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{caseItem.title}</h3>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">ID:</p>
                    <p className="text-xs font-mono bg-gray-100 p-2 rounded">{caseItem.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Год:</p>
                    <p className="text-gray-800">{caseItem.year || 'Не указан'}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Описание:</p>
                  <p className="text-gray-800">{caseItem.description || 'Нет описания'}</p>
                </div>

                {caseItem.results && caseItem.results.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Результаты:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {caseItem.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="text-sm text-gray-700">{result}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {caseItem.technologies && caseItem.technologies.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Технологии:</p>
                    <div className="flex flex-wrap gap-2">
                      {caseItem.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {caseItem.image_url && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Изображение:</p>
                    <img 
                      src={caseItem.image_url} 
                      alt={caseItem.title}
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  <p>Видимый: {caseItem.is_visible ? 'Да' : 'Нет'}</p>
                  <p>Порядок: {caseItem.sort_order}</p>
                  <p>Создан: {new Date(caseItem.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && cases.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-yellow-800 font-semibold mb-2">Кейсы не найдены</h3>
            <p className="text-yellow-600">В базе данных нет видимых кейсов или произошла ошибка при загрузке.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesDisplay;