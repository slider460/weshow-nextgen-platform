import { useState, useEffect, useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheConfig {
  maxAge?: number; // в миллисекундах
  maxSize?: number; // максимальное количество записей
  storage?: 'memory' | 'localStorage' | 'sessionStorage';
}

class OptimizedCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private config: Required<CacheConfig>;
  private accessOrder: string[] = []; // для LRU

  constructor(config: CacheConfig = {}) {
    this.config = {
      maxAge: config.maxAge || 5 * 60 * 1000, // 5 минут по умолчанию
      maxSize: config.maxSize || 100,
      storage: config.storage || 'memory'
    };
  }

  set(key: string, data: T, customMaxAge?: number): void {
    const now = Date.now();
    const maxAge = customMaxAge || this.config.maxAge;
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + maxAge
    };

    // Удаляем старую запись если есть
    if (this.cache.has(key)) {
      this.removeFromAccessOrder(key);
    }

    // Добавляем новую запись
    this.cache.set(key, entry);
    this.accessOrder.push(key);

    // Проверяем размер кэша
    if (this.cache.size > this.config.maxSize) {
      this.evictLRU();
    }

    // Сохраняем в storage если нужно
    if (this.config.storage !== 'memory') {
      this.saveToStorage();
    }
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Проверяем срок действия
    if (Date.now() > entry.expiresAt) {
      this.delete(key);
      return null;
    }

    // Обновляем порядок доступа для LRU
    this.removeFromAccessOrder(key);
    this.accessOrder.push(key);

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    this.removeFromAccessOrder(key);
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
    
    if (this.config.storage !== 'memory') {
      this.clearStorage();
    }
  }

  isExpired(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return true;
    return Date.now() > entry.expiresAt;
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      keys: Array.from(this.cache.keys()),
      oldestEntry: this.accessOrder[0] || null,
      newestEntry: this.accessOrder[this.accessOrder.length - 1] || null
    };
  }

  private removeFromAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  private evictLRU(): void {
    if (this.accessOrder.length > 0) {
      const oldestKey = this.accessOrder[0];
      this.delete(oldestKey);
    }
  }

  private saveToStorage(): void {
    try {
      const data = {
        entries: Array.from(this.cache.entries()),
        accessOrder: this.accessOrder,
        config: this.config
      };
      
      const storage = this.config.storage === 'localStorage' 
        ? localStorage 
        : sessionStorage;
      
      storage.setItem('optimized_cache', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save cache to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const storage = this.config.storage === 'localStorage' 
        ? localStorage 
        : sessionStorage;
      
      const stored = storage.getItem('optimized_cache');
      if (!stored) return;

      const data = JSON.parse(stored);
      
      // Восстанавливаем кэш
      this.cache = new Map(data.entries);
      this.accessOrder = data.accessOrder || [];
      
      // Удаляем истекшие записи
      this.cleanup();
    } catch (error) {
      console.warn('Failed to load cache from storage:', error);
    }
  }

  private clearStorage(): void {
    try {
      const storage = this.config.storage === 'localStorage' 
        ? localStorage 
        : sessionStorage;
      
      storage.removeItem('optimized_cache');
    } catch (error) {
      console.warn('Failed to clear cache storage:', error);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.delete(key));
  }
}

/**
 * Хук для оптимизированного кэширования
 */
export function useOptimizedCache<T>(config?: CacheConfig) {
  const cacheRef = useRef<OptimizedCache<T> | null>(null);
  
  if (!cacheRef.current) {
    cacheRef.current = new OptimizedCache<T>(config);
  }

  const cache = cacheRef.current;

  const set = useCallback((key: string, data: T, customMaxAge?: number) => {
    cache.set(key, data, customMaxAge);
  }, [cache]);

  const get = useCallback((key: string): T | null => {
    return cache.get(key);
  }, [cache]);

  const has = useCallback((key: string): boolean => {
    return cache.has(key);
  }, [cache]);

  const remove = useCallback((key: string): boolean => {
    return cache.delete(key);
  }, [cache]);

  const clear = useCallback(() => {
    cache.clear();
  }, [cache]);

  const isExpired = useCallback((key: string): boolean => {
    return cache.isExpired(key);
  }, [cache]);

  const getStats = useCallback(() => {
    return cache.getStats();
  }, [cache]);

  return {
    set,
    get,
    has,
    remove,
    clear,
    isExpired,
    getStats
  };
}

/**
 * Хук для кэшированных данных с автоматической загрузкой
 */
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
  
  const cache = useOptimizedCache<T>({
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
