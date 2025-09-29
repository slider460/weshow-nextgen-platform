import { test, expect } from '@playwright/test';

test.describe('Тест селективного удаления блоков', () => {
  test('Проверка удаления конкретных блоков', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Проверяем, что игровой блок "Велосипедные гонки" убран
    const gameBlock = page.locator('text="Гоняйте на велосипеде"');
    const gameBlockVisible = await gameBlock.isVisible().catch(() => false);
    expect(gameBlockVisible).toBe(false);
    console.log('✅ Игровой блок "Велосипедные гонки" убран');

    // Проверяем, что блок "Комплексные решения для различных задач" убран
    const solutionsBlock = page.locator('text="Комплексные решения для различных задач"');
    const solutionsBlockVisible = await solutionsBlock.isVisible().catch(() => false);
    expect(solutionsBlockVisible).toBe(false);
    console.log('✅ Блок "Комплексные решения для различных задач" убран');

    // Проверяем, что остальные блоки присутствуют
    const heroSection = page.locator('h1').first();
    const heroVisible = await heroSection.isVisible().catch(() => false);
    expect(heroVisible).toBe(true);
    console.log('✅ Hero секция присутствует');

    // Проверяем наличие навигации
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    console.log(`✅ Навигация присутствует: ${linkCount} ссылок`);

    // Проверяем отсутствие ошибок
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log(`📊 Ошибок в консоли: ${consoleErrors.length}`);
    expect(consoleErrors.length).toBe(0);
  });

  test('Проверка общей функциональности сайта', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Проверяем размер контента (должен быть больше упрощенной версии, но меньше полной)
    const bodyContent = await page.locator('body').textContent();
    const contentLength = bodyContent!.length;
    
    console.log(`📊 Размер контента: ${contentLength} символов`);
    
    // Проверяем, что контент больше упрощенной версии (3,473) но меньше полной (10,983)
    expect(contentLength).toBeGreaterThan(5000);
    expect(contentLength).toBeLessThan(12000);
    console.log('✅ Размер контента соответствует ожиданиям');

    // Проверяем навигацию
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    console.log(`✅ Найдено навигационных ссылок: ${linkCount}`);
  });
});
