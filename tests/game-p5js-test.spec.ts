import { test, expect } from '@playwright/test';

test('p5.js версия игры должна работать', async ({ page }) => {
  // Переходим на p5.js страницу
  await page.goto('/game-p5js.html');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(3000);
  
  // Проверяем заголовок
  await expect(page.getByRole('heading', { name: /🚴‍♂️ Велосипедные гонки/ })).toBeVisible();
  
  // Проверяем кнопки
  await expect(page.getByRole('button', { name: /🎮 Начать гонку/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /⏸️ Пауза/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /🏠 Вернуться на сайт/ })).toBeVisible();
  
  // Проверяем статистику (используем более точные селекторы)
  await expect(page.locator('.stat-item').filter({ hasText: 'Очки' })).toBeVisible();
  await expect(page.locator('.stat-item').filter({ hasText: 'Время' })).toBeVisible();
  await expect(page.locator('.stat-item').filter({ hasText: 'Комбо' })).toBeVisible();
  await expect(page.locator('.stat-item').filter({ hasText: 'Уровень' })).toBeVisible();
  
  // Делаем скриншот до начала игры
  await page.screenshot({ path: 'test-results/p5js-before-start.png' });
  
  // Нажимаем кнопку начала игры
  await page.getByRole('button', { name: /🎮 Начать гонку/ }).click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/p5js-after-start.png' });
  
  // Проверяем, что кнопка начала игры отключена
  await expect(page.getByRole('button', { name: /🎮 Начать гонку/ })).toBeDisabled();
  
  // Проверяем, что кнопка паузы активна
  await expect(page.getByRole('button', { name: /⏸️ Пауза/ })).toBeEnabled();
  
  // Ждем появления препятствий
  await page.waitForTimeout(3000);
  
  // Делаем скриншот с препятствиями
  await page.screenshot({ path: 'test-results/p5js-with-obstacles.png' });
  
  // Кликаем на Canvas для прыжка
  const canvas = page.locator('#gameCanvas canvas');
  await expect(canvas).toBeVisible();
  await canvas.click();
  
  // Ждем анимации прыжка
  await page.waitForTimeout(1000);
  
  // Делаем скриншот после прыжка
  await page.screenshot({ path: 'test-results/p5js-after-jump.png' });
  
  // Ждем еще немного для проверки движения
  await page.waitForTimeout(2000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/p5js-final.png' });
  
  // Проверяем, что игра работает
  await expect(page.getByRole('button', { name: /⏸️ Пауза/ })).toBeEnabled();
  
  console.log('p5.js версия игры работает корректно!');
});
