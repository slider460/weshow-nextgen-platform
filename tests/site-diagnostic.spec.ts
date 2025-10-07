import { test, expect } from '@playwright/test';

test.describe('Диагностика сайта WESHOW', () => {
  test('Проверка загрузки главной страницы', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем заголовок страницы
    await expect(page).toHaveTitle(/WESHOW/);
    
    // Делаем скриншот
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
    
    // Проверяем наличие основного контента
    const body = await page.locator('body').textContent();
    console.log('Содержимое страницы:', body);
    
    // Проверяем, есть ли ошибки в консоли
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log('Ошибка в консоли:', msg.text());
      }
    });
    
    // Проверяем наличие корневого элемента React
    const rootElement = page.locator('#root');
    await expect(rootElement).toBeVisible();
    
    // Проверяем, что React приложение загрузилось
    const reactContent = await rootElement.textContent();
    console.log('Содержимое React приложения:', reactContent);
    
    // Если есть ошибки в консоли, тест должен их показать
    if (consoleErrors.length > 0) {
      console.log('Найдены ошибки в консоли:', consoleErrors);
    }
    
    // Проверяем, что страница содержит ожидаемый контент
    expect(reactContent).toContain('WESHOW');
  });
  
  test('Проверка загрузки JavaScript файлов', async ({ page }) => {
    const failedRequests: string[] = [];
    
    // Отслеживаем неудачные запросы
    page.on('response', response => {
      if (!response.ok()) {
        failedRequests.push(`${response.url()} - ${response.status()}`);
        console.log('Неудачный запрос:', response.url(), response.status());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что основные JS файлы загрузились
    const scriptTags = await page.locator('script[type="module"]').count();
    console.log('Количество script тегов:', scriptTags);
    
    if (failedRequests.length > 0) {
      console.log('Неудачные запросы:', failedRequests);
    }
    
    // Тест проходит, даже если есть ошибки, чтобы мы могли их увидеть
    expect(scriptTags).toBeGreaterThan(0);
  });
  
  test('Проверка производительности загрузки', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`Время загрузки страницы: ${loadTime}ms`);
    
    // Проверяем, что страница загрузилась за разумное время
    expect(loadTime).toBeLessThan(10000); // менее 10 секунд
    
    // Делаем скриншот для анализа
    await page.screenshot({ path: 'test-results/performance-test.png' });
  });
});







