import { WebSocketManager } from '../websocket.js';

export interface МетрикиПроизводительности {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  interactionToNextPaint: number;
  memoryUsage?: {
    used: number;
    total: number;
  };
  networkLatency?: number;
  renderTime?: number;
  bundleSize?: number;
  timestamp: Date;
  url: string;
  userAgent: string;
}

interface ПорогиПроизводительности {
  pageLoadTime: number; // мс
  firstContentfulPaint: number; // мс
  largestContentfulPaint: number; // мс
  cumulativeLayoutShift: number; // безразмерное
  interactionToNextPaint: number; // мс
}

export class PerformanceMonitor {
  private wsManager: WebSocketManager;
  private metrics: МетрикиПроизводительности[] = [];
  private monitoringInterval?: NodeJS.Timeout;
  private thresholds: ПорогиПроизводительности = {
    pageLoadTime: 3000, // 3 секунды
    firstContentfulPaint: 1800, // 1.8 секунды
    largestContentfulPaint: 2500, // 2.5 секунды
    cumulativeLayoutShift: 0.1, // 0.1 единицы
    interactionToNextPaint: 200 // 200 мс
  };

  constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager;
  }

  public startMonitoring(): void {
    console.log('🚀 Запуск мониторинга производительности...');
    
    // Мониторинг серверных метрик каждые 10 секунд
    this.monitoringInterval = setInterval(() => {
      this.collectServerMetrics();
    }, 10000);
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
        this.monitoringInterval = undefined;
      }
      console.log('⏹️ Мониторинг производительности остановлен');
      resolve();
    });
  }

  public async recordMetrics(metrics: МетрикиПроизводительности): Promise<void> {
    // Добавляем timestamp если его нет
    if (!metrics.timestamp) {
      metrics.timestamp = new Date();
    }

    // Сохраняем метрики
    this.metrics.push(metrics);

    // Ограничиваем размер массива (сохраняем последние 1000 записей)
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Анализируем метрики на предмет проблем
    await this.analyzePerformance(metrics);

    // Отправляем обновление через WebSocket
    this.wsManager.broadcastToRoom('metrics-room', 'performance-update', metrics);

    console.log(`📊 Записаны метрики производительности для ${metrics.url}`);
  }

  private async analyzePerformance(metrics: МетрикиПроизводительности): Promise<void> {
    const issues: string[] = [];

    // Проверяем каждую метрику против порогов
    if (metrics.pageLoadTime > this.thresholds.pageLoadTime) {
      issues.push(`Медленная загрузка страницы: ${metrics.pageLoadTime}мс (норма: ${this.thresholds.pageLoadTime}мс)`);
    }

    if (metrics.firstContentfulPaint > this.thresholds.firstContentfulPaint) {
      issues.push(`Медленный FCP: ${metrics.firstContentfulPaint}мс (норма: ${this.thresholds.firstContentfulPaint}мс)`);
    }

    if (metrics.largestContentfulPaint > this.thresholds.largestContentfulPaint) {
      issues.push(`Медленный LCP: ${metrics.largestContentfulPaint}мс (норма: ${this.thresholds.largestContentfulPaint}мс)`);
    }

    if (metrics.cumulativeLayoutShift > this.thresholds.cumulativeLayoutShift) {
      issues.push(`Высокий CLS: ${metrics.cumulativeLayoutShift} (норма: ${this.thresholds.cumulativeLayoutShift})`);
    }

    if (metrics.interactionToNextPaint > this.thresholds.interactionToNextPaint) {
      issues.push(`Медленная интерактивность: ${metrics.interactionToNextPaint}мс (норма: ${this.thresholds.interactionToNextPaint}мс)`);
    }

    // Если есть проблемы, отправляем алерт
    if (issues.length > 0) {
      const alert = {
        type: 'warning' as const,
        message: `Проблемы производительности на ${metrics.url}: ${issues.join(', ')}`,
        timestamp: new Date(),
        component: 'performance-monitor'
      };

      this.wsManager.broadcastToClients('system-alert', alert);
      console.warn(`⚠️ ${alert.message}`);
    }
  }

  private collectServerMetrics(): void {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const serverMetrics = {
      timestamp: new Date(),
      memory: {
        rss: memUsage.rss,
        heapTotal: memUsage.heapTotal,
        heapUsed: memUsage.heapUsed,
        external: memUsage.external
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      uptime: process.uptime()
    };

    // Отправляем серверные метрики
    this.wsManager.broadcastToRoom('metrics-room', 'performance-update', {
      ...serverMetrics,
      pageLoadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      interactionToNextPaint: 0,
      url: 'server',
      userAgent: 'debug-server'
    } as МетрикиПроизводительности);
  }

  public async getMetrics(limit: number = 100): Promise<МетрикиПроизводительности[]> {
    return this.metrics.slice(-limit);
  }

  public async getAverageMetrics(timeRangeMinutes: number = 60): Promise<any> {
    const cutoffTime = new Date(Date.now() - timeRangeMinutes * 60 * 1000);
    const recentMetrics = this.metrics.filter(m => m.timestamp >= cutoffTime);

    if (recentMetrics.length === 0) {
      return null;
    }

    const totals = recentMetrics.reduce((acc, metric) => ({
      pageLoadTime: acc.pageLoadTime + metric.pageLoadTime,
      firstContentfulPaint: acc.firstContentfulPaint + metric.firstContentfulPaint,
      largestContentfulPaint: acc.largestContentfulPaint + metric.largestContentfulPaint,
      cumulativeLayoutShift: acc.cumulativeLayoutShift + metric.cumulativeLayoutShift,
      interactionToNextPaint: acc.interactionToNextPaint + metric.interactionToNextPaint
    }), {
      pageLoadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      interactionToNextPaint: 0
    });

    const count = recentMetrics.length;
    return {
      count,
      averages: {
        pageLoadTime: Math.round(totals.pageLoadTime / count),
        firstContentfulPaint: Math.round(totals.firstContentfulPaint / count),
        largestContentfulPaint: Math.round(totals.largestContentfulPaint / count),
        cumulativeLayoutShift: Number((totals.cumulativeLayoutShift / count).toFixed(3)),
        interactionToNextPaint: Math.round(totals.interactionToNextPaint / count)
      },
      timeRange: `${timeRangeMinutes} минут`
    };
  }

  public getPerformanceScore(metrics: МетрикиПроизводительности): number {
    // Вычисляем общий балл производительности (0-100)
    let score = 100;

    // Штрафы за превышение порогов
    if (metrics.pageLoadTime > this.thresholds.pageLoadTime) {
      score -= 20;
    }
    if (metrics.firstContentfulPaint > this.thresholds.firstContentfulPaint) {
      score -= 15;
    }
    if (metrics.largestContentfulPaint > this.thresholds.largestContentfulPaint) {
      score -= 20;
    }
    if (metrics.cumulativeLayoutShift > this.thresholds.cumulativeLayoutShift) {
      score -= 25;
    }
    if (metrics.interactionToNextPaint > this.thresholds.interactionToNextPaint) {
      score -= 20;
    }

    return Math.max(0, score);
  }

  public updateThresholds(newThresholds: Partial<ПорогиПроизводительности>): void {
    this.thresholds = { ...this.thresholds, ...newThresholds };
    console.log('📊 Обновлены пороги производительности:', this.thresholds);
  }
}