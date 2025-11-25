// Система отчетности об ошибках
interface ErrorReport {
  message: string
  stack?: string
  componentStack?: string
  url: string
  timestamp: number
  userAgent: string
  userId?: string
  sessionId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  context?: Record<string, any>
}

// Генерация уникального ID сессии
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Получение или создание session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('error-reporting-session-id')
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem('error-reporting-session-id', sessionId)
  }
  return sessionId
}

// Определение серьезности ошибки
const getErrorSeverity = (error: Error, context?: any): ErrorReport['severity'] => {
  // Критические ошибки
  if (error.message.includes('ChunkLoadError') || 
      error.message.includes('Loading chunk') ||
      error.message.includes('Network Error')) {
    return 'critical'
  }

  // Высокие ошибки
  if (error.message.includes('Supabase') ||
      error.message.includes('Database') ||
      error.message.includes('API')) {
    return 'high'
  }

  // Средние ошибки
  if (error.message.includes('Component') ||
      error.message.includes('Render') ||
      error.message.includes('Hook')) {
    return 'medium'
  }

  // Низкие ошибки
  return 'low'
}

// Создание отчета об ошибке
const createErrorReport = (
  error: Error,
  errorInfo?: any,
  context?: Record<string, any>
): ErrorReport => {
  return {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    sessionId: getSessionId(),
    severity: getErrorSeverity(error, context),
    context: {
      ...context,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      language: navigator.language,
      platform: navigator.platform,
    },
  }
}

// Отправка отчета об ошибке
const sendErrorReport = async (report: ErrorReport): Promise<void> => {
  try {
    // В development режиме выводим в консоль
    if (import.meta.env.DEV) {
      console.group('🚨 Error Report')
      console.error('Message:', report.message)
      console.error('Stack:', report.stack)
      console.error('Severity:', report.severity)
      console.error('Context:', report.context)
      console.groupEnd()
    }

    // В production отправляем в сервис мониторинга
    if (import.meta.env.PROD) {
      // Пример отправки в Sentry, LogRocket, или собственный API
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      }).catch(() => {
        // Fallback: сохраняем в localStorage для последующей отправки
        const pendingErrors = JSON.parse(localStorage.getItem('pending-errors') || '[]')
        pendingErrors.push(report)
        localStorage.setItem('pending-errors', JSON.stringify(pendingErrors.slice(-10))) // Храним только последние 10 ошибок
      })
    }
  } catch (sendError) {
    console.error('Failed to send error report:', sendError)
  }
}

// Основная функция для обработки ошибок
export const reportError = async (
  error: Error,
  errorInfo?: any,
  context?: Record<string, any>
): Promise<void> => {
  const report = createErrorReport(error, errorInfo, context)
  await sendErrorReport(report)
}

// Обработка необработанных ошибок
export const setupGlobalErrorHandling = (): void => {
  // Обработка необработанных ошибок JavaScript
  window.addEventListener('error', (event) => {
    const error = new Error(event.message)
    error.stack = event.error?.stack
    
    reportError(error, undefined, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      type: 'unhandled-error',
    })
  })

  // Обработка необработанных промисов
  window.addEventListener('unhandledrejection', (event) => {
    const error = new Error(`Unhandled Promise Rejection: ${event.reason}`)
    
    reportError(error, undefined, {
      reason: event.reason,
      type: 'unhandled-promise-rejection',
    })
  })

  // Обработка ошибок загрузки ресурсов
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      const error = new Error(`Resource loading error: ${event.target}`)
      
      reportError(error, undefined, {
        target: event.target,
        type: 'resource-loading-error',
      })
    }
  }, true)
}

// React Error Boundary helper
export const createErrorBoundaryHandler = () => {
  return (error: Error, errorInfo: any) => {
    reportError(error, errorInfo, {
      type: 'react-error-boundary',
      componentStack: errorInfo.componentStack,
    })
  }
}

// Performance error tracking
export const trackPerformanceError = (metric: string, value: number, threshold: number) => {
  if (value > threshold) {
    const error = new Error(`Performance threshold exceeded: ${metric}`)
    
    reportError(error, undefined, {
      metric,
      value,
      threshold,
      type: 'performance-error',
    })
  }
}

// API error tracking
export const trackApiError = (endpoint: string, status: number, response?: any) => {
  const error = new Error(`API Error: ${endpoint} returned ${status}`)
  
  reportError(error, undefined, {
    endpoint,
    status,
    response: response?.toString().substring(0, 1000), // Ограничиваем размер ответа
    type: 'api-error',
  })
}

// User feedback collection
export const collectUserFeedback = (feedback: string, rating: number, context?: any) => {
  const error = new Error(`User Feedback: ${feedback}`)
  
  reportError(error, undefined, {
    feedback,
    rating,
    context,
    type: 'user-feedback',
    severity: 'low' as const,
  })
}

// Инициализация системы отчетности об ошибках
export const initErrorReporting = (): void => {
  setupGlobalErrorHandling()
  
  // Отправляем накопленные ошибки при загрузке
  const pendingErrors = JSON.parse(localStorage.getItem('pending-errors') || '[]')
  if (pendingErrors.length > 0) {
    pendingErrors.forEach((report: ErrorReport) => {
      sendErrorReport(report)
    })
    localStorage.removeItem('pending-errors')
  }
}

// Утилиты для разработки
export const errorReportingUtils = {
  // Принудительная отправка всех накопленных ошибок
  flushPendingErrors: () => {
    const pendingErrors = JSON.parse(localStorage.getItem('pending-errors') || '[]')
    pendingErrors.forEach((report: ErrorReport) => {
      sendErrorReport(report)
    })
    localStorage.removeItem('pending-errors')
  },
  
  // Очистка накопленных ошибок
  clearPendingErrors: () => {
    localStorage.removeItem('pending-errors')
  },
  
  // Получение статистики ошибок
  getErrorStats: () => {
    const pendingErrors = JSON.parse(localStorage.getItem('pending-errors') || '[]')
    const stats = pendingErrors.reduce((acc: any, report: ErrorReport) => {
      acc[report.severity] = (acc[report.severity] || 0) + 1
      return acc
    }, {})
    
    return {
      total: pendingErrors.length,
      bySeverity: stats,
      sessionId: getSessionId(),
    }
  },
}
