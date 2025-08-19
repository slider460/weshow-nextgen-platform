// Конфигурация для медиа контента
export const MEDIA_CONFIG = {
  // Базовые URL для CDN
  CDN_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.weshow.su' 
    : '/media',
  
  // Локальная папка для медиа
  LOCAL_MEDIA_PATH: '/media',
  
  // Настройки изображений
  IMAGES: {
    // Размеры для разных устройств
    SIZES: {
      thumbnail: { width: 300, height: 200, quality: 80 },
      small: { width: 600, height: 400, quality: 85 },
      medium: { width: 1200, height: 800, quality: 90 },
      large: { width: 1920, height: 1080, quality: 95 },
      original: { quality: 100 }
    },
    
    // Поддерживаемые форматы
    FORMATS: ['webp', 'jpg', 'png', 'avif'],
    
    // Плейсхолдеры
    PLACEHOLDERS: {
      case: '/placeholder.svg',
      service: '/placeholder.svg',
      equipment: '/placeholder.svg',
      team: '/placeholder.svg',
      blog: '/placeholder.svg'
    }
  },
  
  // Настройки видео
  VIDEOS: {
    // Качества для разных соединений
    QUALITIES: {
      '480p': { width: 854, height: 480, bitrate: '800k' },
      '720p': { width: 1280, height: 720, bitrate: '1500k' },
      '1080p': { width: 1920, height: 1080, bitrate: '3000k' },
      '4k': { width: 3840, height: 2160, bitrate: '8000k' }
    },
    
    // Поддерживаемые форматы
    FORMATS: ['mp4', 'webm', 'ogg'],
    
    // Настройки по умолчанию
    DEFAULT: {
      autoplay: false,
      muted: true,
      loop: false,
      controls: true,
      preload: 'metadata'
    }
  },
  
  // Настройки галерей
  GALLERIES: {
    // Количество колонок для разных экранов
    COLUMNS: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      wide: 4
    },
    
    // Отступы между элементами
    GAPS: {
      small: 2,
      medium: 4,
      large: 6,
      xlarge: 8
    }
  },
  
  // Настройки ленивой загрузки
  LAZY_LOADING: {
    // Отступ для Intersection Observer
    ROOT_MARGIN: '50px',
    // Порог срабатывания
    THRESHOLD: 0.1,
    // Задержка загрузки (мс)
    DELAY: 100
  },
  
  // Настройки кэширования
  CACHING: {
    // Время жизни кэша для изображений (секунды)
    IMAGES_TTL: 86400, // 24 часа
    // Время жизни кэша для видео (секунды)
    VIDEOS_TTL: 3600, // 1 час
    // Максимальный размер кэша (байты)
    MAX_SIZE: 100 * 1024 * 1024 // 100 MB
  }
};

// Утилиты для работы с медиа
export class MediaUtils {
  /**
   * Генерирует URL для изображения с параметрами CDN
   */
  static getImageUrl(
    path: string, 
    size: keyof typeof MEDIA_CONFIG.IMAGES.SIZES = 'medium',
    format: string = 'webp'
  ): string {
    const config = MEDIA_CONFIG.IMAGES.SIZES[size];
    const baseUrl = MEDIA_CONFIG.CDN_BASE_URL;
    
    // Если это локальная разработка
    if (baseUrl === MEDIA_CONFIG.LOCAL_MEDIA_PATH) {
      return `${baseUrl}${path}`;
    }
    
    // Для CDN добавляем параметры оптимизации
    const params = new URLSearchParams({
      w: config.width.toString(),
      h: config.height.toString(),
      q: config.quality.toString(),
      f: format
    });
    
    return `${baseUrl}${path}?${params.toString()}`;
  }
  
  /**
   * Генерирует URL для видео с указанным качеством
   */
  static getVideoUrl(
    path: string,
    quality: keyof typeof MEDIA_CONFIG.VIDEOS.QUALITIES = '720p'
  ): string {
    const baseUrl = MEDIA_CONFIG.CDN_BASE_URL;
    
    if (baseUrl === MEDIA_CONFIG.LOCAL_MEDIA_PATH) {
      return `${baseUrl}${path}`;
    }
    
    const config = MEDIA_CONFIG.VIDEOS.QUALITIES[quality];
    const params = new URLSearchParams({
      w: config.width.toString(),
      h: config.height.toString(),
      b: config.bitrate
    });
    
    return `${baseUrl}${path}?${params.toString()}`;
  }
  
  /**
   * Создает набор источников для адаптивного видео
   */
  static getVideoSources(path: string): Array<{
    quality: string;
    url: string;
    type: string;
  }> {
    return Object.entries(MEDIA_CONFIG.VIDEOS.QUALITIES).map(([quality, config]) => ({
      quality,
      url: this.getVideoUrl(path, quality as keyof typeof MEDIA_CONFIG.VIDEOS.QUALITIES),
      type: 'video/mp4'
    }));
  }
  
  /**
   * Проверяет поддержку WebP
   */
  static async supportsWebP(): Promise<boolean> {
    const webP = new Image();
    return new Promise((resolve) => {
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
  
  /**
   * Получает оптимальный формат изображения для браузера
   */
  static async getOptimalImageFormat(): Promise<string> {
    if (await this.supportsWebP()) {
      return 'webp';
    }
    return 'jpg';
  }
  
  /**
   * Создает плейсхолдер для изображения
   */
  static createPlaceholder(width: number, height: number, text: string = ''): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Градиентный фон
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Текст
      if (text) {
        ctx.fillStyle = '#9ca3af';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
      }
    }
    
    return canvas.toDataURL();
  }
}

// Типы для медиа контента
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  poster?: string;
  width?: number;
  height?: number;
  duration?: number; // для видео
  fileSize?: number;
  uploadDate?: Date;
  tags?: string[];
  category?: string;
  videoSources?: Array<{
    quality: string;
    url: string;
    type: string;
  }>;
}

export interface MediaGallery {
  id: string;
  title: string;
  description?: string;
  items: MediaItem[];
  layout: 'grid' | 'masonry' | 'carousel';
  columns?: number;
  gap?: number;
  showLightbox?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}

export interface MediaCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  mediaCount: number;
  subcategories?: MediaCategory[];
}
