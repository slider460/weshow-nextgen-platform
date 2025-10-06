import { test, expect } from '@playwright/test';

test.describe('Тест исправления ошибки process', () => {
  test('Проверка отсутствия ошибки process в консоли', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    // Отслеживаем ошибки в консоли
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('❌ Ошибка в консоли:', msg.text());
      }
    });
    
    // Переходим на главную страницу
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Делаем скриншот для проверки
    await page.screenshot({ path: 'test-results/process-error-fix.png', fullPage: true });
    
    // Проверяем, что нет ошибок связанных с process
    const processErrors = consoleErrors.filter(error => 
      error.includes('process') || 
      error.includes('Can\'t find variable') ||
      error.includes('process is not defined')
    );
    
    if (processErrors.length > 0) {
      console.log('❌ Найдены ошибки process:', processErrors);
      throw new Error('Ошибка process не исправлена');
    }
    
    console.log('✅ Ошибка process исправлена');
    console.log('Общее количество ошибок в консоли:', consoleErrors.length);
    
    // Показываем все ошибки для диагностики
    if (consoleErrors.length > 0) {
      console.log('Все ошибки в консоли:', consoleErrors.slice(0, 10));
    }
    
    // Тест проходит, если нет ошибок process
    expect(processErrors.length).toBe(0);
  });
  
  test('Проверка работы страниц после исправления', async ({ page }) => {
    const pages = [
      { url: '/', name: 'Главная' },
      { url: '/about', name: 'О нас' },
      { url: '/services', name: 'Услуги' },
      { url: '/portfolio', name: 'Портфолио' },
      { url: '/contact', name: 'Контакты' }
    ];
    
    for (const pageInfo of pages) {
      const consoleErrors: string[] = [];
      
      // Отслеживаем ошибки для каждой страницы
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      
      // Проверяем, что страница загрузилась без критических ошибок
      const criticalErrors = consoleErrors.filter(error => 
        error.includes('process') || 
        error.includes('Can\'t find variable') ||
        error.includes('process is not defined')
      );
      
      if (criticalErrors.length > 0) {
        console.log(`❌ Ошибки process на странице ${pageInfo.name}:`, criticalErrors);
        throw new Error(`Ошибка process на странице ${pageInfo.name}`);
      }
      
      console.log(`✅ Страница ${pageInfo.name} работает без ошибок process`);
    }
    
    console.log('🎉 Все страницы работают без ошибок process!');
  });
});






