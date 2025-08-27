import { test, expect } from '@playwright/test';

test('базовая функциональность игры', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем, что Canvas присутствует
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Проверяем, что кнопка начала игры видна
  const startButton = page.getByRole('button', { name: /Начать гонку/ });
  await expect(startButton).toBeVisible();
  
  // Нажимаем кнопку начала игры
  await startButton.click();
  
  // Ждем немного для запуска игры
  await page.waitForTimeout(3000);
  
  // Делаем скриншот для проверки
  await page.screenshot({ path: 'test-results/game-after-start.png' });
  
  // Проверяем, что Canvas все еще видим
  await expect(canvas).toBeVisible();
  
  console.log('Базовая функциональность игры работает');
});
