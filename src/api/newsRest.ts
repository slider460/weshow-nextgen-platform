import { News, NewsInsert, NewsUpdate } from '../types/database'

// REST API конфигурация
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE'

export interface NewsFilters {
  category?: string
  featured?: boolean
  status?: 'draft' | 'published' | 'archived'
  search?: string
  limit?: number
  offset?: number
}

export interface NewsStats {
  total: number
  published: number
  draft: number
  archived: number
  featured: number
}

// Вспомогательная функция для создания заголовков
const getHeaders = () => ({
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
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

// Получить все новости с фильтрацией
export const getNews = async (filters: NewsFilters = {}): Promise<News[]> => {
  try {
    console.log('🔄 NewsRest: Загружаем новости через REST API...')
    
    let url = `${SUPABASE_URL}/rest/v1/news`
    const params: Record<string, any> = {}
    
    // Применяем фильтры
    if (filters.category && filters.category !== 'all') {
      params.category = `eq.${filters.category}`
    }
    
    if (filters.featured !== undefined) {
      params.featured = `eq.${filters.featured}`
    }
    
    if (filters.status) {
      params.status = `eq.${filters.status}`
    }
    
    if (filters.search) {
      params.or = `title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`
    }
    
    if (filters.limit) {
      params.limit = filters.limit
    }
    
    if (filters.offset) {
      params.offset = filters.offset
    }
    
    // Сортировка
    params.order = 'published_at.desc'
    
    const finalUrl = buildUrl(url, params)
    console.log('📡 NewsRest: URL:', finalUrl)
    
    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ NewsRest: HTTP ошибка:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: News[] = await response.json()
    console.log('✅ NewsRest: Загружено новостей:', data.length)
    
    return data
  } catch (error) {
    console.error('❌ NewsRest: Ошибка загрузки новостей:', error)
    throw error
  }
}

// Получить новость по ID
export const getNewsById = async (id: string): Promise<News | null> => {
  try {
    console.log('🔄 NewsRest: Загружаем новость по ID:', id)
    
    const url = `${SUPABASE_URL}/rest/v1/news?id=eq.${id}&select=*`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ NewsRest: HTTP ошибка:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: News[] = await response.json()
    console.log('✅ NewsRest: Новость загружена:', data.length > 0 ? 'да' : 'нет')
    
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error('❌ NewsRest: Ошибка загрузки новости по ID:', error)
    throw error
  }
}

// Создать новую новость
export const createNews = async (newsData: NewsInsert): Promise<News> => {
  try {
    console.log('🔄 NewsRest: Создаем новую новость...')
    
    const url = `${SUPABASE_URL}/rest/v1/news`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(newsData)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ NewsRest: HTTP ошибка при создании:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: News[] = await response.json()
    console.log('✅ NewsRest: Новость создана с ID:', data[0]?.id)
    
    return data[0]
  } catch (error) {
    console.error('❌ NewsRest: Ошибка создания новости:', error)
    throw error
  }
}

// Обновить новость
export const updateNews = async (id: string, updates: NewsUpdate): Promise<News> => {
  try {
    console.log('🔄 NewsRest: Обновляем новость ID:', id)
    
    const url = `${SUPABASE_URL}/rest/v1/news?id=eq.${id}`
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ NewsRest: HTTP ошибка при обновлении:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: News[] = await response.json()
    console.log('✅ NewsRest: Новость обновлена')
    
    return data[0]
  } catch (error) {
    console.error('❌ NewsRest: Ошибка обновления новости:', error)
    throw error
  }
}

// Удалить новость
export const deleteNews = async (id: string): Promise<void> => {
  try {
    console.log('🔄 NewsRest: Удаляем новость ID:', id)
    
    const url = `${SUPABASE_URL}/rest/v1/news?id=eq.${id}`
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ NewsRest: HTTP ошибка при удалении:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    console.log('✅ NewsRest: Новость удалена')
  } catch (error) {
    console.error('❌ NewsRest: Ошибка удаления новости:', error)
    throw error
  }
}

// Получить статистику новостей
export const getNewsStats = async (): Promise<NewsStats> => {
  try {
    console.log('🔄 NewsRest: Загружаем статистику новостей...')
    
    const url = `${SUPABASE_URL}/rest/v1/news?select=status,featured`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ NewsRest: HTTP ошибка при загрузке статистики:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: Array<{ status: string; featured: boolean }> = await response.json()
    
    const stats: NewsStats = {
      total: data.length,
      published: data.filter(item => item.status === 'published').length,
      draft: data.filter(item => item.status === 'draft').length,
      archived: data.filter(item => item.status === 'archived').length,
      featured: data.filter(item => item.featured).length
    }
    
    console.log('✅ NewsRest: Статистика загружена:', stats)
    return stats
  } catch (error) {
    console.error('❌ NewsRest: Ошибка загрузки статистики:', error)
    throw error
  }
}

// Получить категории новостей
export const getNewsCategories = async (): Promise<string[]> => {
  try {
    console.log('🔄 NewsRest: Загружаем категории новостей...')
    
    const url = `${SUPABASE_URL}/rest/v1/news?select=category&category=not.is.null`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders()
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ NewsRest: HTTP ошибка при загрузке категорий:', response.status, errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const data: Array<{ category: string }> = await response.json()
    const categories = [...new Set(data.map(item => item.category))]
    
    console.log('✅ NewsRest: Категории загружены:', categories.length)
    return categories
  } catch (error) {
    console.error('❌ NewsRest: Ошибка загрузки категорий:', error)
    throw error
  }
}




