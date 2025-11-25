import { test, expect } from '@playwright/test';

test('страница игры должна загружаться', async ({ page }) => {
  // Переходим на страницу игры
  await page.goto('/game');
  
  // Ждем загрузки страницы
  await page.waitForLoadState('networkidle');
  
  // Проверяем заголовок
  await expect(page.getByRole('heading', { name: /🚴‍♂️ Велосипедные гонки/ })).toBeVisible();
  
  // Проверяем описание
  await expect(page.getByText(/Ездите на велосипеде и перепрыгивайте мультимедийную технику/)).toBeVisible();
  
  // Проверяем кнопку начала игры
  await expect(page.getByRole('button', { name: /Начать гонку/ })).toBeVisible();
  
  // Проверяем кнопку возврата на сайт
  await expect(page.getByRole('button', { name: /Вернуться на сайт/ })).toBeVisible();
  
  // Проверяем, что Canvas присутствует в DOM
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Делаем скриншот для проверки
  await page.screenshot({ path: 'test-results/game-page-loaded.png' });
  
  console.log('Страница игры успешно загружена');
});
