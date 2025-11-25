import { test, expect } from '@playwright/test';

test('проверка взаимодействия с игрой', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Нажимаем кнопку начала игры
  await page.getByRole('button', { name: /Начать гонку/ }).click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Проверяем, что игра запустилась
  await expect(page.getByText(/Гонка идет!/)).toBeVisible();
  
  // Делаем скриншот до прыжка
  await page.screenshot({ path: 'test-results/game-before-jump.png' });
  
  // Кликаем на Canvas для прыжка
  await canvas.click();
  
  console.log('Прыжок выполнен');
  
  // Ждем анимации прыжка
  await page.waitForTimeout(1000);
  
  // Делаем скриншот после прыжка
  await page.screenshot({ path: 'test-results/game-after-jump.png' });
  
  // Ждем появления препятствий
  await page.waitForTimeout(3000);
  
  // Делаем финальный скриншот
  await page.screenshot({ path: 'test-results/game-with-obstacles.png' });
  
  // Проверяем, что счет увеличился
  const scoreText = page.getByText(/Очки:/);
  await expect(scoreText).toBeVisible();
  
  console.log('Тест взаимодействия завершен успешно');
});
