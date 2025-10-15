# Data Model: Исправление критических проблем weshow.su

**Date**: 2025-10-15  
**Feature**: 001-weshow-su  
**Status**: Phase 1 Design

## Current Data Architecture

### Supabase Database Schema
```sql
-- Existing tables (simplified)
projects (id, title, description, image_url, created_at, updated_at)
services (id, name, description, price, created_at)
testimonials (id, client_name, content, rating, created_at)
blog_posts (id, title, content, author, published_at)
users (id, email, role, created_at)
```

### Current Data Flow Issues
1. **Synchronous Loading**: All data loaded at once on page load
2. **No Caching**: Data refetched on every request
3. **Inefficient Queries**: Loading unnecessary fields
4. **No Error Handling**: No fallback for failed requests

## Optimized Data Architecture

### React Query State Management
```typescript
// Query Keys Structure
export const queryKeys = {
  // Static content (24h cache)
  services: ['services'] as const,
  testimonials: ['testimonials'] as const,
  
  // Dynamic content (1h cache)
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
  blogPosts: ['blog-posts'] as const,
  blogPost: (id: string) => ['blog-posts', id] as const,
  
  // User data (30min cache)
  user: ['user'] as const,
  userProfile: (id: string) => ['user', id] as const,
  
  // Admin data (5min cache)
  adminStats: ['admin', 'stats'] as const,
  adminProjects: ['admin', 'projects'] as const,
}
```

### Cache Configuration
```typescript
// Cache Times
const CACHE_TIMES = {
  STATIC_CONTENT: 24 * 60 * 60 * 1000, // 24 hours
  DYNAMIC_CONTENT: 60 * 60 * 1000,     // 1 hour
  USER_DATA: 30 * 60 * 1000,           // 30 minutes
  ADMIN_DATA: 5 * 60 * 1000,           // 5 minutes
} as const
```

### Optimized Supabase Queries
```typescript
// Projects with optimized selection
const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      description,
      image_url,
      created_at
    `)
    .order('created_at', { ascending: false })
    .limit(12)
  
  if (error) throw error
  return data
}

// Single project with full details
const getProject = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      technologies:project_technologies(
        technology:technologies(name, icon)
      )
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}
```

## Data Loading Strategy

### 1. Initial Page Load
```typescript
// Critical data loaded immediately
const criticalQueries = [
  queryKeys.services,
  queryKeys.testimonials,
  queryKeys.projects,
]

// Preload critical data
useEffect(() => {
  queryClient.prefetchQuery({
    queryKey: queryKeys.services,
    queryFn: getServices,
    staleTime: CACHE_TIMES.STATIC_CONTENT,
  })
}, [])
```

### 2. Background Loading
```typescript
// Non-critical data loaded in background
const backgroundQueries = [
  queryKeys.blogPosts,
  queryKeys.adminStats,
]

// Background prefetching
useEffect(() => {
  // Prefetch after critical data is loaded
  setTimeout(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.blogPosts,
      queryFn: getBlogPosts,
      staleTime: CACHE_TIMES.DYNAMIC_CONTENT,
    })
  }, 2000)
}, [])
```

### 3. Lazy Loading
```typescript
// Data loaded on demand
const LazyLoadedComponents = {
  Portfolio: lazy(() => import('./Portfolio')),
  Blog: lazy(() => import('./Blog')),
  AdminPanel: lazy(() => import('./AdminPanel')),
}
```

## Error Handling & Fallback Data

### Fallback Data Structure
```typescript
// Fallback data for offline/error scenarios
const FALLBACK_DATA = {
  projects: [
    {
      id: 'fallback-1',
      title: 'Проект временно недоступен',
      description: 'Данные загружаются...',
      image_url: '/images/placeholder.jpg',
      created_at: new Date().toISOString(),
    }
  ],
  services: [
    {
      id: 'fallback-service',
      name: 'Услуги временно недоступны',
      description: 'Информация об услугах загружается...',
      price: null,
    }
  ],
  testimonials: [
    {
      id: 'fallback-testimonial',
      client_name: 'Отзывы загружаются...',
      content: 'Пожалуйста, подождите',
      rating: 5,
    }
  ]
}
```

### Error Boundary Data
```typescript
// Error boundary with fallback data
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-fallback">
      <h2>Что-то пошло не так</h2>
      <p>Попробуйте обновить страницу</p>
      <button onClick={resetErrorBoundary}>
        Попробовать снова
      </button>
    </div>
  )
}
```

## Performance Optimizations

### 1. Query Optimization
```typescript
// Optimized query with proper indexing
const getProjectsWithPagination = async (page = 0, limit = 12) => {
  const { data, error, count } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      description,
      image_url,
      created_at
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1)
  
  if (error) throw error
  return { data, count, hasMore: count > (page + 1) * limit }
}
```

### 2. Image Optimization
```typescript
// Optimized image loading
const OptimizedImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  return (
    <div className="image-container">
      {!isLoaded && <SkeletonImage />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
        loading="lazy"
        {...props}
      />
      {hasError && <FallbackImage />}
    </div>
  )
}
```

### 3. Bundle Optimization
```typescript
// Code splitting for routes
const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/portfolio',
    element: (
      <Suspense fallback={<PortfolioSkeleton />}>
        <LazyLoadedComponents.Portfolio />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<AdminSkeleton />}>
        <LazyLoadedComponents.AdminPanel />
      </Suspense>
    ),
  },
]
```

## Monitoring & Analytics

### Performance Metrics
```typescript
// Web Vitals tracking
const trackWebVitals = (metric) => {
  // Send to analytics service
  analytics.track('web_vitals', {
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    id: metric.id,
  })
}

// Error tracking
const trackError = (error, errorInfo) => {
  analytics.track('error', {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
  })
}
```

### Cache Performance
```typescript
// Cache hit rate monitoring
const cacheStats = {
  hits: 0,
  misses: 0,
  hitRate: () => cacheStats.hits / (cacheStats.hits + cacheStats.misses),
}

// Query performance monitoring
const trackQueryPerformance = (queryKey, duration) => {
  analytics.track('query_performance', {
    queryKey: queryKey.join('.'),
    duration,
    timestamp: Date.now(),
  })
}
```

## Data Validation

### Schema Validation
```typescript
// Zod schemas for data validation
const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  image_url: z.string().url(),
  created_at: z.string().datetime(),
})

const ServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive().nullable(),
})
```

### Runtime Validation
```typescript
// Validate data before caching
const validateAndCache = async (queryKey, data) => {
  try {
    const validatedData = ProjectSchema.parse(data)
    queryClient.setQueryData(queryKey, validatedData)
    return validatedData
  } catch (error) {
    console.error('Data validation failed:', error)
    throw new Error('Invalid data received from server')
  }
}
```

## Migration Strategy

### Phase 1: Implement Caching
1. Add React Query to existing components
2. Implement basic caching for static content
3. Add loading states and error handling

### Phase 2: Optimize Queries
1. Optimize Supabase queries
2. Implement pagination
3. Add background prefetching

### Phase 3: Advanced Features
1. Implement offline support
2. Add real-time updates
3. Optimize bundle size

## Success Metrics

### Performance Targets
- **Cache Hit Rate**: > 80%
- **Query Response Time**: < 500ms
- **Bundle Size**: < 500KB
- **Memory Usage**: < 100MB

### User Experience
- **Load Time**: < 3 seconds
- **Error Rate**: < 1%
- **Offline Support**: Basic functionality
- **Mobile Performance**: Consistent with desktop
