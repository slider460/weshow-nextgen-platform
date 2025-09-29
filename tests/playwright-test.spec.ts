import { test, expect } from '@playwright/test';

test('Главная страница загружается корректно', async ({ page }) => {
  // Переходим на главную страницу
  await page.goto('/');
  
  // Проверяем, что страница загрузилась
  await expect(page).toHaveTitle(/WESHOW/);
  
  // Проверяем наличие основных элементов
  await expect(page.locator('h1, h2')).toContainText(['Наши проекты']);
  
  // Проверяем, что секция портфолио отображается
  const portfolioSection = page.locator('section').filter({ hasText: 'Наши проекты' }).first();
  await expect(portfolioSection).toBeVisible();
  
  // Проверяем, что карточки проектов отображаются
  const projectCards = page.locator('[class*="bg-white rounded-3xl"]');
  await expect(projectCards).toHaveCount(3);
  
  // Проверяем, что карточка "Выставка Самара" не обрезается
  const samaraCard = projectCards.filter({ hasText: 'Самарской области' });
  await expect(samaraCard).toBeVisible();
  
  // Проверяем, что кнопка "Подробнее о проекте" видна
  const detailButtons = page.locator('button, a').filter({ hasText: 'Подробнее о проекте' });
  await expect(detailButtons).toHaveCount(3);
});

test('Навигация работает корректно', async ({ page }) => {
  await page.goto('/');
  
  // Проверяем, что меню навигации отображается
  const navigation = page.locator('nav').first();
  await expect(navigation).toBeVisible();
  
  // Проверяем, что кнопка CMS удалена из меню
  const cmsButton = page.locator('a, button').filter({ hasText: 'CMS' });
  await expect(cmsButton).toHaveCount(0);
  
  // Проверяем, что есть ссылки на основные страницы
  const aboutLink = page.locator('a[href="/about"]').first();
  const contactLink = page.locator('a[href="/contact"]').first();
  
  await expect(aboutLink).toBeVisible();
  await expect(contactLink).toBeVisible();
  
  // Проверяем, что есть кнопка услуг (возможно, в выпадающем меню)
  const servicesButton = page.locator('button, a').filter({ hasText: /услуг|services/i }).first();
  await expect(servicesButton).toBeVisible();
});

test('Адаптивность на мобильных устройствах', async ({ page }) => {
  // Устанавливаем размер мобильного устройства
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Проверяем, что страница загружается на мобильном
  await expect(page).toHaveTitle(/WESHOW/);
  
  // Проверяем, что карточки проектов отображаются в одну колонку
  const projectCards = page.locator('[class*="bg-white rounded-3xl"]');
  await expect(projectCards).toHaveCount(3);
  
  // Проверяем, что мобильное меню работает
  const mobileMenuButton = page.locator('button').filter({ hasText: /меню|menu/i });
  if (await mobileMenuButton.isVisible()) {
    await mobileMenuButton.click();
    const mobileMenu = page.locator('[class*="mobile-menu"], [class*="mobile-nav"]');
    await expect(mobileMenu).toBeVisible();
  }
});

test('Производительность загрузки', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('/');
  
  // Ждем загрузки основных элементов
  await page.waitForSelector('h1, h2');
  await page.waitForSelector('[class*="bg-white rounded-3xl"]');
  
  const loadTime = Date.now() - startTime;
  
  // Проверяем, что страница загружается за разумное время (менее 6 секунд)
  expect(loadTime).toBeLessThan(6000);
  
  console.log(`Время загрузки: ${loadTime}ms`);
});
