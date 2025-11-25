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

    const cacheKey = 'services:all';
    
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
    const services = await sql`
      SELECT 
        id,
        name,
        description,
        price,
        category,
        image_url,
        features,
        is_active,
        sort_order,
        created_at
      FROM services 
      WHERE is_active = true
      ORDER BY sort_order ASC, created_at DESC
    `;

    // Сохраняем в кеш на 30 минут
    try {
      await kv.setex(cacheKey, 1800, services);
    } catch (cacheError) {
      console.warn('⚠️ Ошибка записи в кеш:', cacheError);
    }

    return new Response(JSON.stringify(services), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка API услуг:', error);
    
    // Fallback услуги
    const fallbackServices = [
      {
        id: 'fallback-1',
        name: 'Комплексная аренда оборудования',
        description: 'Полный спектр технического оборудования для мероприятий',
        price: 50000,
        category: 'Аренда',
        image_url: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
        features: ['LED экраны', 'Звуковое оборудование', 'Освещение'],
        is_active: true,
        sort_order: 1
      },
      {
        id: 'fallback-2',
        name: 'Техническое сопровождение',
        description: 'Профессиональная поддержка мероприятий',
        price: 25000,
        category: 'Услуги',
        image_url: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
        features: ['Инженеры', '24/7 поддержка', 'Мониторинг'],
        is_active: true,
        sort_order: 2
      }
    ];

    return new Response(JSON.stringify(fallbackServices), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'FALLBACK'
      }
    });
  }
}













