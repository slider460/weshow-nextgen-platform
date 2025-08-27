import { test, expect } from '@playwright/test';

test('проверка игры в браузере - открытое окно', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(3000);
  
  // Проверяем заголовок
  await expect(page.getByRole('heading', { name: /🚴‍♂️ Велосипедные гонки/ })).toBeVisible();
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Проверяем кнопку начала игры
  const startButton = page.getByRole('button', { name: /Начать гонку/ });
  await expect(startButton).toBeVisible();
  
  // Делаем скриншот начального состояния
  await page.screenshot({ path: 'test-results/browser-check-initial.png' });
  
  console.log('Начальное состояние загружено в браузере');
  
  // Нажимаем кнопку начала игры
  await startButton.click();
  
  console.log('Кнопка нажата, ждем запуска игры...');
  
  // Ждем запуска игры
  await page.waitForTimeout(5000);
  
  // Делаем скриншот после запуска
  await page.screenshot({ path: 'test-results/browser-check-after-start.png' });
  
  // Проверяем, что игра запустилась
  await expect(page.getByText(/Гонка идет!/)).toBeVisible();
  
  // Ждем еще немного для проверки анимации
  await page.waitForTimeout(5000);
  
  // Финальный скриншот
  await page.screenshot({ path: 'test-results/browser-check-final.png' });
  
  console.log('Проверка в браузере завершена');
  
  // Оставляем браузер открытым для ручной проверки
  await page.waitForTimeout(10000);
});
