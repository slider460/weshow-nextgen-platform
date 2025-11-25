import { test, Page, Browser, BrowserContext } from '@playwright/test';
import { PlaywrightTestRunner } from './runner.js';

interface КонфигТестирования {
  autoRunInterval: number;
  browsers: string[];
  baseURL?: string;
  testFiles?: string[];
  parallel?: boolean;
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

interface РезультатыТестов {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  timestamp: Date;
  results: РезультатТеста[];
}

export class TestScheduler {
  private config: КонфигТестирования;
  private runner: PlaywrightTestRunner;
  private schedulerInterval?: NodeJS.Timeout;
  private isRunning: boolean = false;
  private lastResults: РезультатыТестов | null = null;

  constructor(config: КонфигТестирования) {
    this.config = {
      baseURL: 'http://localhost:5173',
      testFiles: ['tests/**/*.spec.ts'],
      parallel: true,
      ...config
    };
    this.runner = new PlaywrightTestRunner();
  }

  public async start(): Promise<void> {
    console.log('🧪 Запуск планировщика тестов...');
    
    // Запускаем первый набор тестов сразу
    await this.runScheduledTests();
    
    // Устанавливаем регулярное выполнение тестов
    this.schedulerInterval = setInterval(async () => {
      if (!this.isRunning) {
        await this.runScheduledTests();
      }
    }, this.config.autoRunInterval);

    console.log(`✅ Планировщик тестов запущен (интервал: ${this.config.autoRunInterval / 1000}с)`);
  }

  public async stop(): Promise<void> {
    if (this.schedulerInterval) {
      clearInterval(this.schedulerInterval);
      this.schedulerInterval = undefined;
    }
    console.log('⏹️ Планировщик тестов остановлен');
  }

  private async runScheduledTests(): Promise<void> {
    if (this.isRunning) {
      console.log('⏳ Тесты уже выполняются, пропускаем...');
      return;
    }

    try {
      this.isRunning = true;
      console.log('🚀 Запуск автоматических тестов...');

      const results = await this.runTests();
      this.lastResults = results;

      // Анализируем результаты и отправляем уведомления при необходимости
      await this.analyzeResults(results);

    } catch (error) {
      console.error('❌ Ошибка при выполнении тестов:', error);
    } finally {
      this.isRunning = false;
    }
  }

  public async runTests(specificSuite?: string): Promise<РезультатыТестов> {
    const startTime = Date.now();
    const results: РезультатТеста[] = [];

    try {
      // Определяем какие тесты запускать
      const testFiles = specificSuite ? [specificSuite] : this.config.testFiles!;
      
      for (const browser of this.config.browsers) {
        console.log(`🔍 Запуск тестов в браузере: ${browser}`);
        
        const browserResults = await this.runner.runTestsForBrowser({
          browser,
          testFiles,
          baseURL: this.config.baseURL!,
          parallel: this.config.parallel!
        });

        results.push(...browserResults);
      }

      const duration = Date.now() - startTime;
      const testResults: РезультатыТестов = {
        totalTests: results.length,
        passed: results.filter(r => r.status === 'passed').length,
        failed: results.filter(r => r.status === 'failed').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        duration,
        timestamp: new Date(),
        results
      };

      console.log(`✅ Тесты завершены: ${testResults.passed}/${testResults.totalTests} прошли (${duration}ms)`);
      return testResults;

    } catch (error) {
      console.error('❌ Критическая ошибка при выполнении тестов:', error);
      throw error;
    }
  }

  private async analyzeResults(results: РезультатыТестов): Promise<void> {
    // Вычисляем процент успешности
    const successRate = (results.passed / results.totalTests) * 100;
    
    // Отправляем алерты при низком проценте успешности
    if (successRate < 80) {
      const alert = {
        type: 'warning' as const,
        message: `Низкий процент успешности тестов: ${successRate.toFixed(1)}% (${results.passed}/${results.totalTests})`,
        timestamp: new Date(),
        component: 'test-scheduler'
      };
      
      // Здесь будет отправка через WebSocket
      console.warn(`⚠️ ${alert.message}`);
    }

    // Логируем критические провалы
    const criticalFailures = results.results.filter(r => 
      r.status === 'failed' && r.testName.includes('critical')
    );

    if (criticalFailures.length > 0) {
      const alert = {
        type: 'critical' as const,
        message: `Критические тесты провалились: ${criticalFailures.map(f => f.testName).join(', ')}`,
        timestamp: new Date(),
        component: 'test-scheduler'
      };
      
      console.error(`🚨 ${alert.message}`);
    }
  }

  public async getLatestResults(): Promise<РезультатыТестов | null> {
    return this.lastResults;
  }

  public async getTestHistory(days: number = 7): Promise<any> {
    // Здесь будет интеграция с базой данных для получения истории тестов
    return {
      period: `${days} дней`,
      totalRuns: 0,
      averageSuccessRate: 0,
      trends: []
    };
  }

  public async runSpecificTest(testPath: string): Promise<РезультатТеста[]> {
    console.log(`🎯 Запуск специфического теста: ${testPath}`);
    
    const results: РезультатТеста[] = [];
    
    for (const browser of this.config.browsers) {
      const browserResults = await this.runner.runTestsForBrowser({
        browser,
        testFiles: [testPath],
        baseURL: this.config.baseURL!,
        parallel: false
      });
      
      results.push(...browserResults);
    }
    
    return results;
  }

  public async runCriticalPathTests(): Promise<РезультатыТестов> {
    console.log('🔥 Запуск критических тестов...');
    
    // Определяем критические тесты
    const criticalTests = [
      'tests/game-basic.spec.ts',
      'tests/canvas-test.spec.ts'
    ];
    
    return await this.runTests(criticalTests.join(','));
  }

  public updateConfig(newConfig: Partial<КонфигТестирования>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('🔧 Конфигурация планировщика обновлена:', this.config);
  }

  public isCurrentlyRunning(): boolean {
    return this.isRunning;
  }

  public getConfig(): КонфигТестирования {
    return { ...this.config };
  }
}