import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../config/supabase'
import { 
  Estimate, 
  EstimateItem, 
  Article, 
  ArticleCategory,
  User,
  EstimateInsert,
  EstimateItemInsert,
  ArticleInsert
} from '../types/database'
import { PostgrestError } from '@supabase/supabase-js'
import { 
  useArticlesCache, 
  useEstimatesCache,
  useUserCache
} from './useCache'

// =============================================================================
// ОПТИМИЗИРОВАННЫЕ ХУКИ С АГРЕССИВНЫМ КЭШИРОВАНИЕМ
// =============================================================================

// Хук для работы со статьями блога - ОПТИМИЗИРОВАННЫЙ
export function useOptimizedArticles(categoryId?: string, publishedOnly = true) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  
  const articlesCache = useArticlesCache()

  const fetchArticles = useCallback(async () => {
    const cacheKey = `articles_${categoryId || 'all'}_${publishedOnly}`
    
    try {
      setLoading(true)
      setError(null)

      // Проверяем кэш
      const cachedData = articlesCache.get(cacheKey)
      if (cachedData) {
        setArticles(cachedData)
        setLoading(false)
        return
      }

      // API отключен, используем статические данные
      console.log('📊 Статьи: используем статические данные (API отключен)')
      const articlesData: Article[] = []
      setArticles(articlesData)
      
      // Не кэшируем пустые данные
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }, [categoryId, publishedOnly, articlesCache])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return { articles, loading, error, refetch: fetchArticles }
}

// Хук для работы со сметами пользователя - ОПТИМИЗИРОВАННЫЙ
export function useOptimizedUserEstimates(userId?: string) {
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  
  const estimatesCache = useEstimatesCache()

  const fetchEstimates = useCallback(async () => {
    if (!userId) return
    
    const cacheKey = `estimates_user_${userId}`
    
    try {
      setLoading(true)
      setError(null)

      // Проверяем кэш
      const cachedData = estimatesCache.get(cacheKey)
      if (cachedData) {
        setEstimates(cachedData)
        setLoading(false)
        return
      }

      // Запрос к БД
      const { data, error: fetchError } = await supabase
        .from('estimates')
        .select(`
          *,
          estimate_items (
            id,
            quantity,
            price_at_creation
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError(fetchError)
      } else {
        const estimatesData = data || []
        setEstimates(estimatesData)
        
        // Кэшируем на 5 минут (сметы могут часто обновляться)
        estimatesCache.set(cacheKey, estimatesData, 5 * 60 * 1000)
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }, [userId, estimatesCache])

  useEffect(() => {
    fetchEstimates()
  }, [fetchEstimates])

  return { estimates, loading, error, refetch: fetchEstimates }
}

// =============================================================================
// УТИЛИТЫ ДЛЯ ПРЕДЗАГРУЗКИ ДАННЫХ
// =============================================================================

// Функция для очистки кэша при выходе пользователя
export function clearUserCache() {
  const estimatesCache = useEstimatesCache()
  const userCache = useUserCache()
  
  estimatesCache.clear()
  userCache.clear()
  
  console.log('🧹 Кэш пользователя очищен')
}

// Функция для принудительного обновления кэша
export function invalidateCache(type: 'articles' | 'estimates' | 'all') {
  const articlesCache = useArticlesCache()
  const estimatesCache = useEstimatesCache()
  
  switch (type) {
    case 'articles':
      articlesCache.clear()
      break
    case 'estimates':
      estimatesCache.clear()
      break
    case 'all':
      articlesCache.clear()
      estimatesCache.clear()
      break
  }
  
  console.log(`🔄 Кэш ${type} очищен`)
}

export default {
  useOptimizedArticles,
  useOptimizedUserEstimates,
  clearUserCache,
  invalidateCache
}












