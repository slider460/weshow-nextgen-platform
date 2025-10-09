// Система мониторинга производительности для production
// Собирает Core Web Vitals и отправляет аналитику

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  url: string;
}

interface WebVitalsThresholds {
  LCP: { good: number; poor: number };
  FID: { good: number; poor: number };
  CLS: { good: number; poor: number };
  INP: { good: number; poor: number };
  TTFB: { good: number; poor: number };
  FCP: { good: number; poor: number };
}

// Пороговые значения согласно Web Vitals
const THRESHOLDS: WebVitalsThresholds = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 },
  TTFB: { good: 800, poor: 1800 },
  FCP: { good: 1800, poor: 3000 },
};

class PerformanceMonitorService {
  private metrics: PerformanceMetric[] = [];
  private isProduction: boolean;
  private endpoint: string | null = null;

  constructor() {
    this.isProduction = import.meta.env.PROD;
  }

  /**
   * Настройка endpoint для отправки метрик
   */
  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Определяет рейтинг метрики
   */
  private getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = THRESHOLDS[name as keyof WebVitalsThresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Записывает метрику
   */
  recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: this.getRating(name, value),
      timestamp: Date.now(),
      url: window.location.href,
    };

    this.metrics.push(metric);

    // Логируем в консоль в dev режиме
    if (!this.isProduction) {
      console.log(`📊 Performance Metric [${metric.rating}]:`, {
        metric: name,
        value: `${value.toFixed(2)}ms`,
        rating: metric.rating,
        url: metric.url,
      });
    }

