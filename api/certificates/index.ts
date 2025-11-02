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
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const type = url.searchParams.get('type'); // letter, certificate, award, diploma
    
    const cacheKey = `certificates:${type || 'all'}:${limit}:${offset}`;
    
    // Проверяем кеш
    try {
      const cached = await kv.get(cacheKey);
      if (cached) {
        return new Response(JSON.stringify(cached), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600', // 1 час кеш (сертификаты редко меняются)
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
        issuer,
        description,
        type,
        issued_date,
        image_url,
        document_url,
        is_visible,
        sort_order,
        created_at
      FROM letters_certificates 
      WHERE is_visible = true
    `;
    
    if (type) {
      query = sql`
        ${query} AND type = ${type}
      `;
    }
    
    query = sql`
      ${query}
      ORDER BY sort_order ASC, issued_date DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const certificates = await query;

    // Сохраняем в кеш на 1 час
    try {
      await kv.setex(cacheKey, 3600, certificates);
    } catch (cacheError) {
      console.warn('⚠️ Ошибка записи в кеш:', cacheError);
    }

    return new Response(JSON.stringify(certificates), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': 'MISS'
      }
    });

  } catch (error) {
    console.error('❌ Ошибка API сертификатов:', error);
    
    // Fallback сертификаты
    const fallbackCertificates = [
      {
        id: 'fallback-1',
        title: 'Благодарственное письмо от Министерства Туризма Самарской области',
        issuer: 'Министерство туризма Самарской области',
        description: 'За высокий профессионализм, личный вклад в подготовку и проведение региональной выставки «Самара»',
        type: 'letter',
        issued_date: '2025-02-01',
        image_url: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
        document_url: '/testimonials/pdf/museum-samara-thank-you.pdf',
        is_visible: true,
        sort_order: 1,
        created_at: new Date().toISOString()
      },
      {
        id: 'fallback-2',
        title: 'Благодарственное письмо от ТРЦ Саларис',
        issuer: 'АО "ЛАУТ"',
        description: 'Благодарственное письмо по результату годовых проектов',
        type: 'letter',
        issued_date: '2018-04-01',
        image_url: '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
        document_url: '/testimonials/pdf/salaris-thank-you.pdf',
        is_visible: true,
        sort_order: 2,
        created_at: new Date().toISOString()
      }
    ];

    return new Response(JSON.stringify(fallbackCertificates), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'X-Cache': 'FALLBACK'
      }
    });
  }
}






