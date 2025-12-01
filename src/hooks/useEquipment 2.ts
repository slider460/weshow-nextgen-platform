import { useQuery } from '@tanstack/react-query';
import { supabase } from '../config/supabase';

// Fallback данные для демонстрации
const getFallbackEquipment = () => [
  {
    id: 'demo-eq-1',
    name: 'Демо Проектор 4K',
    description: 'Мощный 4K проектор для больших мероприятий.',
    specifications: { resolution: '3840x2160', brightness: '10000 ANSI Lumens' },
    main_image_url: 'https://via.placeholder.com/400x300?text=4K+Projector',
    price_per_day: 15000,
    category_id: 'demo-cat-1',
    stock_quantity: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-eq-2',
    name: 'Демо LED Экран P2.5',
    description: 'Высококачественный LED экран с шагом пикселя 2.5мм.',
    specifications: { pixelPitch: '2.5mm', size: '5x3m' },
    main_image_url: 'https://via.placeholder.com/400x300?text=LED+Screen',
    price_per_day: 25000,
    category_id: 'demo-cat-1',
    stock_quantity: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-eq-3',
    name: 'Демо Звуковая Система JBL',
    description: 'Профессиональная акустическая система для концертов.',
    specifications: { power: '5000W', brand: 'JBL' },
    main_image_url: 'https://via.placeholder.com/400x300?text=Sound+System',
    price_per_day: 10000,
    category_id: 'demo-cat-2',
    stock_quantity: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const getFallbackCategories = () => [
  { id: 'demo-cat-1', name: 'Проекционное оборудование', description: 'Проекторы и экраны', created_at: new Date().toISOString() },
  { id: 'demo-cat-2', name: 'Звуковое оборудование', description: 'Акустические системы и микрофоны', created_at: new Date().toISOString() },
  { id: 'demo-cat-3', name: 'Световое оборудование', description: 'Световые приборы и эффекты', created_at: new Date().toISOString() },
];

// Функция для получения всего оборудования
const fetchEquipment = async () => {
  try {
    console.log('🔄 fetchEquipment: Загружаем оборудование через Supabase...');

    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ fetchEquipment: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ fetchEquipment: Оборудование загружено:', equipment);
    console.log('✅ fetchEquipment: Количество записей:', equipment?.length || 0);

    return equipment || [];
  } catch (error) {
    console.error('❌ fetchEquipment: Ошибка API:', error);
    // Возвращаем fallback данные при ошибке
    return getFallbackEquipment();
  }
};

// Функция для получения оборудования по категории
const fetchEquipmentByCategory = async (categoryId: string) => {
  try {
    console.log('🔄 fetchEquipmentByCategory: Загружаем оборудование по категории...');

    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ fetchEquipmentByCategory: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ fetchEquipmentByCategory: Оборудование загружено по категории:', equipment);
    return equipment || [];
  } catch (error) {
    console.error('❌ fetchEquipmentByCategory: Ошибка API:', error);
    // Возвращаем fallback данные, отфильтрованные по категории
    return getFallbackEquipment().filter(item => item.category_id === categoryId);
  }
};

// Функция для получения всех категорий
const fetchCategories = async () => {
  try {
    console.log('🔄 fetchCategories: Загружаем категории...');

    const { data: categories, error } = await supabase
      .from('equipment_categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ fetchCategories: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ fetchCategories: Категории загружены:', categories);
    return categories || [];
  } catch (error) {
    console.error('❌ fetchCategories: Ошибка API:', error);
    // Возвращаем fallback данные при ошибке
    return getFallbackCategories();
  }
};

// Функция для поиска оборудования
const searchEquipment = async (query: string) => {
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
    return fallbackEquipment.filter(
      item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Функция для получения товара по ID
const fetchEquipmentById = async (id: string) => {
  try {
    console.log('🔄 fetchEquipmentById: Загружаем товар по ID...');

    const { data: equipment, error } = await supabase
      .from('equipment_catalog')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('❌ fetchEquipmentById: Ошибка Supabase:', error);
      throw new Error(error.message);
    }

    console.log('✅ fetchEquipmentById: Товар загружен:', equipment);
    return equipment;
  } catch (error) {
    console.error('❌ fetchEquipmentById: Ошибка API:', error);
    // Возвращаем fallback данные
    const fallbackEquipment = getFallbackEquipment();
    return fallbackEquipment.find(item => item.id === id) || null;
  }
};

// Основные хуки
export const useEquipment = () => {
  return useQuery({
    queryKey: ['equipment'],
    queryFn: fetchEquipment,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useEquipmentByCategory = (categoryId?: string) => {
  return useQuery({
    queryKey: ['equipment', 'category', categoryId],
    queryFn: () => fetchEquipmentByCategory(categoryId!),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useEquipmentCategories = () => {
  return useQuery({
    queryKey: ['equipment-categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};

export const useSearchEquipment = (searchTerm: string) => {
  return useQuery({
    queryKey: ['equipment', 'search', searchTerm],
    queryFn: () => searchEquipment(searchTerm),
    enabled: searchTerm.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useEquipmentById = (id?: string) => {
  return useQuery({
    queryKey: ['equipment', id],
    queryFn: () => fetchEquipmentById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60 * 12, // 12 hours
  });
};
