import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

interface Project {
  id: string;
  title: string;
  client: string;
  date: string;
  description: string;
  image: string;
  results: string[];
  tech: string[];
  video_url?: string;
  sort_order: number;
}


interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon_url?: string;
  sort_order: number;
  is_active: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  features: string[];
  is_active: boolean;
  sort_order: number;
}

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image_url?: string;
  published_at: string;
  author_id: string;
  category_id: string;
  tags: string[];
  is_published: boolean;
}

interface Testimonial {
  id: string;
  client_name: string;
  client_position: string;
  client_company: string;
  client_photo?: string;
  content: string;
  rating: number;
  project_name: string;
  project_year: string;
  is_featured: boolean;
  is_visible: boolean;
  created_at: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  description: string;
  type: string;
  issued_date: string;
  image_url?: string;
  document_url?: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

// Статические данные для fallback
const staticProjects: Project[] = [
  {
    id: 'static-project-1',
    title: 'Интерактивная инсталляция для музея',
    client: 'Музей современного искусства',
    date: '2024-01-15',
    description: 'Создание интерактивной инсталляции с использованием проекционного маппинга и сенсорных технологий',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Увеличение времени пребывания посетителей на 40%', 'Положительные отзывы от 95% посетителей'],
    tech: ['Проекционный маппинг', 'Touch-экраны', 'Motion capture'],
    sort_order: 1
  },
  {
    id: 'static-project-2',
    title: 'LED-видеостена для конференц-зала',
    client: 'ООО "Технологии будущего"',
    date: '2024-02-20',
    description: 'Установка LED-видеостены 4K для проведения презентаций и видеоконференций',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Повышение качества презентаций', 'Улучшение восприятия информации'],
    tech: ['LED-панели', 'Система управления', 'Кабельная инфраструктура'],
    sort_order: 2
  },
  {
    id: 'static-project-3',
    title: 'Интерактивная выставка для торгового центра',
    client: 'ТЦ "Мегаполис"',
    date: '2024-03-10',
    description: 'Создание интерактивной выставки с использованием голографических технологий и сенсорных панелей',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Увеличение посещаемости на 25%', 'Высокие оценки от посетителей'],
    tech: ['Голографические дисплеи', 'Интерактивные панели', 'AR технологии'],
    sort_order: 3
  },
  {
    id: 'static-project-4',
    title: 'Мультимедийная презентация для корпоративного события',
    client: 'ООО "Инновации"',
    date: '2024-04-05',
    description: 'Организация мультимедийной презентации с использованием проекционного маппинга и звуковых эффектов',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Успешное проведение мероприятия', 'Положительные отзывы участников'],
    tech: ['Проекционный маппинг', 'Звуковое оборудование', 'Осветительные системы'],
    sort_order: 4
  },
  {
    id: 'static-project-5',
    title: 'Интерактивная инсталляция для фестиваля',
    client: 'Фестиваль "Технологии будущего"',
    date: '2024-05-15',
    description: 'Создание интерактивной инсталляции с использованием LED-экранов и сенсорных технологий',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Привлечение большого количества посетителей', 'Высокие оценки организаторов'],
    tech: ['LED-экраны', 'Сенсорные технологии', 'Интерактивные элементы'],
    sort_order: 5
  },
  {
    id: 'static-project-6',
    title: 'Виртуальная экскурсия для музея',
    client: 'Исторический музей',
    date: '2024-06-20',
    description: 'Разработка виртуальной экскурсии с использованием VR технологий и интерактивных элементов',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Расширение аудитории музея', 'Современный подход к экспозиции'],
    tech: ['VR технологии', 'Интерактивные элементы', '3D моделирование'],
    sort_order: 6
  },
  {
    id: 'static-project-7',
    title: 'Мультимедийная презентация для конференции',
    client: 'IT-конференция "Будущее технологий"',
    date: '2024-07-10',
    description: 'Организация мультимедийной презентации с использованием проекционных технологий и интерактивных элементов',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Успешное проведение конференции', 'Высокие оценки участников'],
    tech: ['Проекционные технологии', 'Интерактивные элементы', 'Звуковое оборудование'],
    sort_order: 7
  },
  {
    id: 'static-project-8',
    title: 'Интерактивная выставка для образовательного центра',
    client: 'Образовательный центр "Знания"',
    date: '2024-08-15',
    description: 'Создание интерактивной выставки с использованием современных технологий для образовательных целей',
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    results: ['Повышение интереса к обучению', 'Современный подход к образованию'],
    tech: ['Интерактивные панели', 'Образовательные технологии', 'Мультимедийные элементы'],
    sort_order: 8
  }
];


const staticTestimonials: Testimonial[] = [
  {
    id: 'static-testimonial-1',
    client_name: 'Иван Петров',
    client_position: 'Директор по маркетингу',
    client_company: 'ООО "Инновации"',
    client_photo: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    content: 'WESHOW превзошли все наши ожидания! Проект был выполнен на высшем уровне, а интерактивные решения поразили всех гостей.',
    rating: 5,
    project_name: 'Запуск нового продукта',
    project_year: '2023',
    is_featured: true,
    is_visible: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-testimonial-2',
    client_name: 'Мария Смирнова',
    client_position: 'Event-менеджер',
    client_company: 'Агентство "Праздник"',
    client_photo: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    content: 'Благодарим команду WESHOW за профессионализм и креативный подход. Наше мероприятие стало незабываемым благодаря их технической поддержке.',
    rating: 5,
    project_name: 'Юбилей компании',
    project_year: '2022',
    is_featured: false,
    is_visible: true,
    created_at: new Date().toISOString(),
  }
];

const staticCertificates: Certificate[] = [
  {
    id: 'static-cert-1',
    title: 'Благодарственное письмо от Министерства Туризма Самарской области',
    issuer: 'Министерство туризма Самарской области',
    description: 'За высокий профессионализм, личный вклад в подготовку и проведение региональной выставки «Самара»',
    type: 'letter',
    issued_date: '2025-02-01',
    image_url: null,
    document_url: '/testimonials/pdf/museum-samara-thank-you.pdf',
    is_visible: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-cert-2',
    title: 'Технический продакшн',
    issuer: 'Премия событийный индустрии "Многогранность"',
    description: '1 место в номинации Технический продакшн/продюсирование',
    type: 'award',
    issued_date: '2024-01-01',
    image_url: null,
    document_url: '/testimonials/pdf/event-industry-award.pdf',
    is_visible: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  }
];

// Хук для загрузки проектов через Supabase (прямые запросы в режиме разработки)
export const useEdgeProjects = (limit = 6, offset = 0) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Загружаем проекты из Supabase...');

