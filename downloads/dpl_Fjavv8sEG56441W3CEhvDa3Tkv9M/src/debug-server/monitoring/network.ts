import { WebSocketManager } from '../websocket.js';

interface СетевойЗапрос {
  id: string;
  url: string;
  method: string;
  status: number;
  duration: number;
  timestamp: Date;
  requestSize: number;
  responseSize: number;
  userAgent: string;
  error?: string;
}

interface СетеваяСтатистика {
  totalRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  slowestRequests: СетевойЗапрос[];
  errorsByStatus: Record<number, number>;
  requestsByEndpoint: Record<string, number>;
}

export class NetworkMonitor {
  private wsManager: WebSocketManager;
  private requests: СетевойЗапрос[] = [];
  private slowRequestThreshold: number = 2000; // 2 секунды

  constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager;
  }

  public startMonitoring(): void {
    console.log('🌐 Запуск сетевого мониторинга...');
    // Здесь будут подключены обработчики сетевых запросов
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      console.log('⏹️ Сетевой мониторинг остановлен');
      resolve();
    });
  }

  public async recordRequest(requestData: Partial<СетевойЗапрос>): Promise<void> {
    const request: СетевойЗапрос = {
      id: this.generateRequestId(),
      url: requestData.url || '',
      method: requestData.method || 'GET',
      status: requestData.status || 0,
      duration: requestData.duration || 0,
      timestamp: requestData.timestamp || new Date(),
      requestSize: requestData.requestSize || 0,
      responseSize: requestData.responseSize || 0,
      userAgent: requestData.userAgent || 'unknown',
      error: requestData.error
    };

    // Сохраняем запрос
    this.requests.push(request);

    // Ограничиваем размер массива
    if (this.requests.length > 1000) {
      this.requests = this.requests.slice(-1000);
    }

    // Анализируем запрос
    await this.analyzeRequest(request);

    // Отправляем обновление через WebSocket
    this.wsManager.broadcastToRoom('metrics-room', 'network-update', request);

    console.log(`🌐 Записан сетевой запрос: ${request.method} ${request.url} [${request.status}] ${request.duration}ms`);
  }

  private generateRequestId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private async analyzeRequest(request: СетевойЗапрос): Promise<void> {
    const issues: string[] = [];

    // Проверяем медленные запросы
    if (request.duration > this.slowRequestThreshold) {
      issues.push(`Медленный запрос: ${request.duration}ms`);
    }

    // Проверяем ошибки HTTP
    if (request.status >= 400) {
      issues.push(`HTTP ошибка: ${request.status}`);
    }

    // Проверяем большие размеры ответов
    if (request.responseSize > 1024 * 1024) { // 1MB
      issues.push(`Большой размер ответа: ${Math.round(request.responseSize / 1024 / 1024)}MB`);
    }

    // Если есть проблемы, отправляем алерт
    if (issues.length > 0) {
      const severity = request.status >= 500 ? 'critical' : 
                      request.status >= 400 ? 'warning' : 'info';

      const alert = {
        type: severity as any,
        message: `Проблемы с сетевым запросом ${request.method} ${request.url}: ${issues.join(', ')}`,
        timestamp: new Date(),
        component: 'network-monitor'
      };

      this.wsManager.broadcastToClients('system-alert', alert);
      
      if (severity === 'critical') {
        console.error(`🚨 ${alert.message}`);
      } else {
        console.warn(`⚠️ ${alert.message}`);
      }
    }
  }

  public async getNetworkStatistics(): Promise<СетеваяСтатистика> {
    const recentRequests = this.requests.filter(r => 
      (Date.now() - r.timestamp.getTime()) < 60 * 60 * 1000 // последний час
    );

    const failedRequests = recentRequests.filter(r => r.status >= 400);
    const totalDuration = recentRequests.reduce((sum, r) => sum + r.duration, 0);

    const errorsByStatus: Record<number, number> = {};
    const requestsByEndpoint: Record<string, number> = {};

    recentRequests.forEach(request => {
      if (request.status >= 400) {
        errorsByStatus[request.status] = (errorsByStatus[request.status] || 0) + 1;
      }

      const endpoint = this.extractEndpoint(request.url);
      requestsByEndpoint[endpoint] = (requestsByEndpoint[endpoint] || 0) + 1;
    });

    return {
      totalRequests: recentRequests.length,
      failedRequests: failedRequests.length,
      averageResponseTime: recentRequests.length > 0 ? 
        Math.round(totalDuration / recentRequests.length) : 0,
      slowestRequests: recentRequests
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 10),
      errorsByStatus,
      requestsByEndpoint
    };
  }

  private extractEndpoint(url: string): string {
    try {
      const urlObj = new URL(url);
      return `${urlObj.pathname}`;
    } catch {
      return url;
    }
  }

  public async getFailedRequests(limit: number = 50): Promise<СетевойЗапрос[]> {
    return this.requests
      .filter(r => r.status >= 400)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  public async getSlowRequests(limit: number = 50): Promise<СетевойЗапрос[]> {
    return this.requests
      .filter(r => r.duration > this.slowRequestThreshold)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);
  }

  public async analyzeEndpointPerformance(): Promise<any> {
    const endpointStats: Record<string, {
      requests: number;
      averageDuration: number;
      errorRate: number;
      totalDuration: number;
      errorCount: number;
    }> = {};

    this.requests.forEach(request => {
      const endpoint = this.extractEndpoint(request.url);
      
      if (!endpointStats[endpoint]) {
        endpointStats[endpoint] = {
          requests: 0,
          averageDuration: 0,
          errorRate: 0,
          totalDuration: 0,
          errorCount: 0
        };
      }

      const stats = endpointStats[endpoint];
      stats.requests++;
      stats.totalDuration += request.duration;
      
      if (request.status >= 400) {
        stats.errorCount++;
      }
    });

    // Вычисляем средние значения
    Object.values(endpointStats).forEach(stats => {
      stats.averageDuration = Math.round(stats.totalDuration / stats.requests);
      stats.errorRate = Number((stats.errorCount / stats.requests * 100).toFixed(2));
    });

    return endpointStats;
  }

  public updateSlowRequestThreshold(threshold: number): void {
    this.slowRequestThreshold = threshold;
    console.log(`🌐 Обновлен порог медленных запросов: ${threshold}ms`);
  }

  public async clearOldRequests(daysToKeep: number = 7): Promise<number> {
    const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
    const initialCount = this.requests.length;
    
    this.requests = this.requests.filter(r => r.timestamp.getTime() > cutoffTime);
    
    const cleared = initialCount - this.requests.length;
    console.log(`🧹 Очищено ${cleared} старых сетевых запросов`);
    
    return cleared;
  }
}