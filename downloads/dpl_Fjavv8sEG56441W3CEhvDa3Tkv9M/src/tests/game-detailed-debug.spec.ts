import { test, expect } from '@playwright/test';

test('детальная отладка игры - проверка каждого элемента', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(3000);
  
  // 1. Проверяем заголовок
  await expect(page.getByRole('heading', { name: /🚴‍♂️ Велосипедные гонки/ })).toBeVisible();
  
  // 2. Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // 3. Проверяем кнопку начала игры
  const startButton = page.getByRole('button', { name: /Начать гонку/ });
  await expect(startButton).toBeVisible();
  
  // 4. Делаем скриншот начального состояния
  await page.screenshot({ path: 'test-results/detailed-debug-initial.png' });
  
  console.log('Начальное состояние загружено');
  
  // 5. Нажимаем кнопку начала игры
  await startButton.click();
  
  console.log('Кнопка нажата, ждем запуска игры...');
  
  // 6. Ждем запуска игры
  await page.waitForTimeout(3000);
  
  // 7. Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/detailed-debug-after-start.png' });
  
  // 8. Проверяем, что Canvas все еще видим
  await expect(canvas).toBeVisible();
  
  // 9. Проверяем, что кнопка начала игры исчезла
  await expect(startButton).not.toBeVisible();
  
  // 10. Проверяем, что игра действительно запустилась
  await expect(page.getByText(/Гонка идет!/)).toBeVisible();
  await expect(page.getByText(/Очки:/)).toBeVisible();
  await expect(page.getByText(/Время:/)).toBeVisible();
  await expect(page.getByText(/Комбо:/)).toBeVisible();
  
  // 11. Проверяем Canvas данные
  const canvasElement = await canvas.elementHandle();
  if (canvasElement) {
    const canvasData = await page.evaluate((canvas) => {
      const canvasElement = canvas as HTMLCanvasElement;
      const ctx = canvasElement.getContext('2d');
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
        return {
          width: canvasElement.width,
          height: canvasElement.height,
          hasData: imageData.data.some(pixel => pixel !== 0),
          dataLength: imageData.data.length,
          firstPixels: imageData.data.slice(0, 20)
        };
      }
      return null;
    }, canvasElement);
    
    console.log('Canvas данные после запуска игры:', canvasData);
    
    // Проверяем, что Canvas имеет данные
    expect(canvasData?.hasData).toBe(true);
  }
  
  // 12. Ждем еще немного для проверки анимации
  await page.waitForTimeout(3000);
  
  // 13. Финальный скриншот
  await page.screenshot({ path: 'test-results/detailed-debug-final.png' });
  
  console.log('Детальная отладка завершена успешно');
});
