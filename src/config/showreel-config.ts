// Конфигурация для Showreel
export const SHOWREEL_CONFIG = {
  // Основное видео
  MAIN_VIDEO: {
    sources: [
      {
        quality: '1080p',
        url: 'https://dl.dropboxusercontent.com/scl/fi/ia60fgempj6mlafdvvbr4/HM_Showreel.mp4?rlkey=d802gdjo6qe28t0olm0g94oys&st=837979cu&dl=1',
        type: 'video/mp4'
      }
    ],
    poster: '/media/showreel/images/poster.jpg',
    thumbnail: '/media/showreel/thumbnails/thumbnail.jpg',
    width: 1920,
    height: 1080,
    duration: 120, // в секундах
    autoplay: true,
    muted: true,
    loop: false,
    controls: false
  },

  // Альтернативные источники (если локальные файлы недоступны)
  FALLBACK_SOURCES: {
    dropbox: 'https://dl.dropboxusercontent.com/scl/fi/ia60fgempj6mlafdvvbr4/HM_Showreel.mp4?rlkey=d802gdjo6qe28t0olm0g94oys&st=837979cu&dl=1',
    youtube: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
    vimeo: 'https://player.vimeo.com/video/YOUR_VIDEO_ID'
  },

  // Настройки воспроизведения
  PLAYBACK: {
    startTime: 0,
    endTime: null, // null = до конца
    playbackRate: 1.0,
    volume: 0.8
  },

  // Настройки UI
  UI: {
    showControls: true,
    controlsTimeout: 3000, // мс
    showProgress: true,
    showQualitySelector: true,
    showFullscreenButton: true,
    showMuteButton: true,
    showResetButton: true
  },

  // Метаданные
  METADATA: {
    title: 'WESHOW Showreel 2025',
    description: 'Демонстрация наших лучших проектов и возможностей',
    tags: ['showreel', 'portfolio', 'multimedia', 'weshow'],
    category: 'showcase'
  }
};

// Утилиты для работы с showreel
export class ShowreelUtils {
  /**
   * Получает оптимальный источник видео на основе соединения
   */
  static getOptimalSource(sources: any[]) {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.effectiveType === '4g') {
        return sources.find(s => s.quality === '1080p') || sources[0];
      } else if (connection.effectiveType === '3g') {
        return sources.find(s => s.quality === '720p') || sources[0];
      }
    }
    return sources[0]; // По умолчанию первое качество
  }

  /**
   * Проверяет доступность локального файла
   */
  static async checkLocalFileAvailability(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Получает fallback URL если локальный файл недоступен
   */
  static async getFallbackUrl(localUrl: string, fallbackUrl: string): Promise<string> {
    const isLocalAvailable = await this.checkLocalFileAvailability(localUrl);
    return isLocalAvailable ? localUrl : fallbackUrl;
  }

  /**
   * Форматирует время в MM:SS
   */
  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  /**
   * Создает превью изображение из видео
   */
  static createVideoThumbnail(videoFile: File): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.onloadeddata = () => {
        // Устанавливаем время для создания превью (например, 5 секунда)
        video.currentTime = 5;
      };

      video.onseeked = () => {
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        }
      };

      video.src = URL.createObjectURL(videoFile);
    });
  }
}

// Типы для showreel
export interface ShowreelVideo {
  sources: Array<{
    quality: string;
    url: string;
    type: string;
    fallback?: string;
  }>;
  poster: string;
  thumbnail: string;
  width: number;
  height: number;
  duration: number;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  controls: boolean;
}

export interface ShowreelConfig {
  mainVideo: ShowreelVideo;
  fallbackSources: {
    dropbox: string;
    youtube: string;
    vimeo: string;
  };
  playback: {
    startTime: number;
    endTime: number | null;
    playbackRate: number;
    volume: number;
  };
  ui: {
    showControls: boolean;
    controlsTimeout: number;
    showProgress: boolean;
    showQualitySelector: boolean;
    showFullscreenButton: boolean;
    showMuteButton: boolean;
    showResetButton: boolean;
  };
  metadata: {
    title: string;
    description: string;
    tags: string[];
    category: string;
  };
}
