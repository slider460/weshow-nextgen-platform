import { supabase } from '../config/supabase';

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
  description: string | null;
  icon_url: string | null;
  created_at: string;
  updated_at: string;
}

// Функция для получения всех товаров
export async function getEquipment(): Promise<SupabaseEquipment[]> {
  try {
    console.log('🔄 getEquipment: Загружаем оборудование через Supabase...');
    
    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ getEquipment: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ getEquipment: Оборудование загружено:', equipment);
    console.log('✅ getEquipment: Количество записей:', equipment?.length || 0);

    return equipment || [];
  } catch (error) {
    console.error('❌ getEquipment: Ошибка API:', error);
    // Возвращаем fallback данные вместо throw
    console.log('🔄 getEquipment: Используем fallback данные');
    return getFallbackEquipment();
  }
}

// Функция для получения товаров по категории
export async function getEquipmentByCategory(categoryId: string): Promise<SupabaseEquipment[]> {
  try {
    console.log('🔄 getEquipmentByCategory: Загружаем оборудование по категории...');
    
    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ getEquipmentByCategory: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ getEquipmentByCategory: Оборудование по категории загружено:', equipment);
    return equipment || [];
  } catch (error) {
    console.error('❌ getEquipmentByCategory: Ошибка API:', error);
    // Возвращаем fallback данные
    return getFallbackEquipment().filter(item => item.category_id === categoryId);
  }
}

// Функция для получения категорий
export async function getCategories(): Promise<SupabaseCategory[]> {
  try {
    console.log('🔄 getCategories: Загружаем категории через Supabase...');
    
    const { data: categories, error } = await supabase
      .from('equipment_categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ getCategories: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ getCategories: Категории загружены:', categories);
    return categories || [];
  } catch (error) {
    console.error('❌ getCategories: Ошибка API:', error);
    // Возвращаем fallback данные
    return getFallbackCategories();
  }
}

// Fallback данные для случаев, когда API недоступен
function getFallbackEquipment(): SupabaseEquipment[] {
  return [
    {
      id: 'fallback-1',
      name: 'LED Видеостена 55"',
      description: 'Профессиональная LED видеостена для мероприятий',
      specifications: {
        resolution: '1920x1080',
        brightness: '500 cd/m²',
        contrast: '3000:1'
      },
      main_image_url: null,
      price_per_day: 15000,
      category_id: 'fallback-category-1',
      stock_quantity: 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'fallback-2',
      name: 'Проектор 4K',
      description: 'Высококачественный проектор для презентаций',
      specifications: {
        resolution: '3840x2160',
        brightness: '3500 lumens',
        contrast: '10000:1'
      },
      main_image_url: null,
      price_per_day: 8000,
      category_id: 'fallback-category-2',
      stock_quantity: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
}

function getFallbackCategories(): SupabaseCategory[] {
  return [
    {
      id: 'fallback-category-1',
      name: 'Видеостены',
      description: 'LED видеостены и дисплеи',
      icon_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'fallback-category-2',
      name: 'Проекторы',
      description: 'Проекционное оборудование',
      icon_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
}

// Функция для добавления товара в корзину
export async function addToCart(equipmentId: string, quantity: number = 1) {
  try {
    console.log('🔄 addToCart: Добавляем товар в корзину...');
    
    // Здесь можно добавить логику для работы с корзиной
    // Например, сохранение в localStorage или отправка на сервер
    const cartItem = {
      equipmentId,
      quantity,
      addedAt: new Date().toISOString()
    };

    // Получаем текущую корзину из localStorage
    const existingCart = JSON.parse(localStorage.getItem('equipment_cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('equipment_cart', JSON.stringify(existingCart));

    console.log('✅ addToCart: Товар добавлен в корзину:', cartItem);
    return { success: true, item: cartItem };
  } catch (error) {
    console.error('❌ addToCart: Ошибка добавления в корзину:', error);
    return { success: false, error: error.message };
  }
}

// Функция для получения товара по ID
export async function getEquipmentById(id: string): Promise<SupabaseEquipment | null> {
  try {
    console.log('🔄 getEquipmentById: Загружаем товар по ID...');
    
    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ getEquipmentById: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ getEquipmentById: Товар загружен:', equipment);
    return equipment;
  } catch (error) {
    console.error('❌ getEquipmentById: Ошибка API:', error);
    // Возвращаем fallback данные
    const fallbackEquipment = getFallbackEquipment();
    return fallbackEquipment.find(item => item.id === id) || null;
  }
}

// Функция для поиска оборудования
export async function searchEquipment(query: string): Promise<SupabaseEquipment[]> {
  try {
    console.log('🔄 searchEquipment: Ищем оборудование по запросу:', query);
    
    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select('*')
      .or(`name.ilike.%${query}%, description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ searchEquipment: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ searchEquipment: Найдено оборудование:', equipment);
    return equipment || [];
  } catch (error) {
    console.error('❌ searchEquipment: Ошибка API:', error);
    // Возвращаем fallback данные, отфильтрованные по запросу
    const fallbackEquipment = getFallbackEquipment();
    return fallbackEquipment.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
    );
  }
}