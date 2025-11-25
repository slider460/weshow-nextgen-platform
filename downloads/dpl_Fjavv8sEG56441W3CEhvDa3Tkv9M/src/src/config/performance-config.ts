// Конфигурация системы мониторинга производительности
import { performanceMonitor } from '../utils/performance-monitor';
import { supabase } from './supabase';

/**
 * Настройка endpoint для отправки метрик производительности
 */
export const setupPerformanceMonitoring = () => {
  const isProduction = import.meta.env.PROD;
  
  // В production отправляем метрики в Supabase
  if (isProduction) {
    setupSupabaseEndpoint();
  }

  // Запускаем мониторинг Web Vitals
  performanceMonitor.observeWebVitals();
  performanceMonitor.monitorLongTasks();
  performanceMonitor.monitorResourceTiming();

  console.log('🚀 Performance monitoring initialized');
};

/**
 * Настройка отправки метрик в Supabase
 */
const setupSupabaseEndpoint = () => {
  // Создаём custom endpoint для отправки в Supabase
  const customEndpoint = async (metric: any) => {
    try {
      await supabase.from('performance_metrics').insert({
        metric_name: metric.name,
        metric_value: metric.value,
        rating: metric.rating,
        url: metric.url,
        timestamp: new Date(metric.timestamp).toISOString(),
        user_agent: navigator.userAgent,
        connection_type: (navigator as any).connection?.effectiveType || 'unknown',
        device_memory: (navigator as any).deviceMemory || null,
      });
    } catch (error) {
      console.error('Failed to send metric to Supabase:', error);
    }
  };

  // Можно установить endpoint если нужно
  // performanceMonitor.setEndpoint('https://your-api.com/metrics');
};

/**
 * SQL для создания таблицы performance_metrics в Supabase:
 * 
 * CREATE TABLE IF NOT EXISTS performance_metrics (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   metric_name TEXT NOT NULL,
 *   metric_value NUMERIC NOT NULL,
 *   rating TEXT CHECK (rating IN ('good', 'needs-improvement', 'poor')),
 *   url TEXT NOT NULL,
 *   timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   user_agent TEXT,
 *   connection_type TEXT,
 *   device_memory INTEGER,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- Индекс для быстрых запросов
 * CREATE INDEX idx_performance_metrics_name ON performance_metrics(metric_name);
 * CREATE INDEX idx_performance_metrics_timestamp ON performance_metrics(timestamp DESC);
 * CREATE INDEX idx_performance_metrics_rating ON performance_metrics(rating);
 * 
 * -- RLS политики (опционально)
 * ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
 * 
 * -- Разрешаем вставку для всех (анонимных пользователей)
 * CREATE POLICY "Allow anonymous insert" ON performance_metrics
 *   FOR INSERT TO anon
 *   WITH CHECK (true);
 * 
 * -- Чтение только для авторизованных
 * CREATE POLICY "Allow authenticated read" ON performance_metrics
 *   FOR SELECT TO authenticated
 *   USING (true);
 */

/**
 * Хелпер для получения статистики производительности
 */
export const getPerformanceStats = () => {
  return performanceMonitor.getStats();
};

/**
 * Хелпер для экспорта метрик в JSON
 */
export const exportMetrics = () => {
  const metrics = performanceMonitor.getMetrics();
  const blob = new Blob([JSON.stringify(metrics, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `performance-metrics-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Dashboard query для анализа метрик в Supabase
 */
export const PERFORMANCE_QUERIES = {
  // Средние значения за последние 24 часа
  dailyAverages: `
    SELECT 
      metric_name,
      AVG(metric_value) as avg_value,
      MIN(metric_value) as min_value,
      MAX(metric_value) as max_value,
      COUNT(*) as count,
      COUNT(CASE WHEN rating = 'good' THEN 1 END) as good_count,
      COUNT(CASE WHEN rating = 'needs-improvement' THEN 1 END) as needs_improvement_count,
      COUNT(CASE WHEN rating = 'poor' THEN 1 END) as poor_count
    FROM performance_metrics
    WHERE timestamp > NOW() - INTERVAL '24 hours'
    GROUP BY metric_name
    ORDER BY metric_name;
  `,

  // Тренд производительности по часам
  hourlyTrend: `
    SELECT 
      DATE_TRUNC('hour', timestamp) as hour,
      metric_name,
      AVG(metric_value) as avg_value
    FROM performance_metrics
    WHERE timestamp > NOW() - INTERVAL '7 days'
    GROUP BY hour, metric_name
    ORDER BY hour DESC, metric_name;
  `,

  // Самые медленные страницы
  slowestPages: `
    SELECT 
      url,
      metric_name,
      AVG(metric_value) as avg_value,
      COUNT(*) as count
    FROM performance_metrics
    WHERE metric_name IN ('LCP', 'TTFB')
      AND timestamp > NOW() - INTERVAL '24 hours'
    GROUP BY url, metric_name
    HAVING AVG(metric_value) > 1000
    ORDER BY avg_value DESC
    LIMIT 10;
  `,

  // Распределение рейтингов
  ratingDistribution: `
    SELECT 
      metric_name,
      rating,
      COUNT(*) as count,
      ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY metric_name), 2) as percentage
    FROM performance_metrics
    WHERE timestamp > NOW() - INTERVAL '24 hours'
    GROUP BY metric_name, rating
    ORDER BY metric_name, rating;
  `,
};


