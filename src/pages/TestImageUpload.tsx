import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import ImageUpload from '../components/ImageUpload';

const TestImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleImageChange = (url: string) => {
    setImageUrl(url);
    addResult(`Изображение изменено: ${url ? 'URL установлен' : 'URL очищен'}`);
  };

  const testImageDisplay = () => {
    if (!imageUrl) {
      addResult('❌ Нет URL для тестирования');
      return;
    }
    addResult(`🖼️ Тестируем отображение: ${imageUrl}`);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Тест загрузки изображений</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload
              value={imageUrl}
              onChange={handleImageChange}
              placeholder="Выберите изображение для тестирования"
            />
            
            {imageUrl && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Предварительный просмотр:</h3>
                <div className="border rounded-lg p-4">
                  <img
                    src={imageUrl}
                    alt="Тестовое изображение"
                    className="max-w-full h-64 object-contain mx-auto"
                    onLoad={() => addResult('✅ Изображение успешно загружено')}
                    onError={() => addResult('❌ Ошибка загрузки изображения')}
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">URL изображения:</h4>
                  <code className="block p-2 bg-gray-100 rounded text-sm break-all">
                    {imageUrl}
                  </code>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={testImageDisplay} disabled={!imageUrl}>
                Тестировать отображение
              </Button>
              <Button onClick={clearResults} variant="outline">
                Очистить результаты
              </Button>
            </div>
          </CardContent>
        </Card>

        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Результаты тестирования</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestImageUpload;
