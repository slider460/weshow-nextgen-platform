import { useState, useEffect, useCallback, useRef } from 'react';

// Типы для кэша
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheConfig {
  maxAge?: number; // время жизни в миллисекундах (по умолчанию 5 минут)
  maxItems?: number; // максимальное количество элементов (по умолчанию 100)
  storage?: 'memory' | 'localStorage' | 'sessionStorage'; // тип хранилища
  namespace?: string; // префикс для ключей
}

// Интерфейс для управления кэшем
interface CacheManager<T> {
  get: (key: string) => T | null;
  set: (key: string, data: T, customMaxAge?: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  size: () => number;
  isExpired: (key: string) => boolean;
  refresh: (key: string, fetcher: () => Promise<T>) => Promise<T>;
}

// Класс для управления кэшем
class Cache<T> {
  private cache: Map<string, CacheItem<T>> = new Map();
  private config: Required<CacheConfig>;

  constructor(config: CacheConfig = {}) {
    this.config = {
      maxAge: config.maxAge || 5 * 60 * 1000, // 5 минут
      maxItems: config.maxItems || 100,
      storage: config.storage || 'memory',
      namespace: config.namespace || 'weshow'
    };

    // Загружаем существующий кэш из хранилища
    this.loadFromStorage();

    // Периодически очищаем истекшие элементы
    setInterval(() => this.cleanExpired(), 60000); // каждую минуту
  }

  private getStorageKey(key: string): string {
    return `${this.config.namespace}_cache_${key}`;
  }

  private loadFromStorage(): void {
    if (this.config.storage === 'memory') return;

    try {
      const storage = this.config.storage === 'localStorage' ? localStorage : sessionStorage;
      const keys = Object.keys(storage).filter(key => key.startsWith(`${this.config.namespace}_cache_`));

      keys.forEach(storageKey => {
        const data = storage.getItem(storageKey);
        if (data) {
          const parsed = JSON.parse(data) as CacheItem<T>;
          const key = storageKey.replace(`${this.config.namespace}_cache_`, '');
          
          // Проверяем, не истек ли элемент
          if (parsed.expiresAt > Date.now()) {
            this.cache.set(key, parsed);
          } else {
            storage.removeItem(storageKey);
          }
        }
      });
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
    }
  }

  private saveToStorage(key: string, item: CacheItem<T>): void {
    if (this.config.storage === 'memory') return;

    try {
      const storage = this.config.storage === 'localStorage' ? localStorage : sessionStorage;
      storage.setItem(this.getStorageKey(key), JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to save to storage:', error);
    }
  }

  private removeFromStorage(key: string): void {
    if (this.config.storage === 'memory') return;

    try {
      const storage = this.config.storage === 'localStorage' ? localStorage : sessionStorage;
      storage.removeItem(this.getStorageKey(key));
    } catch (error) {
      console.warn('Failed to remove from storage:', error);
    }
  }

  private cleanExpired(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    this.cache.forEach((item, key) => {
      if (item.expiresAt <= now) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => {
      this.cache.delete(key);
      this.removeFromStorage(key);
    });
  }

  private enforceMaxItems(): void {
    if (this.cache.size <= this.config.maxItems) return;

    // Удаляем самые старые элементы
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toRemove = entries.slice(0, entries.length - this.config.maxItems);
    toRemove.forEach(([key]) => {
      this.cache.delete(key);
      this.removeFromStorage(key);
    });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // Проверяем срок действия
    if (item.expiresAt <= Date.now()) {
      this.cache.delete(key);
      this.removeFromStorage(key);
      return null;
    }

    return item.data;
  }

  set(key: string, data: T, customMaxAge?: number): void {
    const maxAge = customMaxAge || this.config.maxAge;
    const now = Date.now();

    const item: CacheItem<T> = {
      data,
      timestamp: now,
      expiresAt: now + maxAge
    };

    this.cache.set(key, item);
    this.saveToStorage(key, item);
    this.enforceMaxItems();
  }

  remove(key: string): void {
    this.cache.delete(key);
    this.removeFromStorage(key);
  }

  clear(): void {
    // Очищаем память
    this.cache.clear();

    // Очищаем хранилище
    if (this.config.storage !== 'memory') {
      try {
        const storage = this.config.storage === 'localStorage' ? localStorage : sessionStorage;
        const keys = Object.keys(storage).filter(key => key.startsWith(`${this.config.namespace}_cache_`));
        keys.forEach(key => storage.removeItem(key));
      } catch (error) {
        console.warn('Failed to clear storage:', error);
      }
    }
  }

  size(): number {
    this.cleanExpired();
    return this.cache.size;
  }

  isExpired(key: string): boolean {
    const item = this.cache.get(key);
    return !item || item.expiresAt <= Date.now();
  }

  async refresh(key: string, fetcher: () => Promise<T>): Promise<T> {
    try {
      const data = await fetcher();
      this.set(key, data);
      return data;
    } catch (error) {
      // Если обновление не удалось, возвращаем кэшированные данные, если они есть
      const cached = this.get(key);
      if (cached) return cached;
      throw error;
    }
  }
}

// Хук для использования кэша
export function useCache<T>(config?: CacheConfig): CacheManager<T> {
  const cacheRef = useRef<Cache<T>>();

  if (!cacheRef.current) {
    cacheRef.current = new Cache<T>(config);
  }

  const cache = cacheRef.current;

  return {
    get: useCallback((key: string) => cache.get(key), [cache]),
    set: useCallback((key: string, data: T, customMaxAge?: number) => 
      cache.set(key, data, customMaxAge), [cache]),
    remove: useCallback((key: string) => cache.remove(key), [cache]),
    clear: useCallback(() => cache.clear(), [cache]),
    size: useCallback(() => cache.size(), [cache]),
    isExpired: useCallback((key: string) => cache.isExpired(key), [cache]),
    refresh: useCallback((key: string, fetcher: () => Promise<T>) => 
      cache.refresh(key, fetcher), [cache])
  };
}

// Хук для кэширования данных с автоматической загрузкой
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    maxAge?: number;
    enabled?: boolean;
    onError?: (error: Error) => void;
    onSuccess?: (data: T) => void;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const cache = useCache<T>({
    maxAge: options?.maxAge,
    storage: 'localStorage'
  });

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (options?.enabled === false) return;

    setLoading(true);
    setError(null);

    try {
      // Проверяем кэш, если не принудительное обновление
      if (!forceRefresh) {
        const cached = cache.get(key);
        if (cached) {
          setData(cached);
          setLoading(false);
          return cached;
        }
      }

      // Загружаем новые данные
      const result = await fetcher();
      cache.set(key, result, options?.maxAge);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      
      // Пытаемся вернуть кэшированные данные при ошибке
      const cached = cache.get(key);
      if (cached) {
        setData(cached);
      }
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, cache, options]);

