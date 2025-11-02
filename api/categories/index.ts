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

    const cacheKey = 'categories:all';
    
    // Проверяем кеш
    try {
      const cached = await kv.get(cacheKey);
      if (cached) {
        return new Response(JSON.stringify(cached), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600', // 1 час кеш
            'X-Cache': 'HIT'
          }
        });
      }
    } catch (cacheError) {
      console.warn('⚠️ Ошибка чтения кеша:', cacheError);
    }

    // Загружаем из БД
    const categories = await sql`
      SELECT 
        id,
        name,
        description,
        slug,
        icon_url,
        sort_order,
        is_active
      FROM equipment_categories 
      WHERE is_active = true
      ORDER BY sort_order ASC, name ASC
    `;

    // Сохраняем в кеш на 1 час
    try {
      await kv.setex(cacheKey, 3600, categories);
    } catch (cacheError) {
      console.warn('⚠️ Ошибка записи в кеш:', cacheError);
    }

    return new Response(JSON.stringify(categories), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка API категорий:', error);
    
    // Fallback категории
    const fallbackCategories = [
      {
        id: 'fallback-1',
        name: 'LED экраны',
        description: 'Современные LED экраны для мероприятий',
        slug: 'led-screens',
        icon_url: null,
        sort_order: 1,
        is_active: true
      },
      {
        id: 'fallback-2',
        name: 'Звуковое оборудование',
        description: 'Профессиональная звуковая техника',
        slug: 'audio-equipment',
        icon_url: null,
        sort_order: 2,
        is_active: true
      },
      {
        id: 'fallback-3',
        name: 'Осветительное оборудование',
        description: 'Сценическое и архитектурное освещение',
        slug: 'lighting-equipment',
        icon_url: null,
        sort_order: 3,
        is_active: true
      }
    ];

    return new Response(JSON.stringify(fallbackCategories), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'FALLBACK'
      }
    });
  }
}