    // Отправляем в аналитику
    this.sendToAnalytics(metric);
  }

  /**
   * Собирает Core Web Vitals используя Performance Observer API
   */
  observeWebVitals() {
    // LCP (Largest Contentful Paint)
    this.observeLCP();

    // FID (First Input Delay) - deprecated, используем INP
    this.observeINP();

    // CLS (Cumulative Layout Shift)
    this.observeCLS();

    // TTFB (Time to First Byte)
    this.observeTTFB();

    // FCP (First Contentful Paint)
    this.observeFCP();
  }

  private observeLCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          this.recordMetric('LCP', lastEntry.renderTime || lastEntry.loadTime);
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP observation not supported');
    }
  }

  private observeINP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const interactionEntry = entry as any;
          if (interactionEntry.duration) {
            this.recordMetric('INP', interactionEntry.duration);
          }
        }
      });

      observer.observe({ type: 'event', buffered: true, durationThreshold: 16 });
    } catch (e) {
      // INP может не поддерживаться во всех браузерах
      console.warn('INP observation not supported');
    }
  }

  private observeCLS() {
    if (!('PerformanceObserver' in window)) return;

    try {
      let clsValue = 0;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as any;
          // Считаем только неожиданные сдвиги (без user input)
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
            this.recordMetric('CLS', clsValue);
          }
        }
      });

      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS observation not supported');
    }
  }

  private observeTTFB() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.responseStart > 0) {
            const ttfb = entry.responseStart - entry.requestStart;
            this.recordMetric('TTFB', ttfb);
          }
        });
      });

      observer.observe({ type: 'navigation', buffered: true });
    } catch (e) {
      console.warn('TTFB observation not supported');
    }
  }

  private observeFCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('FCP', entry.startTime);
          }
        });
      });

      observer.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('FCP observation not supported');
    }
  }

  /**
   * Отправляет метрики в аналитику
   */
  private sendToAnalytics(metric: PerformanceMetric) {
    // Отправляем только в production
    if (!this.isProduction) return;

    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.url,
        value: Math.round(metric.value),
        metric_rating: metric.rating,
        non_interaction: true,
      });
    }

    // Пользовательский endpoint (если настроен)
    if (this.endpoint) {
      this.sendToCustomEndpoint(metric);
    }

    // Sentry Performance Monitoring (если подключён)
    if (typeof Sentry !== 'undefined' && Sentry.metrics) {
      Sentry.metrics.distribution(metric.name, metric.value, {
        tags: {
          rating: metric.rating,
          url: metric.url,
        },
        unit: 'millisecond',
      });
    }
  }

  /**
   * Отправка на кастомный endpoint
   */
  private async sendToCustomEndpoint(metric: PerformanceMetric) {
    try {
      await fetch(this.endpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
        // Используем keepalive для отправки даже при закрытии страницы
        keepalive: true,
      });
    } catch (error) {
      console.error('Failed to send performance metric:', error);
    }
  }

  /**
   * Получить все собранные метрики
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Получить метрики по имени
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name);
  }

  /**
   * Получить последнюю метрику
   */
  getLastMetric(name: string): PerformanceMetric | undefined {
    const metrics = this.getMetricsByName(name);
    return metrics[metrics.length - 1];
  }

  /**
   * Получить статистику по метрикам
   */
  getStats() {
    const stats: Record<string, { avg: number; min: number; max: number; count: number }> = {};

    this.metrics.forEach((metric) => {
      if (!stats[metric.name]) {
        stats[metric.name] = {
          avg: 0,
          min: Infinity,
          max: -Infinity,
          count: 0,
        };
      }

      const stat = stats[metric.name];
      stat.count++;
      stat.min = Math.min(stat.min, metric.value);
      stat.max = Math.max(stat.max, metric.value);
      stat.avg = (stat.avg * (stat.count - 1) + metric.value) / stat.count;
    });

    return stats;
  }

  /**
   * Мониторинг long tasks (задачи > 50ms)
   */
  monitorLongTasks() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const taskEntry = entry as any;
          if (taskEntry.duration > 50) {
            console.warn(`⚠️ Long Task detected: ${taskEntry.duration.toFixed(2)}ms`, {
              name: taskEntry.name,
              startTime: taskEntry.startTime,
              duration: taskEntry.duration,
            });

            // Отправляем как custom метрику
            this.recordMetric('LongTask', taskEntry.duration);
          }
        }
      });

      observer.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      console.warn('Long task monitoring not supported');
    }
  }

  /**
   * Мониторинг времени загрузки ресурсов
   */
  monitorResourceTiming() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          
          // Логируем медленные ресурсы (> 1 сек)
          if (resource.duration > 1000) {
            console.warn(`⚠️ Slow Resource: ${resource.name}`, {
              duration: `${resource.duration.toFixed(2)}ms`,
              size: resource.transferSize,
              type: resource.initiatorType,
            });
          }
        }
      });

      observer.observe({ type: 'resource', buffered: true });
    } catch (e) {
      console.warn('Resource timing monitoring not supported');
    }
  }

  /**
   * Логирование производительности страницы
   */
  logPagePerformance() {
    if (!this.isProduction) {
      console.log('📊 Performance Stats:', this.getStats());
    }
  }

  /**
   * Очистка старых метрик (оставляем последние 100)
   */
  cleanupMetrics() {
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitorService();

// Хелпер для использования в React компонентах
export const usePerformanceMonitoring = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    // Инициализируем мониторинг
    performanceMonitor.observeWebVitals();
    performanceMonitor.monitorLongTasks();
    performanceMonitor.monitorResourceTiming();

    // Логируем статистику при размонтировании
    return () => {
      performanceMonitor.logPagePerformance();
      performanceMonitor.cleanupMetrics();
    };
  }, [enabled]);

  return performanceMonitor;
};

// Функция для ручной записи кастомных метрик
export const recordCustomMetric = (name: string, value: number) => {
  performanceMonitor.recordMetric(name, value);
};

// Хелпер для измерения производительности функций
export const measurePerformance = async <T>(
  name: string,
  fn: () => T | Promise<T>
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    performanceMonitor.recordMetric(name, duration);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    performanceMonitor.recordMetric(`${name}_error`, duration);
    throw error;
  }
};

// React
import { useEffect } from 'react';

// Экспорт для глобального использования
if (typeof window !== 'undefined') {
  (window as any).__performanceMonitor = performanceMonitor;
}


