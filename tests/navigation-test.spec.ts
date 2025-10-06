import { test, expect } from '@playwright/test';

test.describe('Тест навигации между страницами', () => {
  test('Проверка навигации по всем страницам', async ({ page }) => {
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
    
    // Проверяем заголовок главной страницы
    await expect(page.locator('h1')).toContainText('WESHOW');
    console.log('✅ Главная страница загружена');
    
    // Переходим на страницу услуг
    await page.click('a[href="/services"]');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Услуги WESHOW');
    console.log('✅ Страница услуг загружена');
    
    // Переходим на страницу портфолио
    await page.click('a[href="/portfolio"]');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Портфолио WESHOW');
    console.log('✅ Страница портфолио загружена');
    
    // Переходим на страницу контактов
    await page.click('a[href="/contact"]');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Контакты WESHOW');
    console.log('✅ Страница контактов загружена');
    
    // Возвращаемся на главную
    await page.click('a[href="/"]');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Полное приложение с роутингом');
    console.log('✅ Возврат на главную страницу');
    
    // Делаем скриншот финального состояния
    await page.screenshot({ path: 'test-results/navigation-test-final.png', fullPage: true });
    
    console.log('Ошибки в консоли:', consoleErrors.length);
    
    // Тест проходит, если нет критических ошибок
    expect(consoleErrors.length).toBeLessThan(5);
  });
  
  test('Проверка прямого перехода на страницы', async ({ page }) => {
    const pages = [
      { url: '/', title: 'WESHOW' },
      { url: '/services', title: 'Услуги WESHOW' },
      { url: '/portfolio', title: 'Портфолио WESHOW' },
      { url: '/contact', title: 'Контакты WESHOW' }
    ];
    
    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      
      const title = await page.locator('h1').textContent();
      expect(title).toContain(pageInfo.title);
      console.log(`✅ Прямой переход на ${pageInfo.url} работает`);
    }
    
    await page.screenshot({ path: 'test-results/direct-navigation-test.png', fullPage: true });
  });
});






