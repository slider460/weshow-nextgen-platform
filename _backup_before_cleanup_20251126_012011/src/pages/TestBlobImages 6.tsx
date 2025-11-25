import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import ImageUpload from '../components/ImageUpload';
import ImageDisplay from '../components/ImageDisplay';
import { getImages, deleteImageFromDB } from '../api/images';
import { Image } from '../types/database';

const TestBlobImages: React.FC = () => {
  const [selectedImageId, setSelectedImageId] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const imagesData = await getImages(20);
      setImages(imagesData);
    } catch (error) {
      console.error('Ошибка загрузки изображений:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  const handleDeleteImage = async (imageId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить это изображение?')) {
      try {
        await deleteImageFromDB(imageId);
        await loadImages(); // Перезагружаем список
        if (selectedImageId === imageId) {
          setSelectedImageId('');
        }
      } catch (error) {
        console.error('Ошибка удаления изображения:', error);
        alert('Ошибка удаления изображения');
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Тест загрузки изображений в БД</CardTitle>
            <p className="text-gray-600">
              Загружайте изображения с компьютера - они будут сохранены в базе данных как BLOB данные
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Загрузка изображения */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Загрузить новое изображение:</h3>
              <ImageUpload
                value={selectedImageId}
                onChange={handleImageSelect}
                placeholder="Выберите изображение для загрузки в БД"
              />
            </div>

            {/* Предварительный просмотр */}
            {selectedImageId && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Предварительный просмотр:</h3>
                <Card>
                  <CardContent className="p-4">
                    <ImageDisplay
                      imageId={selectedImageId}
                      alt="Предварительный просмотр"
                      className="w-full max-w-2xl h-64 object-contain mx-auto rounded"
                    />
                    <div className="mt-4 p-3 bg-gray-100 rounded">
                      <p className="text-sm font-mono break-all">
                        <strong>ID изображения:</strong> {selectedImageId}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Список загруженных изображений */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Загруженные изображения:</h3>
                <Button onClick={loadImages} disabled={loading}>
                  {loading ? 'Загрузка...' : 'Обновить'}
                </Button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Загрузка изображений...</p>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Нет загруженных изображений
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <Card key={image.id} className="group hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <ImageDisplay
                          imageId={image.id}
                          alt={image.original_name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-medium truncate">{image.original_name}</p>
                          <p className="text-xs text-gray-500">
                            {image.width}x{image.height} • {formatFileSize(image.size_bytes)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(image.created_at).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedImageId(image.id)}
                            className="flex-1"
                          >
                            Выбрать
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteImage(image.id)}
                          >
                            Удалить
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Инструкции */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Как это работает:</h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Выберите изображение с компьютера</li>
                <li>2. Изображение конвертируется в base64 и сохраняется в БД</li>
                <li>3. В поле image_url новости сохраняется ID изображения из БД</li>
                <li>4. При отображении изображение загружается из БД по ID</li>
                <li>5. Изображения хранятся в таблице images как BYTEA данные</li>
              </ol>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestBlobImages;
