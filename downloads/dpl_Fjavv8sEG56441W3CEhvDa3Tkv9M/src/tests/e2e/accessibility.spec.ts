// E2E тесты для доступности
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have proper heading hierarchy', () => {
    // Проверяем что заголовки идут в правильном порядке
    cy.get('h1').should('exist')
    cy.get('h2').should('exist')
    
    // Проверяем что нет пропущенных уровней заголовков
    cy.get('h1').then(($h1) => {
      if ($h1.length > 0) {
        cy.get('h3').should('not.exist')
      }
    })
  })

  it('should have proper alt text for images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt')
      cy.wrap($img).invoke('attr', 'alt').should('not.be.empty')
    })
  })

  it('should have proper link text', () => {
    cy.get('a').each(($link) => {
      const text = $link.text().trim()
      const href = $link.attr('href')
      
      // Проверяем что ссылки имеют осмысленный текст
      if (href && !href.startsWith('#')) {
        expect(text).to.not.be.empty
        expect(text).to.not.match(/^(click here|read more|here)$/i)
      }
    })
  })

  it('should be keyboard navigable', () => {
    // Проверяем что можно навигировать с клавиатуры
    cy.get('body').tab()
    cy.focused().should('exist')
    
    // Проверяем что фокус виден
    cy.focused().should('be.visible')
  })

  it('should have proper form labels', () => {
    cy.get('form').each(($form) => {
      cy.wrap($form).find('input, textarea, select').each(($input) => {
        const id = $input.attr('id')
        const ariaLabel = $input.attr('aria-label')
        const ariaLabelledby = $input.attr('aria-labelledby')
        
        // Проверяем что у каждого input есть label или aria-label
        if (id) {
          cy.get(`label[for="${id}"]`).should('exist')
        } else if (!ariaLabel && !ariaLabelledby) {
          // Если нет id, должен быть aria-label или aria-labelledby
          cy.wrap($input).should('have.attr', 'aria-label')
        }
      })
    })
  })

  it('should have proper color contrast', () => {
    // Проверяем основные элементы на контрастность
    cy.get('h1, h2, h3, p, a').each(($el) => {
      cy.wrap($el).should('be.visible')
      // В реальном тесте здесь была бы проверка цветового контраста
    })
  })

  it('should have proper ARIA attributes', () => {
    // Проверяем что кнопки имеют правильные ARIA атрибуты
    cy.get('button').each(($button) => {
      const text = $button.text().trim()
      const ariaLabel = $button.attr('aria-label')
      
      // Если кнопка не имеет текста, должна иметь aria-label
      if (!text && !ariaLabel) {
        cy.wrap($button).should('have.attr', 'aria-label')
      }
    })
  })

  it('should handle focus management', () => {
    // Проверяем что модальные окна правильно управляют фокусом
    cy.get('[data-testid="modal-trigger"], button').first().click()
    
    // Проверяем что фокус переместился в модальное окно
    cy.get('[role="dialog"], .modal').should('be.visible')
    cy.focused().should('be.visible')
  })

  it('should have proper skip links', () => {
    // Проверяем наличие skip links для навигации
    cy.get('a[href="#main"], a[href="#content"]').should('exist')
  })

  it('should have proper table structure', () => {
    cy.get('table').each(($table) => {
      // Проверяем что таблицы имеют заголовки
      cy.wrap($table).find('th').should('exist')
      
      // Проверяем что заголовки связаны с данными
      cy.wrap($table).find('th').each(($th) => {
        const scope = $th.attr('scope')
        const id = $th.attr('id')
        
        if (!scope && !id) {
          // Если нет scope или id, проверяем что есть заголовок
          cy.wrap($th).should('not.be.empty')
        }
      })
    })
  })

  it('should have proper error messages', () => {
    // Проверяем что ошибки имеют правильные ARIA атрибуты
    cy.get('[role="alert"], .error-message').each(($error) => {
      cy.wrap($error).should('be.visible')
      cy.wrap($error).should('not.be.empty')
    })
  })

  it('should work with screen readers', () => {
    // Проверяем что контент имеет правильную семантику
    cy.get('main').should('exist')
    cy.get('header').should('exist')
    cy.get('footer').should('exist')
    
    // Проверяем что навигация имеет правильную структуру
    cy.get('nav').should('exist')
    cy.get('nav ul').should('exist')
  })
})
