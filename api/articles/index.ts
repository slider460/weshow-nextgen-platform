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
    const category = url.searchParams.get('category');
    
    const cacheKey = `articles:${category || 'all'}:${limit}:${offset}`;
    
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
        title,
        content,
        excerpt,
        slug,
        image_url,
        published_at,
        author_id,
        category_id,
        tags,
        is_published,
        created_at
      FROM articles 
      WHERE is_published = true
    `;
    
    if (category) {
      query = sql`
        SELECT 
          a.id,
          a.title,
          a.content,
          a.excerpt,
          a.slug,
          a.image_url,
          a.published_at,
          a.author_id,
          a.category_id,
          a.tags,
          a.is_published,
          a.created_at,
          ac.name as category_name
        FROM articles a
        LEFT JOIN article_categories ac ON a.category_id = ac.id
        WHERE a.is_published = true AND ac.slug = ${category}
      `;
    }
    
    query = sql`
      ${query}
      ORDER BY published_at DESC, created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const articles = await query;

    // Сохраняем в кеш на 30 минут
    try {
      await kv.setex(cacheKey, 1800, articles);
    } catch (cacheError) {
      console.warn('⚠️ Ошибка записи в кеш:', cacheError);
    }

    return new Response(JSON.stringify(articles), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка API статей:', error);
    
    // Fallback статьи
    const fallbackArticles = [
      {
        id: 'fallback-1',
        title: 'Новые технологии в организации мероприятий',
        content: 'Обзор современных технологических решений...',
        excerpt: 'Как технологии меняют индустрию событий',
        slug: 'new-technologies-events',
        image_url: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
        published_at: new Date().toISOString(),
        author_id: 'admin',
        category_id: 'technology',
        tags: ['технологии', 'мероприятия'],
        is_published: true
      }
    ];

    return new Response(JSON.stringify(fallbackArticles), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'FALLBACK'
      }
    });
  }
}






