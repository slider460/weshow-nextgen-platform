import { test, expect } from '@playwright/test';

test.describe('Тест LanguageProvider', () => {
  test('Проверка работы LanguageProvider', async ({ page }) => {
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
    await page.screenshot({ path: 'test-results/language-provider-test.png', fullPage: true });
    
    // Проверяем, что страница загрузилась
    await expect(page.locator('h1')).toBeVisible();
    
    // Проверяем, что нет ошибок LanguageProvider
    const hasLanguageError = consoleErrors.some(error => 
      error.includes('LanguageProvider') || 
      error.includes('LanguageContext') ||
      error.includes('useContext')
    );
    
    if (hasLanguageError) {
      console.log('❌ Найдены ошибки LanguageProvider:', consoleErrors);
      throw new Error('LanguageProvider не работает корректно');
    }
    
    // Проверяем навигацию
    await page.click('a[href="/services"]');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Услуги WESHOW');
    
    console.log('✅ LanguageProvider работает корректно');
    console.log('Ошибки в консоли:', consoleErrors.length);
    
    // Тест проходит, если нет критических ошибок
    expect(consoleErrors.length).toBeLessThan(5);
  });
});












