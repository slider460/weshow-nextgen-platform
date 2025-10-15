import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

interface CaseData {
  id: string;
  title: string;
  client: string;
  year: string;
  description: string;
  image_url?: string;
  is_visible: boolean;
  sort_order: number;
}

const TestCasesImages: React.FC = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        throw error;
      }

      setCases(data || []);
    } catch (err) {
      console.error('Ошибка загрузки кейсов:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const testImageUrl = (url: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Загрузка кейсов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Тест изображений кейсов
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">Ошибка: {error}</p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-slate-600">
            Найдено кейсов: <strong>{cases.length}</strong>
          </p>
          <p className="text-slate-600">
            Кейсы с изображениями: <strong>{cases.filter(c => c.image_url).length}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {caseItem.image_url ? (
                  <div className="relative">
                    <img
                      src={caseItem.image_url}
                      alt={caseItem.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        console.error('Ошибка загрузки изображения:', caseItem.image_url);
                        (e.target as HTMLImageElement).style.display = 'none';
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'w-full h-48 bg-red-100 flex items-center justify-center text-red-600';
                        errorDiv.textContent = 'Ошибка загрузки';
                        (e.target as HTMLImageElement).parentNode?.appendChild(errorDiv);
                      }}
                      onLoad={() => {
                        console.log('Изображение загружено:', caseItem.image_url);
                      }}
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                      ✓ Изображение
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📷</div>
                      <div className="text-sm">Нет изображения</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{caseItem.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {caseItem.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span>{caseItem.client}</span>
                  <span>{caseItem.year}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <strong>ID:</strong> {caseItem.id}
                  </div>
                  <div>
                    <strong>URL изображения:</strong> 
                    <div className="break-all text-blue-600 mt-1">
                      {caseItem.image_url || 'Не указано'}
                    </div>
                  </div>
                  <div>
                    <strong>Видимый:</strong> {caseItem.is_visible ? 'Да' : 'Нет'}
                  </div>
                  <div>
                    <strong>Порядок:</strong> {caseItem.sort_order}
                  </div>
                </div>

                {caseItem.image_url && (
                  <div className="mt-4 p-2 bg-blue-50 rounded">
                    <button
                      onClick={() => window.open(caseItem.image_url, '_blank')}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Открыть изображение в новой вкладке
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {cases.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-600">Кейсы не найдены</p>
            <p className="text-sm text-blue-500 mt-2">
              Проверьте подключение к базе данных
            </p>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            Диагностика изображений
          </h3>
          <ul className="text-yellow-800 space-y-1 text-sm">
            <li>• Проверьте, что URL изображений корректные</li>
            <li>• Убедитесь, что изображения доступны по указанным ссылкам</li>
            <li>• Проверьте права доступа к файлам в Supabase Storage</li>
            <li>• Убедитесь, что bucket 'public' существует и настроен правильно</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestCasesImages;


