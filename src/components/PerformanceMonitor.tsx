import React, { useState, useEffect } from 'react';
import { usePreloadedData } from '../hooks/usePreloader';
import { useOptimizedCache } from '../hooks/useOptimizedCache';

interface PerformanceStats {
  loadTime: number;
  cacheHits: number;
  cacheMisses: number;
  dataSize: number;
  memoryUsage: number;
}

/**
 * Компонент для мониторинга производительности
 * Показывает статистику загрузки и кэширования
 */
export const PerformanceMonitor: React.FC = () => {
  const [stats, setStats] = useState<PerformanceStats>({
    loadTime: 0,
    cacheHits: 0,
    cacheMisses: 0,
    dataSize: 0,
    memoryUsage: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const { equipment, categories, homepageEquipment } = usePreloadedData();
  const cache = useOptimizedCache();

  useEffect(() => {
    // Вычисляем размер данных
    const dataSize = JSON.stringify({
      equipment,
      categories,
      homepageEquipment
    }).length;

    // Получаем статистику кэша
    const cacheStats = cache.getStats();

    setStats({
      loadTime: performance.now(),
      cacheHits: cacheStats.size,
      cacheMisses: 0, // Упрощенная версия
      dataSize,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
    });
  }, [equipment, categories, homepageEquipment, cache]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Показать статистику производительности"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">Производительность</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Время загрузки:</span>
          <span className="font-mono">{stats.loadTime.toFixed(0)}ms</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Размер данных:</span>
          <span className="font-mono">{(stats.dataSize / 1024).toFixed(1)}KB</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Записей в кэше:</span>
          <span className="font-mono">{stats.cacheHits}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Оборудование:</span>
          <span className="font-mono">{equipment.length}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Категории:</span>
          <span className="font-mono">{categories.length}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Главная страница:</span>
          <span className="font-mono">{homepageEquipment.length}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          💡 Данные предзагружены и кэшированы
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;