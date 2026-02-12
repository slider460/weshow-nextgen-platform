import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

// Хук для умного prefetching данных
export const usePrefetch = () => {
  const queryClient = useQueryClient()

  // Prefetch критически важных данных - отключено (API не используется)
  const prefetchCriticalData = () => {
    // API запросы отключены, используем только статические данные
    console.log('📊 Prefetch отключен - используем статические данные');
    // Все prefetch запросы удалены
  }

  // Prefetch данных на основе пользовательского поведения
  const prefetchOnHover = (queryKey: string[], queryFn: () => Promise<any>) => {
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 5 * 60 * 1000, // 5 минут
    })
  }

  // Prefetch portfolio при наведении на портфолио ссылку - отключено
  const prefetchPortfolio = () => {
    // API запросы отключены, используем только статические данные
    console.log('📊 Prefetch портфолио отключен - используем статические данные');
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
