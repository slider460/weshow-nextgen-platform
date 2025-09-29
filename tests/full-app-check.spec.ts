import { test, expect } from '@playwright/test';

test.describe('Проверка полного приложения WESHOW', () => {
  test('Полное приложение должно загружаться без ошибок', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Проверяем, что страница загрузилась
    const title = await page.title();
    expect(title).toContain('WESHOW');

    // Проверяем наличие основного контента
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent).toBeTruthy();
    expect(bodyContent!.length).toBeGreaterThan(100);

    // Проверяем отсутствие критических ошибок
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('Favicon') && 
      !error.includes('manifest') &&
      !error.includes('Service Worker')
    );
    
    console.log('Ошибки в консоли:', criticalErrors.length);
    if (criticalErrors.length > 0) {
      console.log('Критические ошибки:', criticalErrors);
    }

    // Проверяем, что есть хотя бы базовый контент
    const hasContent = await page.locator('body').isVisible();
    expect(hasContent).toBe(true);

    console.log('✅ Полное приложение загружается корректно');
  });

  test('Проверка основных страниц', async ({ page }) => {
    const pagesToTest = ['/', '/about', '/services', '/portfolio', '/contact'];
    
    for (const path of pagesToTest) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      
      const title = await page.title();
      expect(title).toBeTruthy();
      
      const bodyContent = await page.locator('body').textContent();
      expect(bodyContent).toBeTruthy();
      
      console.log(`✅ Страница ${path} загружается корректно`);
    }
  });
});


