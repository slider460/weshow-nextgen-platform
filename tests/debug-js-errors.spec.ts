import { test, expect } from '@playwright/test';

test.describe('Отладка JavaScript ошибок', () => {
  test('Проверка JavaScript ошибок и загрузки React', async ({ page }) => {
    const consoleMessages: string[] = [];
    const networkErrors: string[] = [];

    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });

    page.on('response', response => {
      if (!response.ok()) {
        networkErrors.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('=== СООБЩЕНИЯ КОНСОЛИ ===');
    consoleMessages.forEach(msg => console.log(msg));

    console.log('\n=== ОШИБКИ СЕТИ ===');
    networkErrors.forEach(error => console.log(error));

    // Проверяем, загружается ли React
    const reactLoaded = await page.evaluate(() => {
      return typeof window.React !== 'undefined' || 
             document.querySelector('script[src*="react"]') !== null;
    });

    console.log('\nReact загружен:', reactLoaded);

    // Проверяем наличие ошибок в JavaScript
    const jsErrors = consoleMessages.filter(msg => msg.startsWith('error:'));
    console.log('\nJavaScript ошибки:', jsErrors.length);
    jsErrors.forEach(error => console.log(error));

    // Проверяем, есть ли root элемент
    const rootExists = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root !== null;
    });

    console.log('\nRoot элемент существует:', rootExists);

    // Проверяем, есть ли содержимое в root
    const rootHasContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root && root.children.length > 0;
    });

    console.log('Root имеет содержимое:', rootHasContent);

    // Делаем скриншот для визуальной проверки
    await page.screenshot({ path: 'test-results/debug-js-errors.png', fullPage: true });
  });
});






