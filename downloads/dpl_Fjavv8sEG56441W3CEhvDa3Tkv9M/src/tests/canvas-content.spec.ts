import { test, expect } from '@playwright/test';

test('Canvas должен отрисовывать содержимое', async ({ page }) => {
  // Переходим на страницу простой игры
  await page.goto('/game-simple');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
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
  
  // Проверяем, что Canvas не пустой
  const canvasData = await page.evaluate((canvas) => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      return {
        width: canvas.width,
        height: canvas.height,
        hasData: imageData.data.some(pixel => pixel !== 0),
        firstPixels: imageData.data.slice(0, 20)
      };
    }
    return null;
  }, canvasElement);
  
  console.log('Canvas данные:', canvasData);
  
  // Проверяем, что Canvas имеет данные
  expect(canvasData?.hasData).toBe(true);
  
  // Делаем скриншот
  await page.screenshot({ path: 'test-results/canvas-content-test.png' });
  
  console.log('Canvas отрисовывает содержимое корректно');
});
