import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../config/supabase'
import { 
  Equipment, 
  EquipmentCategory, 
  Estimate, 
  EstimateItem, 
  Article, 
  ArticleCategory,
  User,
  EquipmentInsert,
  EstimateInsert,
  EstimateItemInsert,
  ArticleInsert
} from '../types/database'
import { PostgrestError } from '@supabase/supabase-js'
import { 
  useEquipmentCache, 
  useCategoriesCache, 
  useArticlesCache, 
  useEstimatesCache,
  useUserCache,
  useSearchCache
} from './useCache'

// =============================================================================
// ОПТИМИЗИРОВАННЫЕ ХУКИ С АГРЕССИВНЫМ КЭШИРОВАНИЕМ
// =============================================================================

// Хук для работы с каталогом оборудования - ОПТИМИЗИРОВАННЫЙ
export function useOptimizedEquipmentCatalog(categoryId?: string) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  
  const equipmentCache = useEquipmentCache()

  const fetchEquipment = useCallback(async () => {
    const cacheKey = categoryId ? `equipment_category_${categoryId}` : 'equipment_all'
    
    try {
      setLoading(true)
      setError(null)

      // Сначала проверяем кэш
      const cachedData = equipmentCache.get(cacheKey)
      if (cachedData) {
        setEquipment(cachedData)
        setLoading(false)
        return
      }

      // Если в кэше нет, делаем запрос к БД
      let query = supabase
        .from('equipment_catalog')
        .select(`
          *,
          equipment_categories (
            id,
            name,
            slug
          )
        `)
        .not('id', 'is', null)

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      const { data, error: fetchError } = await query.order('name')

      if (fetchError) {
        setError(fetchError)
      } else {
        const equipmentData = data || []
        setEquipment(equipmentData)
        
        // Сохраняем в кэш на 30 минут
        equipmentCache.set(cacheKey, equipmentData, 30 * 60 * 1000)
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }, [categoryId, equipmentCache])

  useEffect(() => {
    fetchEquipment()
  }, [fetchEquipment])

  return { equipment, loading, error, refetch: fetchEquipment }
}

// Хук для работы с категориями оборудования - ОПТИМИЗИРОВАННЫЙ
export function useOptimizedEquipmentCategories() {
  const [categories, setCategories] = useState<EquipmentCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)
  
  const categoriesCache = useCategoriesCache()

  const fetchCategories = useCallback(async () => {
    const cacheKey = 'equipment_categories_all'
    
    try {
      setLoading(true)
      setError(null)

      // Проверяем кэш
      const cachedData = categoriesCache.get(cacheKey)
      if (cachedData) {
        setCategories(cachedData)
        setLoading(false)
        return
      }

      // Запрос к БД
      const { data, error: fetchError } = await supabase
        .from('equipment_categories')
        .select('*')
        .order('name')

      if (fetchError) {
        setError(fetchError)
      } else {
        const categoriesData = data || []
        setCategories(categoriesData)
        
        // Кэшируем на 1 час (категории редко меняются)
        categoriesCache.set(cacheKey, categoriesData, 60 * 60 * 1000)
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }, [categoriesCache])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return { categories, loading, error, refetch: fetchCategories }
}

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

      // Запрос к БД
      let query = supabase
        .from('articles')
        .select(`
          *,
          article_categories (
            id,
            name,
            slug
          ),
          users (
            id,
            name
          )
        `)

      if (publishedOnly) {
        query = query.not('id', 'is', null)
      }

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      const { data, error: fetchError } = await query
        .order('published_at', { ascending: false })

      if (fetchError) {
        setError(fetchError)
      } else {
        const articlesData = data || []
        setArticles(articlesData)
        
        // Кэшируем на 15 минут
        articlesCache.set(cacheKey, articlesData, 15 * 60 * 1000)
      }
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
            price_at_creation,
            equipment_catalog (
              id,
              name,
              main_image_url
            )
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

// Хук для поиска оборудования - ОПТИМИЗИРОВАННЫЙ
export function useOptimizedEquipmentSearch(searchTerm: string) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  
  const searchCache = useSearchCache()

  const searchEquipment = useCallback(async () => {
    if (!searchTerm.trim()) {
      setEquipment([])
      return
    }

    const cacheKey = `equipment_search_${searchTerm.toLowerCase()}`
    
    try {
      setLoading(true)
      setError(null)

      // Проверяем кэш поиска
      const cachedData = searchCache.get(cacheKey)
      if (cachedData) {
        setEquipment(cachedData)
        setLoading(false)
        return
      }

      // Запрос к БД
      const { data, error: searchError } = await supabase
        .from('equipment_catalog')
        .select(`
          *,
          equipment_categories (
            id,
            name,
            slug
          )
        `)
        .not('id', 'is', null)
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('name')

      if (searchError) {
        setError(searchError)
      } else {
        const equipmentData = data || []
        setEquipment(equipmentData)
        
        // Кэшируем результаты поиска на 15 минут
        searchCache.set(cacheKey, equipmentData, 15 * 60 * 1000)
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, searchCache])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchEquipment()
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchEquipment])

  return { equipment, loading, error }
}

// =============================================================================
// УТИЛИТЫ ДЛЯ ПРЕДЗАГРУЗКИ ДАННЫХ
// =============================================================================

// Функция для предзагрузки критических данных при запуске приложения
export async function preloadCriticalData() {
  const equipmentCache = useEquipmentCache()
  const categoriesCache = useCategoriesCache()
  
  try {
    console.log('🚀 Предзагрузка критических данных...')
    
    // Предзагружаем категории (они нужны на всех страницах)
    const { data: categories } = await supabase
      .from('equipment_categories')
      .select('*')
      .order('name')
    
    if (categories) {
      categoriesCache.set('equipment_categories_all', categories, 60 * 60 * 1000)
      console.log('✅ Категории предзагружены')
    }
    
    // Предзагружаем популярное оборудование (первые 20 позиций)
    const { data: popularEquipment } = await supabase
      .from('equipment_catalog')
      .select(`
        *,
        equipment_categories (
          id,
          name,
          slug
        )
      `)
      .not('id', 'is', null)
      .order('name')
      .limit(20)
    
    if (popularEquipment) {
      equipmentCache.set('equipment_popular', popularEquipment, 30 * 60 * 1000)
      console.log('✅ Популярное оборудование предзагружено')
    }
    
    console.log('🎉 Предзагрузка завершена!')
  } catch (error) {
    console.warn('⚠️ Ошибка предзагрузки:', error)
  }
}

// Функция для очистки кэша при выходе пользователя
export function clearUserCache() {
  const estimatesCache = useEstimatesCache()
  const userCache = useUserCache()
  
  estimatesCache.clear()
  userCache.clear()
  
  console.log('🧹 Кэш пользователя очищен')
}

// Функция для принудительного обновления кэша
export function invalidateCache(type: 'equipment' | 'categories' | 'articles' | 'estimates' | 'all') {
  const equipmentCache = useEquipmentCache()
  const categoriesCache = useCategoriesCache()
  const articlesCache = useArticlesCache()
  const estimatesCache = useEstimatesCache()
  
  switch (type) {
    case 'equipment':
      equipmentCache.clear()
      break
    case 'categories':
      categoriesCache.clear()
      break
    case 'articles':
      articlesCache.clear()
      break
    case 'estimates':
      estimatesCache.clear()
      break
    case 'all':
      equipmentCache.clear()
      categoriesCache.clear()
      articlesCache.clear()
      estimatesCache.clear()
      break
  }
  
  console.log(`🔄 Кэш ${type} очищен`)
}

export default {
  useOptimizedEquipmentCatalog,
  useOptimizedEquipmentCategories,
  useOptimizedArticles,
  useOptimizedUserEstimates,
  useOptimizedEquipmentSearch,
  preloadCriticalData,
  clearUserCache,
  invalidateCache
}




