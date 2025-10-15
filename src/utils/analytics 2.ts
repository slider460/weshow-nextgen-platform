// Система мониторинга производительности и аналитики
interface WebVitalsMetric {
  name: string
  value: number
  delta: number
  id: string
  navigationType: string
}

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  url: string
  userAgent: string
}

// Web Vitals tracking
export const trackWebVitals = (metric: WebVitalsMetric) => {
  // Отправляем метрики в консоль для разработки
  console.log(`[Web Vitals] ${metric.name}:`, {
    value: metric.value,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  })

  // В production можно отправлять в аналитический сервис
  if (import.meta.env.PROD) {
    // Пример отправки в Google Analytics
    // gtag('event', metric.name, {
    //   event_category: 'Web Vitals',
    //   value: Math.round(metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // })

    // Или в собственный аналитический сервис
    sendToAnalytics({
      type: 'web-vitals',
      metric: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
      url: window.location.href,
      timestamp: Date.now(),
    })
  }
}

// Отправка данных в аналитику
const sendToAnalytics = (data: any) => {
  // В реальном проекте здесь будет отправка в аналитический сервис
  console.log('[Analytics]', data)
  
  // Пример отправки в собственный API
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // }).catch(console.error)
}

// Performance monitoring
export const trackPerformance = (name: string, value: number) => {
  const metric: PerformanceMetric = {
    name,
    value,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  }

  console.log(`[Performance] ${name}:`, value)

  if (import.meta.env.PROD) {
    sendToAnalytics({
      type: 'performance',
      ...metric,
    })
  }
}

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  const errorData = {
    type: 'error',
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
  }

  console.error('[Error Tracking]', errorData)

  if (import.meta.env.PROD) {
    sendToAnalytics(errorData)
  }
}

// User interaction tracking
export const trackUserInteraction = (action: string, target: string, value?: any) => {
  const interactionData = {
    type: 'interaction',
    action,
    target,
    value,
    url: window.location.href,
    timestamp: Date.now(),
  }

  console.log('[User Interaction]', interactionData)

  if (import.meta.env.PROD) {
    sendToAnalytics(interactionData)
  }
}

// Page load tracking
export const trackPageLoad = (pageName: string, loadTime: number) => {
  trackPerformance(`page-load-${pageName}`, loadTime)
}

// API request tracking
export const trackApiRequest = (endpoint: string, duration: number, status: number) => {
  trackPerformance(`api-request-${endpoint}`, duration)
  
  if (status >= 400) {
    trackError(new Error(`API Error: ${endpoint} returned ${status}`))
  }
}

// Cache performance tracking
export const trackCachePerformance = (cacheType: string, hitRate: number, size: number) => {
  trackPerformance(`cache-${cacheType}-hit-rate`, hitRate)
  trackPerformance(`cache-${cacheType}-size`, size)
}

// Bundle size tracking
export const trackBundleSize = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      trackPerformance('dom-content-loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)
      trackPerformance('load-complete', navigation.loadEventEnd - navigation.loadEventStart)
      trackPerformance('first-byte', navigation.responseStart - navigation.requestStart)
    }
  }
}

// Memory usage tracking
export const trackMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory
    trackPerformance('memory-used', memory.usedJSHeapSize)
    trackPerformance('memory-total', memory.totalJSHeapSize)
    trackPerformance('memory-limit', memory.jsHeapSizeLimit)
  }
}

// Network performance tracking
export const trackNetworkPerformance = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    trackPerformance('connection-type', connection.effectiveType === '4g' ? 4 : 3)
    trackPerformance('connection-downlink', connection.downlink)
    trackPerformance('connection-rtt', connection.rtt)
  }
}

// Инициализация мониторинга
export const initPerformanceMonitoring = () => {
  // Web Vitals
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(trackWebVitals)
      getFID(trackWebVitals)
      getFCP(trackWebVitals)
      getLCP(trackWebVitals)
      getTTFB(trackWebVitals)
    }).catch(() => {
      // Web Vitals не установлен, используем fallback
      console.log('Web Vitals not available, using fallback monitoring')
    })

    // Bundle size tracking
    trackBundleSize()

    // Memory usage tracking
    trackMemoryUsage()

    // Network performance tracking
    trackNetworkPerformance()

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        trackUserInteraction('page-visible', 'document')
      } else {
        trackUserInteraction('page-hidden', 'document')
      }
    })

    // Track unload events
    window.addEventListener('beforeunload', () => {
      trackUserInteraction('page-unload', 'window')
    })
  }
}
