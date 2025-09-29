import { useState, useEffect } from 'react'
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

// Хук для работы с каталогом оборудования
export function useEquipmentCatalog(categoryId?: string) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchEquipment = async () => {
    try {
      setLoading(true)
      setError(null)

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
        setEquipment(data || [])
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEquipment()
  }, [categoryId])

  return { equipment, loading, error, refetch: fetchEquipment }
}

// Хук для работы с категориями оборудования
export function useEquipmentCategories() {
  const [categories, setCategories] = useState<EquipmentCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('equipment_categories')
        .select('*')
        .order('name')

      if (fetchError) {
        setError(fetchError)
      } else {
        setCategories(data || [])
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories, loading, error, refetch: fetchCategories }
}

// Хук для работы со сметами пользователя
export function useUserEstimates(userId?: string) {
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchEstimates = async () => {
    if (!userId) return

    try {
      setLoading(true)
      setError(null)

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
        setEstimates(data || [])
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEstimates()
  }, [userId])

  return { estimates, loading, error, refetch: fetchEstimates }
}

// Хук для работы со статьями блога
export function useArticles(categoryId?: string, publishedOnly = true) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)

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
        setArticles(data || [])
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [categoryId, publishedOnly])

  return { articles, loading, error, refetch: fetchArticles }
}

// Хук для работы с категориями статей
export function useArticleCategories() {
  const [categories, setCategories] = useState<ArticleCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('article_categories')
        .select('*')
        .order('name')

      if (fetchError) {
        setError(fetchError)
      } else {
        setCategories(data || [])
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories, loading, error, refetch: fetchCategories }
}

// Хук для создания сметы
export function useCreateEstimate() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const createEstimate = async (estimateData: EstimateInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: createError } = await supabase
        .from('estimates')
        .insert(estimateData)
        .select()
        .single()

      if (createError) {
        setError(createError)
        return { success: false, data: null, error: createError }
      }

      return { success: true, data, error: null }
    } catch (err) {
      const error = err as PostgrestError
      setError(error)
      return { success: false, data: null, error }
    } finally {
      setLoading(false)
    }
  }

  return { createEstimate, loading, error }
}

// Хук для добавления позиций в смету
export function useAddEstimateItem() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const addItem = async (itemData: EstimateItemInsert) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: addError } = await supabase
        .from('estimate_items')
        .insert(itemData)
        .select()
        .single()

      if (addError) {
        setError(addError)
        return { success: false, data: null, error: addError }
      }

      return { success: true, data, error: null }
    } catch (err) {
      const error = err as PostgrestError
      setError(error)
      return { success: false, data: null, error }
    } finally {
      setLoading(false)
    }
  }

  return { addItem, loading, error }
}

// Хук для увеличения просмотров статьи
export function useIncrementArticleViews() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const incrementViews = async (articleId: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error: incrementError } = await supabase
        .rpc('increment_article_views', { article_uuid: articleId })

      if (incrementError) {
        setError(incrementError)
        return { success: false, error: incrementError }
      }

      return { success: true, error: null }
    } catch (err) {
      const error = err as PostgrestError
      setError(error)
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  return { incrementViews, loading, error }
}

// Хук для поиска оборудования
export function useEquipmentSearch(searchTerm: string) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const searchEquipment = async () => {
    if (!searchTerm.trim()) {
      setEquipment([])
      return
    }

    try {
      setLoading(true)
      setError(null)

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
        setEquipment(data || [])
      }
    } catch (err) {
      setError(err as PostgrestError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchEquipment()
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  return { equipment, loading, error }
}
