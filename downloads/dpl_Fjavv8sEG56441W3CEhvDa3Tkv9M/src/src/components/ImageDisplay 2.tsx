import React, { useState, useEffect } from 'react';
import { getImageById, getImageUrl } from '../api/images';

interface ImageDisplayProps {
  imageId: string | null;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  imageId, 
  alt = "Изображение", 
  className = "",
  fallbackSrc = "/placeholder.svg"
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!imageId) {
        setImageUrl(null);
        return;
      }

      // Если это UUID (ID изображения из БД), загружаем из БД
      if (imageId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        try {
          setLoading(true);
          setError(false);
          
          const imageData = await getImageById(imageId);
          if (imageData) {
            const url = getImageUrl(imageData);
            setImageUrl(url);
          } else {
            setError(true);
          }
        } catch (err) {
          console.error('Ошибка загрузки изображения из БД:', err);
          setError(true);
        } finally {
          setLoading(false);
        }
      } else {
        // Если это URL, используем как есть
        setImageUrl(imageId);
      }
    };

    loadImage();
  }, [imageId]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/placeholder.svg";
        }}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default ImageDisplay;