  // Автоматическая загрузка при монтировании
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(() => fetchData(true), [fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    isStale: cache.isExpired(key)
  };
}

// Специализированные хуки для разных типов данных

// Кэш для оборудования - АГРЕССИВНОЕ КЭШИРОВАНИЕ
export function useEquipmentCache() {
  return useCache({
    maxAge: 30 * 60 * 1000, // 30 минут (увеличено для стабильности)
    maxItems: 500, // больше элементов
    storage: 'localStorage',
    namespace: 'weshow_equipment'
  });
}

// Кэш для пользовательских данных - АГРЕССИВНОЕ КЭШИРОВАНИЕ
export function useUserCache() {
  return useCache({
    maxAge: 60 * 60 * 1000, // 1 час (увеличено)
    maxItems: 100, // больше элементов
    storage: 'localStorage',
    namespace: 'weshow_user'
  });
}

// Кэш для изображений (URLs) - АГРЕССИВНОЕ КЭШИРОВАНИЕ
export function useImageCache() {
  return useCache<string>({
    maxAge: 24 * 60 * 60 * 1000, // 24 часа (изображения редко меняются)
    maxItems: 1000, // больше элементов для изображений
    storage: 'localStorage',
    namespace: 'weshow_images'
  });
}

// Кэш для поисковых запросов - АГРЕССИВНОЕ КЭШИРОВАНИЕ
export function useSearchCache() {
  return useCache({
    maxAge: 15 * 60 * 1000, // 15 минут (увеличено)
    maxItems: 200, // больше элементов
    storage: 'localStorage', // переведен в localStorage для персистентности
    namespace: 'weshow_search'
  });
}

// Кэш для категорий оборудования - АГРЕССИВНОЕ КЭШИРОВАНИЕ
export function useCategoriesCache() {
  return useCache({
    maxAge: 60 * 60 * 1000, // 1 час (категории редко меняются)
    maxItems: 50,
    storage: 'localStorage',
    namespace: 'weshow_categories'
  });
}

// Кэш для статей блога - АГРЕССИВНОЕ КЭШИРОВАНИЕ
export function useArticlesCache() {
  return useCache({
    maxAge: 15 * 60 * 1000, // 15 минут
    maxItems: 200,
    storage: 'localStorage',
    namespace: 'weshow_articles'
  });
}

// Кэш для смет - АГРЕССИВНОЕ КЭШИРОВАНИЕ
export function useEstimatesCache() {
  return useCache({
    maxAge: 5 * 60 * 1000, // 5 минут (сметы могут часто обновляться)
    maxItems: 100,
    storage: 'localStorage',
    namespace: 'weshow_estimates'
  });
}

// Утилиты для работы с кэшем

// Функция для предзагрузки критических данных
export async function preloadCriticalData() {
  const equipmentCache = new Cache({
    storage: 'localStorage',
    namespace: 'weshow_equipment'
  });

  try {
    // Здесь можно предзагрузить критически важные данные
    // Например, популярное оборудование или категории
    console.log('Preloading critical data...');
    
    // Пример предзагрузки (в реальном приложении здесь будут API вызовы)
    const criticalEquipment = [
      { id: '1', name: 'LED экран', category: 'displays' },
      { id: '2', name: 'Проектор', category: 'projectors' },
      { id: '3', name: 'Звуковая система', category: 'audio' }
    ];

    equipmentCache.set('popular_equipment', criticalEquipment, 60 * 60 * 1000); // 1 час
  } catch (error) {
    console.warn('Failed to preload critical data:', error);
  }
}

// Функция для очистки всех кэшей - ОБНОВЛЕНО
export function clearAllCaches() {
  const caches = [
    new Cache({ storage: 'localStorage', namespace: 'weshow_equipment' }),
    new Cache({ storage: 'localStorage', namespace: 'weshow_user' }),
    new Cache({ storage: 'localStorage', namespace: 'weshow_images' }),
    new Cache({ storage: 'localStorage', namespace: 'weshow_search' }),
    new Cache({ storage: 'localStorage', namespace: 'weshow_categories' }),
    new Cache({ storage: 'localStorage', namespace: 'weshow_articles' }),
    new Cache({ storage: 'localStorage', namespace: 'weshow_estimates' })
  ];

  caches.forEach(cache => cache.clear());
  console.log('All caches cleared');
}

export default useCache;