import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  });

  useEffect(() => {
    // Функция для отправки метрик (можно интегрировать с analytics)
    const sendToAnalytics = (metric: { name: string; value: number; delta: number }) => {
      console.log('📊 Performance Metric:', metric);
      
      // Здесь можно интегрировать с Google Analytics, Sentry, etc.
      // gtag('event', metric.name, {
      //   event_category: 'Web Vitals',
      //   value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
      //   non_interaction: true,
      // });
    };

    // Измерение Core Web Vitals
    const measureWebVitals = () => {
      // LCP (Largest Contentful Paint)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.startTime;
          
          setMetrics(prev => ({ ...prev, lcp }));
          sendToAnalytics({ name: 'LCP', value: lcp, delta: lcp });
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP observer not supported');
        }

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            setMetrics(prev => ({ ...prev, fid }));
            sendToAnalytics({ name: 'FID', value: fid, delta: fid });
          });
        });

        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID observer not supported');
        }

        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, cls: clsValue }));
              sendToAnalytics({ name: 'CLS', value: clsValue, delta: entry.value });
            }
          });
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS observer not supported');
        }

        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach((entry: any) => {
            const fcp = entry.startTime;
            setMetrics(prev => ({ ...prev, fcp }));
            sendToAnalytics({ name: 'FCP', value: fcp, delta: fcp });
          });
        });

        try {
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('FCP observer not supported');
        }
      }

      // TTFB (Time to First Byte)
      if (performance.timing) {
        const ttfb = performance.timing.responseStart - performance.timing.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
        sendToAnalytics({ name: 'TTFB', value: ttfb, delta: ttfb });
      }
    };

    // Запускаем измерения после загрузки страницы
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
    }

    return () => {
      window.removeEventListener('load', measureWebVitals);
    };
  }, []);

  return metrics;
};

interface PerformanceMonitorProps {
  showInProduction?: boolean;
}

const PerformanceMonitor = ({ showInProduction = false }: PerformanceMonitorProps) => {
  const metrics = usePerformanceMonitoring();
  const [isVisible, setIsVisible] = useState(false);

  // Показывать только в development или если явно разрешено в production
  const shouldShow = process.env.NODE_ENV === 'development' || showInProduction;

  if (!shouldShow) return null;

  const formatValue = (value: number | null, unit: string = 'ms') => {
    if (value === null) return 'Измеряется...';
    return `${Math.round(value)}${unit}`;
  };

  const getScoreColor = (value: number | null, thresholds: [number, number]) => {
    if (value === null) return 'text-gray-500';
    if (value <= thresholds[0]) return 'text-green-600';
    if (value <= thresholds[1]) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        title="Показать метрики производительности"
      >
        📊 Метрики
      </button>

      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Производительность</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>LCP (до 2.5s):</span>
              <span className={getScoreColor(metrics.lcp, [2500, 4000])}>
                {formatValue(metrics.lcp)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>FID (до 100ms):</span>
              <span className={getScoreColor(metrics.fid, [100, 300])}>
                {formatValue(metrics.fid)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>CLS (до 0.1):</span>
              <span className={getScoreColor(metrics.cls ? metrics.cls * 1000 : null, [100, 250])}>
                {metrics.cls !== null ? metrics.cls.toFixed(3) : 'Измеряется...'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>FCP (до 1.8s):</span>
              <span className={getScoreColor(metrics.fcp, [1800, 3000])}>
                {formatValue(metrics.fcp)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>TTFB (до 600ms):</span>
              <span className={getScoreColor(metrics.ttfb, [600, 1500])}>
                {formatValue(metrics.ttfb)}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Хорошо</span>
              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
              <span>Требует внимания</span>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Плохо</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;