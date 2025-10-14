import { test, expect } from '@playwright/test';

test.describe('Отладка содержимого страницы', () => {
  test('Проверка содержимого главной страницы', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Делаем скриншот для визуальной проверки
    await page.screenshot({ path: 'test-results/debug-homepage.png', fullPage: true });

    // Проверяем HTML структуру
    const htmlContent = await page.content();
    console.log('HTML длина:', htmlContent.length);
    
    // Проверяем наличие React root
    const rootElement = await page.locator('#root').isVisible();
    console.log('Root элемент видим:', rootElement);

    // Проверяем содержимое root
    const rootContent = await page.locator('#root').textContent();
    console.log('Root содержимое длина:', rootContent?.length || 0);
    console.log('Root содержимое первые 200 символов:', rootContent?.substring(0, 200));

    // Проверяем body
    const bodyContent = await page.locator('body').textContent();
    console.log('Body содержимое длина:', bodyContent?.length || 0);
    console.log('Body содержимое первые 200 символов:', bodyContent?.substring(0, 200));

    // Проверяем наличие основных элементов
    const hasHeader = await page.locator('header').isVisible().catch(() => false);
    const hasMain = await page.locator('main').isVisible().catch(() => false);
    const hasNav = await page.locator('nav').isVisible().catch(() => false);

    console.log('Header видим:', hasHeader);
    console.log('Main видим:', hasMain);
    console.log('Nav видим:', hasNav);

    // Проверяем все видимые элементы
    const visibleElements = await page.locator('*').all();
    console.log('Всего элементов на странице:', visibleElements.length);

    // Проверяем консольные ошибки
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });

    await page.waitForTimeout(2000); // Ждем немного для сбора сообщений

    console.log('Сообщения консоли:');
    consoleMessages.forEach(msg => console.log(msg));
  });
});













