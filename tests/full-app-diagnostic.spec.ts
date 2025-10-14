import { test, expect } from '@playwright/test';

test.describe('Диагностика полного приложения WESHOW', () => {
  test('Проверка загрузки полного приложения', async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    
    // Отслеживаем все сообщения консоли
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('❌ Ошибка в консоли:', msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
        console.log('⚠️ Предупреждение в консоли:', msg.text());
      }
    });
    
    // Отслеживаем неудачные запросы
    const failedRequests: string[] = [];
    page.on('response', response => {
      if (!response.ok()) {
        failedRequests.push(`${response.url()} - ${response.status()}`);
        console.log('❌ Неудачный запрос:', response.url(), response.status());
      }
    });
    
    // Переходим на главную страницу
    await page.goto('/');
    
    // Ждем загрузки React приложения
    await page.waitForSelector('#root', { timeout: 10000 });
    
    // Ждем загрузки сети
    await page.waitForLoadState('networkidle');
    
    // Делаем скриншот
    await page.screenshot({ path: 'test-results/full-app-homepage.png', fullPage: true });
    
    // Проверяем заголовок страницы
    await expect(page).toHaveTitle(/WESHOW/);
    
    // Проверяем наличие основного контента
    const rootElement = page.locator('#root');
    await expect(rootElement).toBeVisible();
    
    const reactContent = await rootElement.textContent();
    console.log('Содержимое полного приложения:', reactContent?.substring(0, 200) + '...');
    
    // Проверяем наличие навигации
    const nav = page.locator('nav');
    const navExists = await nav.count() > 0;
    console.log('Навигация найдена:', navExists);
    
    // Проверяем наличие основных секций
    const sections = page.locator('section, main, header');
    const sectionCount = await sections.count();
    console.log('Количество секций:', sectionCount);
    
    // Выводим результаты диагностики
    console.log('\n=== РЕЗУЛЬТАТЫ ДИАГНОСТИКИ ===');
    console.log('Ошибки в консоли:', consoleErrors.length);
    console.log('Предупреждения в консоли:', consoleWarnings.length);
    console.log('Неудачные запросы:', failedRequests.length);
    console.log('Секции на странице:', sectionCount);
    
    if (consoleErrors.length > 0) {
      console.log('\nОШИБКИ:');
      consoleErrors.forEach(error => console.log('-', error));
    }
    
    if (failedRequests.length > 0) {
      console.log('\nНЕУДАЧНЫЕ ЗАПРОСЫ:');
      failedRequests.forEach(req => console.log('-', req));
    }
    
    // Тест считается успешным, если страница загрузилась
    expect(rootElement).toBeVisible();
    expect(reactContent?.length).toBeGreaterThan(0);
  });
  
  test('Проверка производительности полного приложения', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForSelector('#root');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`Время загрузки полного приложения: ${loadTime}ms`);
    
    // Проверяем, что страница загрузилась за разумное время
    expect(loadTime).toBeLessThan(15000); // менее 15 секунд
    
    // Делаем скриншот
    await page.screenshot({ path: 'test-results/full-app-performance.png' });
  });
});













