import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadImageToDB, getImageUrl, base64ToDataUrl, getImageById } from '../api/images';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  placeholder = "Выберите изображение или введите URL",
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обновляем превью при изменении value
  useEffect(() => {
    const loadImagePreview = async () => {
      if (value && value.trim()) {
        // Если это UUID (ID изображения из БД), загружаем из БД
        if (value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          try {
            const imageData = await getImageById(value);
            if (imageData) {
              const imageUrl = getImageUrl(imageData);
              setPreview(imageUrl);
            } else {
              setPreview(null);
            }
          } catch (error) {
            console.error('Ошибка загрузки изображения из БД:', error);
            setPreview(null);
          }
        } else {
          // Если это URL, используем как есть
          setPreview(value);
        }
      } else {
        setPreview(null);
      }
    };

    loadImagePreview();
  }, [value]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите файл изображения');
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Создаем локальный URL для предварительного просмотра
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
      
      // Загружаем изображение в БД
      console.log('📤 Загружаем изображение в БД...');
      const imageData = await uploadImageToDB(file);
      
      // Получаем URL для отображения
      const imageUrl = getImageUrl(imageData);
      
      console.log('✅ Изображение загружено в БД:', imageData.id);
      
      // Обновляем значение с ID изображения из БД
      onChange(imageData.id);
      
      // Обновляем превью с данными из БД
      setPreview(imageUrl);
      
      // Очищаем локальный URL
      URL.revokeObjectURL(localUrl);
      
    } catch (error) {
      console.error('❌ Ошибка загрузки изображения:', error);
      
      // Показываем более информативное сообщение об ошибке
      let errorMessage = 'Неизвестная ошибка';
      if (error instanceof Error) {
        if (error.message.includes('File too large')) {
          errorMessage = 'Файл слишком большой. Максимальный размер: 5MB.';
        } else if (error.message.includes('row-level security policy')) {
          errorMessage = 'Ошибка политики безопасности. Выполните скрипт create_images_table.sql в Supabase.';
        } else if (error.message.includes('RLS')) {
          errorMessage = 'Ошибка Row Level Security. Проверьте настройки политик для таблицы images.';
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(`Ошибка загрузки изображения: ${errorMessage}\n\nАльтернатива: используйте внешний URL изображения.`);
      
      // Сбрасываем превью при ошибке
      setPreview(null);
      onChange('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    if (url && url.trim()) {
      setPreview(url);
      onChange(url);
    } else {
      setPreview(null);
      onChange('');
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>Изображение</Label>
      
      {/* Превью изображения */}
      {preview && (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Превью"
                className="w-full h-48 object-cover rounded-lg"
                onError={() => setPreview(null)}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Область загрузки */}
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors ${
          isUploading ? 'opacity-50 pointer-events-none' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              {isUploading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Загрузка...</span>
                </div>
              ) : (
                <>
                  <p>Перетащите изображение сюда или</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Выберите файл
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            PNG, JPG, GIF до 5MB
          </div>
        </div>
      </div>

      {/* Скрытый input для выбора файла */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Поле для ввода URL */}
      <div className="space-y-2">
        <Label htmlFor="image-url">Или введите URL изображения</Label>
        <Input
          id="image-url"
          type="url"
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={isUploading}
        />
        {value && (
          <div className="text-xs text-gray-500 mt-1">
            Текущий URL: {value.length > 50 ? `${value.substring(0, 50)}...` : value}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
