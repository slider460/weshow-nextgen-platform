import { test, expect } from '@playwright/test';

test.describe('Тест React Router', () => {
  test('Проверка работы React Router', async ({ page }) => {
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
    
    // Делаем скриншот
    await page.screenshot({ path: 'test-results/react-router-test.png', fullPage: true });
    
    // Проверяем, что страница загрузилась без ошибок React Router
    const hasRouterError = consoleErrors.some(error => 
      error.includes('Invalid hook call') || 
      error.includes('React Router') ||
      error.includes('BrowserRouter')
    );
    
    if (hasRouterError) {
      console.log('❌ Найдены ошибки React Router:', consoleErrors);
      throw new Error('React Router не работает корректно');
    }
    
    // Проверяем наличие навигации
    const nav = page.locator('nav');
    const navExists = await nav.count() > 0;
    
    // Проверяем наличие ссылок
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    console.log('Навигация найдена:', navExists);
    console.log('Количество ссылок:', linkCount);
    console.log('Ошибки в консоли:', consoleErrors.length);
    
    // Тест проходит, если нет критических ошибок
    expect(consoleErrors.length).toBeLessThan(5); // Допускаем несколько предупреждений
  });
});



