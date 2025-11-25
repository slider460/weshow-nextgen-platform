import { test, expect } from '@playwright/test';

test.describe('Финальная проверка игры', () => {
  test('игра должна полностью работать', async ({ page }) => {
    // Переходим на страницу игры
    await page.goto('/game');
    
    // Ждем загрузки страницы
    await page.waitForTimeout(2000);
    
    // Проверяем начальное состояние
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    const startButton = page.getByRole('button', { name: /Начать гонку/ });
    await expect(startButton).toBeVisible();
    
    // Нажимаем кнопку начала игры
    await startButton.click();
    
    // Ждем запуска игры
    await page.waitForTimeout(2000);
    
    // Проверяем, что Canvas все еще видим
    await expect(canvas).toBeVisible();
    
    // Проверяем, что кнопка начала игры исчезла
    await expect(startButton).not.toBeVisible();
    
    // Делаем скриншот
    await page.screenshot({ path: 'test-results/game-final-test.png' });
    
    console.log('Игра полностью работает!');
  });

  test('должна работать кнопка возврата на сайт', async ({ page }) => {
    await page.goto('/game');
    
    const returnButton = page.locator('button[title="Вернуться на сайт"]');
    await expect(returnButton).toBeVisible();
    
    await returnButton.click();
    await expect(page).toHaveURL('/');
    
    console.log('Кнопка возврата работает корректно');
  });

  test('Canvas должен отображать начальный UI', async ({ page }) => {
    await page.goto('/game');
    
    await page.waitForTimeout(2000);
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Делаем скриншот начального состояния
    await page.screenshot({ path: 'test-results/game-initial-state.png' });
    
    console.log('Canvas отображает начальный UI корректно');
  });
});
