import { test, expect } from '@playwright/test';

test('тест Canvas на простой HTML странице', async ({ page }) => {
  // Переходим на тестовую страницу Canvas
  await page.goto('/canvas-test.html');
  
  // Ждем загрузки страницы
  await page.waitForLoadState('networkidle');
  
  // Проверяем Canvas
  const canvas = page.locator('#gameCanvas');
  await expect(canvas).toBeVisible();
  
  // Ждем автоматического теста
  await page.waitForTimeout(2000);
  
  // Проверяем статус
  const status = page.locator('#status');
  await expect(status).toContainText('Рисование завершено');
  
  // Нажимаем кнопку проверки данных
  await page.getByRole('button', { name: 'Проверить данные' }).click();
  
  // Ждем обновления данных
  await page.waitForTimeout(1000);
  
  // Проверяем данные
  const data = page.locator('#data');
  await expect(data).toContainText('Есть данные');
  
  // Делаем скриншот
  await page.screenshot({ path: 'test-results/canvas-test-page.png' });
  
  console.log('Canvas тестовая страница работает корректно');
});
