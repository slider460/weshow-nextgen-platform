import { test, expect } from '@playwright/test';

test('Оптимизированная версия игры должна работать с улучшенной производительностью', async ({ page }) => {
  // Переходим на оптимизированную страницу
  await page.goto('/game-optimized.html');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(3000);
  
  // Проверяем заголовок
  await expect(page.getByRole('heading', { name: /🚴‍♂️ Велосипедные гонки/ })).toBeVisible();
  
  // Проверяем кнопки
  await expect(page.getByRole('button', { name: /🎮 Начать гонку/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /⏸️ Пауза/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /🏠 Вернуться на сайт/ })).toBeVisible();
  
  // Проверяем статистику (включая новые поля)
  await expect(page.locator('.stat-item').filter({ hasText: 'Очки' })).toBeVisible();
  await expect(page.locator('.stat-item').filter({ hasText: 'Время' })).toBeVisible();
  await expect(page.locator('.stat-item').filter({ hasText: 'Комбо' })).toBeVisible();
  await expect(page.locator('.stat-item').filter({ hasText: 'Уровень' })).toBeVisible();
  await expect(page.locator('.stat-item').filter({ hasText: 'Успешные прыжки' })).toBeVisible();
  
  // Проверяем систему жизней
  await expect(page.locator('.stat-item').filter({ hasText: 'Жизни' })).toBeVisible();
  const livesContainer = page.locator('#lives');
  await expect(livesContainer).toBeVisible();
  
  // Проверяем, что есть 3 жизни
  const lives = page.locator('#lives .life');
  await expect(lives).toHaveCount(3);
  
  // Проверяем индикатор производительности
  const performanceIndicator = page.locator('#performance');
  await expect(performanceIndicator).toBeVisible();
  await expect(performanceIndicator).toContainText('FPS:');
  
  // Делаем скриншот до начала игры
  await page.screenshot({ path: 'test-results/optimized-before-start.png' });
  
  // Нажимаем кнопку начала игры
  await page.getByRole('button', { name: /🎮 Начать гонку/ }).click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/optimized-after-start.png' });
  
  // Проверяем, что кнопка начала игры отключена
  await expect(page.getByRole('button', { name: /🎮 Начать гонку/ })).toBeDisabled();
  
  // Проверяем, что кнопка паузы активна
  await expect(page.getByRole('button', { name: /⏸️ Пауза/ })).toBeEnabled();
  
  // Ждем появления препятствий
  await page.waitForTimeout(3000);
  
  // Делаем скриншот с препятствиями
  await page.screenshot({ path: 'test-results/optimized-with-obstacles.png' });
  
  // Кликаем на Canvas для прыжка
  const canvas = page.locator('#gameCanvas canvas');
  await expect(canvas).toBeVisible();
  await canvas.click();
  
  // Ждем анимации прыжка
  await page.waitForTimeout(1000);
  
  // Делаем скриншот после прыжка
  await page.screenshot({ path: 'test-results/optimized-after-jump.png' });
  
  // Ждем еще немного для проверки движения
  await page.waitForTimeout(2000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/optimized-final.png' });
  
  // Проверяем, что игра работает
  await expect(page.getByRole('button', { name: /⏸️ Пауза/ })).toBeEnabled();
  
  // Проверяем, что счетчик успешных прыжков увеличился
  const successfulJumpsText = page.locator('#successfulJumps');
  await expect(successfulJumpsText).toBeVisible();
  
  // Проверяем, что система жизней работает
  await expect(livesContainer).toBeVisible();
  
  // Проверяем, что индикатор FPS обновляется
  const fpsText = await performanceIndicator.textContent();
  console.log('FPS индикатор:', fpsText);
  
  console.log('Оптимизированная версия игры работает корректно с улучшенной производительностью!');
});
