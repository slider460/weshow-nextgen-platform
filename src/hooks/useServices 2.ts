import { useQuery } from '@tanstack/react-query'
import { supabase } from '../config/supabase'

// Fallback данные для сервисов
const FALLBACK_SERVICES = [
  {
    id: 'fallback-1',
    name: 'Мультимедийные решения',
    description: 'Интерактивные дисплеи, видеостены и проекционные системы для вашего бизнеса',
    price: null,
  },
  {
    id: 'fallback-2',
    name: 'Разработка ПО и игр',
    description: 'Создание современных приложений, игр и интерактивных решений',
    price: null,
  },
  {
    id: 'fallback-3',
    name: 'Техническое сопровождение',
    description: 'Полная поддержка и обслуживание всех установленных систем',
    price: null,
  },
  {
    id: 'fallback-4',
    name: 'Интеграция мультимедии',
    description: 'Объединение различных систем в единую экосистему',
    price: null,
  },
  {
    id: 'fallback-5',
    name: 'Брендинг мероприятий',
    description: 'Создание уникального визуального образа для ваших событий',
    price: null,
  },
  {
    id: 'fallback-6',
    name: 'Аренда оборудования',
    description: 'Временное использование профессионального мультимедийного оборудования',
    price: null,
  }
]

// Функция для получения сервисов
const getServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        id,
        name,
        description,
        price,
        created_at
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Ошибка загрузки сервисов:', error)
      throw error
    }
    
    return data || FALLBACK_SERVICES
  } catch (error) {
    console.error('Критическая ошибка загрузки сервисов:', error)
    return FALLBACK_SERVICES
  }
}

// Хук для получения сервисов с кэшированием
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    staleTime: 24 * 60 * 60 * 1000, // 24 часа - статический контент
    cacheTime: 48 * 60 * 60 * 1000, // 48 часов кэширования
    retry: 2, // Меньше попыток для статического контента
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
    throwOnError: false,
  })
}
