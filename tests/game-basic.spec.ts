import { test, expect } from '@playwright/test';

test.describe('Велосипедные гонки - Базовые тесты', () => {
  test('должна загружаться страница игры', async ({ page }) => {
    // Переходим на страницу игры
    await page.goto('/game');
    
    // Проверяем заголовок
    await expect(page.getByRole('heading', { name: /🚴‍♂️ Велосипедные гонки/ })).toBeVisible();
    
    // Проверяем описание
    await expect(page.getByText(/Ездите на велосипеде и перепрыгивайте мультимедийную технику/)).toBeVisible();
    
    // Проверяем кнопку начала игры
    await expect(page.getByRole('button', { name: /Начать гонку/ })).toBeVisible();
    
    // Проверяем кнопку возврата на сайт
    await expect(page.getByRole('button', { name: /Вернуться на сайт/ })).toBeVisible();
  });

  test('должна отображаться кнопка начала игры', async ({ page }) => {
    await page.goto('/game');
    
    const startButton = page.getByRole('button', { name: /Начать гонку/ });
    await expect(startButton).toBeVisible();
    await expect(startButton).toBeEnabled();
  });

  test('должна работать кнопка возврата на сайт', async ({ page }) => {
    await page.goto('/game');
    
    const returnButton = page.getByRole('button', { name: /Вернуться на сайт/ });
    await expect(returnButton).toBeVisible();
    
    // Нажимаем кнопку возврата
    await returnButton.click();
    
    // Проверяем, что перешли на главную страницу
    await expect(page).toHaveURL('/');
  });

  test('должен отображаться Canvas для игры', async ({ page }) => {
    await page.goto('/game');
    
    // Проверяем, что Canvas присутствует
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Проверяем размеры Canvas
    const canvasElement = await canvas.elementHandle();
    if (canvasElement) {
      const box = await canvasElement.boundingBox();
      expect(box?.width).toBeGreaterThan(0);
      expect(box?.height).toBeGreaterThan(0);
    }
  });

  test('должна отображаться инструкция по управлению', async ({ page }) => {
    await page.goto('/game');
    
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Ждем немного для загрузки
    await page.waitForTimeout(1000);
    
    // Проверяем инструкции (они должны быть видны в игровом режиме)
    await expect(page.getByText(/Клик или пробел для прыжка/)).toBeVisible();
    await expect(page.getByText(/Избегайте мультимедийную технику/)).toBeVisible();
  });

  test('должно отображаться описание препятствий', async ({ page }) => {
    await page.goto('/game');
    
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Ждем немного для загрузки
    await page.waitForTimeout(1000);
    
    // Проверяем описание препятствий
    await expect(page.getByText(/Проектор/)).toBeVisible();
    await expect(page.getByText(/Сенсорная панель/)).toBeVisible();
    await expect(page.getByText(/Компьютер/)).toBeVisible();
    await expect(page.getByText(/Колонка/)).toBeVisible();
    await expect(page.getByText(/Камера/)).toBeVisible();
  });
});

test.describe('Интеграция с основным сайтом', () => {
  test('должна быть доступна с главной страницы', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Проверяем, что есть кнопка игры в Header
    const gameButton = page.getByRole('button', { name: /🚴‍♂️ Гонять и выиграть скидку!/ });
    await expect(gameButton).toBeVisible();
    
    // Переходим на страницу игры
    await gameButton.click();
    
    // Проверяем, что перешли на страницу игры
    await expect(page).toHaveURL('/game');
  });

  test('должна быть доступна из промо-секции', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Прокручиваем к промо-секции
    await page.evaluate(() => {
      const promoSection = document.querySelector('[class*="GamePromoSection"]');
      if (promoSection) {
        promoSection.scrollIntoView();
      }
    });
    
    // Проверяем промо-секцию игры
    await expect(page.getByText(/Гоняйте на велосипеде и выигрывайте скидки/)).toBeVisible();
    
    // Нажимаем кнопку "Начать гонку" в промо-секции
    const startGameLink = page.getByRole('link', { name: /🚴‍♂️ Начать гонку/ });
    await expect(startGameLink).toBeVisible();
    await startGameLink.click();
    
    // Проверяем, что перешли на страницу игры
    await expect(page).toHaveURL('/game');
  });

  test('должна быть доступна из Footer', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Прокручиваем к Footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Проверяем секцию игры в Footer
    await expect(page.getByText(/🚴‍♂️ Велосипедные гонки/)).toBeVisible();
    
    // Нажимаем кнопку "Начать гонку" в Footer
    const startGameLink = page.getByRole('link', { name: /Начать гонку/ });
    await expect(startGameLink).toBeVisible();
    await startGameLink.click();
    
    // Проверяем, что перешли на страницу игры
    await expect(page).toHaveURL('/game');
  });
});
