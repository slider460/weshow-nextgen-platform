import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { initPerformanceMonitoring } from './utils/analytics'
import { initErrorReporting } from './utils/errorReporting'
import './index.css'

// Создаем QueryClient с оптимизированными настройками
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      cacheTime: 10 * 60 * 1000, // 10 минут
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
})

// Создаем fallback для всего приложения
const AppFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">WESHOW</h1>
      <p className="text-gray-600 mb-6">Произошла ошибка при загрузке приложения</p>
      <div className="space-y-3">
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          🔄 Перезагрузить
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
        >
          🏠 На главную
        </button>
      </div>
    </div>
  </div>
);

// Безопасная инициализация мониторинга производительности и ошибок
const initMonitoring = () => {
  try {
    // Проверяем, что мы в браузере и DOM готов
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.readyState !== 'loading') {
      // Инициализируем с задержкой для полной загрузки DOM
      setTimeout(() => {
        try {
          initPerformanceMonitoring()
          initErrorReporting()
        } catch (error) {
          console.warn('Failed to initialize monitoring:', error)
        }
      }, 100)
    } else {
      // Ждем готовности DOM
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          try {
            initPerformanceMonitoring()
            initErrorReporting()
          } catch (error) {
            console.warn('Failed to initialize monitoring:', error)
          }
        }, 100)
      })
    }
  } catch (error) {
    console.warn('Monitoring initialization failed:', error)
  }
}

// Инициализируем мониторинг только после полной загрузки
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMonitoring)
  } else {
    initMonitoring()
  }
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={<AppFallback />}>
      <App />
    </ErrorBoundary>
  </QueryClientProvider>
);