import { test, expect } from '@playwright/test';

test('детальная отладка игры', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(3000);
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Делаем скриншот начального состояния
  await page.screenshot({ path: 'test-results/debug-initial.png' });
  
  // Проверяем кнопку начала игры
  const startButton = page.getByRole('button', { name: /Начать гонку/ });
  await expect(startButton).toBeVisible();
  
  console.log('Начальное состояние загружено');
  
  // Нажимаем кнопку начала игры
  await startButton.click();
  
  console.log('Кнопка нажата, ждем запуска игры...');
  
  // Ждем запуска игры
  await page.waitForTimeout(5000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/debug-after-start.png' });
  
  // Проверяем, что Canvas все еще видим
  await expect(canvas).toBeVisible();
  
  // Проверяем, что кнопка начала игры исчезла
  await expect(startButton).not.toBeVisible();
  
  // Проверяем, что игра действительно запустилась
  // Должны быть видны элементы UI в Canvas
  const canvasElement = await canvas.elementHandle();
  if (canvasElement) {
    // Проверяем размеры Canvas
    const box = await canvasElement.boundingBox();
    console.log(`Canvas размеры: ${box?.width} x ${box?.height}`);
    
    // Проверяем, что Canvas не пустой
    const canvasData = await page.evaluate((canvas) => {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return {
          width: canvas.width,
          height: canvas.height,
          hasData: imageData.data.some(pixel => pixel !== 0)
        };
      }
      return null;
    }, canvasElement);
    
    console.log('Canvas данные:', canvasData);
  }
  
  // Ждем еще немного для проверки анимации
  await page.waitForTimeout(3000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/debug-final.png' });
  
  console.log('Детальная отладка завершена');
});
