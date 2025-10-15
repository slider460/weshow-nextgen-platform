import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Простой QueryClient без сложных настроек
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Простой fallback компонент
const AppFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">WESHOW</h1>
      <p className="text-gray-600">Загрузка...</p>
    </div>
  </div>
)

// Простая инициализация React приложения
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.Suspense fallback={<AppFallback />}>
      <App />
    </React.Suspense>
  </QueryClientProvider>
)