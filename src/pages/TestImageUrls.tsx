import React, { useState } from 'react';

const TestImageUrls: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, string>>({});

  const testUrls = [
    'https://zbykhdjqrtqftfitbvbt.supabase.co/storage/v1/object/public/public/cases/images/1759179701042.jpg',
    'https://zbykhdjqrtqftfitbvbt.supabase.co/storage/v1/object/public/public/cases/images/1759179866145.jpeg',
    'https://zbykhdjqrtqftfitbvbt.supabase.co/storage/v1/object/public/public/cases/images/1759179292349.jpeg',
    '/placeholder.svg',
    '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png'
  ];

  const testImageUrl = (url: string) => {
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => resolve('✅ Загружено');
      img.onerror = (e) => {
        console.error('Ошибка загрузки изображения:', url, e);
        resolve('❌ Ошибка загрузки');
      };
      img.src = url;
      
      // Таймаут через 5 секунд
      setTimeout(() => {
        if (!testResults[url]) {
          resolve('⏰ Таймаут');
        }
      }, 5000);
    });
  };

  const testAllUrls = async () => {
    const results: Record<string, string> = {};
    
    for (const url of testUrls) {
      const result = await testImageUrl(url);
      results[url] = result;
      setTestResults({ ...results });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Тест URL изображений
        </h1>

        <div className="mb-6">
          <button
            onClick={testAllUrls}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Тестировать все URL
          </button>
        </div>

        <div className="space-y-6">
          {testUrls.map((url, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={url}
                    alt={`Test ${index + 1}`}
                    className="w-32 h-32 object-cover rounded border"
                    onLoad={() => {
                      if (!testResults[url]) {
                        setTestResults(prev => ({ ...prev, [url]: '✅ Загружено' }));
                      }
                    }}
                    onError={() => {
                      setTestResults(prev => ({ ...prev, [url]: '❌ Ошибка загрузки' }));
                    }}
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-2">
                    Тест {index + 1}
                  </h3>
                  
                  <div className="mb-2">
                    <strong>URL:</strong>
                    <div className="break-all text-blue-600 text-sm mt-1">
                      {url}
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Статус:</strong>
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      testResults[url]?.includes('✅') ? 'bg-green-100 text-green-800' :
                      testResults[url]?.includes('❌') ? 'bg-red-100 text-red-800' :
                      testResults[url]?.includes('⏰') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {testResults[url] || '⏳ Не тестировано'}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Открыть в новой вкладке
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Инструкции по диагностике
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• ✅ Загружено - изображение загружается корректно</li>
            <li>• ❌ Ошибка загрузки - изображение недоступно или заблокировано</li>
            <li>• ⏰ Таймаут - изображение загружается слишком долго</li>
            <li>• Проверьте консоль браузера на наличие CORS ошибок</li>
            <li>• Убедитесь, что Supabase Storage настроен правильно</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestImageUrls;



