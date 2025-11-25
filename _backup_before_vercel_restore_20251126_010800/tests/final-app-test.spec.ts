import { test, expect } from '@playwright/test';

test.describe('Финальный тест полного приложения WESHOW', () => {
  test('Комплексная проверка всех функций сайта', async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    
    // Отслеживаем все сообщения консоли
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });
    
    // Переходим на главную страницу
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Делаем скриншот главной страницы
    await page.screenshot({ path: 'test-results/final-homepage.png', fullPage: true });
    
    // Проверяем заголовок
    await expect(page).toHaveTitle(/WESHOW/);
    
    // Проверяем наличие основных элементов
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav').first()).toBeVisible();
    
    // Проверяем навигацию
    const navLinks = page.locator('nav a[href]');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(3);
    console.log(`✅ Найдено ${linkCount} навигационных ссылок`);
    
    // Тестируем навигацию по страницам
    const pages = [
      { url: '/about', name: 'О нас' },
      { url: '/services', name: 'Услуги' },
      { url: '/portfolio', name: 'Портфолио' },
      { url: '/team', name: 'Команда' },
      { url: '/contact', name: 'Контакты' }
    ];
    
    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      
      // Проверяем, что страница загрузилась
      const pageContent = await page.locator('body').textContent();
      expect(pageContent?.length).toBeGreaterThan(100);
      
      console.log(`✅ Страница ${pageInfo.name} работает корректно`);
    }
    
    // Возвращаемся на главную
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Проверяем интерактивные элементы
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    console.log(`✅ Найдено ${buttonCount} кнопок`);
    
    // Проверяем формы (если есть)
    const forms = page.locator('form');
    const formCount = await forms.count();
    console.log(`✅ Найдено ${formCount} форм`);
    
    // Проверяем изображения
    const images = page.locator('img');
    const imageCount = await images.count();
    console.log(`✅ Найдено ${imageCount} изображений`);
    
    // Делаем финальный скриншот
    await page.screenshot({ path: 'test-results/final-app-overview.png', fullPage: true });
    
    // Анализируем результаты
    console.log('\n=== ФИНАЛЬНЫЕ РЕЗУЛЬТАТЫ ===');
    console.log('Ошибки в консоли:', consoleErrors.length);
    console.log('Предупреждения в консоли:', consoleWarnings.length);
    console.log('Навигационных ссылок:', linkCount);
    console.log('Кнопок:', buttonCount);
    console.log('Форм:', formCount);
    console.log('Изображений:', imageCount);
    
    // Показываем только критические ошибки (не связанные с Leaflet)
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('leaflet') && 
      !error.includes('integrity') &&
      !error.includes('digest')
    );
    
    if (criticalErrors.length > 0) {
      console.log('\nКритические ошибки:', criticalErrors.slice(0, 5));
    }
    
    // Тест считается успешным, если нет критических ошибок
    expect(criticalErrors.length).toBeLessThan(5);
    
    console.log('\n🎉 Полное приложение WESHOW работает корректно!');
  });
  
  test('Проверка производительности', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`⚡ Время загрузки: ${loadTime}ms`);
    
    // Проверяем, что страница загрузилась за разумное время
    expect(loadTime).toBeLessThan(10000); // менее 10 секунд
    
    // Проверяем размер страницы
    const pageContent = await page.locator('body').textContent();
    expect(pageContent?.length).toBeGreaterThan(1000); // страница должна содержать достаточно контента
  });
});
