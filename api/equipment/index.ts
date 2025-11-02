import { createClient } from '@supabase/supabase-js';
import { kv } from '@vercel/kv';

// Используем Supabase вместо Neon для совместимости
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_KEY!
);

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
    const category = url.searchParams.get('category');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    const cacheKey = `equipment:${category || 'all'}:${limit}:${offset}`;
    
    // Проверяем кеш
    try {
      const cached = await kv.get(cacheKey);
      if (cached) {
        return new Response(JSON.stringify(cached), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=600', // 10 минут кеш
            'X-Cache': 'HIT'
          }
        });
      }
    } catch (cacheError) {
      console.warn('⚠️ Ошибка чтения кеша:', cacheError);
    }

    // Загружаем из Supabase
    console.log('🔄 Загружаем оборудование из Supabase');
    
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
    
    const { data: equipment, error: dbError } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (dbError) {
      console.error('❌ Ошибка Supabase:', dbError);
      throw dbError;
    }

    // Обрабатываем спецификации
    const processedEquipment = equipment.map(item => {
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
        price: item.price,
        image: item.image_url || "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        specifications,
        availability: item.availability
      };
    });

    // Сохраняем в кеш
    try {
      await kv.setex(cacheKey, 600, processedEquipment);
    } catch (cacheError) {
      console.warn('⚠️ Ошибка записи в кеш:', cacheError);
    }

    return new Response(JSON.stringify(processedEquipment), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=600',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка API оборудования:', error);
    
    // Fallback данные
    const fallbackEquipment = [
      {
        id: 'fallback-1',
        name: 'LED-панель P2.5',
        description: 'Высококачественная LED-панель с шагом пикселя 2.5мм',
        category: 'Видеооборудование',
        price: 15000,
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        specifications: { resolution: '1920x1080', brightness: '6000cd/m²' },
        availability: true
      },
      {
        id: 'fallback-2',
        name: 'Проектор 4K',
        description: 'Профессиональный проектор с разрешением 4K',
        category: 'Проекционное оборудование',
        price: 25000,
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        specifications: { resolution: '3840x2160', brightness: '5000lm' },
        availability: true
      },
      {
        id: 'fallback-3',
        name: 'Кинетический экран',
        description: 'Движущиеся интерактивные поверхности',
        category: 'Интерактивные экраны',
        price: 35000,
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        specifications: { type: 'kinetic', resolution: '4K', interactive: true },
        availability: true
      },
      {
        id: 'fallback-4',
        name: 'Матричный экран',
        description: 'Многосегментные LED дисплеи',
        category: 'LED экраны',
        price: 45000,
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        specifications: { segments: 'modular', resolution: 'P2.5', brightness: '6000cd/m²' },
        availability: true
      },
      {
        id: 'fallback-5',
        name: 'Прозрачный экран',
        description: 'Полупрозрачные дисплеи',
        category: 'Специальные экраны',
        price: 28000,
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        specifications: { transparency: '70%', resolution: '4K', thickness: '3mm' },
        availability: true
      },
      {
        id: 'fallback-6',
        name: 'Информационные панели',
        description: 'Цифровые вывески',
        category: 'Информационные системы',
        price: 12000,
        image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
        specifications: { size: '55"', resolution: '4K', touch: true },
        availability: true
      }
    ];

    return new Response(JSON.stringify(fallbackEquipment), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
        'X-Cache': 'FALLBACK'
      }
    });
  }
}