        // Прямой запрос к Supabase
        const { data: projectsData, error: dbError } = await supabase
          .from('cases')
          .select(`
            id,
            title,
            client,
            year,
            description,
            results,
            technologies,
            image_url,
            video_url,
            is_visible,
            sort_order,
            created_at
          `)
          .eq('is_visible', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);

        if (dbError) {
          console.error('❌ Ошибка Supabase:', dbError);
          throw dbError;
        }

        // Обрабатываем результаты
        const processedProjects = (projectsData || []).map(project => {
          let results = [];
          if (Array.isArray(project.results)) {
            results = project.results;
          } else if (typeof project.results === 'string' && project.results.trim()) {
            try {
              const parsed = JSON.parse(project.results);
              if (Array.isArray(parsed)) {
                results = parsed;
              } else {
                results = project.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
              }
            } catch {
              results = project.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
            }
          }

          return {
            id: project.id,
            title: project.title,
            client: project.client || "Клиент не указан",
            date: project.year?.toString() || "Год не указан",
            description: project.description,
            image: project.image_url || "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
            results,
            tech: project.technologies || [],
            video_url: project.video_url,
            sort_order: project.sort_order
          };
        });

        setProjects(processedProjects);
        console.log(`📊 Проекты загружены из Supabase: ${processedProjects.length} проектов`);
        
      } catch (err) {
        console.error('❌ Ошибка загрузки проектов:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.log('⚠️ Используем статические данные как fallback');
        setProjects(staticProjects.slice(offset, offset + limit)); // Всегда возвращаем статические данные при ошибке
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [limit, offset]);

  return { projects, loading, error };
};


// Хук для загрузки категорий - используем статические данные (API отключен)
export const useEdgeCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Используем статические данные вместо API запросов
    setCategories([]);
    setLoading(false);
    console.log('📊 Категории: используем статические данные (API отключен)');
  }, []);

  return { categories, loading, error };
};

// Хук для загрузки услуг - используем статические данные (API отключен)
export const useEdgeServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Используем статические данные вместо API запросов
    setServices([]);
    setLoading(false);
    console.log('📊 Услуги: используем статические данные (API отключен)');
  }, []);

  return { services, loading, error };
};

// Хук для загрузки статей - используем статические данные (API отключен)
export const useEdgeArticles = (category?: string, limit = 10, offset = 0) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Используем статические данные вместо API запросов
    setArticles([]);
    setLoading(false);
    console.log('📊 Статьи: используем статические данные (API отключен)');
  }, [category, limit, offset]);

  return { articles, loading, error };
};

// Хук для загрузки отзывов - используем статические данные (API отключен)
export const useEdgeTestimonials = (featured = false, limit = 10, offset = 0) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Используем статические данные вместо API запросов
    const filtered = featured 
      ? staticTestimonials.filter(t => t.is_featured)
      : staticTestimonials;
    
    setTestimonials(filtered.slice(offset, offset + limit));
    setLoading(false);
    console.log('📊 Отзывы: используем статические данные (API отключен)');
  }, [featured, limit, offset]);

  return { testimonials, loading, error };
};

// Хук для загрузки сертификатов через Edge API
export const useEdgeCertificates = (type?: string, limit = 20, offset = 0) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString()
        });
        
        if (type) {
          params.append('type', type);
        }

        const response = await fetch(`/api/certificates?${params}`, {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        let data;
        
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          console.warn('⚠️ API вернул не JSON, используем статические данные');
          // Fallback на статические данные
          data = staticCertificates.slice(offset, offset + limit);
        }
        
        setCertificates(data);
        
        const cacheStatus = response.headers.get('X-Cache');
        console.log(`📊 Сертификаты загружены (кеш: ${cacheStatus})`);
        
      } catch (err) {
        console.error('❌ Ошибка загрузки сертификатов:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [type, limit, offset]);

  return { certificates, loading, error };
};
