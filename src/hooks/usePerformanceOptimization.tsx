import React, { 
import React, { 
  memo, 
  useMemo, 
  useCallback, 
  useRef, 
  useEffect, 
  useState,
  forwardRef,
  ComponentType,
  ReactNode
} from 'react';
import { isEqual } from 'lodash-es';

// === УТИЛИТЫ ДЛЯ МЕМОИЗАЦИИ ===

// Глубокое сравнение для React.memo
export const deepEqual = (prevProps: any, nextProps: any): boolean => {
  return isEqual(prevProps, nextProps);
};

// Поверхностное сравнение для оптимизации
export const shallowEqual = (prevProps: any, nextProps: any): boolean => {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  
  for (const key of prevKeys) {
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  
  return true;
};

// Сравнение только указанных свойств
export const createPropsComparer = (keys: string[]) => {
  return (prevProps: any, nextProps: any): boolean => {
    for (const key of keys) {
      if (prevProps[key] !== nextProps[key]) {
        return false;
      }
    }
    return true;
  };
};

// === ОПТИМИЗИРОВАННЫЕ ХУКИ ===

// Стабильный useCallback с зависимостями
export function useStableCallback<T extends any[], R>(
  callback: (...args: T) => R,
  deps: React.DependencyList
): (...args: T) => R {
  const callbackRef = useRef(callback);
  const depsRef = useRef(deps);
  
  // Обновляем callback только если зависимости изменились
  if (!isEqual(depsRef.current, deps)) {
    callbackRef.current = callback;
    depsRef.current = deps;
  }
  
  return useCallback((...args: T) => callbackRef.current(...args), []);
}

// Мемоизированное значение с глубоким сравнением
export function useDeepMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  const depsRef = useRef(deps);
  const valueRef = useRef<T>();
  
  if (!isEqual(depsRef.current, deps) || valueRef.current === undefined) {
    valueRef.current = factory();
    depsRef.current = deps;
  }
  
  return valueRef.current;
}

// Дебаунс для частых обновлений
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// Троттлинг для частых вызовов
export function useThrottledCallback<T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: T) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRun.current = Date.now();
      }, delay - (Date.now() - lastRun.current));
    }
  }, [callback, delay]);
}

// === ОПТИМИЗИРОВАННЫЕ КОМПОНЕНТЫ ===

// HOC для оптимизации компонентов
export function withPerformanceOptimization<P extends object>(
  Component: ComponentType<P>,
  compareProps?: (prevProps: P, nextProps: P) => boolean
) {
  const OptimizedComponent = memo(Component, compareProps || shallowEqual);
  OptimizedComponent.displayName = `Optimized(${Component.displayName || Component.name})`;
  return OptimizedComponent;
}

// Оптимизированный список
interface OptimizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  className?: string;
  itemClassName?: string;
}

function OptimizedListComponent<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  itemClassName
}: OptimizedListProps<T>) {
  const memoizedItems = useMemo(() => {
    return items.map((item, index) => ({
      key: keyExtractor(item, index),
      element: renderItem(item, index),
      index
    }));
  }, [items, renderItem, keyExtractor]);
  
  return (
    <div className={className}>
      {memoizedItems.map(({ key, element }) => (
        <div key={key} className={itemClassName}>
          {element}
        </div>
      ))}
    </div>
  );
}

export const OptimizedList = memo(OptimizedListComponent) as <T>(
  props: OptimizedListProps<T>
) => JSX.Element;

// Оптимизированная форма
interface OptimizedFormProps {
  children: ReactNode;
  onSubmit: (data: Record<string, any>) => void;
  className?: string;
  debounceMs?: number;
}

export const OptimizedForm = memo<OptimizedFormProps>(({ 
  children, 
  onSubmit, 
  className,
  debounceMs = 300
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const debouncedFormData = useDebouncedValue(formData, debounceMs);
  
  const handleSubmit = useStableCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(debouncedFormData);
  }, [onSubmit, debouncedFormData]);
  
  const handleChange = useStableCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  return (
    <form onSubmit={handleSubmit} className={className}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.props.name) {
          return React.cloneElement(child, {
            ...child.props,
            onChange: (e: any) => {
              const value = e.target ? e.target.value : e;
              handleChange(child.props.name, value);
              child.props.onChange?.(e);
            }
          });
        }
        return child;
      })}
    </form>
  );
});

// === МОНИТОРИНГ ПРОИЗВОДИТЕЛЬНОСТИ ===

interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  avgRenderTime: number;
  totalRenderTime: number;
}

