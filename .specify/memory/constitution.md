# WeShow NextGen Platform Constitution

## Core Principles

### I. User Experience First
Every feature must prioritize user experience and accessibility. Performance, responsiveness, and intuitive design are non-negotiable. All interfaces must be mobile-first, accessible (WCAG 2.1 AA), and support multiple languages. User feedback drives all design decisions.

### II. Modern Technology Stack
React 18+ with TypeScript for type safety, Vite for fast development, and modern web standards. Use established libraries (Radix UI, Framer Motion, Three.js) for consistency. No legacy code or deprecated patterns allowed. Progressive enhancement ensures functionality across all devices.

### III. Performance & Optimization
Core Web Vitals must be excellent (LCP < 2.5s, FID < 100ms, CLS < 0.1). Code splitting, lazy loading, and compression are mandatory. Images must be optimized, animations must be GPU-accelerated. Bundle size monitoring and performance budgets enforced.

### IV. Security & Privacy
All user data must be encrypted in transit and at rest. Implement proper authentication, authorization, and input validation. Follow OWASP guidelines, use HTTPS everywhere, and maintain secure coding practices. Privacy by design - minimal data collection, explicit consent.

### V. Scalability & Reliability
System must handle concurrent users, database connections, and API requests efficiently. Implement proper error handling, logging, and monitoring. Use Supabase for backend services with proper RLS policies. Fail gracefully with user-friendly error messages.

## Technology Standards

### Frontend Architecture
- React 18+ with functional components and hooks
- TypeScript for all code with strict type checking
- Tailwind CSS for styling with design system consistency
- Vite for build tooling with HMR and fast builds
- React Router for client-side routing

### Backend & Database
- Supabase for authentication, database, and real-time features
- PostgreSQL with Row Level Security (RLS) enabled
- RESTful APIs with proper HTTP status codes
- GraphQL for complex queries when needed

### Development Tools
- ESLint and Prettier for code quality
- Playwright for end-to-end testing
- GitHub Actions for CI/CD
- Vercel for deployment with edge functions

## Development Workflow

### Code Quality
- All code must pass ESLint checks and type checking
- Components must be tested with React Testing Library
- E2E tests required for critical user flows
- Code reviews mandatory for all changes
- Documentation required for complex features

### Deployment Process
- All changes must be tested in development environment
- Staging deployment before production
- Automated testing in CI/CD pipeline
- Performance monitoring in production
- Rollback capability for critical issues

## Governance

This constitution supersedes all other development practices. All team members must comply with these principles. Amendments require team discussion, documentation of rationale, and approval from technical lead. Regular reviews ensure principles remain relevant and effective.

**Version**: 1.0.0 | **Ratified**: 2025-10-15 | **Last Amended**: 2025-10-15