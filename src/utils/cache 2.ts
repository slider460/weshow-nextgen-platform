import { QueryClient } from '@tanstack/react-query'

// Утилиты для управления кэшем
export class CacheManager {
  private queryClient: QueryClient

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient
  }

  // Инвалидация кэша для конкретного типа данных
  invalidateProjects = () => {
    this.queryClient.invalidateQueries({ queryKey: ['projects'] })
  }

  invalidateServices = () => {
    this.queryClient.invalidateQueries({ queryKey: ['services'] })
  }

  invalidateTestimonials = () => {
    this.queryClient.invalidateQueries({ queryKey: ['testimonials'] })
  }

  // Инвалидация всех данных
  invalidateAll = () => {
    this.queryClient.invalidateQueries()
  }

  // Очистка кэша
  clearCache = () => {
    this.queryClient.clear()
  }

  // Умная инвалидация на основе изменений
  invalidateOnDataChange = (dataType: 'project' | 'service' | 'testimonial') => {
    switch (dataType) {
      case 'project':
        this.invalidateProjects()
        break
      case 'service':
        this.invalidateServices()
        break
      case 'testimonial':
        this.invalidateTestimonials()
        break
      default:
        this.invalidateAll()
    }
  }

  // Предзагрузка данных
  prefetchData = async (queryKey: string[], queryFn: () => Promise<any>) => {
    await this.queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000, // 5 минут
    })
  }

  // Получение данных из кэша
  getCachedData = (queryKey: string[]) => {
    return this.queryClient.getQueryData(queryKey)
  }

  // Проверка наличия данных в кэше
  hasCachedData = (queryKey: string[]) => {
    return this.queryClient.getQueryData(queryKey) !== undefined
  }

  // Установка данных в кэш
  setCachedData = (queryKey: string[], data: any) => {
    this.queryClient.setQueryData(queryKey, data)
  }

  // Получение статистики кэша
  getCacheStats = () => {
    const cache = this.queryClient.getQueryCache()
    const queries = cache.getAll()
    
    return {
      totalQueries: queries.length,
      staleQueries: queries.filter(q => q.isStale()).length,
      freshQueries: queries.filter(q => !q.isStale()).length,
      errorQueries: queries.filter(q => q.state.status === 'error').length,
    }
  }
}

// Создание экземпляра менеджера кэша
export const createCacheManager = (queryClient: QueryClient) => {
  return new CacheManager(queryClient)
}

// Утилиты для работы с localStorage кэшем
export const localStorageCache = {
  set: (key: string, data: any, ttl: number = 24 * 60 * 60 * 1000) => {
    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  },

  get: (key: string) => {
    try {
      const item = localStorage.getItem(key)
      if (!item) return null

      const parsed = JSON.parse(item)
      const now = Date.now()

      // Проверяем TTL
      if (now - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(key)
        return null
      }

      return parsed.data
    } catch {
      return null
    }
  },

  remove: (key: string) => {
    localStorage.removeItem(key)
  },

  clear: () => {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key)
      }
    })
  },
}

// Утилиты для работы с sessionStorage кэшем
export const sessionStorageCache = {
  set: (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data))
  },

  get: (key: string) => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  remove: (key: string) => {
    sessionStorage.removeItem(key)
  },

  clear: () => {
    sessionStorage.clear()
  },
}
