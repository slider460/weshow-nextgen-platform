import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// =============================================================================
// ОПТИМИЗИРОВАННАЯ КОНФИГУРАЦИЯ SUPABASE
// =============================================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ ОШИБКА: Supabase credentials не найдены! Создайте файл .env с VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY')
}

// Оптимизированная конфигурация Supabase клиента
const supabaseConfig = {
  auth: {
    autoRefreshToken: true, // Включено для лучшей производительности
    persistSession: true,   // Включено для кэширования сессий
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'weshow-optimized-client',
      'X-Requested-With': 'XMLHttpRequest'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    // Отключаем realtime для лучшей производительности
    enabled: false
  }
}

// Создаем оптимизированный клиент
export const optimizedSupabase: SupabaseClient<Database> = createClient(
  supabaseUrl, 
  supabaseAnonKey, 
  supabaseConfig
)

// =============================================================================
// КЭШИРОВАНИЕ СОЕДИНЕНИЙ И ЗАПРОСОВ
// =============================================================================

// Кэш для частых запросов
const queryCache = new Map<string, { data: any; timestamp: number; ttl: number }>()

// Функция для кэширования запросов
export async function cachedQuery<T>(
  cacheKey: string,
  queryFn: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 минут по умолчанию
): Promise<T> {
  const now = Date.now()
  const cached = queryCache.get(cacheKey)
  
  // Проверяем кэш
  if (cached && (now - cached.timestamp) < cached.ttl) {
    console.log(`📦 Cache hit: ${cacheKey}`)
    return cached.data
  }
  
  // Выполняем запрос
  console.log(`🌐 Cache miss: ${cacheKey}`)
  const result = await queryFn()
  
  // Сохраняем в кэш
  queryCache.set(cacheKey, {
    data: result,
    timestamp: now,
    ttl
  })
  
  return result
}

// Функция для очистки кэша
export function clearQueryCache(pattern?: string) {
  if (pattern) {
    // Очищаем только определенные ключи
    for (const key of queryCache.keys()) {
      if (key.includes(pattern)) {
        queryCache.delete(key)
      }
    }
  } else {
    // Очищаем весь кэш
    queryCache.clear()
  }
  
  console.log(`🧹 Query cache cleared${pattern ? ` for pattern: ${pattern}` : ''}`)
}

// =============================================================================
// ОПТИМИЗИРОВАННЫЕ МЕТОДЫ ДЛЯ ЧАСТЫХ ОПЕРАЦИЙ
// =============================================================================

// Быстрое получение оборудования с кэшированием
export async function getEquipmentOptimized(categoryId?: string) {
  const cacheKey = `equipment_${categoryId || 'all'}`
  
  return cachedQuery(
    cacheKey,
    async () => {
      let query = optimizedSupabase
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

      const { data, error } = await query.order('name')
      
      if (error) throw error
      return data
    },
    30 * 60 * 1000 // 30 минут
  )
}

// Быстрое получение категорий с кэшированием
export async function getCategoriesOptimized() {
  return cachedQuery(
    'categories_all',
    async () => {
      const { data, error } = await optimizedSupabase
        .from('equipment_categories')
        .select('*')
        .order('name')
      
      if (error) throw error
      return data
    },
    60 * 60 * 1000 // 1 час
  )
}

// Быстрое получение статей с кэшированием
export async function getArticlesOptimized(categoryId?: string) {
  const cacheKey = `articles_${categoryId || 'all'}`
  
  return cachedQuery(
    cacheKey,
    async () => {
      let query = optimizedSupabase
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

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      const { data, error } = await query.order('published_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    15 * 60 * 1000 // 15 минут
  )
}

// Поиск оборудования с кэшированием
export async function searchEquipmentOptimized(searchTerm: string) {
  const cacheKey = `search_${searchTerm.toLowerCase()}`
  
  return cachedQuery(
    cacheKey,
    async () => {
      const { data, error } = await optimizedSupabase
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
      
      if (error) throw error
      return data
    },
    15 * 60 * 1000 // 15 минут
  )
}

// =============================================================================
// МОНИТОРИНГ ПРОИЗВОДИТЕЛЬНОСТИ
// =============================================================================

// Метрики производительности
const performanceMetrics = {
  queryCount: 0,
  cacheHits: 0,
  cacheMisses: 0,
  totalQueryTime: 0
}

// Функция для измерения времени выполнения запросов
export async function measureQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now()
  performanceMetrics.queryCount++
  
  try {
    const result = await queryFn()
    const endTime = performance.now()
    const duration = endTime - startTime
    
    performanceMetrics.totalQueryTime += duration
    
    console.log(`⏱️ Query "${queryName}" completed in ${duration.toFixed(2)}ms`)
    
    return result
  } catch (error) {
    const endTime = performance.now()
    const duration = endTime - startTime
    
    console.error(`❌ Query "${queryName}" failed after ${duration.toFixed(2)}ms:`, error)
    throw error
  }
}

// Получение метрик производительности
export function getPerformanceMetrics() {
  const avgQueryTime = performanceMetrics.queryCount > 0 
    ? performanceMetrics.totalQueryTime / performanceMetrics.queryCount 
    : 0
  
  const cacheHitRate = performanceMetrics.queryCount > 0
    ? (performanceMetrics.cacheHits / performanceMetrics.queryCount) * 100
    : 0
  
  return {
    ...performanceMetrics,
    averageQueryTime: avgQueryTime,
    cacheHitRate: cacheHitRate
  }
}

// Очистка метрик
export function clearPerformanceMetrics() {
  performanceMetrics.queryCount = 0
  performanceMetrics.cacheHits = 0
  performanceMetrics.cacheMisses = 0
  performanceMetrics.totalQueryTime = 0
}

// =============================================================================
// ПРЕДЗАГРУЗКА КРИТИЧЕСКИХ ДАННЫХ
// =============================================================================

// Функция для предзагрузки данных при инициализации приложения
export async function preloadCriticalDataOptimized() {
  console.log('🚀 Начинаем предзагрузку критических данных...')
  
  const startTime = performance.now()
  
  try {
    // Предзагружаем категории параллельно
    const [categories] = await Promise.all([
      getCategoriesOptimized()
    ])
    
    const endTime = performance.now()
    const duration = endTime - startTime
    
    console.log(`✅ Предзагрузка завершена за ${duration.toFixed(2)}ms`)
    console.log(`📊 Загружено категорий: ${categories?.length || 0}`)
    
    return { categories }
  } catch (error) {
    console.error('❌ Ошибка предзагрузки:', error)
    throw error
  }
}

// =============================================================================
// ЭКСПОРТЫ
// =============================================================================

export { optimizedSupabase as supabase }
export type { Database } from '../types/database'

// Экспорт утилит для отладки
export const debugUtils = {
  clearQueryCache,
  getPerformanceMetrics,
  clearPerformanceMetrics,
  preloadCriticalDataOptimized
}