// HOC для мониторинга производительности
export function withPerformanceMonitoring<P extends object>(
  Component: ComponentType<P>,
  componentName?: string
) {
  const MonitoredComponent: React.FC<P> = (props) => {
    const metricsRef = useRef<PerformanceMetrics>({
      renderCount: 0,
      lastRenderTime: 0,
      avgRenderTime: 0,
      totalRenderTime: 0
    });
    
    const renderStartTime = useRef(performance.now());
    
    useEffect(() => {
      const renderEndTime = performance.now();
      const renderTime = renderEndTime - renderStartTime.current;
      
      const metrics = metricsRef.current;
      metrics.renderCount++;
      metrics.lastRenderTime = renderTime;
      metrics.totalRenderTime += renderTime;
      metrics.avgRenderTime = metrics.totalRenderTime / metrics.renderCount;
      
      // Логируем медленные рендеры
      if (renderTime > 16) { // 16ms = 60fps
        console.warn(
          `Slow render detected in ${componentName || Component.displayName || Component.name}:`,
          `${renderTime.toFixed(2)}ms`
        );
      }
      
      // Логируем статистику каждые 10 рендеров
      if (metrics.renderCount % 10 === 0) {
        console.log(
          `Performance stats for ${componentName || Component.displayName || Component.name}:`,
          {
            renders: metrics.renderCount,
            avgTime: `${metrics.avgRenderTime.toFixed(2)}ms`,
            lastTime: `${metrics.lastRenderTime.toFixed(2)}ms`
          }
        );
      }
    });
    
    renderStartTime.current = performance.now();
    return <Component {...props} />;
  };
  
  MonitoredComponent.displayName = `Monitored(${componentName || Component.displayName || Component.name})`;
  return MonitoredComponent;
}

// Хук для мониторинга производительности
export function usePerformanceMonitor(componentName: string) {
  const metricsRef = useRef<PerformanceMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    avgRenderTime: 0,
    totalRenderTime: 0
  });
  
  const renderStartTime = useRef(performance.now());
  
  useEffect(() => {
    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;
    
    const metrics = metricsRef.current;
    metrics.renderCount++;
    metrics.lastRenderTime = renderTime;
    metrics.totalRenderTime += renderTime;
    metrics.avgRenderTime = metrics.totalRenderTime / metrics.renderCount;
    
    if (renderTime > 16) {
      console.warn(`Slow render in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }
  });
  
  renderStartTime.current = performance.now();
  
  return metricsRef.current;
}

// === ОПТИМИЗАЦИЯ КОНТЕКСТА ===

// Разделение контекста для избежания ненужных ререндеров
export function createOptimizedContext<T>() {
  const Context = React.createContext<T | undefined>(undefined);
  
  const Provider: React.FC<{ value: T; children: ReactNode }> = memo(({ value, children }) => {
    const memoizedValue = useDeepMemo(() => value, [value]);
    return <Context.Provider value={memoizedValue}>{children}</Context.Provider>;
  });
  
  const useContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error('useContext must be used within a Provider');
    }
    return context;
  };
  
  return { Provider, useContext };
}

// === ВИРТУАЛИЗАЦИЯ ДЛЯ БОЛЬШИХ СПИСКОВ ===

interface VirtualizedGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth: number;
  itemHeight: number;
  containerWidth: number;
  containerHeight: number;
  overscan?: number;
  className?: string;
}

export function VirtualizedGrid<T>({
  items,
  renderItem,
  itemWidth,
  itemHeight,
  containerWidth,
  containerHeight,
  overscan = 5,
  className
}: VirtualizedGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const itemsPerRow = Math.floor(containerWidth / itemWidth);
  const totalRows = Math.ceil(items.length / itemsPerRow);
  
  const visibleRowStart = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleRowEnd = Math.min(
    totalRows - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  
  const visibleItems = useMemo(() => {
    const result = [];
    for (let row = visibleRowStart; row <= visibleRowEnd; row++) {
      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col;
        if (index < items.length) {
          result.push({
            item: items[index],
            index,
            x: col * itemWidth,
            y: row * itemHeight
          });
        }
      }
    }
    return result;
  }, [items, visibleRowStart, visibleRowEnd, itemsPerRow, itemWidth, itemHeight]);
  
  const handleScroll = useThrottledCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
    setScrollLeft(e.currentTarget.scrollLeft);
  }, 16); // 60fps
  
  return (
    <div
      className={className}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'auto'
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          position: 'relative',
          width: itemsPerRow * itemWidth,
          height: totalRows * itemHeight
        }}
      >
        {visibleItems.map(({ item, index, x, y }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: itemWidth,
              height: itemHeight
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

// === BATCH ОБНОВЛЕНИЯ ===

// Группировка обновлений состояния
export function useBatchedUpdates() {
  const [updates, setUpdates] = useState<Array<() => void>>([]);
  
  const scheduleUpdate = useCallback((updateFn: () => void) => {
    setUpdates(prev => [...prev, updateFn]);
  }, []);
  
  const flushUpdates = useCallback(() => {
    React.unstable_batchedUpdates(() => {
      updates.forEach(update => update());
    });
    setUpdates([]);
  }, [updates]);
  
  // Автоматический flush при изменении updates
  useEffect(() => {
    if (updates.length > 0) {
      const timeoutId = setTimeout(flushUpdates, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [updates, flushUpdates]);
  
  return { scheduleUpdate, flushUpdates };
}

export default {
  deepEqual,
  shallowEqual,
  createPropsComparer,
  useStableCallback,
  useDeepMemo,
  useDebouncedValue,
  useThrottledCallback,
  withPerformanceOptimization,
  withPerformanceMonitoring,
  usePerformanceMonitor,
  OptimizedList,
  OptimizedForm,
  createOptimizedContext,
  VirtualizedGrid,
  useBatchedUpdates
};