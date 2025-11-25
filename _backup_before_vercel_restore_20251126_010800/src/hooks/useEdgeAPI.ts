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

interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  specifications: any;
  availability: boolean;
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

const staticEquipment: Equipment[] = [
  {
    id: 'static-equipment-1',
    name: 'LED-панель P2.5',
    description: 'Высококачественная LED-панель с шагом пикселя 2.5мм',
    category: 'Видеооборудование',
    price: 15000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { resolution: '1920x1080', brightness: '6000cd/m²' },
    availability: true
  },
  {
    id: 'static-equipment-2',
    name: 'Проектор 4K',
    description: 'Профессиональный проектор с разрешением 4K',
    category: 'Проекционное оборудование',
    price: 25000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { resolution: '3840x2160', brightness: '5000lm' },
    availability: true
  },
  {
    id: 'static-equipment-3',
    name: 'Кинетический экран',
    description: 'Движущиеся интерактивные поверхности',
    category: 'Интерактивные экраны',
    price: 35000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { type: 'kinetic', resolution: '4K', interactive: true },
    availability: true
  },
  {
    id: 'static-equipment-4',
    name: 'Матричный экран',
    description: 'Многосегментные LED дисплеи',
    category: 'LED экраны',
    price: 45000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { segments: 'modular', resolution: 'P2.5', brightness: '6000cd/m²' },
    availability: true
  },
  {
    id: 'static-equipment-5',
    name: 'Прозрачный экран',
    description: 'Полупрозрачные дисплеи',
    category: 'Специальные экраны',
    price: 28000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { transparency: '70%', resolution: '4K', thickness: '3mm' },
    availability: true
  },
  {
    id: 'static-equipment-6',
    name: 'Информационные панели',
    description: 'Цифровые вывески',
    category: 'Информационные системы',
    price: 12000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { size: '55"', resolution: '4K', touch: true },
    availability: true
  },
  {
    id: 'static-equipment-7',
    name: 'Проектор (от 10000 люмен)',
    description: 'Высокояркостная проекция',
    category: 'Проекционное оборудование',
    price: 40000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { brightness: '10000lm', resolution: '4K', contrast: '20000:1' },
    availability: true
  },
  {
    id: 'static-equipment-8',
    name: 'Гибкий неон',
    description: 'Эластичная LED подсветка',
    category: 'Декоративное освещение',
    price: 8000,
    image: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
    specifications: { flexibility: 'high', colors: 'RGB', length: 'custom' },
    availability: true
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

// Хук для загрузки оборудования через Supabase (прямые запросы в режиме разработки)
export const useEdgeEquipment = (category?: string, limit = 20, offset = 0) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔄 Загружаем оборудование из Supabase...');

        // Прямой запрос к Supabase
        let query = supabase
          .from('equipment_catalog')
          .select(`
            id,
            name,
            description,
            category,
            price,
            image_url,
            specifications,
            availability,
            created_at
          `)
          .eq('availability', true);
        
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data: equipmentData, error: dbError } = await query
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1);

        if (dbError) {
          console.error('❌ Ошибка Supabase:', dbError);
          throw dbError;
        }

        // Обрабатываем спецификации
        const processedEquipment = (equipmentData || []).map(item => {
          let specifications = {};
          if (typeof item.specifications === 'string') {
            try {
              specifications = JSON.parse(item.specifications);
            } catch {
              specifications = { raw: item.specifications };
            }
          } else if (item.specifications) {
            specifications = item.specifications;
          }

          return {
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price || 0,
            image: item.image_url || "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
            specifications,
            availability: item.availability
          };
        });

        setEquipment(processedEquipment);
        console.log(`📊 Оборудование загружено из Supabase: ${processedEquipment.length} позиций`);
        
      } catch (err) {
        console.error('❌ Ошибка загрузки оборудования:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.log('⚠️ Используем статические данные как fallback');
        setEquipment(staticEquipment.slice(offset, offset + limit)); // Всегда возвращаем статические данные при ошибке
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [category, limit, offset]);

  return { equipment, loading, error };
};

// Хук для загрузки категорий через Edge API
export const useEdgeCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/categories', {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
        
        const cacheStatus = response.headers.get('X-Cache');
        console.log(`📊 Категории загружены (кеш: ${cacheStatus})`);
        
      } catch (err) {
        console.error('❌ Ошибка загрузки категорий:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Хук для загрузки услуг через Edge API
export const useEdgeServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/services', {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setServices(data);
        
        const cacheStatus = response.headers.get('X-Cache');
        console.log(`📊 Услуги загружены (кеш: ${cacheStatus})`);
        
      } catch (err) {
        console.error('❌ Ошибка загрузки услуг:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        console.log('⚠️ Используем статические данные как fallback');
        // Fallback на статические данные услуг
        const fallbackServices: Service[] = [
          {
            id: 'static-service-1',
            name: 'Мультимедийный контент',
            description: 'Создание уникального визуального и интерактивного наполнения: 2D/3D анимация, видеоролики, motion-дизайн.',
            price: 0,
            category: 'content',
            features: ['2D/3D анимация', 'Видеоролики', 'Motion-дизайн'],
            is_active: true,
            sort_order: 1
          },
          {
            id: 'static-service-2',
            name: 'Видеопродакшн',
            description: 'Полный цикл производства: сценарий, съёмка, режиссура, монтаж и постпродакшн для любых площадок.',
            price: 0,
            category: 'production',
            features: ['Сценарий', 'Съёмка', 'Монтаж и постпродакшн'],
            is_active: true,
            sort_order: 2
          },
          {
            id: 'static-service-3',
            name: 'ПО и игры для мероприятий',
            description: 'Разработка интерактивных приложений, брендированных игр и UX-решений, усиливающих вовлечённость гостей.',
            price: 0,
            category: 'development',
            features: ['Интерактивные приложения', 'Брендированные игры', 'UX-решения'],
            is_active: true,
            sort_order: 3
          }
        ];
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

// Хук для загрузки статей через Edge API
export const useEdgeArticles = (category?: string, limit = 10, offset = 0) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString()
        });
        
        if (category) {
          params.append('category', category);
        }

        const response = await fetch(`/api/articles?${params}`, {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data);
        
        const cacheStatus = response.headers.get('X-Cache');
        console.log(`📊 Статьи загружены (кеш: ${cacheStatus})`);
        
      } catch (err) {
        console.error('❌ Ошибка загрузки статей:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, limit, offset]);

  return { articles, loading, error };
};

// Хук для загрузки отзывов через Edge API
export const useEdgeTestimonials = (featured = false, limit = 10, offset = 0) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString()
        });
        
        if (featured) {
          params.append('featured', 'true');
        }

        const response = await fetch(`/api/testimonials?${params}`, {
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
          data = staticTestimonials.slice(offset, offset + limit);
        }
        
        setTestimonials(data);
        
        const cacheStatus = response.headers.get('X-Cache');
        console.log(`📊 Отзывы загружены (кеш: ${cacheStatus})`);
        
      } catch (err) {
        console.error('❌ Ошибка загрузки отзывов:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
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
        console.log('⚠️ Используем статические данные как fallback');
        setCertificates(staticCertificates.slice(offset, offset + limit));
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [type, limit, offset]);

  return { certificates, loading, error };
};
