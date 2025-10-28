import { test, expect } from '@playwright/test';

test.describe('Проверка доступности сайта', () => {
  test('Сайт должен быть доступен по основному URL', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Проверяем, что страница загрузилась
    await page.waitForLoadState('networkidle');
    
    // Проверяем заголовок
    const title = await page.title();
    expect(title).toContain('WESHOW');
    
    // Проверяем, что есть контент
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent).toBeTruthy();
    expect(bodyContent!.length).toBeGreaterThan(100);
    
    console.log('✅ Сайт доступен и загружается корректно');
    console.log(`📄 Заголовок: ${title}`);
    console.log(`📝 Размер контента: ${bodyContent!.length} символов`);
  });

  test('Проверка основных разделов сайта', async ({ page }) => {
    const sections = [
      { path: '/', name: 'Главная' },
      { path: '/about', name: 'О компании' },
      { path: '/services', name: 'Услуги' },
      { path: '/portfolio', name: 'Портфолио' },
      { path: '/contact', name: 'Контакты' }
    ];

    for (const section of sections) {
      await page.goto(section.path);
      await page.waitForLoadState('networkidle');
      
      const title = await page.title();
      expect(title).toBeTruthy();
      
      console.log(`✅ ${section.name} (${section.path}) - ${title}`);
    }
  });

  test('Проверка отсутствия критических ошибок', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Фильтруем только критические ошибки
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('manifest') &&
      !error.includes('Service Worker')
    );
    
    console.log(`📊 Ошибок в консоли: ${criticalErrors.length}`);
    if (criticalErrors.length > 0) {
      console.log('Критические ошибки:', criticalErrors);
    }
    
    // Проверяем, что нет критических ошибок
    expect(criticalErrors.length).toBe(0);
  });
});














