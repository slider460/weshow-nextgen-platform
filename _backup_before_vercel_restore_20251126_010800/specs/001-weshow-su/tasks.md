# Tasks: Исправление критических проблем weshow.su

**Input**: Design documents from `/specs/001-weshow-su/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Critical Fixes (Week 1)

### User Story 1: Быстрая загрузка главной страницы (Priority: P1)

- [ ] **T001** [P] [US1] Install React Query dependencies
  - Install @tanstack/react-query and @tanstack/react-query-devtools
  - Update package.json with new dependencies
  - **Files**: `package.json`

- [ ] **T002** [US1] Configure React Query client in main.tsx
  - Set up QueryClient with optimized defaults
  - Add QueryClientProvider to app root
  - Configure retry logic and cache times
  - **Files**: `src/main.tsx`

- [ ] **T003** [P] [US1] Optimize Supabase client configuration
  - Add connection timeout settings
  - Configure retry logic for failed requests
  - Add proper error handling
  - **Files**: `src/services/supabase.ts`

- [ ] **T004** [US1] Create projects data hook with React Query
  - Implement useProjects hook with caching
  - Add proper error handling and loading states
  - Set appropriate cache times (1 hour)
  - **Files**: `src/hooks/useProjects.ts`

- [ ] **T005** [US1] Create services data hook with React Query
  - Implement useServices hook with caching
  - Add proper error handling and loading states
  - Set appropriate cache times (24 hours for static content)
  - **Files**: `src/hooks/useServices.ts`

- [ ] **T006** [US1] Create testimonials data hook with React Query
  - Implement useTestimonials hook with caching
  - Add proper error handling and loading states
  - Set appropriate cache times (24 hours for static content)
  - **Files**: `src/hooks/useTestimonials.ts`

- [ ] **T007** [US1] Add skeleton loading components
  - Create ProjectSkeleton component
  - Create ServiceSkeleton component
  - Create TestimonialSkeleton component
  - **Files**: `src/components/ui/skeletons/`

- [ ] **T008** [US1] Update Home component with loading states
  - Replace existing data loading with React Query hooks
  - Add skeleton loaders during data fetching
  - Implement proper error handling
  - **Files**: `src/components/Home.tsx`

- [ ] **T009** [US1] Add Error Boundary component
  - Create ErrorFallback component with retry functionality
  - Add error logging and user-friendly messages
  - **Files**: `src/components/ErrorBoundary.tsx`

- [ ] **T010** [US1] Wrap app with Error Boundary
  - Add ErrorBoundary to main App component
  - Configure error reporting
  - **Files**: `src/App.tsx`

### User Story 2: Рабочие ссылки навигации (Priority: P1)

- [ ] **T011** [P] [US2] Audit all navigation links
  - Check all links in Header component
  - Verify Footer links
  - Check mobile menu links
  - **Files**: `src/components/Header.tsx`, `src/components/Footer.tsx`

- [ ] **T012** [US2] Fix broken navigation routes
  - Update React Router configuration
  - Ensure all routes have corresponding components
  - Add 404 fallback route
  - **Files**: `src/App.tsx`, `src/router/index.tsx`

- [ ] **T013** [US2] Update Vercel configuration for SPA routing
  - Ensure vercel.json has proper rewrites
  - Test direct URL access to all pages
  - **Files**: `vercel.json`

- [ ] **T014** [US2] Create missing page components
  - Create any missing page components referenced in routes
  - Add proper loading and error states
  - **Files**: `src/pages/`

- [ ] **T015** [US2] Add navigation link validation
  - Create utility to validate internal links
  - Add link validation to build process
  - **Files**: `src/utils/navigation.ts`

### User Story 3: Быстрая загрузка страниц портфолио (Priority: P2)

- [ ] **T016** [P] [US3] Create portfolio data hook with pagination
  - Implement usePortfolio hook with React Query
  - Add pagination support for large datasets
  - Set appropriate cache times
  - **Files**: `src/hooks/usePortfolio.ts`

- [ ] **T017** [US3] Optimize portfolio queries
  - Update Supabase queries to select only needed fields
  - Add proper ordering and limiting
  - **Files**: `src/services/portfolio.ts`

- [ ] **T018** [US3] Create portfolio skeleton loader
  - Design skeleton for portfolio grid layout
  - Add smooth loading animation
  - **Files**: `src/components/ui/skeletons/PortfolioSkeleton.tsx`

- [ ] **T019** [US3] Update Portfolio component with optimizations
  - Implement lazy loading for portfolio items
  - Add infinite scroll or pagination
  - **Files**: `src/components/Portfolio.tsx`

- [ ] **T020** [US3] Optimize portfolio images
  - Implement lazy loading for images
  - Add WebP format support
  - Create responsive image components
  - **Files**: `src/components/ui/OptimizedImage.tsx`

### User Story 4: Стабильная работа админ-панели (Priority: P2)

- [ ] **T021** [P] [US4] Create admin data hooks
  - Implement useAdminStats hook
  - Implement useAdminProjects hook
  - Add proper authentication checks
  - **Files**: `src/hooks/useAdmin.ts`

- [ ] **T022** [US4] Add admin loading states
  - Create admin skeleton components
  - Add loading indicators for admin operations
  - **Files**: `src/components/admin/skeletons/`

- [ ] **T023** [US4] Optimize admin queries
  - Update admin Supabase queries for better performance
  - Add proper error handling for admin operations
  - **Files**: `src/services/admin.ts`

- [ ] **T024** [US4] Update AdminPanel component
  - Replace existing data loading with React Query hooks
  - Add proper error handling and loading states
  - **Files**: `src/components/AdminPanel.tsx`

## Phase 2: Performance Optimization (Week 2)

- [ ] **T025** [P] Implement code splitting
  - Add lazy loading for route components
  - Split vendor bundles
  - **Files**: `src/router/index.tsx`

- [ ] **T026** [P] Optimize bundle size
  - Analyze bundle with webpack-bundle-analyzer
  - Remove unused dependencies
  - **Files**: `package.json`, `vite.config.ts`

- [ ] **T027** [P] Implement background prefetching
  - Add prefetching for critical data
  - Implement smart prefetching based on user behavior
  - **Files**: `src/hooks/usePrefetch.ts`

- [ ] **T028** [P] Add request deduplication
  - Implement request deduplication for identical queries
  - Optimize React Query configuration
  - **Files**: `src/main.tsx`

- [ ] **T029** [P] Implement cache invalidation strategy
  - Add cache invalidation for data updates
  - Implement smart cache refresh
  - **Files**: `src/utils/cache.ts`

## Phase 3: Monitoring & Quality (Week 3)

- [ ] **T030** [P] Add Web Vitals tracking
  - Implement Core Web Vitals monitoring
  - Add performance metrics collection
  - **Files**: `src/utils/analytics.ts`

- [ ] **T031** [P] Add error reporting
  - Implement error tracking service
  - Add user feedback collection
  - **Files**: `src/utils/errorReporting.ts`

- [ ] **T032** [P] Create performance tests
  - Add E2E tests for critical user flows
  - Implement performance regression tests
  - **Files**: `tests/e2e/performance.spec.ts`

- [ ] **T033** [P] Add accessibility tests
  - Implement accessibility testing
  - Add keyboard navigation tests
  - **Files**: `tests/e2e/accessibility.spec.ts`

- [ ] **T034** [P] Create deployment checklist
  - Document deployment process
  - Add rollback procedures
  - **Files**: `docs/deployment.md`

## Testing Tasks

- [ ] **T035** [P] Add unit tests for data hooks
  - Test useProjects hook
  - Test useServices hook
  - Test useTestimonials hook
  - **Files**: `tests/hooks/`

- [ ] **T036** [P] Add integration tests for components
  - Test Home component with loading states
  - Test Portfolio component with pagination
  - Test AdminPanel component
  - **Files**: `tests/components/`

- [ ] **T037** [P] Add E2E tests for critical paths
  - Test home page loading
  - Test navigation between pages
  - Test admin panel functionality
  - **Files**: `tests/e2e/`

## Documentation Tasks

- [ ] **T038** [P] Update README with performance improvements
  - Document new caching strategy
  - Add performance metrics
  - **Files**: `README.md`

- [ ] **T039** [P] Create performance monitoring guide
  - Document Web Vitals tracking
  - Add troubleshooting guide
  - **Files**: `docs/performance.md`

- [ ] **T040** [P] Update deployment documentation
  - Document new deployment process
  - Add monitoring setup guide
  - **Files**: `docs/deployment.md`

## Success Criteria Validation

- [ ] **T041** Validate load time < 3 seconds
  - Test home page load time
  - Test portfolio page load time
  - **Files**: `tests/performance/`

- [ ] **T042** Validate 100% working links
  - Run link validation tests
  - Test all navigation paths
  - **Files**: `tests/navigation/`

- [ ] **T043** Validate Core Web Vitals > 90
  - Run Lighthouse audits
  - Test on different devices
  - **Files**: `tests/lighthouse/`

- [ ] **T044** Validate API response < 1 second
  - Test all API endpoints
  - Monitor response times
  - **Files**: `tests/api/`

## Risk Mitigation Tasks

- [ ] **T045** Create rollback plan
  - Document rollback procedures
  - Test rollback process
  - **Files**: `docs/rollback.md`

- [ ] **T046** Add monitoring alerts
  - Set up performance alerts
  - Configure error rate alerts
  - **Files**: `monitoring/alerts.yaml`

- [ ] **T047** Create backup strategy
  - Document data backup procedures
  - Test backup restoration
  - **Files**: `docs/backup.md`
