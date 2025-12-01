import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabase'

// Fallback данные для отзывов
const FALLBACK_TESTIMONIALS = [
  {
    id: 'fallback-testimonial',
    client_name: 'Отзывы загружаются...',
    content: 'Пожалуйста, подождите',
    rating: 5,
    created_at: new Date().toISOString(),
  }
]

// Функция для получения отзывов
const getTestimonials = async () => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select(`
        id,
        client_name,
        content,
        rating,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(6) // Ограничиваем количество отзывов
    
    if (error) {
      console.error('Ошибка загрузки отзывов:', error)
      throw error
    }
    
    return data || FALLBACK_TESTIMONIALS
  } catch (error) {
    console.error('Критическая ошибка загрузки отзывов:', error)
    return FALLBACK_TESTIMONIALS
  }
}

// Хук для получения отзывов с кэшированием
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 24 * 60 * 60 * 1000, // 24 часа - статический контент
    cacheTime: 48 * 60 * 60 * 1000, // 48 часов кэширования
    retry: 2, // Меньше попыток для статического контента
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
    throwOnError: false,
  })
}
