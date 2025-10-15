import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const TestExternalImages: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  // Готовые тестовые URL изображений
  const testImages = [
    {
      name: 'Случайное изображение 1',
      url: 'https://picsum.photos/800/600?random=1',
      description: 'Lorem Picsum - случайное изображение'
    },
    {
      name: 'Случайное изображение 2', 
      url: 'https://picsum.photos/800/600?random=2',
      description: 'Lorem Picsum - случайное изображение'
    },
    {
      name: 'Placeholder синий',
      url: 'https://via.placeholder.com/800x600/0066cc/ffffff?text=Test+Image',
      description: 'Placeholder с текстом'
    },
    {
      name: 'Placeholder оранжевый',
      url: 'https://via.placeholder.com/800x600/cc6600/ffffff?text=News+Image',
      description: 'Placeholder с текстом'
    },
    {
      name: 'Unsplash природа',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      description: 'Unsplash - горы и природа'
    },
    {
      name: 'Unsplash технологии',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      description: 'Unsplash - технологии'
    }
  ];

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
    setCustomUrl(url);
  };

  const handleCustomUrlChange = (url: string) => {
    setCustomUrl(url);
    if (url.trim()) {
      setSelectedImage(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Тест внешних URL изображений</CardTitle>
            <p className="text-gray-600">
              Выберите готовое изображение или введите свой URL для тестирования
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Готовые изображения */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">
                Готовые тестовые изображения:
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testImages.map((image, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedImage === image.url ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleImageSelect(image.url)}
                  >
                    <CardContent className="p-4">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded mb-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/800x600/ff0000/ffffff?text=Error+Loading';
                        }}
                      />
                      <h3 className="font-medium text-sm">{image.name}</h3>
                      <p className="text-xs text-gray-500">{image.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Поле для ввода URL */}
            <div>
              <Label htmlFor="custom-url" className="text-lg font-semibold mb-2 block">
                Или введите свой URL:
              </Label>
              <Input
                id="custom-url"
                type="url"
                value={customUrl}
                onChange={(e) => handleCustomUrlChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mb-4"
              />
            </div>

            {/* Предварительный просмотр */}
            {selectedImage && (
              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  Предварительный просмотр:
                </Label>
                <Card>
                  <CardContent className="p-4">
                    <img
                      src={selectedImage}
                      alt="Предварительный просмотр"
                      className="w-full max-w-2xl h-64 object-contain mx-auto rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x600/ff0000/ffffff?text=Error+Loading';
                      }}
                    />
                    <div className="mt-4 p-3 bg-gray-100 rounded">
                      <p className="text-sm font-mono break-all">
                        <strong>URL:</strong> {selectedImage}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Кнопки действий */}
            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(selectedImage);
                  alert('URL скопирован в буфер обмена!');
                }}
                disabled={!selectedImage}
              >
                Скопировать URL
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedImage('');
                  setCustomUrl('');
                }}
              >
                Очистить
              </Button>
            </div>

            {/* Инструкции */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Как использовать в админке:</h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Выберите изображение выше или введите свой URL</li>
                <li>2. Скопируйте URL (кнопка "Скопировать URL")</li>
                <li>3. Перейдите в админку новостей</li>
                <li>4. Создайте новую новость</li>
                <li>5. Вставьте URL в поле "URL изображения"</li>
                <li>6. Сохраните новость</li>
              </ol>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestExternalImages;
