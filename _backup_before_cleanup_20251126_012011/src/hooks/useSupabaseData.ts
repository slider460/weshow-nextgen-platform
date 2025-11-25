import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { PostgrestError } from '@supabase/supabase-js'

interface UseSupabaseDataOptions {
  table: string
  select?: string
  filters?: Record<string, any>
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
}

interface UseSupabaseDataResult<T> {
  data: T[] | null
  loading: boolean
  error: PostgrestError | null
  refetch: () => Promise<void>
}

export function useSupabaseData<T = any>({
  table,
  select = '*',
  filters = {},
  orderBy,
  limit
}: UseSupabaseDataOptions): UseSupabaseDataResult<T> {
  const [data, setData] = useState<T[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PostgrestError | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from(table).select(select)

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })

      // Apply ordering
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true })
      }

      // Apply limit
      if (limit) {
        query = query.limit(limit)
      }

      const { data: result, error: fetchError } = await query

      if (fetchError) {
        setError(fetchError)
        setData(null)
      } else {
        setData(result)
      }
    } catch (err) {
      setError(err as PostgrestError)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [table, select, JSON.stringify(filters), orderBy?.column, orderBy?.ascending, limit])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Hook for inserting data
export function useSupabaseInsert<T = any>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const insert = async (data: Partial<T> | Partial<T>[]) => {
    try {
      setLoading(true)
      setError(null)

      const { error: insertError } = await supabase
        .from(table)
        .insert(data)

      if (insertError) {
        setError(insertError)
        return { success: false, error: insertError }
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

  return { insert, loading, error }
}

// Hook for updating data
export function useSupabaseUpdate<T = any>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const update = async (id: string | number, data: Partial<T>) => {
    try {
      setLoading(true)
      setError(null)

      const { error: updateError } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)

      if (updateError) {
        setError(updateError)
        return { success: false, error: updateError }
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

  return { update, loading, error }
}

// Hook for deleting data
export function useSupabaseDelete(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const deleteRecord = async (id: string | number) => {
    try {
      setLoading(true)
      setError(null)

      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (deleteError) {
        setError(deleteError)
        return { success: false, error: deleteError }
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

  return { deleteRecord, loading, error }
}
