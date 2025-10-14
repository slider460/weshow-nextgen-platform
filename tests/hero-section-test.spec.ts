import { test, expect } from '@playwright/test';

test.describe('Тест главного блока (Hero Section)', () => {
  test('Главный блок должен загружаться с полным контентом', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Проверяем наличие основных элементов Hero секции
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Проверяем наличие заголовка
    const mainTitle = page.locator('h1').first();
    await expect(mainTitle).toBeVisible();
    
    const titleText = await mainTitle.textContent();
    expect(titleText).toContain('Комплексные');
    expect(titleText).toContain('мультимедийные');
    expect(titleText).toContain('решения');
    
    console.log('✅ Главный заголовок найден:', titleText);

    // Проверяем наличие кнопок
    const buttons = page.locator('button, a[role="button"]');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    console.log(`✅ Найдено кнопок: ${buttonCount}`);

    // Проверяем наличие описания
    const description = page.locator('p').first();
    const descriptionText = await description.textContent();
    expect(descriptionText).toBeTruthy();
    
    console.log('✅ Описание найдено:', descriptionText?.substring(0, 100) + '...');

    // Проверяем градиентные эффекты
    const gradientElements = page.locator('[class*="gradient"]');
    const gradientCount = await gradientElements.count();
    expect(gradientCount).toBeGreaterThan(0);
    
    console.log(`✅ Найдено градиентных элементов: ${gradientCount}`);

    // Делаем скриншот для визуальной проверки
    await page.screenshot({ path: 'test-results/hero-section.png', fullPage: true });
    
    console.log('✅ Главный блок загружен корректно со всеми элементами');
  });

  test('Проверка интерактивности главного блока', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Проверяем кнопку "Получить консультацию"
    const consultButton = page.locator('button, a').filter({ hasText: /консультац|consult/i });
    if (await consultButton.count() > 0) {
      await expect(consultButton.first()).toBeVisible();
      console.log('✅ Кнопка консультации найдена');
    }

    // Проверяем кнопку Showreel
    const showreelButton = page.locator('button, a').filter({ hasText: /showreel|видео|video/i });
    if (await showreelButton.count() > 0) {
      await expect(showreelButton.first()).toBeVisible();
      console.log('✅ Кнопка Showreel найдена');
    }

    // Проверяем анимированные элементы
    const animatedElements = page.locator('[class*="animate-"]');
    const animatedCount = await animatedElements.count();
    expect(animatedCount).toBeGreaterThan(0);
    
    console.log(`✅ Найдено анимированных элементов: ${animatedCount}`);
  });

  test('Проверка адаптивности главного блока', async ({ page }) => {
    // Тест на мобильном устройстве
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const mobileHero = page.locator('section').first();
    await expect(mobileHero).toBeVisible();
    
    console.log('✅ Главный блок отображается на мобильном устройстве');

    // Тест на планшете
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');
    
    const tabletHero = page.locator('section').first();
    await expect(tabletHero).toBeVisible();
    
    console.log('✅ Главный блок отображается на планшете');

    // Тест на десктопе
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('networkidle');
    
    const desktopHero = page.locator('section').first();
    await expect(desktopHero).toBeVisible();
    
    console.log('✅ Главный блок отображается на десктопе');
  });
});













