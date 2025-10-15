# Quickstart: Исправление критических проблем weshow.su

**Date**: 2025-10-15  
**Feature**: 001-weshow-su  
**Status**: Implementation Guide

## Быстрый старт

### 1. Установка зависимостей
```bash
# Добавить React Query для кэширования
npm install @tanstack/react-query @tanstack/react-query-devtools

# Добавить утилиты для оптимизации
npm install react-error-boundary react-intersection-observer
```

### 2. Настройка React Query
```typescript
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Ваши маршруты */}
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 3. Оптимизация Supabase клиента
```typescript
// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'x-application-name': 'weshow-platform',
    },
  },
})
```

### 4. Создание хуков для данных
```typescript
// src/hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../services/supabase'

const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('id, title, description, image_url, created_at')
    .order('created_at', { ascending: false })
    .limit(12)
  
  if (error) throw error
  return data
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  })
}
```

### 5. Добавление Error Boundary
```typescript
// src/components/ErrorBoundary.tsx
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback">
      <h2>Что-то пошло не так</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>
        Попробовать снова
      </button>
    </div>
  )
}

export function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

### 6. Создание Loading компонентов
```typescript
// src/components/LoadingStates.tsx
export function ProjectSkeleton() {
  return (
    <div className="project-skeleton">
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-title" />
        <div className="skeleton-description" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="page-skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
```

### 7. Обновление компонентов
```typescript
// src/components/Portfolio.tsx
import { useProjects } from '../hooks/useProjects'
import { ProjectSkeleton } from './LoadingStates'
import { ErrorFallback } from './ErrorBoundary'

export function Portfolio() {
  const { data: projects, isLoading, error } = useProjects()

  if (isLoading) {
    return (
      <div className="portfolio-loading">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />
  }

  return (
    <div className="portfolio">
      {projects?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

## Пошаговая реализация

### Шаг 1: Критические исправления (День 1-2)

1. **Настройка React Query**
   ```bash
   # Установить зависимости
   npm install @tanstack/react-query
   
   # Обновить main.tsx
   # Добавить QueryClient и QueryClientProvider
   ```

2. **Оптимизация Supabase**
   ```typescript
   // Обновить конфигурацию клиента
   // Добавить таймауты и retry логику
   ```

3. **Добавление Loading состояний**
   ```typescript
   // Создать skeleton компоненты
   // Добавить в существующие компоненты
   ```

### Шаг 2: Оптимизация производительности (День 3-5)

1. **Внедрение кэширования**
   ```typescript
   // Создать хуки для данных
   // Настроить cache времена
   ```

2. **Исправление навигации**
   ```typescript
   // Обновить vercel.json
   // Исправить ссылки в компонентах
   ```

3. **Добавление Error Boundaries**
   ```typescript
   // Обновить компоненты
   // Добавить fallback UI
   ```

### Шаг 3: Мониторинг и тестирование (День 6-7)

1. **Настройка мониторинга**
   ```typescript
   // Добавить Web Vitals tracking
   // Настроить error reporting
   ```

2. **Тестирование**
   ```bash
   # Запустить E2E тесты
   # Проверить производительность
   ```

## Проверка результатов

### Метрики производительности
```bash
# Проверить Core Web Vitals
npm run build
npm run preview

# Открыть Chrome DevTools
# Перейти в Lighthouse
# Запустить аудит производительности
```

### Проверка функциональности
```bash
# Локальное тестирование
npm run dev

# Проверить:
# - Время загрузки главной страницы
# - Работоспособность всех ссылок
# - Загрузку данных из БД
# - Обработку ошибок
```

### Production тестирование
```bash
# Деплой на staging
npm run build
vercel --prod

# Проверить:
# - Производительность на реальном сервере
# - Работу с реальными данными
# - Обработку ошибок в production
```

## Troubleshooting

### Проблема: Данные не загружаются
```typescript
// Проверить конфигурацию Supabase
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)

// Проверить сетевые запросы в DevTools
// Убедиться, что RLS политики настроены
```

### Проблема: Медленная загрузка
```typescript
// Проверить cache hit rate
console.log('Query Client:', queryClient.getQueryCache())

// Оптимизировать запросы
// Добавить индексы в БД
```

### Проблема: Ошибки навигации
```typescript
// Проверить vercel.json
// Убедиться, что rewrites настроены правильно
// Проверить React Router конфигурацию
```

## Дополнительные ресурсы

- [React Query Documentation](https://tanstack.com/query/latest)
- [Supabase Performance Guide](https://supabase.com/docs/guides/performance)
- [Web Vitals Optimization](https://web.dev/vitals/)
- [Error Boundary Best Practices](https://reactjs.org/docs/error-boundaries.html)
