import React from 'react';
import useCases from '../hooks/useCases';

const TestCasesDisplay: React.FC = () => {
  const { cases, loading, error } = useCases();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Тест отображения кейсов
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Статус загрузки
          </h2>
          
          <div className="space-y-2">
            <div>
              <strong>Загрузка:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${
                loading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {loading ? 'Загружается...' : 'Завершено'}
              </span>
            </div>
            
            <div>
              <strong>Количество кейсов:</strong> {cases.length}
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                <strong>Ошибка:</strong> {error}
              </div>
            )}
          </div>
        </div>

        {cases.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Кейсы из базы данных ({cases.length})
            </h2>
            
            <div className="space-y-6">
              {cases.map((caseItem, index) => (
                <div key={caseItem.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {caseItem.title}
                      </h3>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div><strong>ID:</strong> {caseItem.id}</div>
                        <div><strong>Клиент:</strong> {caseItem.client}</div>
                        <div><strong>Год:</strong> {caseItem.year}</div>
                        <div><strong>Порядок:</strong> {caseItem.sort_order}</div>
                        <div><strong>Видимый:</strong> {caseItem.is_visible ? 'Да' : 'Нет'}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-600 mb-2">
                        <strong>Описание:</strong>
                      </div>
                      <p className="text-sm text-slate-700 mb-3">
                        {caseItem.description || 'Описание не указано'}
                      </p>
                      
                      <div className="text-sm text-slate-600 mb-2">
                        <strong>Результаты:</strong>
                      </div>
                      <div className="text-sm text-slate-700">
                        {Array.isArray(caseItem.results) ? (
                          <ul className="list-disc list-inside space-y-1">
                            {caseItem.results.map((result, resultIndex) => (
                              <li key={resultIndex}>{result}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{caseItem.results || 'Результаты не указаны'}</p>
                        )}
                      </div>
                      
                      <div className="text-sm text-slate-600 mb-2 mt-3">
                        <strong>Технологии:</strong>
                      </div>
                      <div className="text-sm text-slate-700">
                        {Array.isArray(caseItem.technologies) ? (
                          <ul className="list-disc list-inside space-y-1">
                            {caseItem.technologies.map((tech, techIndex) => (
                              <li key={techIndex}>{tech}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{caseItem.technologies || 'Технологии не указаны'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {caseItem.image_url && (
                    <div className="mt-4">
                      <div className="text-sm text-slate-600 mb-2">
                        <strong>Изображение:</strong>
                      </div>
                      <img 
                        src={caseItem.image_url} 
                        alt={caseItem.title}
                        className="w-32 h-20 object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && cases.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-600">Кейсы не найдены</p>
            <p className="text-sm text-blue-500 mt-2">
              Проверьте подключение к базе данных или добавьте кейсы в админ панели
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesDisplay;