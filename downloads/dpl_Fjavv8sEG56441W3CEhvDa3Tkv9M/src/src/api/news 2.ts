import { supabase } from '../config/supabase'
import { News, NewsInsert, NewsUpdate } from '../types/database'

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

// Получить все новости с фильтрацией
export const getNews = async (filters: NewsFilters = {}): Promise<News[]> => {
  try {
    let query = supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })

    // Применяем фильтры
    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category)
    }

    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`)
    }

    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching news:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error in getNews:', error)
    throw error
  }
}

// Получить новость по ID
export const getNewsById = async (id: string): Promise<News | null> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching news by ID:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getNewsById:', error)
    throw error
  }
}

// Создать новую новость
export const createNews = async (newsData: NewsInsert): Promise<News> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .insert(newsData)
      .select()
      .single()

    if (error) {
      console.error('Error creating news:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in createNews:', error)
    throw error
  }
}

// Обновить новость
export const updateNews = async (id: string, updates: NewsUpdate): Promise<News> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating news:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in updateNews:', error)
    throw error
  }
}

// Удалить новость
export const deleteNews = async (id: string): Promise<void> => {
  try {
    console.log('🔍 API: Удаляем новость с ID:', id);
    
    const { data, error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      console.error('❌ API: Ошибка удаления новости:', error)
      throw error
    }
    
    console.log('✅ API: Новость успешно удалена, данные:', data)
  } catch (error) {
    console.error('💥 API: Исключение в deleteNews:', error)
    throw error
  }
}

// Увеличить количество просмотров
export const incrementNewsViews = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('increment_news_views', { news_id: id })
    
    if (error) {
      console.error('Error incrementing news views:', error)
      throw error
    }
  } catch (error) {
    console.error('Error in incrementNewsViews:', error)
    throw error
  }
}

// Получить статистику новостей
export const getNewsStats = async (): Promise<NewsStats> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('status, featured')

    if (error) {
      console.error('Error fetching news stats:', error)
      throw error
    }

    const stats: NewsStats = {
      total: data?.length || 0,
      published: data?.filter(item => item.status === 'published').length || 0,
      draft: data?.filter(item => item.status === 'draft').length || 0,
      archived: data?.filter(item => item.status === 'archived').length || 0,
      featured: data?.filter(item => item.featured).length || 0
    }

    return stats
  } catch (error) {
    console.error('Error in getNewsStats:', error)
    throw error
  }
}

// Получить категории новостей
export const getNewsCategories = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('category')
      .not('category', 'is', null)

    if (error) {
      console.error('Error fetching news categories:', error)
      throw error
    }

    // Убираем дубликаты и возвращаем уникальные категории
    const categories = [...new Set(data?.map(item => item.category) || [])]
    return categories
  } catch (error) {
    console.error('Error in getNewsCategories:', error)
    throw error
  }
}
