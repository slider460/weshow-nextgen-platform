import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

// === ТИПЫ ДЛЯ УПРАВЛЕНИЯ РЕСУРСАМИ ===

interface Resource {
  url: string;
  type: 'script' | 'style' | 'image' | 'font' | 'prefetch' | 'preconnect';
  priority: 'high' | 'medium' | 'low';
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
  as?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface LoadingState {
  total: number;
  loaded: number;
  failed: number;
  progress: number;
  isComplete: boolean;
  errors: Error[];
}

interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  resourceTiming: PerformanceResourceTiming[];
}

// === КЛАСС ДЛЯ УПРАВЛЕНИЯ РЕСУРСАМИ ===

class ResourceManager {
  private loadedResources = new Set<string>();
  private loadingResources = new Map<string, Promise<void>>();
  private performanceObserver?: PerformanceObserver;
  private metrics: PerformanceMetrics = {
    startTime: performance.now(),
    resourceTiming: []
  };

  constructor() {
    this.initPerformanceObserver();
  }

  private initPerformanceObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];
        this.metrics.resourceTiming.push(...entries);
      });
      
      try {
        this.performanceObserver.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('Performance observer not supported:', error);
      }
    }
  }

  // Предзагрузка ресурса
  async preloadResource(resource: Resource): Promise<void> {
    if (this.loadedResources.has(resource.url)) {
      return Promise.resolve();
    }

    // Если ресурс уже загружается, возвращаем существующий промис
    if (this.loadingResources.has(resource.url)) {
      return this.loadingResources.get(resource.url)!;
    }

    const loadPromise = this.loadResource(resource);
    this.loadingResources.set(resource.url, loadPromise);

    try {
      await loadPromise;
      this.loadedResources.add(resource.url);
      resource.onLoad?.();
    } catch (error) {
      resource.onError?.(error as Error);
      throw error;
    } finally {
      this.loadingResources.delete(resource.url);
    }
  }

  // Загрузка ресурса в зависимости от типа
  private loadResource(resource: Resource): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      
      switch (resource.type) {
        case 'style':
          link.rel = 'stylesheet';
          link.href = resource.url;
          if (resource.media) link.media = resource.media;
          break;
          
        case 'script':
          const script = document.createElement('script');
          script.src = resource.url;
          script.async = true;
          if (resource.crossOrigin) script.crossOrigin = resource.crossOrigin;
          
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${resource.url}`));
          
          document.head.appendChild(script);
          return;
          
        case 'image':
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${resource.url}`));
          
          if (resource.crossOrigin) img.crossOrigin = resource.crossOrigin;
          img.src = resource.url;
          return;
          
        case 'font':
          link.rel = 'preload';
          link.as = 'font';
          link.href = resource.url;
          link.crossOrigin = 'anonymous';
          break;
          
        case 'prefetch':
          link.rel = 'prefetch';
          link.href = resource.url;
          if (resource.as) link.as = resource.as;
          break;
          
        case 'preconnect':
          link.rel = 'preconnect';
          link.href = resource.url;
          if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;
          break;
          
        default:
          reject(new Error(`Unknown resource type: ${resource.type}`));
          return;
      }
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load resource: ${resource.url}`));
      
      document.head.appendChild(link);
    });
  }

  // Пакетная загрузка ресурсов
  async preloadResources(
    resources: Resource[],
    onProgress?: (state: LoadingState) => void
  ): Promise<LoadingState> {
    const state: LoadingState = {
      total: resources.length,
      loaded: 0,
      failed: 0,
      progress: 0,
      isComplete: false,
      errors: []
    };

    // Сортируем по приоритету
    const sortedResources = [...resources].sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });

    // Загружаем высокоприоритетные ресурсы параллельно
    const highPriorityResources = sortedResources.filter(r => r.priority === 'high');
    const mediumPriorityResources = sortedResources.filter(r => r.priority === 'medium');
    const lowPriorityResources = sortedResources.filter(r => r.priority === 'low');

    const loadBatch = async (batch: Resource[]) => {
      const promises = batch.map(async (resource) => {
        try {
          await this.preloadResource(resource);
          state.loaded++;
        } catch (error) {
          state.failed++;
          state.errors.push(error as Error);
        }
        
        state.progress = (state.loaded + state.failed) / state.total * 100;
        onProgress?.(state);
      });
      
      await Promise.all(promises);
    };

    // Загружаем батчами по приоритету
    await loadBatch(highPriorityResources);
    await loadBatch(mediumPriorityResources);
    await loadBatch(lowPriorityResources);

    state.isComplete = true;
    this.metrics.endTime = performance.now();
    this.metrics.duration = this.metrics.endTime - this.metrics.startTime;
    
    onProgress?.(state);
    return state;
  }

  // Получение метрик производительности
  getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Очистка ресурсов
  dispose() {
    this.performanceObserver?.disconnect();
    this.loadedResources.clear();
    this.loadingResources.clear();
  }
}

// === ХУК ДЛЯ ПРЕДЗАГРУЗКИ РЕСУРСОВ ===

export function useResourcePreloader(resources: Resource[], autoStart = true) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    total: resources.length,
    loaded: 0,
    failed: 0,
    progress: 0,
    isComplete: false,
    errors: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const managerRef = useRef<ResourceManager>();
  
  if (!managerRef.current) {
    managerRef.current = new ResourceManager();
  }

  const startPreloading = useCallback(async () => {
    if (!managerRef.current || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const finalState = await managerRef.current.preloadResources(
        resources,
        setLoadingState
      );
      setLoadingState(finalState);
    } catch (error) {
      console.error('Resource preloading failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [resources, isLoading]);

  useEffect(() => {
    if (autoStart && resources.length > 0) {
      startPreloading();
    }
  }, [autoStart, resources, startPreloading]);

  useEffect(() => {
    return () => {
      managerRef.current?.dispose();
    };
  }, []);

  return {
    loadingState,
    isLoading,
    startPreloading,
    getMetrics: () => managerRef.current?.getPerformanceMetrics()
  };
}

// === КОМПОНЕНТ ПРЕДЗАГРУЗЧИКА ===

interface ResourcePreloaderProps {
  resources: Resource[];
  onComplete?: (state: LoadingState) => void;
  onProgress?: (state: LoadingState) => void;
  showProgress?: boolean;
  autoStart?: boolean;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  resources,
  onComplete,
  onProgress,
  showProgress = true,
  autoStart = true,
  children,
  fallback
}) => {
  const { loadingState, isLoading } = useResourcePreloader(resources, autoStart);

  useEffect(() => {
    onProgress?.(loadingState);
    
    if (loadingState.isComplete) {
      onComplete?.(loadingState);
    }
  }, [loadingState, onComplete, onProgress]);

  if (isLoading || !loadingState.isComplete) {
    return (
      <div className=\"flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50\">
        {fallback || (
          <>
            <motion.div
              className=\"w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-6\"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            
            <h2 className=\"text-xl font-semibold text-gray-800 mb-4\">
              Загрузка ресурсов...
            </h2>
            
            {showProgress && (
              <div className=\"w-80 max-w-md\">
                <div className=\"flex justify-between text-sm text-gray-600 mb-2\">
                  <span>Прогресс</span>
                  <span>{Math.round(loadingState.progress)}%</span>
                </div>
                
                <div className=\"w-full bg-gray-200 rounded-full h-2 overflow-hidden\">
                  <motion.div
                    className=\"h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full\"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingState.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <div className=\"flex justify-between text-xs text-gray-500 mt-2\">
                  <span>Загружено: {loadingState.loaded}</span>
                  <span>Ошибок: {loadingState.failed}</span>
                  <span>Всего: {loadingState.total}</span>
                </div>
                
                {loadingState.errors.length > 0 && (
                  <div className=\"mt-4 p-3 bg-red-50 border border-red-200 rounded-lg\">
                    <p className=\"text-sm text-red-600 font-medium mb-1\">
                      Ошибки загрузки:
                    </p>
                    <ul className=\"text-xs text-red-500 space-y-1\">
                      {loadingState.errors.slice(0, 3).map((error, index) => (
                        <li key={index}>• {error.message}</li>
                      ))}
                      {loadingState.errors.length > 3 && (
                        <li>• И ещё {loadingState.errors.length - 3} ошибок...</li>
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

// === КРИТИЧЕСКИЕ РЕСУРСЫ ===

export const CRITICAL_RESOURCES: Resource[] = [
  // Критические шрифты
  {
    url: '/fonts/inter-var.woff2',
    type: 'font',
    priority: 'high',
    crossOrigin: 'anonymous'
  },
  {
    url: '/fonts/sf-pro-display.woff2',
    type: 'font',
    priority: 'high',
    crossOrigin: 'anonymous'
  },
  
  // Критические стили
  {
    url: '/css/critical.css',
    type: 'style',
    priority: 'high'
  },
  
  // Предварительные подключения
  {
    url: 'https://cdn.jsdelivr.net',
    type: 'preconnect',
    priority: 'high'
  },
  {
    url: 'https://fonts.googleapis.com',
    type: 'preconnect',
    priority: 'high'
  },
  
  // Критические изображения
  {
    url: '/images/weshow-logo.webp',
    type: 'image',
    priority: 'high'
  },
  {
    url: '/images/hero-bg.webp',
    type: 'image',
    priority: 'medium'
  }
];

// === ХЕЛПЕРЫ ===

// Автоматическое определение критических ресурсов
export function detectCriticalResources(): Resource[] {
  const resources: Resource[] = [];
  
  // Находим все critical CSS
  document.querySelectorAll('link[rel=\"stylesheet\"][data-critical]').forEach(link => {
    resources.push({
      url: (link as HTMLLinkElement).href,
      type: 'style',
      priority: 'high'
    });
  });
  
  // Находим все preload ресурсы
  document.querySelectorAll('link[rel=\"preload\"]').forEach(link => {
    const linkEl = link as HTMLLinkElement;
    resources.push({
      url: linkEl.href,
      type: linkEl.as as any || 'prefetch',
      priority: 'medium'
    });
  });
  
  return resources;
}

// Оптимизация изображений
export function optimizeImageUrl(
  url: string, 
  width?: number, 
  quality = 75, 
  format?: 'webp' | 'avif'
): string {
  try {
    const urlObj = new URL(url, window.location.origin);
    
    if (width) {
      urlObj.searchParams.set('w', width.toString());
    }
    
    urlObj.searchParams.set('q', quality.toString());
    
    if (format) {
      urlObj.searchParams.set('f', format);
    }
    
    return urlObj.toString();
  } catch {
    return url;
  }
}

export default ResourceManager;