import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  onClick?: () => void;
  fallback?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = '/placeholder.svg',
  sizes = '100vw',
  priority = false,
  onClick,
  fallback
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setCurrentSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, src]);

  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      setCurrentSrc(src);
    }
  }, [isInView, src, isLoaded, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setHasError(false);
    } else {
      setHasError(true);
      setCurrentSrc(placeholder);
    }
  };

  // Генерируем WebP URL если браузер поддерживает
  const getWebPUrl = (url: string) => {
    if (url.includes('data:') || url.includes('blob:')) return url;
    
    // Добавляем параметры для CDN оптимизации
    const separator = url.includes('?') ? '&' : '?';
    const params = new URLSearchParams();
    
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', '85'); // Качество 85%
    params.append('f', 'webp'); // Формат WebP
    
    return `${url}${separator}${params.toString()}`;
  };

  const webPSrc = getWebPUrl(currentSrc);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width: width || 'auto', height: height || 'auto' }}
    >
      {/* Плейсхолдер пока изображение не загружено */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
      )}
      
      {/* Основное изображение */}
      <picture>
        <source srcSet={webPSrc} type="image/webp" />
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${onClick ? 'cursor-pointer' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
        />
      </picture>

      {/* Индикатор загрузки */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Индикатор ошибки */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <div className="text-red-500 text-sm text-center">
            <div className="w-8 h-8 mx-auto mb-2">⚠️</div>
            Ошибка загрузки
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
