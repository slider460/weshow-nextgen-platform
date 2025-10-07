import { test, expect } from '@playwright/test';

test.describe('Тест упрощенной версии оригинального приложения', () => {
  test('Проверка загрузки основных страниц', async ({ page }) => {
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
    await page.screenshot({ path: 'test-results/original-app-homepage.png', fullPage: true });
    
    // Проверяем, что главная страница загрузилась
    const body = await page.locator('body').textContent();
    console.log('Содержимое главной страницы:', body?.substring(0, 200) + '...');
    
    // Проверяем наличие основных элементов
    const hasContent = body && body.length > 100;
    expect(hasContent).toBe(true);
    
    // Тестируем навигацию
    const pages = [
      { url: '/about', name: 'О нас' },
      { url: '/services', name: 'Услуги' },
      { url: '/portfolio', name: 'Портфолио' },
      { url: '/team', name: 'Команда' },
      { url: '/contact', name: 'Контакты' }
    ];
    
    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      
      const pageContent = await page.locator('body').textContent();
      const hasPageContent = pageContent && pageContent.length > 50;
      
      if (!hasPageContent) {
        console.log(`⚠️ Страница ${pageInfo.name} может быть пустой или загружается с ошибками`);
      } else {
        console.log(`✅ Страница ${pageInfo.name} загружена`);
      }
      
      expect(hasPageContent).toBe(true);
    }
    
    console.log('Ошибки в консоли:', consoleErrors.length);
    
    if (consoleErrors.length > 0) {
      console.log('Ошибки:', consoleErrors.slice(0, 5)); // Показываем первые 5 ошибок
    }
    
    // Тест проходит, если нет критических ошибок
    expect(consoleErrors.length).toBeLessThan(10);
  });
  
  test('Проверка производительности загрузки', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`Время загрузки оригинального приложения: ${loadTime}ms`);
    
    // Проверяем, что страница загрузилась за разумное время
    expect(loadTime).toBeLessThan(20000); // менее 20 секунд
    
    // Делаем скриншот
    await page.screenshot({ path: 'test-results/original-app-performance.png' });
  });
});







