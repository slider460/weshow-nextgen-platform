// REST API конфигурация
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('⚠️ ОШИБКА: Supabase credentials не найдены в equipmentRest.ts!')
}

export interface Equipment {
  id: string
  name: string
  description: string
  category: string
  price_per_day: number
  price_per_week: number
  price_per_month: number
  is_available: boolean
  image_url?: string
  specifications?: any
  created_at: string
  updated_at: string
}

export interface EquipmentFilters {
  category?: string
  min_price?: number
  max_price?: number
  available?: boolean
  search?: string
  limit?: number
  offset?: number
}

// Вспомогательная функция для создания заголовков
const getHeaders = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
})

// Вспомогательная функция для создания URL с параметрами
const buildUrl = (baseUrl: string, params: Record<string, any> = {}) => {
  const url = new URL(baseUrl)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })
  return url.toString()
}

// Получить все оборудование с фильтрацией
export const getEquipment = async (filters: EquipmentFilters = {}): Promise<Equipment[]> => {
  try {
    console.log('🔄 EquipmentRest: Загружаем оборудование через REST API...')
    
    let url = `${SUPABASE_URL}/rest/v1/equipment`
    const params: Record<string, any> = {}
    
    // Применяем фильтры
    if (filters.category && filters.category !== 'all') {
      params.category = `eq.${filters.category}`
    }
    
    if (filters.available !== undefined) {
      params.is_available = `eq.${filters.available}`
    }
    
    if (filters.search) {
      params.or = `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
    }
    
    if (filters.min_price !== undefined) {
      params.price_per_day = `gte.${filters.min_price}`
    }
    
    if (filters.max_price !== undefined) {
      params.price_per_day = `lte.${filters.max_price}`
    }
    
    if (filters.limit) {
      params.limit = filters.limit
    }
    
    if (filters.offset) {
      params.offset = filters.offset
    }
    
    // Сортировка
    params.order = 'name.asc'
    
    const finalUrl = buildUrl(url, params)
    console.log('📡 EquipmentRest: URL:', finalUrl)
    
    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ EquipmentRest: HTTP ошибка:', response.status, errorText)
      
      // Если таблица не существует, возвращаем пустой массив
      if (response.status === 404 || errorText.includes('relation') || errorText.includes('does not exist')) {
        console.log('📋 EquipmentRest: Таблица equipment не существует, возвращаем пустой массив')
        return []
      }
      
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: Equipment[] = await response.json()
    console.log('✅ EquipmentRest: Загружено оборудования:', data.length)
    
    return data
  } catch (error) {
    console.error('❌ EquipmentRest: Ошибка загрузки оборудования:', error)
    throw error
  }
}

// Получить оборудование по ID
export const getEquipmentById = async (id: string): Promise<Equipment | null> => {
  try {
    console.log('🔄 EquipmentRest: Загружаем оборудование по ID:', id)
    
    const url = `${SUPABASE_URL}/rest/v1/equipment?id=eq.${id}&select=*`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ EquipmentRest: HTTP ошибка:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: Equipment[] = await response.json()
    console.log('✅ EquipmentRest: Оборудование загружено:', data.length > 0 ? 'да' : 'нет')
    
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('❌ EquipmentRest: Ошибка загрузки оборудования по ID:', error)
    throw error
  }
}

// Получить категории оборудования
export const getEquipmentCategories = async (): Promise<string[]> => {
  try {
    console.log('🔄 EquipmentRest: Загружаем категории оборудования...')
    
    const url = `${SUPABASE_URL}/rest/v1/equipment?select=category&category=not.is.null`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ EquipmentRest: HTTP ошибка при загрузке категорий:', response.status, errorText)
      
      // Если таблица не существует, возвращаем пустой массив
      if (response.status === 404 || errorText.includes('relation') || errorText.includes('does not exist')) {
        console.log('📋 EquipmentRest: Таблица equipment не существует, возвращаем пустой массив')
        return []
      }
      
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: Array<{ category: string }> = await response.json()
    const categories = [...new Set(data.map(item => item.category))]
    
    console.log('✅ EquipmentRest: Категории загружены:', categories.length)
    return categories
  } catch (error) {
    console.error('❌ EquipmentRest: Ошибка загрузки категорий:', error)
    throw error
  }
}

// Получить статистику оборудования
export const getEquipmentStats = async (): Promise<{
  total: number
  available: number
  unavailable: number
  categories: number
}> => {
  try {
    console.log('🔄 EquipmentRest: Загружаем статистику оборудования...')
    
    const url = `${SUPABASE_URL}/rest/v1/equipment?select=is_available,category`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ EquipmentRest: HTTP ошибка при загрузке статистики:', response.status, errorText)
      
      // Если таблица не существует, возвращаем нулевую статистику
      if (response.status === 404 || errorText.includes('relation') || errorText.includes('does not exist')) {
        console.log('📋 EquipmentRest: Таблица equipment не существует, возвращаем нулевую статистику')
        return { total: 0, available: 0, unavailable: 0, categories: 0 }
      }
      
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: Array<{ is_available: boolean; category: string }> = await response.json()
    
    const stats = {
      total: data.length,
      available: data.filter(item => item.is_available).length,
      unavailable: data.filter(item => !item.is_available).length,
      categories: new Set(data.map(item => item.category)).size
    }
    
    console.log('✅ EquipmentRest: Статистика загружена:', stats)
    return stats
  } catch (error) {
    console.error('❌ EquipmentRest: Ошибка загрузки статистики:', error)
    throw error
  }
}










