import { useState, useEffect, useCallback } from 'react';
import { getEquipment } from '../api/equipment';
import { useOptimizedCache } from './useOptimizedCache';

// Интерфейс для предзагруженных данных
interface PreloadedData {
  equipment: any[];
  categories: any[];
  homepageEquipment: any[];
  isLoading: boolean;
  error: string | null;
}

// Глобальное хранилище предзагруженных данных
let globalPreloadedData: PreloadedData = {
  equipment: [],
  categories: [],
  homepageEquipment: [],
  isLoading: true,
  error: null
};

// Промисы для отслеживания загрузки
const loadingPromises: Record<string, Promise<any>> = {};

/**
 * Хук для предзагрузки критических данных
 * Загружает данные один раз при инициализации приложения
 */
export function usePreloader() {
  const [data, setData] = useState<PreloadedData>(globalPreloadedData);

  const preloadData = useCallback(async () => {
    // Если данные уже загружаются, ждем завершения
    if (loadingPromises.equipment) {
      try {
        await loadingPromises.equipment;
      } catch (error) {
        console.error('Ошибка предзагрузки оборудования:', error);
      }
      return;
    }

    // Если данные уже загружены, возвращаем их
    if (!globalPreloadedData.isLoading && globalPreloadedData.equipment.length > 0) {
      setData(globalPreloadedData);
      return;
    }

    // Начинаем загрузку
    globalPreloadedData.isLoading = true;
    setData(globalPreloadedData);

    try {
      // Загружаем оборудование
      loadingPromises.equipment = getEquipment();
      const equipment = await loadingPromises.equipment;

      // Загружаем данные для главной страницы
      const homepageEquipmentPromise = loadHomepageEquipment();
      const categoriesPromise = loadCategories();

      const [homepageEquipment, categories] = await Promise.all([
        homepageEquipmentPromise,
        categoriesPromise
      ]);

      // Обновляем глобальные данные
      globalPreloadedData = {
        equipment,
        categories,
        homepageEquipment,
        isLoading: false,
        error: null
      };

      setData(globalPreloadedData);
      console.log('✅ Данные предзагружены:', {
        equipment: equipment.length,
        categories: categories.length,
        homepageEquipment: homepageEquipment.length
      });

    } catch (error) {
      console.error('❌ Ошибка предзагрузки данных:', error);
      globalPreloadedData.error = error instanceof Error ? error.message : 'Неизвестная ошибка';
      globalPreloadedData.isLoading = false;
      setData(globalPreloadedData);
    }
  }, []);

  // Автоматическая предзагрузка при монтировании
  useEffect(() => {
    preloadData();
  }, [preloadData]);

  return {
    ...data,
    preloadData,
    isReady: !data.isLoading && data.equipment.length > 0
  };
}

/**
 * Хук для получения предзагруженных данных
 * Используется в компонентах вместо прямых запросов к БД
 */
export function usePreloadedData() {
  const [data, setData] = useState<PreloadedData>(globalPreloadedData);

  useEffect(() => {
    // Подписываемся на изменения глобальных данных
    const interval = setInterval(() => {
      if (globalPreloadedData !== data) {
        setData(globalPreloadedData);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [data]);

  return data;
}

/**
 * Функция для загрузки данных главной страницы
 */
async function loadHomepageEquipment() {
  try {
    const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
    
    const url = `${SUPABASE_URL}/rest/v1/homepage_equipment?select=*&is_visible=eq.true&order=sort_order.asc`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки данных главной страницы:', error);
    return [];
  }
}

/**
 * Функция для загрузки категорий
 */
async function loadCategories() {
  try {
    const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';
    
    const url = `${SUPABASE_URL}/rest/v1/equipment_categories?select=*&order=name.asc`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
    return [];
  }
}

/**
 * Функция для принудительного обновления данных
 */
export function refreshPreloadedData() {
  globalPreloadedData = {
    equipment: [],
    categories: [],
    homepageEquipment: [],
    isLoading: true,
    error: null
  };
  
  // Очищаем промисы
  Object.keys(loadingPromises).forEach(key => {
    delete loadingPromises[key];
  });
}
