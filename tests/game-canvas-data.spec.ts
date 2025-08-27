import { test, expect } from '@playwright/test';

test('Canvas должен содержать данные после запуска игры', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Получаем начальное состояние Canvas
  const initialCanvasData = await page.evaluate((canvas) => {
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height);
      return {
        width: (canvas as HTMLCanvasElement).width,
        height: (canvas as HTMLCanvasElement).height,
        hasData: imageData.data.some(pixel => pixel !== 0),
        dataLength: imageData.data.length
      };
    }
    return null;
  }, canvas);
  
  console.log('Начальное состояние Canvas:', initialCanvasData);
  
  // Нажимаем кнопку начала игры
  await page.getByRole('button', { name: /Начать гонку/ }).click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Получаем состояние Canvas после запуска игры
  const afterStartCanvasData = await page.evaluate((canvas) => {
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height);
      return {
        width: (canvas as HTMLCanvasElement).width,
        height: (canvas as HTMLCanvasElement).height,
        hasData: imageData.data.some(pixel => pixel !== 0),
        dataLength: imageData.data.length
      };
    }
    return null;
  }, canvas);
  
  console.log('Состояние Canvas после запуска игры:', afterStartCanvasData);
  
  // Ждем еще немного для появления препятствий
  await page.waitForTimeout(3000);
  
  // Получаем финальное состояние Canvas
  const finalCanvasData = await page.evaluate((canvas) => {
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height);
      return {
        width: (canvas as HTMLCanvasElement).width,
        height: (canvas as HTMLCanvasElement).height,
        hasData: imageData.data.some(pixel => pixel !== 0),
        dataLength: imageData.data.length
      };
    }
    return null;
  }, canvas);
  
  console.log('Финальное состояние Canvas:', finalCanvasData);
  
  // Делаем скриншоты для сравнения
  await page.screenshot({ path: 'test-results/canvas-data-initial.png' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/canvas-data-after-start.png' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-results/canvas-data-final.png' });
  
  // Проверяем, что Canvas имеет данные
  expect(initialCanvasData?.hasData).toBe(true);
  expect(afterStartCanvasData?.hasData).toBe(true);
  expect(finalCanvasData?.hasData).toBe(true);
  
  console.log('Canvas содержит данные корректно');
});
