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
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка при получении товаров:', error);
      throw error;
    }

    return equipment || [];
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
}

// Функция для получения товаров по категории
export async function getEquipmentByCategory(categoryId: string) {
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
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка при получении товаров по категории:', error);
      throw error;
    }

    return equipment || [];
  } catch (error) {
    console.error('Ошибка API:', error);
    throw error;
  }
}

// Функция для получения категорий
export async function getCategories() {
  try {
    const { data: categories, error } = await supabase
      .from('equipment_categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Ошибка при получении категорий:', error);
      throw error;
    }

    return categories || [];
  } catch (error) {
    console.error('Ошибка API:', error);
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
