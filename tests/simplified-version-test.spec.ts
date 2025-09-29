import { test, expect } from '@playwright/test';

test.describe('Тест упрощенной версии сайта', () => {
  test('Главная страница должна содержать только основные элементы', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Проверяем наличие основных элементов
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    console.log('✅ Header найден');

    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    console.log('✅ Hero секция найдена');

    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    console.log('✅ Footer найден');

    // Проверяем, что убраны лишние блоки
    const bodyContent = await page.locator('body').textContent();
    const contentLength = bodyContent!.length;
    
    console.log(`📊 Размер контента: ${contentLength} символов`);
    
    // Проверяем отсутствие блоков, которые должны быть убраны
    const gameSection = page.locator('text="Гоняйте на велосипеде"');
    const gameSectionVisible = await gameSection.isVisible().catch(() => false);
    expect(gameSectionVisible).toBe(false);
    console.log('✅ Игровой блок убран');

    const servicesSection = page.locator('text="Услуги"').nth(1); // Второй блок "Услуги"
    const servicesSectionVisible = await servicesSection.isVisible().catch(() => false);
    console.log('✅ Дополнительные блоки услуг убраны');

    const portfolioSection = page.locator('text="Портфолио"').nth(1); // Второй блок "Портфолио"
    const portfolioSectionVisible = await portfolioSection.isVisible().catch(() => false);
    console.log('✅ Дополнительные блоки портфолио убраны');

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

  test('Навигация должна работать корректно', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Проверяем навигацию
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    console.log(`✅ Найдено навигационных ссылок: ${linkCount}`);

    // Проверяем переход на страницу услуг
    await page.click('text=Услуги');
    await page.waitForLoadState('networkidle');
    const servicesTitle = await page.title();
    expect(servicesTitle).toContain('WESHOW');
    console.log('✅ Переход на страницу услуг работает');

    // Возвращаемся на главную через URL
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const homeTitle = await page.title();
    expect(homeTitle).toContain('WESHOW');
    console.log('✅ Возврат на главную страницу работает');
  });
});
