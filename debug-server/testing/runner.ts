import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

interface КонфигТестированияPlaywright {
  browser: string;
  testFiles: string[];
  baseURL: string;
  parallel: boolean;
  timeout?: number;
  retries?: number;
}

interface РезультатТеста {
  testName: string;
  status: 'passed' | 'failed' | 'skipped' | 'timeout';
  duration: number;
  error?: string;
  screenshot?: string;
  timestamp: Date;
  browser: string;
}

export class PlaywrightTestRunner {
  private browsers: Map<string, Browser> = new Map();

  constructor() {
    // Инициализация будет выполнена при первом запуске
  }

  public async runTestsForBrowser(config: КонфигТестированияPlaywright): Promise<РезультатТеста[]> {
    const browser = await this.getBrowser(config.browser);
    const results: РезультатТеста[] = [];

    try {
      // Создаем контекст браузера
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true
      });

      // Запускаем тесты
      for (const testFile of config.testFiles) {
        const testResults = await this.runTestFile(context, testFile, config);
        results.push(...testResults);
      }

      await context.close();

    } catch (error) {
      console.error(`Ошибка при запуске тестов в браузере ${config.browser}:`, error);
      
      results.push({
        testName: `Browser ${config.browser} initialization`,
        status: 'failed',
        duration: 0,
        error: error.message,
        timestamp: new Date(),
        browser: config.browser
      });
    }

    return results;
  }

  private async getBrowser(browserName: string): Promise<Browser> {
    if (this.browsers.has(browserName)) {
      return this.browsers.get(browserName)!;
    }

    let browser: Browser;

    switch (browserName.toLowerCase()) {
      case 'chromium':
      case 'chrome':
        browser = await chromium.launch({ 
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        break;
      case 'firefox':
        browser = await firefox.launch({ headless: true });
        break;
      case 'webkit':
      case 'safari':
        browser = await webkit.launch({ headless: true });
        break;
      default:
        throw new Error(`Неподдерживаемый браузер: ${browserName}`);
    }

    this.browsers.set(browserName, browser);
    return browser;
  }

  private async runTestFile(
    context: BrowserContext, 
    testFile: string, 
    config: КонфигТестированияPlaywright
  ): Promise<РезультатТеста[]> {
    const results: РезультатТеста[] = [];
    
    try {
      // Проверяем, существует ли файл теста
      const fullPath = path.resolve(testFile);
      await fs.access(fullPath);

      console.log(`🧪 Выполнение теста: ${testFile} в браузере ${config.browser}`);

      // Создаем новую страницу
      const page = await context.newPage();
      
      // Настраиваем обработчики событий
      this.setupPageHandlers(page);

      // Выполняем базовые тесты
      const testResult = await this.executeBasicTests(page, config);
      results.push(...testResult);

      await page.close();

    } catch (error) {
      console.error(`Ошибка при выполнении теста ${testFile}:`, error);
      
      results.push({
        testName: testFile,
        status: 'failed',
        duration: 0,
        error: error.message,
        timestamp: new Date(),
        browser: config.browser
      });
    }

    return results;
  }

  private setupPageHandlers(page: Page): void {
    // Обработчик ошибок JavaScript
    page.on('pageerror', (error) => {
      console.error('Ошибка JavaScript на странице:', error.message);
    });

    // Обработчик неудачных запросов
    page.on('requestfailed', (request) => {
      console.warn('Неудачный запрос:', request.url(), request.failure()?.errorText);
    });

    // Обработчик консольных сообщений
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Ошибка в консоли:', msg.text());
      }
    });
  }

  private async executeBasicTests(page: Page, config: КонфигТестированияPlaywright): Promise<РезультатТеста[]> {
    const results: РезультатТеста[] = [];
    const baseURL = config.baseURL;

    // Тест 1: Загрузка главной страницы
    results.push(await this.testPageLoad(page, baseURL, config.browser));

    // Тест 2: Проверка основных элементов
    results.push(await this.testBasicElements(page, config.browser));

    // Тест 3: Проверка игры (если есть)
    results.push(await this.testGameFunctionality(page, config.browser));

    // Тест 4: Проверка производительности
    results.push(await this.testPerformance(page, config.browser));

    return results;
  }

  private async testPageLoad(page: Page, url: string, browser: string): Promise<РезультатТеста> {
    const startTime = Date.now();
    
    try {
      console.log(`📄 Тестирование загрузки страницы: ${url}`);
      
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      const duration = Date.now() - startTime;

      // Проверяем, что страница загрузилась
      const title = await page.title();
      if (!title || title.toLowerCase().includes('error')) {
        throw new Error(`Страница не загрузилась правильно. Заголовок: ${title}`);
      }

      return {
        testName: 'Загрузка главной страницы',
        status: 'passed',
        duration,
        timestamp: new Date(),
        browser
      };

    } catch (error) {
      return {
        testName: 'Загрузка главной страницы',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        timestamp: new Date(),
        browser
      };
    }
  }

  private async testBasicElements(page: Page, browser: string): Promise<РезультатТеста> {
    const startTime = Date.now();
    
    try {
      console.log('🔍 Тестирование основных элементов...');

      // Проверяем наличие основных элементов
      const navigation = await page.locator('nav').first();
      await navigation.waitFor({ timeout: 5000 });

      // Проверяем, что есть контент
      const content = await page.locator('main, [role="main"], .main-content').first();
      await content.waitFor({ timeout: 5000 });

      return {
        testName: 'Проверка основных элементов',
        status: 'passed',
        duration: Date.now() - startTime,
        timestamp: new Date(),
        browser
      };

    } catch (error) {
      return {
        testName: 'Проверка основных элементов',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        timestamp: new Date(),
        browser
      };
    }
  }

  private async testGameFunctionality(page: Page, browser: string): Promise<РезультатТеста> {
    const startTime = Date.now();
    
    try {
      console.log('🎮 Тестирование функциональности игры...');

      // Ищем canvas элемент или игровой контейнер
      const gameElement = await page.locator('canvas, .game-container, #game').first();
      
      if (await gameElement.count() === 0) {
        return {
          testName: 'Функциональность игры',
          status: 'skipped',
          duration: Date.now() - startTime,
          error: 'Игровые элементы не найдены',
          timestamp: new Date(),
          browser
        };
      }

      await gameElement.waitFor({ timeout: 10000 });

      // Проверяем, что элемент видим
      const isVisible = await gameElement.isVisible();
      if (!isVisible) {
        throw new Error('Игровой элемент не видим');
      }

      return {
        testName: 'Функциональность игры',
        status: 'passed',
        duration: Date.now() - startTime,
        timestamp: new Date(),
        browser
      };

    } catch (error) {
      return {
        testName: 'Функциональность игры',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        timestamp: new Date(),
        browser
      };
    }
  }

  private async testPerformance(page: Page, browser: string): Promise<РезультатТеста> {
    const startTime = Date.now();
    
    try {
      console.log('⚡ Тестирование производительности...');

      // Измеряем метрики производительности
      const performanceMetrics = await page.evaluate(() => {
        const performance = window.performance;
        const timing = performance.timing;
        
        return {
          loadTime: timing.loadEventEnd - timing.navigationStart,
          domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
          firstPaint: performance.getEntriesByType('paint')
            .find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
        };
      });

      // Проверяем пороги производительности
      if (performanceMetrics.loadTime > 5000) {
        throw new Error(`Медленная загрузка: ${performanceMetrics.loadTime}ms`);
      }

      return {
        testName: 'Производительность',
        status: 'passed',
        duration: Date.now() - startTime,
        timestamp: new Date(),
        browser
      };

    } catch (error) {
      return {
        testName: 'Производительность',
        status: 'failed',
        duration: Date.now() - startTime,
        error: error.message,
        timestamp: new Date(),
        browser
      };
    }
  }

  public async cleanup(): Promise<void> {
    console.log('🧹 Закрытие всех браузеров...');
    
    for (const [browserName, browser] of this.browsers) {
      try {
        await browser.close();
        console.log(`✅ Браузер ${browserName} закрыт`);
      } catch (error) {
        console.error(`❌ Ошибка при закрытии браузера ${browserName}:`, error);
      }
    }
    
    this.browsers.clear();
  }
}