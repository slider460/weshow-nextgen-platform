import { createClient } from '@supabase/supabase-js';

// Конфигурация Supabase
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

const supabase = createClient(supabaseUrl, supabaseKey);

// Интерфейс для данных из Supabase
interface SupabaseEquipment {
  id: string;
  name: string;
  description: string | null;
  specifications: any;
  main_image_url: string | null;
  price_per_day: number;
  category_id: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

interface SupabaseCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// Маппинг категорий Supabase на типы приложения
const categoryMapping: Record<string, string> = {
  '464a3da6-4944-4778-9e84-e28fa43f4f03': 'audio', // Аудиооборудование
  'aafa4e79-347b-4e5a-99e8-fad53f77abb6': 'projection', // Видеооборудование
  'eaece304-35d0-4909-8f4f-621cee215257': 'projection', // Проекционное оборудование
  '18eaed84-0ef1-4fd4-ac8f-4882a039ceb1': 'lighting', // Световое оборудование
};

// Функция для получения всех товаров
export async function getEquipment() {
  try {
    console.log('🔄 getEquipment: Загружаем оборудование через REST API...');
    
    const url = `${supabaseUrl}/rest/v1/equipment_catalog?select=*&order=created_at.desc`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('🔄 getEquipment: Ответ получен, статус:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ getEquipment: HTTP ошибка:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const equipment = await response.json();
    console.log('✅ getEquipment: Оборудование загружено:', equipment);
    console.log('✅ getEquipment: Количество записей:', equipment?.length || 0);

    return equipment || [];
  } catch (error) {
    console.error('❌ getEquipment: Ошибка API:', error);
    throw error;
  }
}

// Функция для получения товаров по категории
export async function getEquipmentByCategory(categoryId: string) {
  try {
    console.log('🔄 getEquipmentByCategory: Загружаем оборудование по категории через REST API...');
    
    const url = `${supabaseUrl}/rest/v1/equipment_catalog?select=*&category_id=eq.${categoryId}&order=created_at.desc`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('🔄 getEquipmentByCategory: Ответ получен, статус:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ getEquipmentByCategory: HTTP ошибка:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const equipment = await response.json();
    console.log('✅ getEquipmentByCategory: Оборудование по категории загружено:', equipment);
    console.log('✅ getEquipmentByCategory: Количество записей:', equipment?.length || 0);

    return equipment || [];
  } catch (error) {
    console.error('❌ getEquipmentByCategory: Ошибка API:', error);
    throw error;
  }
}

// Функция для получения категорий
export async function getCategories() {
  try {
    console.log('🔄 getCategories: Загружаем категории через REST API...');
    
    const url = `${supabaseUrl}/rest/v1/equipment_categories?select=*&order=name.asc`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('🔄 getCategories: Ответ получен, статус:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ getCategories: HTTP ошибка:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories = await response.json();
    console.log('✅ getCategories: Категории загружены:', categories);
    console.log('✅ getCategories: Количество записей:', categories?.length || 0);

    return categories || [];
  } catch (error) {
    console.error('❌ getCategories: Ошибка API:', error);
    throw error;
  }
}

// Функция для поиска товаров
export async function searchEquipment(query: string) {
  try {
    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select(`
        *,
        equipment_categories (
          id,
          name,
          slug,
          description
        )
      `)
      .or(`name.ilike.%${query}%, description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка при поиске товаров:', error);
      throw error;
    }

    return equipment || [];
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
}
