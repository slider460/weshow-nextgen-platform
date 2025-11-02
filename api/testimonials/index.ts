import { neon } from '@neondatabase/serverless';
import { kv } from '@vercel/kv';

const sql = neon(process.env.DATABASE_URL);

// Конфигурация для Vercel Edge Runtime
export const config = {
  runtime: 'edge',
  regions: ['iad1', 'fra1', 'sin1']
};

export default async function handler(req: Request) {
  try {
    if (req.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const featured = url.searchParams.get('featured') === 'true';
    
    const cacheKey = `testimonials:${featured ? 'featured' : 'all'}:${limit}:${offset}`;
    
    // Проверяем кеш
    try {
      const cached = await kv.get(cacheKey);
      if (cached) {
        return new Response(JSON.stringify(cached), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=1800', // 30 минут кеш
            'X-Cache': 'HIT'
          }
        });
      }
    } catch (cacheError) {
      console.warn('⚠️ Ошибка чтения кеша:', cacheError);
    }

    // Загружаем из БД
    let query = sql`
      SELECT 
        id,
        client_name,
        client_position,
        client_company,
        client_photo,
        content,
        rating,
        project_name,
        project_year,
        is_featured,
        is_visible,
        created_at
      FROM testimonials 
      WHERE is_visible = true
    `;
    
    if (featured) {
      query = sql`
        ${query} AND is_featured = true
      `;
    }
    
    query = sql`
      ${query}
      ORDER BY is_featured DESC, created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const testimonials = await query;

    // Сохраняем в кеш на 30 минут
    try {
      await kv.setex(cacheKey, 1800, testimonials);
    } catch (cacheError) {
      console.warn('⚠️ Ошибка записи в кеш:', cacheError);
    }

    return new Response(JSON.stringify(testimonials), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка API отзывов:', error);
    
    // Fallback отзывы
    const fallbackTestimonials = [
      {
        id: 'fallback-1',
        client_name: 'Анна Петрова',
        client_position: 'Директор по маркетингу',
        client_company: 'Samsung Electronics',
        client_photo: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
        content: 'WESHOW обеспечили техническое сопровождение нашего корпоративного мероприятия на высшем уровне. Профессиональный подход и внимание к деталям.',
        rating: 5,
        project_name: 'Особенный Новый год Samsung',
        project_year: '2020',
        is_featured: true,
        is_visible: true,
        created_at: new Date().toISOString()
      },
      {
        id: 'fallback-2',
        client_name: 'Михаил Иванов',
        client_position: 'Руководитель проектов',
        client_company: 'Правительство Самарской области',
        client_photo: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
        content: 'Интерактивный стенд для ВДНХ получился впечатляющим. Современные технологии и креативный подход к решению задач.',
        rating: 5,
        project_name: 'ВДНХ - Стенд Самарской области',
        project_year: '2023',
        is_featured: true,
        is_visible: true,
        created_at: new Date().toISOString()
      }
    ];

    return new Response(JSON.stringify(fallbackTestimonials), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'FALLBACK'
      }
    });
  }
}






