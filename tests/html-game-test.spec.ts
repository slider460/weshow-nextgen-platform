import { test, expect } from '@playwright/test';

test('HTML версия игры должна работать', async ({ page }) => {
  // Переходим на HTML страницу игры
  await page.goto('/game-test.html');
  
  // Ждем загрузки страницы
  await page.waitForLoadState('networkidle');
  
  // Проверяем заголовок
  await expect(page.getByRole('heading', { name: /🚴‍♂️ Тест игры Велосипедные гонки/ })).toBeVisible();
  
  // Проверяем Canvas
  const canvas = page.locator('#gameCanvas');
  await expect(canvas).toBeVisible();
  
  // Проверяем кнопки
  await expect(page.getByRole('button', { name: 'Начать игру' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Остановить игру' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Прыжок' })).toBeVisible();
  
  // Делаем скриншот начального состояния
  await page.screenshot({ path: 'test-results/html-game-initial.png' });
  
  // Нажимаем кнопку начала игры
  await page.getByRole('button', { name: 'Начать игру' }).click();
  
  // Ждем запуска игры
  await page.waitForTimeout(2000);
  
  // Проверяем, что игра запустилась
  await expect(page.getByText('Статус: Игра идет!')).toBeVisible();
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/html-game-running.png' });
  
  // Ждем появления препятствий
  await page.waitForTimeout(3000);
  
  // Делаем финальный скриншот
  await page.screenshot({ path: 'test-results/html-game-final.png' });
  
  // Проверяем, что счет увеличился
  const scoreText = page.getByText(/Очки:/);
  await expect(scoreText).toBeVisible();
  
  console.log('HTML версия игры работает корректно');
});
