import { useState, useEffect, useCallback } from 'react';
import { getEquipment } from '../api/equipment';
import { useOptimizedCache } from './useOptimizedCache';
import { 
  getCategoriesOptimized, 
  getEquipmentOptimized,
  preloadCriticalDataOptimized 
} from '../config/optimized-supabase';

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
      console.log('🚀 Начинаем оптимизированную предзагрузку...');
      
      // Добавляем таймаут для предотвращения зависания
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Таймаут загрузки данных (30 секунд)')), 30000);
      });
      
      // Используем оптимизированные методы с кэшированием
      const dataPromise = Promise.all([
        getEquipmentOptimized(), // Оптимизированная загрузка оборудования
        getCategoriesOptimized(), // Оптимизированная загрузка категорий
        loadHomepageEquipment() // Статический метод для главной страницы
      ]);
      
      const [equipment, categories, homepageEquipment] = await Promise.race([
        dataPromise,
        timeoutPromise
      ]) as [any[], any[], any[]];

      // Обновляем глобальные данные
      globalPreloadedData = {
        equipment: equipment || [],
        categories: categories || [],
        homepageEquipment: homepageEquipment || getDefaultHomepageEquipment(),
        isLoading: false,
        error: null
      };

      setData(globalPreloadedData);
      console.log('✅ Оптимизированные данные предзагружены:', {
        equipment: equipment?.length || 0,
        categories: categories?.length || 0,
        homepageEquipment: homepageEquipment?.length || 0
      });

    } catch (error) {
      console.error('❌ Ошибка предзагрузки данных:', error);
      
      // Fallback к старым методам при ошибке
      try {
        console.log('🔄 Пробуем fallback методы...');
        
        // Добавляем таймаут для fallback
        const fallbackTimeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Таймаут fallback загрузки (20 секунд)')), 20000);
        });
        
        const fallbackDataPromise = Promise.all([
          getEquipment(),
          loadHomepageEquipment(),
          loadCategories()
        ]);
        
        const [equipment, homepageEquipment, categories] = await Promise.race([
          fallbackDataPromise,
          fallbackTimeoutPromise
        ]) as [any[], any[], any[]];

        globalPreloadedData = {
          equipment: equipment || [],
          categories: categories || [],
          homepageEquipment: homepageEquipment || getDefaultHomepageEquipment(),
          isLoading: false,
          error: null
        };
        
        setData(globalPreloadedData);
        console.log('✅ Fallback данные загружены');
        
      } catch (fallbackError) {
        console.error('❌ Fallback также не сработал:', fallbackError);
        globalPreloadedData.error = error instanceof Error ? error.message : 'Неизвестная ошибка';
        globalPreloadedData.isLoading = false;
        setData(globalPreloadedData);
      }
    }
  }, []);

  // Автоматическая предзагрузка при монтировании
  useEffect(() => {
    preloadData();
    
    // Принудительное завершение загрузки через 45 секунд
    const forceCompleteTimer = setTimeout(() => {
      if (globalPreloadedData.isLoading) {
        console.warn('⚠️ Принудительное завершение загрузки через 45 секунд');
        globalPreloadedData = {
          equipment: [],
          categories: [],
          homepageEquipment: getDefaultHomepageEquipment(),
          isLoading: false,
          error: null
        };
        setData(globalPreloadedData);
      }
    }, 45000);
    
    return () => clearTimeout(forceCompleteTimer);
  }, [preloadData]);

  return {
    ...data,
    preloadData,
    isReady: !data.isLoading // Убираем требование наличия данных, чтобы сайт не зависал
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
    
    // Добавляем таймаут для fetch запроса
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

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
    
    // Добавляем таймаут для fetch запроса
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

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
 * Функция для получения данных по умолчанию для главной страницы
 */
function getDefaultHomepageEquipment() {
  return [
    {
      id: '1',
      title: 'Проекционное оборудование',
      description: 'Профессиональные проекторы и экраны для мероприятий',
      icon: 'Monitor',
      gradient: 'gradient-card-purple',
      link: '/equipment/projection',
      is_visible: true,
      sort_order: 1
    },
    {
      id: '2',
      title: 'Звуковое оборудование',
      description: 'Микрофоны, колонки и звуковые системы',
      icon: 'Speaker',
      gradient: 'gradient-card-blue',
      link: '/equipment/audio',
      is_visible: true,
      sort_order: 2
    },
    {
      id: '3',
      title: 'Осветительное оборудование',
      description: 'Светодиодные панели, прожекторы и эффекты',
      icon: 'Sun',
      gradient: 'gradient-card-green',
      link: '/equipment/lighting',
      is_visible: true,
      sort_order: 3
    },
    {
      id: '4',
      title: 'Видеооборудование',
      description: 'Камеры, мониторы и системы видеозаписи',
      icon: 'Video',
      gradient: 'gradient-card-orange',
      link: '/equipment/video',
      is_visible: true,
      sort_order: 4
    },
    {
      id: '5',
      title: 'Интерактивные дисплеи',
      description: 'Сенсорные экраны и интерактивные панели',
      icon: 'Monitor',
      gradient: 'gradient-card-cyan',
      link: '/equipment/interactive',
      is_visible: true,
      sort_order: 5
    },
    {
      id: '6',
      title: 'AR/VR оборудование',
      description: 'Очки виртуальной реальности и AR системы',
      icon: 'Eye',
      gradient: 'gradient-card-purple',
      link: '/equipment/ar-vr',
      is_visible: true,
      sort_order: 6
    }
  ];
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
