import { test, expect } from '@playwright/test';

test('простая версия игры должна работать', async ({ page }) => {
  // Переходим на страницу простой игры
  await page.goto('/game-simple');
  
  // Ждем загрузки страницы
  await page.waitForTimeout(2000);
  
  // Проверяем заголовок
  await expect(page.getByRole('heading', { name: 'Простая игра' })).toBeVisible();
  
  // Проверяем Canvas
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  
  // Делаем скриншот начального состояния
  await page.screenshot({ path: 'test-results/simple-game-initial.png' });
  
  // Проверяем текст на странице
  await expect(page.getByText('Canvas должен отображаться выше')).toBeVisible();
  
  console.log('Простая версия игры работает корректно');
});
