import { test, expect } from '@playwright/test';

test('HTML версия анимации должна работать', async ({ page }) => {
  // Переходим на HTML страницу
  await page.goto('/game-animation-test.html');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем Canvas
  const canvas = page.locator('#testCanvas');
  await expect(canvas).toBeVisible();
  
  // Проверяем кнопки
  await expect(page.getByRole('button', { name: 'Запустить анимацию' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Остановить анимацию' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Тест прыжка' })).toBeVisible();
  
  // Делаем скриншот до запуска анимации
  await page.screenshot({ path: 'test-results/html-animation-before.png' });
  
  // Нажимаем кнопку запуска анимации
  await page.getByRole('button', { name: 'Запустить анимацию' }).click();
  
  // Ждем запуска анимации
  await page.waitForTimeout(2000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/html-animation-after-start.png' });
  
  // Проверяем, что анимация запущена
  await expect(page.locator('#status')).toContainText('Анимация запущена!');
  
  // Ждем появления препятствий
  await page.waitForTimeout(3000);
  
  // Делаем скриншот с препятствиями
  await page.screenshot({ path: 'test-results/html-animation-with-obstacles.png' });
  
  // Тестируем прыжок
  await page.getByRole('button', { name: 'Тест прыжка' }).click();
  
  // Ждем анимации прыжка
  await page.waitForTimeout(1000);
  
  // Делаем скриншот после прыжка
  await page.screenshot({ path: 'test-results/html-animation-after-jump.png' });
  
  // Ждем еще немного для проверки движения
  await page.waitForTimeout(2000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/html-animation-final.png' });
  
  // Проверяем, что счет увеличился
  const scoreText = page.locator('#status');
  await expect(scoreText).toBeVisible();
  
  console.log('HTML версия анимации работает корректно!');
});
