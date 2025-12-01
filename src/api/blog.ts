import { supabase } from '../config/supabase'
import { BlogPost, BlogPostInsert, BlogPostUpdate } from '../types/database'

export interface BlogFilters {
  category?: string
  featured?: boolean
  status?: 'draft' | 'published' | 'archived'
  search?: string
  limit?: number
  offset?: number
}

export interface BlogStats {
  total: number
  published: number
  draft: number
  archived: number
  featured: number
  totalViews: number
}

// Получить все статьи блога с фильтрацией
export const getBlogPosts = async (filters: BlogFilters = {}): Promise<BlogPost[]> => {
  try {
    let query = supabase
      .from('blog_posts')
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
      console.error('Error fetching blog posts:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error in getBlogPosts:', error)
    throw error
  }
}

// Получить статью блога по ID
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching blog post by ID:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getBlogPostById:', error)
    throw error
  }
}

// Создать новую статью блога
export const createBlogPost = async (postData: BlogPostInsert): Promise<BlogPost> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single()

    if (error) {
      console.error('Error creating blog post:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in createBlogPost:', error)
    throw error
  }
}

// Обновить статью блога
export const updateBlogPost = async (id: string, updates: BlogPostUpdate): Promise<BlogPost> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating blog post:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in updateBlogPost:', error)
    throw error
  }
}

// Удалить статью блога
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting blog post:', error)
      throw error
    }
  } catch (error) {
    console.error('Error in deleteBlogPost:', error)
    throw error
  }
}

// Увеличить количество просмотров
export const incrementBlogPostViews = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase.rpc('increment_blog_views', { post_id: id })
    
    if (error) {
      console.error('Error incrementing blog post views:', error)
      throw error
    }
  } catch (error) {
    console.error('Error in incrementBlogPostViews:', error)
    throw error
  }
}

// Получить статистику блога
export const getBlogStats = async (): Promise<BlogStats> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('status, featured, views')

    if (error) {
      console.error('Error fetching blog stats:', error)
      throw error
    }

    const stats: BlogStats = {
      total: data?.length || 0,
      published: data?.filter(item => item.status === 'published').length || 0,
      draft: data?.filter(item => item.status === 'draft').length || 0,
      archived: data?.filter(item => item.status === 'archived').length || 0,
      featured: data?.filter(item => item.featured).length || 0,
      totalViews: data?.reduce((sum, item) => sum + (item.views || 0), 0) || 0
    }

    return stats
  } catch (error) {
    console.error('Error in getBlogStats:', error)
    throw error
  }
}

// Получить категории блога
export const getBlogCategories = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .not('category', 'is', null)

    if (error) {
      console.error('Error fetching blog categories:', error)
      throw error
    }

    // Убираем дубликаты и возвращаем уникальные категории
    const categories = [...new Set(data?.map(item => item.category) || [])]
    return categories
  } catch (error) {
    console.error('Error in getBlogCategories:', error)
    throw error
  }
}

// Получить рекомендуемые статьи
export const getFeaturedBlogPosts = async (limit: number = 3): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured blog posts:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error in getFeaturedBlogPosts:', error)
    throw error
  }
}

// Получить похожие статьи
export const getRelatedBlogPosts = async (postId: string, category: string, limit: number = 3): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .neq('id', postId)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching related blog posts:', error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error('Error in getRelatedBlogPosts:', error)
    throw error
  }
}
