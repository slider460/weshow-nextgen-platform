import { test, expect } from '@playwright/test';

test.describe('Велосипедные гонки - Игра', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на страницу игры
    await page.goto('/game');
  });

  test('должна загружаться страница игры', async ({ page }) => {
    // Проверяем заголовок
    await expect(page.getByRole('heading', { name: /🚴‍♂️ Велосипедные гонки/ })).toBeVisible();
    
    // Проверяем описание
    await expect(page.getByText(/Ездите на велосипеде и перепрыгивайте мультимедийную технику/)).toBeVisible();
    
    // Проверяем кнопку начала игры
    await expect(page.getByRole('button', { name: /Начать гонку/ })).toBeVisible();
    
    // Проверяем кнопку возврата на сайт
    await expect(page.getByRole('button', { name: /Вернуться на сайт/ })).toBeVisible();
  });

  test('должна начинаться игра при нажатии кнопки', async ({ page }) => {
    // Нажимаем кнопку начала игры
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Проверяем, что игра началась
    await expect(page.getByText(/Очки:/)).toBeVisible();
    await expect(page.getByText(/Время:/)).toBeVisible();
    await expect(page.getByText(/Комбо:/)).toBeVisible();
    
    // Проверяем, что кнопка начала игры исчезла
    await expect(page.getByRole('button', { name: /Начать гонку/ })).not.toBeVisible();
  });

  test('должна отображаться статистика игры', async ({ page }) => {
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Проверяем статистику
    await expect(page.getByText(/Очки:/)).toBeVisible();
    await expect(page.getByText(/Время:/)).toBeVisible();
    await expect(page.getByText(/Уровень:/)).toBeVisible();
    await expect(page.getByText(/Комбо:/)).toBeVisible();
    
    // Проверяем начальные значения
    await expect(page.getByText('0')).toBeVisible(); // Очки
    await expect(page.getByText('30s')).toBeVisible(); // Время
    await expect(page.getByText('1')).toBeVisible(); // Уровень
    await expect(page.getByText('0x')).toBeVisible(); // Комбо
  });

  test('должен работать таймер игры', async ({ page }) => {
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Ждем немного и проверяем, что время уменьшилось
    await page.waitForTimeout(2000);
    
    // Время должно быть меньше 30
    const timeElement = page.locator('text=/\\d+s/');
    const timeText = await timeElement.textContent();
    const timeValue = parseInt(timeText!.replace('s', ''));
    
    expect(timeValue).toBeLessThan(30);
    expect(timeValue).toBeGreaterThan(0);
  });

  test('должна отображаться инструкция по управлению', async ({ page }) => {
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Проверяем инструкции
    await expect(page.getByText(/Клик или пробел для прыжка/)).toBeVisible();
    await expect(page.getByText(/Избегайте мультимедийную технику/)).toBeVisible();
  });

  test('должно отображаться описание препятствий', async ({ page }) => {
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Проверяем описание препятствий
    await expect(page.getByText(/Проектор/)).toBeVisible();
    await expect(page.getByText(/Сенсорная панель/)).toBeVisible();
    await expect(page.getByText(/Компьютер/)).toBeVisible();
    await expect(page.getByText(/Колонка/)).toBeVisible();
    await expect(page.getByText(/Камера/)).toBeVisible();
  });

  test('должна работать кнопка возврата на сайт', async ({ page }) => {
    // Нажимаем кнопку возврата
    await page.getByRole('button', { name: /Вернуться на сайт/ }).click();
    
    // Проверяем, что перешли на главную страницу
    await expect(page).toHaveURL('/');
  });

  test('должна отображаться кнопка "Гонять снова" после окончания игры', async ({ page }) => {
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Ждем окончания игры (30 секунд)
    await page.waitForTimeout(31000);
    
    // Проверяем, что появились результаты
    await expect(page.getByText(/Попробуйте еще раз!/)).toBeVisible();
    
    // Проверяем кнопку "Гонять снова"
    await expect(page.getByRole('button', { name: /Гонять снова/ })).toBeVisible();
  });

  test('должна работать кнопка "Наши услуги"', async ({ page }) => {
    // Начинаем игру
    await page.getByRole('button', { name: /Начать гонку/ }).click();
    
    // Ждем окончания игры
    await page.waitForTimeout(31000);
    
    // Нажимаем кнопку "Наши услуги"
    await page.getByRole('button', { name: /Наши услуги/ }).click();
    
    // Проверяем, что перешли на страницу услуг
    await expect(page).toHaveURL('/services');
  });
});

test.describe('Интеграция с основным сайтом', () => {
  test('должна быть доступна с главной страницы', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Проверяем, что есть кнопка игры в Header
    await expect(page.getByRole('button', { name: /🚴‍♂️ Гонять и выиграть скидку!/ })).toBeVisible();
    
    // Переходим на страницу игры
    await page.getByRole('button', { name: /🚴‍♂️ Гонять и выиграть скидку!/ }).click();
    
    // Проверяем, что перешли на страницу игры
    await expect(page).toHaveURL('/game');
  });

  test('должна быть доступна из промо-секции', async ({ page }) => {
    // Переходим на главную страницу
    await page.goto('/');
    
    // Проверяем промо-секцию игры
    await expect(page.getByText(/Гоняйте на велосипеде и выигрывайте скидки/)).toBeVisible();
    
    // Нажимаем кнопку "Начать гонку" в промо-секции
    await page.getByRole('link', { name: /🚴‍♂️ Начать гонку/ }).click();
    
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
    await page.getByRole('link', { name: /Начать гонку/ }).click();
    
    // Проверяем, что перешли на страницу игры
    await expect(page).toHaveURL('/game');
  });
});
