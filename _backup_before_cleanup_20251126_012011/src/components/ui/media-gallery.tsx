import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { OptimizedImage } from './optimized-image';
import { OptimizedVideo } from './optimized-video';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string;
  poster?: string;
  videoSources?: Array<{
    quality: string;
    url: string;
    type: string;
  }>;
  width?: number;
  height?: number;
}

interface MediaGalleryProps {
  items: MediaItem[];
  columns?: number;
  gap?: number;
  showLightbox?: boolean;
  className?: string;
  onItemClick?: (item: MediaItem, index: number) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  columns = 3,
  gap = 4,
  showLightbox = true,
  className = '',
  onItemClick
}) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const lightboxRef = useRef<HTMLDivElement>(null);

  // Закрытие лайтбокса по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isLightboxOpen]);

  // Блокировка скролла при открытом лайтбоксе
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const openLightbox = (item: MediaItem, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsLightboxOpen(true);
    onItemClick?.(item, index);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedItem(null);
    setIsVideoPlaying(false);
  };

  const goToPrevious = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
    setSelectedIndex(newIndex);
    setSelectedItem(items[newIndex]);
    setIsVideoPlaying(false);
  };

  const goToNext = () => {
    const newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
    setSelectedItem(items[newIndex]);
    setIsVideoPlaying(false);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const toggleVideoMute = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  };

  const gapClasses = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <>
      {/* Основная галерея */}
      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} ${gapClasses[gap as keyof typeof gapClasses]} ${className}`}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => openLightbox(item, index)}
          >
            {/* Превью изображение */}
            {item.type === 'image' ? (
              <OptimizedImage
                src={item.thumbnail || item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative">
                <OptimizedImage
                  src={item.poster || item.thumbnail || '/placeholder.svg'}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Оверлей при наведении */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.type === 'image' ? (
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Лайтбокс */}
      {isLightboxOpen && selectedItem && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Кнопка закрытия */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Навигационные кнопки */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Основной контент */}
          <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === 'image' ? (
              <OptimizedImage
                src={selectedItem.src}
                alt={selectedItem.alt}
                width={selectedItem.width}
                height={selectedItem.height}
                className="max-w-full max-h-full object-contain"
                priority
              />
            ) : (
              <div className="relative">
                <OptimizedVideo
                  sources={selectedItem.videoSources || [{ quality: 'auto', url: selectedItem.src, type: 'video/mp4' }]}
                  poster={selectedItem.poster}
                  width={selectedItem.width}
                  height={selectedItem.height}
                  className="max-w-full max-h-full"
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  muted={isVideoMuted}
                />
                
                {/* Дополнительные контролы для видео в лайтбоксе */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <button
                    onClick={toggleVideoMute}
                    className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  >
                    {isVideoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Счетчик изображений */}
          {items.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {items.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MediaGallery;
