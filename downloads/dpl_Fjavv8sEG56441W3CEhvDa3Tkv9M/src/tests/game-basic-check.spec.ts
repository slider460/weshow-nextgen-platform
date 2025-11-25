import { test, expect } from '@playwright/test';

test('базовая проверка игры', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Делаем скриншот до начала игры
  await page.screenshot({ path: 'test-results/basic-before-start.png' });
  
  // Проверяем, что кнопка начала игры видна
  const startButton = page.getByRole('button', { name: /Начать гонку/ });
  await expect(startButton).toBeVisible();
  
  // Нажимаем кнопку начала игры
  await startButton.click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/basic-after-start.png' });
  
  // Проверяем, что кнопка изменилась на "Гонка идет!"
  await expect(page.getByRole('button', { name: /Гонка идет!/ })).toBeVisible();
  
  // Ждем еще немного
  await page.waitForTimeout(3000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/basic-final.png' });
  
  console.log('Базовая проверка игры завершена');
});
