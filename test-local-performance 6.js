// Скрипт для проверки производительности локального сайта
const puppeteer = require('puppeteer');

async function testLocalPerformance() {
  console.log('🚀 Запуск тестирования производительности локального сайта...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Включаем мониторинг производительности
    await page.setCacheEnabled(false);
    
    console.log('📊 Измеряем время загрузки...');
    const startTime = Date.now();
    
    // Навигируем на локальный сайт
    await page.goto('http://localhost:8084', { 
      waitUntil: 'networkidle0',
      timeout: 10000 
    });
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ Время загрузки: ${loadTime}ms`);
    
    // Проверяем Web Vitals
    console.log('\n📈 Измеряем Web Vitals...');
    
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const metrics = {};
        
        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            metrics.lcp = lastEntry.startTime;
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            metrics.fcp = entries[0].startTime;
          }
        }).observe({ entryTypes: ['paint'] });
        
        // CLS
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          metrics.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
        
        // TTFB
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        if (navigationEntry) {
          metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        }
        
        setTimeout(() => resolve(metrics), 3000);
      });
    });
    
    console.log('📊 Web Vitals результаты:');
    console.log(`  LCP (Largest Contentful Paint): ${metrics.lcp?.toFixed(2) || 'N/A'}ms`);
    console.log(`  FCP (First Contentful Paint): ${metrics.fcp?.toFixed(2) || 'N/A'}ms`);
    console.log(`  CLS (Cumulative Layout Shift): ${metrics.cls?.toFixed(4) || 'N/A'}`);
    console.log(`  TTFB (Time to First Byte): ${metrics.ttfb?.toFixed(2) || 'N/A'}ms`);
    
    // Проверяем навигацию
    console.log('\n🔗 Проверяем навигацию...');
    
    const navigationTests = [
      '/about',
      '/services',
      '/portfolio',
      '/contact'
    ];
    
    for (const route of navigationTests) {
      try {
        const navStartTime = Date.now();
        await page.goto(`http://localhost:8084${route}`, { 
          waitUntil: 'networkidle0',
          timeout: 5000 
        });
        const navTime = Date.now() - navStartTime;
        
        // Проверяем что страница загрузилась
        const title = await page.title();
        console.log(`  ✅ ${route}: ${navTime}ms - "${title}"`);
      } catch (error) {
        console.log(`  ❌ ${route}: Ошибка - ${error.message}`);
      }
    }
    
    // Проверяем React Query и skeleton loaders
    console.log('\n⚡ Проверяем React Query и skeleton loaders...');
    
    await page.goto('http://localhost:8084', { waitUntil: 'networkidle0' });
    
    // Проверяем наличие skeleton loaders
    const skeletonElements = await page.$$('.animate-pulse');
    console.log(`  📦 Найдено skeleton элементов: ${skeletonElements.length}`);
    
    // Ждем загрузки данных
    await page.waitForTimeout(2000);
    
    // Проверяем что skeleton исчезли
    const remainingSkeletons = await page.$$('.animate-pulse');
    console.log(`  ✅ Skeleton элементов после загрузки: ${remainingSkeletons.length}`);
    
    // Проверяем консоль на ошибки
    console.log('\n🚨 Проверяем ошибки в консоли...');
    
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(3000);
    
    if (consoleErrors.length === 0) {
      console.log('  ✅ Ошибок в консоли не найдено');
    } else {
      console.log(`  ⚠️  Найдено ошибок: ${consoleErrors.length}`);
      consoleErrors.forEach((error, index) => {
        console.log(`    ${index + 1}. ${error}`);
      });
    }
    
    // Проверяем размер bundle
    console.log('\n📦 Анализируем загруженные ресурсы...');
    
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource');
      const jsFiles = entries.filter(entry => entry.name.includes('.js'));
      const cssFiles = entries.filter(entry => entry.name.includes('.css'));
      
      const jsSize = jsFiles.reduce((total, file) => total + (file.transferSize || 0), 0);
      const cssSize = cssFiles.reduce((total, file) => total + (file.transferSize || 0), 0);
      
      return {
        jsFiles: jsFiles.length,
        cssFiles: cssFiles.length,
        jsSize: Math.round(jsSize / 1024), // KB
        cssSize: Math.round(cssSize / 1024), // KB
        totalSize: Math.round((jsSize + cssSize) / 1024) // KB
      };
    });
    
    console.log(`  📄 JS файлов: ${resources.jsFiles}`);
    console.log(`  🎨 CSS файлов: ${resources.cssFiles}`);
    console.log(`  📦 Общий размер: ${resources.totalSize}KB`);
    
    // Итоговая оценка
    console.log('\n🎯 ИТОГОВАЯ ОЦЕНКА:');
    
    const score = {
      loadTime: loadTime < 3000 ? '✅ Отлично' : loadTime < 5000 ? '⚠️ Хорошо' : '❌ Нужно улучшить',
      lcp: metrics.lcp && metrics.lcp < 2500 ? '✅ Отлично' : '⚠️ Нужно улучшить',
      fcp: metrics.fcp && metrics.fcp < 1800 ? '✅ Отлично' : '⚠️ Нужно улучшить',
      cls: metrics.cls && metrics.cls < 0.1 ? '✅ Отлично' : '⚠️ Нужно улучшить',
      errors: consoleErrors.length === 0 ? '✅ Отлично' : '⚠️ Есть ошибки'
    };
    
    console.log(`  ⏱️  Время загрузки: ${score.loadTime}`);
    console.log(`  🎨 LCP: ${score.lcp}`);
    console.log(`  ⚡ FCP: ${score.fcp}`);
    console.log(`  📐 CLS: ${score.cls}`);
    console.log(`  🚨 Ошибки: ${score.errors}`);
    
    const excellentCount = Object.values(score).filter(s => s.includes('✅')).length;
    const totalCount = Object.keys(score).length;
    
    console.log(`\n🏆 ОБЩАЯ ОЦЕНКА: ${excellentCount}/${totalCount} показателей в зеленой зоне`);
    
    if (excellentCount === totalCount) {
      console.log('🎉 ОТЛИЧНО! Сайт полностью оптимизирован!');
    } else if (excellentCount >= totalCount * 0.8) {
      console.log('👍 ХОРОШО! Сайт работает отлично!');
    } else {
      console.log('🔧 ЕСТЬ ЧТО УЛУЧШИТЬ! Проверьте рекомендации выше.');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  } finally {
    await browser.close();
  }
}

// Запускаем тест если скрипт вызван напрямую
if (require.main === module) {
  testLocalPerformance().catch(console.error);
}

module.exports = { testLocalPerformance };
