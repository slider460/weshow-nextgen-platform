import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabase'

// Fallback данные для случаев ошибок
const FALLBACK_PROJECTS = [
  {
    id: 'fallback-1',
    title: 'Проект временно недоступен',
    description: 'Данные загружаются...',
    image_url: '/images/placeholder.jpg',
    created_at: new Date().toISOString(),
  }
]

// Оптимизированная функция для получения проектов
const getProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        image_url,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(12)
    
    if (error) {
      console.error('Ошибка загрузки проектов:', error)
      throw error
    }
    
    return data || FALLBACK_PROJECTS
  } catch (error) {
    console.error('Критическая ошибка загрузки проектов:', error)
    // Возвращаем fallback данные вместо ошибки
    return FALLBACK_PROJECTS
  }
}

// Хук для получения проектов с кэшированием
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 60 * 60 * 1000, // 1 час - данные портфолио не часто меняются
    cacheTime: 2 * 60 * 60 * 1000, // 2 часа кэширования
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),
    // Не показываем ошибку пользователю, используем fallback данные
    throwOnError: false,
  })
}

// Хук для получения одного проекта
export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!id, // Запрос выполняется только если id существует
    staleTime: 30 * 60 * 1000, // 30 минут
    cacheTime: 60 * 60 * 1000, // 1 час
  })
}
