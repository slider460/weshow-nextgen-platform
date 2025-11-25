import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { LoadingSpinner, Skeleton } from '../ui/LoadingStates';

// === INTERSECTION OBSERVER HOOK ===

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
        
        // Если triggerOnce = true, отключаем наблюдение после первого пересечения
        if (isVisible && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);

  return {
    elementRef,
    isIntersecting,
    hasIntersected: triggerOnce ? hasIntersected : isIntersecting
  };
}

// === ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ ===

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder,
  blurDataURL,
  sizes,
  quality = 75,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder || blurDataURL);
  
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (!hasIntersected || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      onLoad?.();
    };
    
    img.onerror = () => {
      const error = new Error(`Failed to load image: ${src}`);\n      setHasError(true);
      setIsLoading(false);
      onError?.(error);
    };

    // Оптимизация изображения
    let optimizedSrc = src;
    if (quality < 100) {
      const url = new URL(src, window.location.origin);
      url.searchParams.set('q', quality.toString());
      if (sizes) {
        url.searchParams.set('w', sizes);
      }
      optimizedSrc = url.toString();
    }

    img.src = optimizedSrc;
  }, [hasIntersected, src, quality, sizes, onLoad, onError]);

  if (hasError) {
    return (
      <div 
        ref={elementRef as any}
        className={cn(
          'flex items-center justify-center bg-gray-200 text-gray-400 text-sm',
          className
        )}
      >
        Ошибка загрузки
      </div>
    );
  }

  return (
    <div ref={elementRef as any} className={cn('relative overflow-hidden', className)}>
      {/* Скелетон/плейсхолдер */}
      {isLoading && !imageSrc && (
        <Skeleton className="absolute inset-0" />
      )}
      
      {/* Изображение */}
      <AnimatePresence>
        {imageSrc && (
          <motion.img
            src={imageSrc}
            alt={alt}
            className={cn('w-full h-full object-cover', isLoading && 'opacity-0')}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            loading="lazy"
          />
        )}
      </AnimatePresence>
      
      {/* Индикатор загрузки */}
      {isLoading && imageSrc && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-100/80"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <LoadingSpinner size="sm" />
        </motion.div>
      )}
    </div>
  );
};

// === ЛЕНИВЫЙ КОНТЕЙНЕР ===

interface LazyContainerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  delay?: number;
  animateIn?: boolean;
}

export const LazyContainer: React.FC<LazyContainerProps> = ({
  children,
  fallback,
  className,
  delay = 0,
  animateIn = true
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    if (hasIntersected) {
      if (delay > 0) {
        const timer = setTimeout(() => setShouldRender(true), delay);
        return () => clearTimeout(timer);
      } else {
        setShouldRender(true);
      }
    }
  }, [hasIntersected, delay]);

  const content = shouldRender ? children : fallback;

  if (animateIn && shouldRender) {
    return (
      <motion.div
        ref={elementRef as any}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div ref={elementRef as any} className={className}>
      {content}
    </div>
  );
};

// === ЛЕНИВАЯ ЗАГРУЗКА КОМПОНЕНТОВ ===

interface LazyComponentProps {
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
  errorBoundary?: React.ComponentType<{ error: Error; retry: () => void }>;
  delay?: number;
  [key: string]: any;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  loader,
  fallback = <LoadingSpinner />,
  errorBoundary: ErrorBoundary,
  delay = 0,
  ...props
}) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { elementRef, hasIntersected } = useIntersectionObserver();

  const loadComponent = useCallback(async () => {
    if (Component || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Добавляем задержку если необходимо
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const { default: LoadedComponent } = await loader();
      setComponent(() => LoadedComponent);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [loader, delay, Component, isLoading]);

  useEffect(() => {
    if (hasIntersected) {
      loadComponent();
    }
  }, [hasIntersected, loadComponent]);

  const retry = useCallback(() => {
    setComponent(null);
    setError(null);
    loadComponent();
  }, [loadComponent]);

  if (error) {
    if (ErrorBoundary) {
      return <ErrorBoundary error={error} retry={retry} />;
    }
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 mb-2">Ошибка загрузки компонента</p>
        <button 
          onClick={retry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Повторить
        </button>
      </div>
    );
  }

  if (!Component) {
    return (
      <div ref={elementRef as any} className="flex items-center justify-center p-8">
        {fallback}
      </div>
    );
  }

  return <Component {...props} />;
};

// === ВИРТУАЛИЗИРОВАННЫЙ СПИСОК ===

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
  onScroll?: (scrollTop: number) => void;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  renderItem,
  className,
  overscan = 5,
  onScroll
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  }, [onScroll]);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      onScroll={handleScroll}
      style={{ height: '100%' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: actualIndex * itemHeight,
                height: itemHeight,
                width: '100%'
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// === ПРОГРЕССИВНОЕ УЛУЧШЕНИЕ ===

interface ProgressiveEnhancementProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  feature: 'webp' | 'intersection-observer' | 'web-workers' | 'service-worker';
  className?: string;
}

export const ProgressiveEnhancement: React.FC<ProgressiveEnhancementProps> = ({
  children,
  fallback,
  feature,
  className
}) => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport = () => {
      switch (feature) {
        case 'webp':
          const canvas = document.createElement('canvas');
          return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        
        case 'intersection-observer':
          return 'IntersectionObserver' in window;
        
        case 'web-workers':
          return 'Worker' in window;
        
        case 'service-worker':
          return 'serviceWorker' in navigator;
        
        default:
          return false;
      }
    };

    setIsSupported(checkSupport());
  }, [feature]);

  return (
    <div className={className}>
      {isSupported ? children : fallback}
    </div>
  );
};

// === КОМПОНЕНТ ДЛЯ ПРЕДЗАГРУЗКИ РЕСУРСОВ ===

interface ResourcePreloaderProps {
  resources: Array<{
    href: string;
    as: 'script' | 'style' | 'image' | 'font';
    type?: string;
    crossOrigin?: string;
  }>;
  onComplete?: () => void;
}

export const ResourcePreloader: React.FC<ResourcePreloaderProps> = ({
  resources,
  onComplete
}) => {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const preloadResource = (resource: typeof resources[0]) => {
      return new Promise<void>((resolve) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        
        if (resource.type) link.type = resource.type;
        if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin;

        link.onload = () => resolve();
        link.onerror = () => resolve(); // Продолжаем даже при ошибке

        document.head.appendChild(link);
      });
    };

    const preloadAll = async () => {
      for (const resource of resources) {
        await preloadResource(resource);
        if (mounted) {
          setLoadedCount(prev => prev + 1);
        }
      }
      
      if (mounted) {
        onComplete?.();
      }
    };

    preloadAll();

    return () => {
      mounted = false;
    };
  }, [resources, onComplete]);

  const progress = resources.length > 0 ? (loadedCount / resources.length) * 100 : 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-1">
      <motion.div
        className="bg-blue-600 h-1 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default {
  LazyImage,
  LazyContainer,
  LazyComponent,
  VirtualizedList,
  ProgressiveEnhancement,
  ResourcePreloader,
  useIntersectionObserver
};