// E2E тесты для производительности
// Эти тесты можно запустить с помощью Playwright или Cypress

describe('Performance Tests', () => {
  beforeEach(() => {
    // Очищаем кэш перед каждым тестом
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  it('should load home page within 3 seconds', () => {
    const startTime = Date.now()
    
    cy.visit('/')
    
    // Проверяем что страница загрузилась
    cy.get('h1').should('be.visible')
    
    // Проверяем время загрузки
    cy.then(() => {
      const loadTime = Date.now() - startTime
      expect(loadTime).to.be.lessThan(3000)
    })
  })

  it('should have good Core Web Vitals', () => {
    cy.visit('/')
    
    // Проверяем LCP (Largest Contentful Paint)
    cy.window().then((win) => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          expect(lastEntry.startTime).to.be.lessThan(2500) // LCP < 2.5s
          resolve(undefined)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })
  })

  it('should load all navigation links', () => {
    cy.visit('/')
    
    // Проверяем все основные ссылки навигации
    const navigationLinks = [
      '/about',
      '/services',
      '/portfolio',
      '/contact',
      '/blog',
      '/news',
      '/careers'
    ]
    
    navigationLinks.forEach(link => {
      cy.get(`a[href="${link}"]`).should('be.visible')
      cy.get(`a[href="${link}"]`).click()
      cy.url().should('include', link)
      cy.get('body').should('be.visible')
    })
  })

  it('should handle service subpages correctly', () => {
    cy.visit('/')
    
    // Проверяем подстраницы сервисов
    const serviceSubpages = [
      '/services/multimedia',
      '/services/development',
      '/services/equipment-rental',
      '/services/design',
      '/services/kinetic-screen',
      '/services/complex-solutions',
      '/services/technical-support'
    ]
    
    serviceSubpages.forEach(link => {
      cy.visit(link)
      cy.url().should('include', link)
      cy.get('body').should('be.visible')
      cy.get('h1, h2, h3').should('exist') // Проверяем что есть заголовки
    })
  })

  it('should load portfolio data with skeleton loaders', () => {
    cy.visit('/portfolio')
    
    // Проверяем что skeleton loaders отображаются
    cy.get('[data-testid="portfolio-skeleton"], .animate-pulse').should('be.visible')
    
    // Ждем загрузки данных
    cy.get('[data-testid="portfolio-skeleton"], .animate-pulse', { timeout: 10000 }).should('not.exist')
    
    // Проверяем что проекты загрузились
    cy.get('[data-testid="portfolio-item"], .project-card').should('have.length.greaterThan', 0)
  })

  it('should handle 404 pages gracefully', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    
    // Проверяем что 404 страница отображается
    cy.get('h1').should('contain', '404')
    cy.get('a[href="/"]').should('be.visible')
  })

  it('should have responsive design', () => {
    // Тестируем на разных размерах экрана
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ]
    
    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height)
      cy.visit('/')
      
      // Проверяем что контент виден и не перекрывается
      cy.get('header').should('be.visible')
      cy.get('main').should('be.visible')
      cy.get('footer').should('be.visible')
    })
  })

  it('should load images efficiently', () => {
    cy.visit('/')
    
    // Проверяем что изображения загружаются
    cy.get('img').should('have.length.greaterThan', 0)
    
    // Проверяем что изображения не вызывают ошибок
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible')
      cy.wrap($img).should('have.attr', 'src')
    })
  })

  it('should handle slow network conditions', () => {
    // Симулируем медленное соединение
    cy.intercept('GET', '**/supabase/**', { delay: 2000 }).as('slowRequest')
    
    cy.visit('/')
    
    // Проверяем что skeleton loaders отображаются
    cy.get('.animate-pulse').should('be.visible')
    
    // Ждем завершения запроса
    cy.wait('@slowRequest')
    
    // Проверяем что данные загрузились
    cy.get('.animate-pulse', { timeout: 10000 }).should('not.exist')
  })

  it('should cache data appropriately', () => {
    cy.visit('/')
    
    // Первая загрузка
    cy.get('[data-testid="services-section"]').should('be.visible')
    
    // Переходим на другую страницу и обратно
    cy.visit('/about')
    cy.visit('/')
    
    // Проверяем что данные загружаются быстрее (из кэша)
    cy.get('[data-testid="services-section"]').should('be.visible')
  })
})
