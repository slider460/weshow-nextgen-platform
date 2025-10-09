import { test, expect } from '@playwright/test';

test.describe('Тест LogosProvider', () => {
  test('Проверка работы LogosProvider', async ({ page }) => {
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
    await page.screenshot({ path: 'test-results/logos-provider-test.png', fullPage: true });
    
    // Проверяем, что страница загрузилась
    await expect(page.locator('h1')).toBeVisible();
    
    // Проверяем, что нет ошибок LogosProvider
    const hasLogosError = consoleErrors.some(error => 
      error.includes('LogosProvider') || 
      error.includes('LogosContext') ||
      error.includes('useLogos')
    );
    
    if (hasLogosError) {
      console.log('❌ Найдены ошибки LogosProvider:', consoleErrors);
      throw new Error('LogosProvider не работает корректно');
    }
    
    // Проверяем навигацию
    await page.click('a[href="/portfolio"]');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Портфолио WESHOW');
    
    console.log('✅ LogosProvider работает корректно');
    console.log('Ошибки в консоли:', consoleErrors.length);
    
    // Тест проходит, если нет критических ошибок
    expect(consoleErrors.length).toBeLessThan(5);
  });
});












