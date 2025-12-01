// Supabase и Vercel KV удалены - возвращаем статические данные
// Конфигурация для Vercel Edge Runtime
export const config = {
  runtime: 'edge',
  regions: ['iad1']
};

// Статические данные проектов (локальные)
const staticProjects = [
      {
        id: 'static-1',
        title: "Особенный Новый год Samsung",
        client: "Samsung Electronics",
        date: "2020",
        description: "Комплексное техническое обеспечение новогоднего корпоративного мероприятия Samsung с интерактивными инсталляциями и live-стримингом",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["2000+ участников", "99.9% uptime", "Международная трансляция", "15+ интерактивных зон"],
        tech: ["Live Streaming", "Interactive Installations", "Multi-camera", "LED Screens"],
        sort_order: 1
      },
      {
        id: 'static-2',
        title: "ВДНХ - Стенд Самарской области",
        client: "Правительство Самарской области",
        date: "2023",
        description: "Создание интерактивного стенда для выставки достижений народного хозяйства с мультимедийными презентациями и VR-технологиями",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["50+ интерактивных экранов", "VR-тур по области", "100K+ посетителей", "Премия за инновации"],
        tech: ["VR Technology", "Interactive Displays", "Motion Graphics", "Touch Screens"],
        sort_order: 2
      },
      {
        id: 'static-3',
        title: "Корпоративная презентация 'Инновации 2024'",
        client: "IT Корпорация",
        date: "2024",
        description: "Комплексное техническое обеспечение корпоративного мероприятия с интерактивными презентациями и live-стримингом",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["500+ участников", "99.9% uptime", "Международная трансляция"],
        tech: ["Live Streaming", "Interactive Presentation", "Multi-camera"],
        sort_order: 3
      },
      {
        id: 'static-4',
        title: "Интерактивная выставка для торгового центра",
        client: "ТЦ 'Мегаполис'",
        date: "2024",
        description: "Создание интерактивной выставки с использованием голографических технологий и сенсорных панелей",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["Увеличение посещаемости на 25%", "Высокие оценки от посетителей"],
        tech: ["Голографические дисплеи", "Интерактивные панели", "AR технологии"],
        sort_order: 4
      },
      {
        id: 'static-5',
        title: "Мультимедийная презентация для корпоративного события",
        client: "ООО 'Инновации'",
        date: "2024",
        description: "Организация мультимедийной презентации с использованием проекционного маппинга и звуковых эффектов",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["Успешное проведение мероприятия", "Положительные отзывы участников"],
        tech: ["Проекционный маппинг", "Звуковое оборудование", "Осветительные системы"],
        sort_order: 5
      },
      {
        id: 'static-6',
        title: "Интерактивная инсталляция для фестиваля",
        client: "Фестиваль 'Технологии будущего'",
        date: "2024",
        description: "Создание интерактивной инсталляции с использованием LED-экранов и сенсорных технологий",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["Привлечение большого количества посетителей", "Высокие оценки организаторов"],
        tech: ["LED-экраны", "Сенсорные технологии", "Интерактивные элементы"],
        sort_order: 6
      },
      {
        id: 'static-7',
        title: "Виртуальная экскурсия для музея",
        client: "Исторический музей",
        date: "2024",
        description: "Разработка виртуальной экскурсии с использованием VR технологий и интерактивных элементов",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["Расширение аудитории музея", "Современный подход к экспозиции"],
        tech: ["VR технологии", "Интерактивные элементы", "3D моделирование"],
        sort_order: 7
      },
      {
        id: 'static-8',
        title: "Мультимедийная презентация для конференции",
        client: "IT-конференция 'Будущее технологий'",
        date: "2024",
        description: "Организация мультимедийной презентации с использованием проекционных технологий и интерактивных элементов",
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        results: ["Успешное проведение конференции", "Высокие оценки участников"],
        tech: ["Проекционные технологии", "Интерактивные элементы", "Звуковое оборудование"],
        sort_order: 8
      }
];

export default async function handler(req: Request) {
  // Проверяем метод запроса
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '6');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    // Возвращаем статические данные с пагинацией
    const paginatedProjects = staticProjects.slice(offset, offset + limit);
    
    return new Response(JSON.stringify(paginatedProjects), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'STATIC'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка API проектов:', error);
    
    // Fallback на первые 6 проектов
    return new Response(JSON.stringify(staticProjects.slice(0, 6)), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
        'X-Cache': 'FALLBACK'
      }
    });
  }
}
