import { test, expect } from '@playwright/test';

test.describe('Функциональность игры', () => {
  test('игра должна запускаться и отображать UI', async ({ page }) => {
    // Переходим на страницу игры
    await page.goto('/game');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что Canvas присутствует
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Нажимаем кнопку начала игры
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Ждем немного для запуска игры
    await page.waitForTimeout(2000);
    
    // Проверяем, что игра запустилась
    await expect(page.getByText(/Очки:/)).toBeVisible();
    await expect(page.getByText(/Время:/)).toBeVisible();
    await expect(page.getByText(/Комбо:/)).toBeVisible();
    
    // Делаем скриншот
    await page.screenshot({ path: 'test-results/game-running.png' });
    
    console.log('Игра успешно запущена и отображает UI');
  });

  test('должна работать кнопка возврата на сайт', async ({ page }) => {
    await page.goto('/game');
    
    const returnButton = page.locator('button[title="Вернуться на сайт"]');
    await expect(returnButton).toBeVisible();
    
    // Нажимаем кнопку возврата
    await returnButton.click();
    
    // Проверяем, что перешли на главную страницу
    await expect(page).toHaveURL('/');
    
    console.log('Кнопка возврата работает корректно');
  });

  test('Canvas должен отображать начальный рисунок', async ({ page }) => {
    await page.goto('/game');
    
    // Ждем загрузки Canvas
    await page.waitForTimeout(1000);
    
    // Проверяем Canvas
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Проверяем размеры Canvas
    const canvasElement = await canvas.elementHandle();
    if (canvasElement) {
      const box = await canvasElement.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
      
      console.log(`Canvas размеры: ${box?.width} x ${box?.height}`);
    }
    
    // Делаем скриншот Canvas
    await page.screenshot({ path: 'test-results/canvas-initial.png' });
    
    console.log('Canvas отображается корректно');
  });
});
