import { createClient } from '@supabase/supabase-js';

// Используем Supabase для тестирования
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_KEY!
);

export const config = {
  runtime: 'edge',
  regions: ['iad1', 'fra1', 'sin1']
};

export default async function handler(req: Request) {
  try {
    console.log('🔍 Тестируем подключение к Supabase...');
    
    // Получаем список таблиц
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (tablesError) {
      console.error('❌ Ошибка получения таблиц:', tablesError);
      return new Response(JSON.stringify({ 
        error: 'Ошибка получения таблиц', 
        details: tablesError.message 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Проверяем таблицу cases
    const { data: casesData, error: casesError } = await supabase
      .from('cases')
      .select('id, title, client')
      .limit(5);

    // Проверяем таблицу equipment_catalog
    const { data: equipmentData, error: equipmentError } = await supabase
      .from('equipment_catalog')
      .select('id, name, category')
      .limit(5);

    return new Response(JSON.stringify({
      success: true,
      tables: tables?.map(t => t.table_name) || [],
      cases: {
        count: casesData?.length || 0,
        data: casesData || [],
        error: casesError?.message || null
      },
      equipment: {
        count: equipmentData?.length || 0,
        data: equipmentData || [],
        error: equipmentError?.message || null
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Общая ошибка:', error);
    return new Response(JSON.stringify({ 
      error: 'Общая ошибка', 
      details: error instanceof Error ? error.message : 'Неизвестная ошибка'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}






