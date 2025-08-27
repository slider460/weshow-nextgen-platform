import { test, expect } from '@playwright/test';

test('Проверка анимации игры', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Делаем скриншот до начала игры
  await page.screenshot({ path: 'test-results/animation-check-before.png' });
  
  // Нажимаем кнопку начала игры
  await page.getByRole('button', { name: /Начать гонку/ }).click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/animation-check-after-start.png' });
  
  // Проверяем, что кнопка изменилась на "Гонка идет!"
  await expect(page.getByRole('button', { name: /Гонка идет!/ })).toBeVisible();
  
  // Ждем появления препятствий
  await page.waitForTimeout(3000);
  
  // Делаем скриншот с препятствиями
  await page.screenshot({ path: 'test-results/animation-check-with-obstacles.png' });
  
  // Кликаем на Canvas для прыжка
  await canvas.click();
  
  // Ждем анимации прыжка
  await page.waitForTimeout(1000);
  
  // Делаем скриншот после прыжка
  await page.screenshot({ path: 'test-results/animation-check-after-jump.png' });
  
  // Ждем еще немного для проверки движения
  await page.waitForTimeout(2000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/animation-check-final.png' });
  
  // Проверяем, что игра работает
  await expect(page.getByRole('button', { name: /Гонка идет!/ })).toBeVisible();
  
  console.log('Проверка анимации завершена успешно!');
});
