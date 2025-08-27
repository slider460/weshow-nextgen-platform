import { test, expect } from '@playwright/test';

test('Canvas должен отображаться и обновляться', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Делаем скриншот до начала игры
  await page.screenshot({ path: 'test-results/canvas-simple-before.png' });
  
  // Проверяем, что кнопка начала игры видна
  const startButton = page.getByRole('button', { name: /Начать гонку/ });
  await expect(startButton).toBeVisible();
  
  // Нажимаем кнопку начала игры
  await startButton.click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/canvas-simple-after.png' });
  
  // Проверяем, что кнопка изменилась на "Гонка идет!"
  await expect(page.getByRole('button', { name: /Гонка идет!/ })).toBeVisible();
  
  // Ждем еще немного для появления препятствий
  await page.waitForTimeout(3000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/canvas-simple-final.png' });
  
  console.log('Canvas тест завершен успешно');
});
