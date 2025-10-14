import { test, expect } from '@playwright/test';

test.describe('Детальная отладка консоли', () => {
  test('Проверка всех сообщений консоли', async ({ page }) => {
    const allMessages: Array<{type: string, text: string, location?: string}> = [];

    page.on('console', msg => {
      allMessages.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location().url
      });
    });

    // Перехватываем ошибки JavaScript
    page.on('pageerror', error => {
      allMessages.push({
        type: 'pageerror',
        text: error.message,
        location: error.stack
      });
    });

    // Перехватываем ошибки загрузки ресурсов
    page.on('requestfailed', request => {
      allMessages.push({
        type: 'requestfailed',
        text: `Failed to load: ${request.url()} - ${request.failure()?.errorText}`,
        location: request.url()
      });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Ждем еще немного для сбора всех сообщений
    await page.waitForTimeout(3000);

    console.log('\n=== ВСЕ СООБЩЕНИЯ КОНСОЛИ ===');
    allMessages.forEach((msg, index) => {
      console.log(`${index + 1}. [${msg.type.toUpperCase()}] ${msg.text}`);
      if (msg.location && msg.location !== 'http://localhost:8080/') {
        console.log(`   Location: ${msg.location}`);
      }
    });

    // Проверяем наличие критических ошибок
    const criticalErrors = allMessages.filter(msg => 
      msg.type === 'error' || 
      msg.type === 'pageerror' || 
      msg.type === 'requestfailed'
    );

    console.log(`\n=== КРИТИЧЕСКИЕ ОШИБКИ: ${criticalErrors.length} ===`);
    criticalErrors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.type}: ${error.text}`);
    });

    // Проверяем, загружается ли React приложение
    const reactAppLoaded = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root && root.children.length > 0;
    });

    console.log(`\nReact приложение загружено: ${reactAppLoaded}`);

    // Проверяем наличие основных компонентов
    const hasReactComponents = await page.evaluate(() => {
      // Проверяем, есть ли React элементы
      const reactElements = document.querySelectorAll('[data-reactroot], [data-react-*]');
      return reactElements.length > 0;
    });

    console.log(`React компоненты найдены: ${hasReactComponents}`);

    // Делаем скриншот
    await page.screenshot({ path: 'test-results/debug-console-detailed.png', fullPage: true });
  });
});













