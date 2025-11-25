import { WebSocketManager } from '../websocket.js';

export interface ИнформацияОбОшибке {
  id: string;
  message: string;
  stack: string;
  componentStack?: string;
  url: string;
  timestamp: Date;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'javascript' | 'network' | 'render' | 'memory' | 'permission';
  resolved: boolean;
  occurrences: number;
  firstSeen: Date;
  lastSeen: Date;
  affectedUsers?: string[];
}

interface СтатистикаОшибок {
  totalErrors: number;
  criticalErrors: number;
  resolvedErrors: number;
  topErrors: ИнформацияОбОшибке[];
  errorsByType: Record<string, number>;
  errorsByPage: Record<string, number>;
}

export class ErrorHandler {
  private wsManager: WebSocketManager;
  private errors: Map<string, ИнформацияОбОшибке> = new Map();
  private errorPatterns: Map<string, RegExp> = new Map();

  constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager;
    this.setupErrorPatterns();
  }

  private setupErrorPatterns(): void {
    // Паттерны для классификации ошибок
    this.errorPatterns.set('network', /fetch|XMLHttpRequest|network|CORS|timeout/i);
    this.errorPatterns.set('memory', /out of memory|heap|memory|leak/i);
    this.errorPatterns.set('permission', /permission|denied|unauthorized|forbidden/i);
    this.errorPatterns.set('render', /render|component|mount|unmount|lifecycle/i);
  }

  public async reportError(errorData: any): Promise<void> {
    const errorInfo = this.normalizeError(errorData);
    const errorId = this.generateErrorId(errorInfo);

    if (this.errors.has(errorId)) {
      // Обновляем существующую ошибку
      const existingError = this.errors.get(errorId)!;
      existingError.occurrences++;
      existingError.lastSeen = new Date();
      
      if (errorInfo.userAgent && !existingError.affectedUsers?.includes(errorInfo.userAgent)) {
        existingError.affectedUsers = existingError.affectedUsers || [];
        existingError.affectedUsers.push(errorInfo.userAgent);
      }
    } else {
      // Создаем новую запись об ошибке
      const newError: ИнформацияОбОшибке = {
        ...errorInfo,
        id: errorId,
        severity: this.classifySeverity(errorInfo),
        type: this.classifyErrorType(errorInfo),
        resolved: false,
        occurrences: 1,
        firstSeen: new Date(),
        lastSeen: new Date(),
        affectedUsers: errorInfo.userAgent ? [errorInfo.userAgent] : []
      };

      this.errors.set(errorId, newError);
    }

    const error = this.errors.get(errorId)!;

    // Отправляем уведомление через WebSocket
    this.wsManager.broadcastToRoom('errors-room', 'error-occurred', error);

    // Если критическая ошибка - отправляем системный алерт
    if (error.severity === 'critical') {
      const alert = {
        type: 'critical' as const,
        message: `Критическая ошибка: ${error.message}`,
        timestamp: new Date(),
        component: 'error-handler'
      };
      this.wsManager.broadcastToClients('system-alert', alert);
    }

    console.log(`🚨 Зарегистрирована ошибка [${error.severity}]: ${error.message}`);
  }

  private normalizeError(errorData: any): Partial<ИнформацияОбОшибке> {
    return {
      message: errorData.message || 'Неизвестная ошибка',
      stack: errorData.stack || '',
      componentStack: errorData.componentStack,
      url: errorData.url || errorData.filename || 'unknown',
      timestamp: errorData.timestamp ? new Date(errorData.timestamp) : new Date(),
      userAgent: errorData.userAgent || 'unknown'
    };
  }

  private generateErrorId(errorInfo: Partial<ИнформацияОбОшибке>): string {
    // Создаем уникальный ID на основе сообщения и URL
    const content = `${errorInfo.message}-${errorInfo.url}`;
    return Buffer.from(content).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  }

  private classifySeverity(errorInfo: Partial<ИнформацияОбОшибке>): 'low' | 'medium' | 'high' | 'critical' {
    const message = errorInfo.message?.toLowerCase() || '';
    
    // Критические ошибки
    if (message.includes('uncaught') || 
        message.includes('fatal') || 
        message.includes('security') ||
        message.includes('auth')) {
      return 'critical';
    }
    
    // Высокий приоритет
    if (message.includes('network') || 
        message.includes('api') || 
        message.includes('database') ||
        message.includes('payment')) {
      return 'high';
    }
    
    // Средний приоритет  
    if (message.includes('component') || 
        message.includes('render') ||
        message.includes('state')) {
      return 'medium';
    }
    
    return 'low';
  }

  private classifyErrorType(errorInfo: Partial<ИнформацияОбОшибке>): 'javascript' | 'network' | 'render' | 'memory' | 'permission' {
    const message = errorInfo.message?.toLowerCase() || '';
    const stack = errorInfo.stack?.toLowerCase() || '';
    const combined = `${message} ${stack}`;

    for (const [type, pattern] of this.errorPatterns.entries()) {
      if (pattern.test(combined)) {
        return type as any;
      }
    }

    return 'javascript';
  }

  public async getRecentErrors(limit: number = 100): Promise<ИнформацияОбОшибке[]> {
    const allErrors = Array.from(this.errors.values());
    return allErrors
      .sort((a, b) => b.lastSeen.getTime() - a.lastSeen.getTime())
      .slice(0, limit);
  }

  public async getErrorById(id: string): Promise<ИнформацияОбОшибке | null> {
    return this.errors.get(id) || null;
  }

  public async resolveError(id: string): Promise<boolean> {
    const error = this.errors.get(id);
    if (error) {
      error.resolved = true;
      
      // Уведомляем клиентов о решении ошибки
      this.wsManager.broadcastToRoom('errors-room', 'error-occurred', error);
      
      console.log(`✅ Ошибка ${id} помечена как решенная`);
      return true;
    }
    return false;
  }

  public async getErrorStatistics(): Promise<СтатистикаОшибок> {
    const allErrors = Array.from(this.errors.values());
    
    const stats: СтатистикаОшибок = {
      totalErrors: allErrors.length,
      criticalErrors: allErrors.filter(e => e.severity === 'critical').length,
      resolvedErrors: allErrors.filter(e => e.resolved).length,
      topErrors: allErrors
        .sort((a, b) => b.occurrences - a.occurrences)
        .slice(0, 10),
      errorsByType: {},
      errorsByPage: {}
    };

    // Группировка по типам
    allErrors.forEach(error => {
      stats.errorsByType[error.type] = (stats.errorsByType[error.type] || 0) + 1;
      stats.errorsByPage[error.url] = (stats.errorsByPage[error.url] || 0) + 1;
    });

    return stats;
  }

  public async clearResolvedErrors(): Promise<number> {
    let cleared = 0;
    for (const [id, error] of this.errors.entries()) {
      if (error.resolved && 
          (Date.now() - error.lastSeen.getTime()) > 7 * 24 * 60 * 60 * 1000) { // 7 дней
        this.errors.delete(id);
        cleared++;
      }
    }
    
    console.log(`🧹 Очищено ${cleared} решенных ошибок`);
    return cleared;
  }

  public async analyzeErrorTrends(): Promise<any> {
    const allErrors = Array.from(this.errors.values());
    const last24h = allErrors.filter(e => 
      (Date.now() - e.lastSeen.getTime()) < 24 * 60 * 60 * 1000
    );
    const last7d = allErrors.filter(e => 
      (Date.now() - e.lastSeen.getTime()) < 7 * 24 * 60 * 60 * 1000
    );

    return {
      last24h: {
        total: last24h.length,
        critical: last24h.filter(e => e.severity === 'critical').length,
        mostCommon: last24h.reduce((acc, error) => {
          acc[error.message] = (acc[error.message] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      },
      last7d: {
        total: last7d.length,
        daily: this.groupErrorsByDay(last7d),
        topPages: this.getTopErrorPages(last7d)
      }
    };
  }

  private groupErrorsByDay(errors: ИнформацияОбОшибке[]): Record<string, number> {
    const grouped: Record<string, number> = {};
    errors.forEach(error => {
      const day = error.lastSeen.toISOString().split('T')[0];
      grouped[day] = (grouped[day] || 0) + 1;
    });
    return grouped;
  }

  private getTopErrorPages(errors: ИнформацияОбОшибке[]): Array<{page: string, count: number}> {
    const pages: Record<string, number> = {};
    errors.forEach(error => {
      pages[error.url] = (pages[error.url] || 0) + 1;
    });
    
    return Object.entries(pages)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}