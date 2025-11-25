import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ИнформацияОбОшибке {
  message: string;
  stack: string;
  componentStack?: string;
  url: string;
  timestamp: Date;
  userAgent: string;
  userId?: string;
  sessionId?: string;
  buildVersion?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

interface КонфигОтслеживанияОшибок {
  serverUrl: string;
  enableConsoleCapture: boolean;
  enableReactErrorBoundary: boolean;
  enableUnhandledRejections: boolean;
  enablePerformanceErrors: boolean;
  maxErrorsPerSession: number;
  ignoredErrors: string[];
}

export class ОтслеживательОшибок {
  private config: КонфигОтслеживанияОшибок;
  private отправленныеОшибки: Set<string> = new Set();
  private количествоОшибокВСессии: number = 0;
  private sessionId: string;
  private originalConsoleError: typeof console.error;
  private originalConsoleWarn: typeof console.warn;

  constructor(config: Partial<КонфигОтслеживанияОшибок> = {}) {
    this.config = {
      serverUrl: 'http://localhost:3001',
      enableConsoleCapture: true,
      enableReactErrorBoundary: true,
      enableUnhandledRejections: true,
      enablePerformanceErrors: true,
      maxErrorsPerSession: 50,
      ignoredErrors: [
        'ResizeObserver loop limit exceeded',
        'Script error.',
        'Non-Error promise rejection captured'
      ],
      ...config
    };

    this.sessionId = this.сгенерироватьSessionId();
    this.originalConsoleError = console.error;
    this.originalConsoleWarn = console.warn;

    this.инициализировать();
  }

  private инициализировать(): void {
    console.log('🚨 Инициализация системы отслеживания ошибок...');

    // Глобальные JavaScript ошибки
    this.настроитьГлобальныеОбработчики();
    
    // Консольные ошибки
    if (this.config.enableConsoleCapture) {
      this.настроитьПерехватКонсоли();
    }
    
    // Unhandled Promise Rejections
    if (this.config.enableUnhandledRejections) {
      this.настроитьОбработчикPromise();
    }
    
    // Performance ошибки
    if (this.config.enablePerformanceErrors) {
      this.настроитьМониторингПроизводительности();
    }

    console.log('✅ Система отслеживания ошибок активна');
  }

  private настроитьГлобальныеОбработчики(): void {
    window.addEventListener('error', (event) => {
      const ошибка: ИнформацияОбОшибке = {
        message: event.message,
        stack: event.error?.stack || '',
        url: event.filename || window.location.href,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        sessionId: this.sessionId,
        buildVersion: this.получитьВерсиюСборки(),
        severity: this.определитьСерьезность(event.message),
        context: {
          line: event.lineno,
          column: event.colno,
          type: 'global-error'
        }
      };

      this.обработатьОшибку(ошибка);
    });
  }

  private настроитьПерехватКонсоли(): void {
    // Перехватываем console.error
    console.error = (...args) => {
      this.originalConsoleError.apply(console, args);
      
      const сообщение = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');

      if (this.стоитИгнорироватьОшибку(сообщение)) {
        return;
      }

      const ошибка: ИнформацияОбОшибке = {
        message: сообщение,
        stack: new Error().stack || '',
        url: window.location.href,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        sessionId: this.sessionId,
        buildVersion: this.получитьВерсиюСборки(),
        severity: 'medium',
        context: {
          type: 'console-error',
          arguments: args.length
        }
      };

      this.обработатьОшибку(ошибка);
    };

    // Перехватываем console.warn для критических предупреждений
    console.warn = (...args) => {
      this.originalConsoleWarn.apply(console, args);
      
      const сообщение = args.join(' ');
      
      // Только критические предупреждения
      if (сообщение.includes('deprecated') || 
          сообщение.includes('critical') ||
          сообщение.includes('security')) {
        
        const ошибка: ИнформацияОбОшибке = {
          message: `[WARNING] ${сообщение}`,
          stack: new Error().stack || '',
          url: window.location.href,
          timestamp: new Date(),
          userAgent: navigator.userAgent,
          sessionId: this.sessionId,
          buildVersion: this.получитьВерсиюСборки(),
          severity: 'low',
          context: {
            type: 'console-warning'
          }
        };

        this.обработатьОшибку(ошибка);
      }
    };
  }

  private настроитьОбработчикPromise(): void {
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      const сообщение = reason?.message || reason?.toString() || 'Unhandled Promise Rejection';

      if (this.стоитИгнорироватьОшибку(сообщение)) {
        return;
      }

      const ошибка: ИнформацияОбОшибке = {
        message: сообщение,
        stack: reason?.stack || new Error().stack || '',
        url: window.location.href,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        sessionId: this.sessionId,
        buildVersion: this.получитьВерсиюСборки(),
        severity: this.определитьСерьезность(сообщение),
        context: {
          type: 'unhandled-promise',
          reason: typeof reason
        }
      };

      this.обработатьОшибку(ошибка);
    });
  }

  private настроитьМониторингПроизводительности(): void {
    // Мониторинг медленных операций
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = (callback, delay, ...args) => {
      if (delay && delay > 30000) { // Более 30 секунд
        console.warn(`⚠️ Очень долгий setTimeout: ${delay}ms`);
      }
      return originalSetTimeout(callback, delay, ...args);
    };

    // Мониторинг memory leaks
    if ((performance as any).memory) {
      setInterval(() => {
        const memory = (performance as any).memory;
        const usedPercent = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
        
        if (usedPercent > 90) {
          const ошибка: ИнформацияОбОшибке = {
            message: `Высокое потребление памяти: ${usedPercent.toFixed(1)}%`,
            stack: new Error().stack || '',
            url: window.location.href,
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            sessionId: this.sessionId,
            buildVersion: this.получитьВерсиюСборки(),
            severity: 'high',
            context: {
              type: 'performance-memory',
              usedMB: Math.round(memory.usedJSHeapSize / 1024 / 1024),
              totalMB: Math.round(memory.totalJSHeapSize / 1024 / 1024)
            }
          };

          this.обработатьОшибку(ошибка);
        }
      }, 60000); // Проверка каждую минуту
    }
  }

  private обработатьОшибку(ошибка: ИнформацияОбОшибке): void {
    // Проверяем лимиты
    if (this.количествоОшибокВСессии >= this.config.maxErrorsPerSession) {
      return;
    }

    // Проверяем дубликаты
    const хэшОшибки = this.получитьХэшОшибки(ошибка);
    if (this.отправленныеОшибки.has(хэшОшибки)) {
      return;
    }

    // Добавляем контекст
    ошибка.context = {
      ...ошибка.context,
      pageUrl: window.location.href,
      referrer: document.referrer,
      timestamp: Date.now(),
      viewportSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      localStorage: this.получитьБезопасныйLocalStorage()
    };

    // Отправляем на сервер
    this.отправитьОшибкуНаСервер(ошибка);

    // Обновляем счетчики
    this.отправленныеОшибки.add(хэшОшибки);
    this.количествоОшибокВСессии++;

    // Логируем локально
    console.group('🚨 Отслежена ошибка');
    console.error('Сообщение:', ошибка.message);
    console.error('Стек:', ошибка.stack);
    console.error('Контекст:', ошибка.context);
    console.groupEnd();
  }

  private async отправитьОшибкуНаСервер(ошибка: ИнформацияОбОшибке): Promise<void> {
    try {
      const response = await fetch(`${this.config.serverUrl}/api/errors/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ошибка)
      });

      if (!response.ok) {
        console.warn('⚠️ Не удалось отправить ошибку на сервер:', response.status);
      }

    } catch (error) {
      console.warn('⚠️ Ошибка отправки ошибки на сервер:', error);
      
      // Сохраняем в localStorage для повторной отправки
      this.сохранитьОшибкуЛокально(ошибка);
    }
  }

  private сохранитьОшибкуЛокально(ошибка: ИнформацияОбОшибке): void {
    try {
      const сохраненныеОшибки = JSON.parse(localStorage.getItem('pending-errors') || '[]');
      сохраненныеОшибки.push(ошибка);
      
      // Ограничиваем количество сохраненных ошибок
      if (сохраненныеОшибки.length > 10) {
        сохраненныеОшибки.splice(0, сохраненныеОшибки.length - 10);
      }
      
      localStorage.setItem('pending-errors', JSON.stringify(сохраненныеОшибки));
    } catch (error) {
      console.warn('Не удалось сохранить ошибку локально:', error);
    }
  }

  public async отправитьОтложенныеОшибки(): Promise<void> {
    try {
      const сохраненныеОшибки = JSON.parse(localStorage.getItem('pending-errors') || '[]');
      
      if (сохраненныеОшибки.length === 0) {
        return;
      }

      console.log(`📤 Отправка ${сохраненныеОшибки.length} отложенных ошибок...`);

      for (const ошибка of сохраненныеОшибки) {
        await this.отправитьОшибкуНаСервер(ошибка);
      }

      // Очищаем после успешной отправки
      localStorage.removeItem('pending-errors');
      console.log('✅ Отложенные ошибки отправлены');

    } catch (error) {
      console.warn('⚠️ Ошибка отправки отложенных ошибок:', error);
    }
  }

  private определитьСерьезность(сообщение: string): 'low' | 'medium' | 'high' | 'critical' {
    const сообщениеНижнийРегистр = сообщение.toLowerCase();
    
    if (сообщениеНижнийРегистр.includes('security') || 
        сообщениеНижнийРегистр.includes('xss') ||
        сообщениеНижнийРегистр.includes('csrf')) {
      return 'critical';
    }
    
    if (сообщениеНижнийРегистр.includes('network') || 
        сообщениеНижнийРегистр.includes('api') ||
        сообщениеНижнийРегистр.includes('fetch')) {
      return 'high';
    }
    
    if (сообщениеНижнийРегистр.includes('warning') || 
        сообщениеНижнийРегистр.includes('deprecated')) {
      return 'low';
    }
    
    return 'medium';
  }

  private стоитИгнорироватьОшибку(сообщение: string): boolean {
    return this.config.ignoredErrors.some(игнорируемая => 
      сообщение.includes(игнорируемая)
    );
  }

  private получитьХэшОшибки(ошибка: ИнформацияОбОшибке): string {
    const контент = `${ошибка.message}-${ошибка.url}`;
    return btoa(контент).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  }

  private сгенерироватьSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private получитьВерсиюСборки(): string {
    return process.env.REACT_APP_VERSION || 'unknown';
  }

  private получитьБезопасныйLocalStorage(): Record<string, any> {
    try {
      const безопасныеКлючи = ['theme', 'language', 'debug-enabled'];
      const результат: Record<string, any> = {};
      
      безопасныеКлючи.forEach(ключ => {
        const значение = localStorage.getItem(ключ);
        if (значение) {
          результат[ключ] = значение;
        }
      });
      
      return результат;
    } catch (error) {
      return {};
    }
  }

  // Публичные методы
  public отчетОбОшибке(сообщение: string, доп?: any): void {
    const ошибка: ИнформацияОбОшибке = {
      message: сообщение,
      stack: new Error().stack || '',
      url: window.location.href,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      sessionId: this.sessionId,
      buildVersion: this.получитьВерсиюСборки(),
      severity: 'medium',
      context: {
        type: 'manual-report',
        additional: доп
      }
    };

    this.обработатьОшибку(ошибка);
  }

  public получитьСтатистику(): any {
    return {
      sessionId: this.sessionId,
      ошибокВСессии: this.количествоОшибокВСессии,
      уникальныхОшибок: this.отправленныеОшибки.size,
      максимумОшибокВСессии: this.config.maxErrorsPerSession,
      отложенныхОшибок: (() => {
        try {
          return JSON.parse(localStorage.getItem('pending-errors') || '[]').length;
        } catch {
          return 0;
        }
      })()
    };
  }

  public очиститьСтатистику(): void {
    this.отправленныеОшибки.clear();
    this.количествоОшибокВСессии = 0;
    localStorage.removeItem('pending-errors');
    console.log('🧹 Статистика ошибок очищена');
  }

  public отключить(): void {
    // Восстанавливаем оригинальные методы консоли
    console.error = this.originalConsoleError;
    console.warn = this.originalConsoleWarn;
    
    console.log('🔌 Отслеживание ошибок отключено');
  }
}

// React Error Boundary компонент
interface РеактГраницаОшибокProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface РеактГраницаОшибокState {
  hasError: boolean;
  error?: Error;
}

export class РеактГраницаОшибок extends Component<РеактГраницаОшибокProps, РеактГраницаОшибокState> {
  constructor(props: РеактГраницаОшибокProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): РеактГраницаОшибокState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 React Error Boundary перехватил ошибку:', error);
    
    // Отправляем ошибку через глобальную функцию
    if (typeof window !== 'undefined' && (window as any).reportReactError) {
      (window as any).reportReactError(error, errorInfo);
    }

    // Вызываем пользовательский обработчик
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ff6b6b', 
          borderRadius: '8px',
          backgroundColor: '#ffe0e0',
          margin: '20px'
        }}>
          <h2 style={{ color: '#d63031', marginTop: 0 }}>🚨 Произошла ошибка</h2>
          <p>Что-то пошло не так в этом компоненте. Ошибка была автоматически отправлена разработчикам.</p>
          <details style={{ marginTop: '10px' }}>
            <summary style={{ cursor: 'pointer', color: '#0984e3' }}>
              Показать техническую информацию
            </summary>
            <pre style={{ 
              background: '#f8f9fa', 
              padding: '10px', 
              fontSize: '12px',
              overflow: 'auto',
              marginTop: '10px'
            }}>
              {this.state.error?.message}
              {'\n\n'}
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '15px',
              padding: '8px 16px',
              backgroundColor: '#0984e3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Глобальный экземпляр
let отслеживательОшибок: ОтслеживательОшибок;

// Автоматическая инициализация
if (typeof window !== 'undefined') {
  отслеживательОшибок = new ОтслеживательОшибок();
  
  // Экспортируем в глобальную область
  (window as any).errorTracker = отслеживательОшибок;
  
  // Отправляем отложенные ошибки при загрузке
  отслеживательОшибок.отправитьОтложенныеОшибки();
}

export { отслеживательОшибок };
export default РеактГраницаОшибок;

