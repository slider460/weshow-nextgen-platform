import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

// Хук для умного prefetching данных
export const usePrefetch = () => {
  const queryClient = useQueryClient()

  // Prefetch критически важных данных
  const prefetchCriticalData = () => {
    // Prefetch services (статические данные)
    queryClient.prefetchQuery({
      queryKey: ['services'],
      queryFn: async () => {
        const { supabase } = await import('../config/supabase')
        const { data, error } = await supabase
          .from('services')
          .select('id, name, description, price, created_at')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        return data
      },
      staleTime: 24 * 60 * 60 * 1000, // 24 часа
    })

    // Prefetch testimonials (статические данные)
    queryClient.prefetchQuery({
      queryKey: ['testimonials'],
      queryFn: async () => {
        const { supabase } = await import('../config/supabase')
        const { data, error } = await supabase
          .from('testimonials')
          .select('id, client_name, content, rating, created_at')
          .order('created_at', { ascending: false })
          .limit(6)
        
        if (error) throw error
        return data
      },
      staleTime: 24 * 60 * 60 * 1000, // 24 часа
    })
  }

  // Prefetch данных на основе пользовательского поведения
  const prefetchOnHover = (queryKey: string[], queryFn: () => Promise<any>) => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000, // 5 минут
    })
  }

  // Prefetch portfolio при наведении на портфолио ссылку
  const prefetchPortfolio = () => {
    queryClient.prefetchQuery({
      queryKey: ['projects'],
      queryFn: async () => {
        const { supabase } = await import('../config/supabase')
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, description, image_url, created_at')
          .order('created_at', { ascending: false })
          .limit(12)
        
        if (error) throw error
        return data
      },
      staleTime: 60 * 60 * 1000, // 1 час
    })
  }

  return {
    prefetchCriticalData,
    prefetchOnHover,
    prefetchPortfolio,
  }
}

// Хук для автоматического prefetching при загрузке страницы
export const useAutoPrefetch = () => {
  const { prefetchCriticalData } = usePrefetch()

  useEffect(() => {
    // Prefetch критических данных после загрузки главной страницы
    const timer = setTimeout(() => {
      prefetchCriticalData()
    }, 3000) // Prefetch через 3 секунды после загрузки

    return () => clearTimeout(timer)
  }, [prefetchCriticalData])
}
