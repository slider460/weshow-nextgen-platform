import { io, Socket } from 'socket.io-client';

interface МетрикиПроизводительности {
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

interface КонфигКлиентаОтладки {
  serverUrl: string;
  enablePerformanceMonitoring: boolean;
  enableErrorTracking: boolean;
  enableNetworkMonitoring: boolean;
  metricsInterval: number; // интервал сбора метрик в мс
  batchSize: number; // размер пакета для отправки метрик
}

export class КлиентОтладки {
  private config: КонфигКлиентаОтладки;
  private socket: Socket | null = null;
  private метрикиПроизводительности: МетрикиПроизводительности[] = [];
  private интервалСбораМетрик?: number;
  private наблюдательПроизводительности?: PerformanceObserver;
  private подключен: boolean = false;

  constructor(config: Partial<КонфигКлиентаОтладки> = {}) {
    this.config = {
      serverUrl: 'http://localhost:3001',
      enablePerformanceMonitoring: true,
      enableErrorTracking: true,
      enableNetworkMonitoring: true,
      metricsInterval: 10000, // 10 секунд
      batchSize: 10,
      ...config
    };

    this.инициализировать();
  }

  private async инициализировать(): Promise<void> {
    try {
      console.log('🔌 Инициализация клиента отладки...');
      
      await this.подключитьсяКСерверу();
      
      if (this.config.enablePerformanceMonitoring) {
        this.запуститьМониторингПроизводительности();
      }
      
      if (this.config.enableErrorTracking) {
        this.настроитьОтслеживаниеОшибок();
      }
      
      if (this.config.enableNetworkMonitoring) {
        this.настроитьСетевойМониторинг();
      }

      console.log('✅ Клиент отладки инициализирован');
      
    } catch (error) {
      console.error('❌ Ошибка инициализации клиента отладки:', error);
    }
  }

  private async подключитьсяКСерверу(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(this.config.serverUrl, {
        transports: ['websocket', 'polling'],
        timeout: 5000
      });

      this.socket.on('connect', () => {
        this.подключен = true;
        console.log('🔗 Подключение к серверу отладки установлено');
        
        // Подписываемся на необходимые каналы
        this.socket!.emit('subscribe-to-metrics');
        this.socket!.emit('subscribe-to-errors');
        
        resolve();
      });

      this.socket.on('disconnect', () => {
        this.подключен = false;
        console.log('🔌 Соединение с сервером отладки потеряно');
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Ошибка подключения к серверу отладки:', error);
        reject(error);
      });

      this.socket.on('connection-established', (data) => {
        console.log('📡 Соединение с сервером отладки подтверждено:', data);
      });

      this.socket.on('heartbeat', (data) => {
        // Обработка heartbeat сообщений
        if (Math.random() < 0.1) { // Логируем только 10% heartbeat'ов
          console.log('💓 Heartbeat от сервера отладки');
        }
      });
    });
  }

  private запуститьМониторингПроизводительности(): void {
    console.log('📊 Запуск мониторинга производительности...');

    // Собираем начальные метрики
    this.собратьМетрикиПроизводительности();

    // Настраиваем Performance Observer для Web Vitals
    if ('PerformanceObserver' in window) {
      this.наблюдательПроизводительности = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.обработатьMetricsEntry(entry);
        }
      });

      // Отслеживаем различные типы метрик
      try {
        this.наблюдательПроизводительности.observe({ 
          entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] 
        });
      } catch (error) {
        console.warn('⚠️ Некоторые метрики производительности недоступны:', error);
      }
    }

    // Периодический сбор метрик
    this.интервалСбораМетрик = window.setInterval(() => {
      this.собратьМетрикиПроизводительности();
      this.отправитьМетрикиНаСервер();
    }, this.config.metricsInterval);
  }

  private собратьМетрикиПроизводительности(): void {
    try {
      const performance = window.performance;
      const timing = performance.timing;
      
      // Базовые метрики загрузки
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      
      // Web Vitals
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      const firstContentfulPaint = fcpEntry ? fcpEntry.startTime : 0;

      // LCP - получаем из Performance Observer
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      const largestContentfulPaint = lcpEntries.length > 0 ? 
        lcpEntries[lcpEntries.length - 1].startTime : 0;

      // Информация о памяти (если доступна)
      const memoryUsage = (performance as any).memory ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize
      } : undefined;

      const метрики: МетрикиПроизводительности = {
        pageLoadTime,
        firstContentfulPaint,
        largestContentfulPaint,
        cumulativeLayoutShift: this.получитьCLS(),
        interactionToNextPaint: this.получитьINP(),
        memoryUsage,
        timestamp: new Date(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };

      this.метрикиПроизводительности.push(метрики);

      // Ограничиваем размер массива
      if (this.метрикиПроизводительности.length > 100) {
        this.метрикиПроизводительности = this.метрикиПроизводительности.slice(-100);
      }

    } catch (error) {
      console.error('Ошибка сбора метрик производительности:', error);
    }
  }

  private обработатьMetricsEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          console.log(`🎨 First Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
        }
        break;
        
      case 'largest-contentful-paint':
        console.log(`🖼️ Largest Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
        break;
        
      case 'layout-shift':
        const layoutShiftEntry = entry as PerformanceEntry & { value: number, hadRecentInput: boolean };
        if (!layoutShiftEntry.hadRecentInput) {
          console.log(`📐 Layout Shift: ${layoutShiftEntry.value}`);
        }
        break;
        
      case 'first-input':
        const firstInputEntry = entry as PerformanceEntry & { processingStart: number };
        const inputDelay = firstInputEntry.processingStart - firstInputEntry.startTime;
        console.log(`👆 First Input Delay: ${inputDelay.toFixed(2)}ms`);
        break;
    }
  }

  private получитьCLS(): number {
    try {
      // Получаем все layout-shift записи
      const layoutShiftEntries = performance.getEntriesByType('layout-shift') as any[];
      
      return layoutShiftEntries
        .filter(entry => !entry.hadRecentInput)
        .reduce((sum, entry) => sum + entry.value, 0);
        
    } catch (error) {
      return 0;
    }
  }

  private получитьINP(): number {
    try {
      // INP - упрощенная версия
      const eventEntries = performance.getEntriesByType('event') as any[];
      
      if (eventEntries.length === 0) return 0;
      
      const interactionTimes = eventEntries
        .filter(entry => entry.name === 'click' || entry.name === 'keydown')
        .map(entry => entry.duration || 0);
        
      return interactionTimes.length > 0 ? 
        Math.max(...interactionTimes) : 0;
        
    } catch (error) {
      return 0;
    }
  }

  private настроитьОтслеживаниеОшибок(): void {
    console.log('🚨 Настройка отслеживания ошибок...');

    // Глобальные JavaScript ошибки
    window.addEventListener('error', (event) => {
      this.отправитьОшибку({
        message: event.message,
        stack: event.error?.stack || '',
        url: event.filename || window.location.href,
        line: event.lineno,
        column: event.colno,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        type: 'javascript'
      });
    });

    // Неперехваченные Promise ошибки
    window.addEventListener('unhandledrejection', (event) => {
      this.отправитьОшибку({
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack || '',
        url: window.location.href,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        type: 'promise'
      });
    });

    // React Error Boundary integration (если используется)
    if (typeof window !== 'undefined') {
      (window as any).reportReactError = (error: Error, errorInfo: any) => {
        this.отправитьОшибку({
          message: error.message,
          stack: error.stack || '',
          componentStack: errorInfo.componentStack,
          url: window.location.href,
          timestamp: new Date(),
          userAgent: navigator.userAgent,
          type: 'react'
        });
      };
    }
  }

  private настроитьСетевойМониторинг(): void {
    console.log('🌐 Настройка сетевого мониторинга...');

    // Мониторинг fetch запросов
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0] instanceof Request ? args[0].url : args[0].toString();
      
      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - startTime;
        
        this.отправитьСетевуюМетрику({
          url,
          method: args[1]?.method || 'GET',
          status: response.status,
          duration,
          timestamp: new Date(),
          userAgent: navigator.userAgent
        });
        
        return response;
        
      } catch (error) {
        const duration = performance.now() - startTime;
        
        this.отправитьСетевуюМетрику({
          url,
          method: args[1]?.method || 'GET',
          status: 0,
          duration,
          timestamp: new Date(),
          userAgent: navigator.userAgent,
          error: error.message
        });
        
        throw error;
      }
    };

    // Мониторинг XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      (this as any).__debugInfo = { method, url, startTime: null };
      return originalXHROpen.call(this, method, url, ...args);
    };
    
    XMLHttpRequest.prototype.send = function(...args) {
      const debugInfo = (this as any).__debugInfo;
      if (debugInfo) {
        debugInfo.startTime = performance.now();
        
        this.addEventListener('loadend', () => {
          const duration = performance.now() - debugInfo.startTime;
          
          клиентОтладки.отправитьСетевуюМетрику({
            url: debugInfo.url,
            method: debugInfo.method,
            status: this.status,
            duration,
            timestamp: new Date(),
            userAgent: navigator.userAgent
          });
        });
      }
      
      return originalXHRSend.call(this, ...args);
    };
  }

  private отправитьМетрикиНаСервер(): void {
    if (!this.подключен || this.метрикиПроизводительности.length === 0) {
      return;
    }

    // Отправляем метрики пакетами
    const метрикиДляОтправки = this.метрикиПроизводительности.splice(0, this.config.batchSize);
    
    for (const метрики of метрикиДляОтправки) {
      this.socket!.emit('performance-metrics', метрики);
    }

    console.log(`📤 Отправлено ${метрикиДляОтправки.length} метрик производительности`);
  }

  private отправитьОшибку(ошибка: any): void {
    if (!this.подключен) {
      console.warn('⚠️ Нет соединения с сервером отладки для отправки ошибки');
      return;
    }

    this.socket!.emit('error-report', ошибка);
    console.log('📤 Отправлена ошибка на сервер отладки:', ошибка.message);
  }

  private отправитьСетевуюМетрику(метрика: any): void {
    if (!this.подключен) {
      return;
    }

    this.socket!.emit('network-metric', метрика);
    
    // Логируем только медленные или проблемные запросы
    if (метрика.duration > 2000 || метрика.status >= 400) {
      console.log(`📤 Отправлена сетевая метрика: ${метрика.method} ${метрика.url} [${метрика.status}] ${метрика.duration.toFixed(2)}ms`);
    }
  }

  // Публичные методы
  public получитьТекущиеМетрики(): МетрикиПроизводительности[] {
    return [...this.метрикиПроизводительности];
  }

  public запуститьТест(типТеста: string): void {
    if (!this.подключен) {
      console.warn('⚠️ Нет соединения с сервером отладки');
      return;
    }

    this.socket!.emit('run-manual-test', { type: типТеста, timestamp: new Date() });
    console.log(`🧪 Запрошен тест: ${типТеста}`);
  }

  public отключиться(): void {
    if (this.интервалСбораМетрик) {
      clearInterval(this.интервалСбораМетрик);
    }

    if (this.наблюдательПроизводительности) {
      this.наблюдательПроизводительности.disconnect();
    }

    if (this.socket) {
      this.socket.disconnect();
    }

    this.подключен = false;
    console.log('🔌 Клиент отладки отключен');
  }

  public изменитьКонфигурацию(новаяКонфигурация: Partial<КонфигКлиентаОтладки>): void {
    this.config = { ...this.config, ...новаяКонфигурация };
    console.log('🔧 Конфигурация клиента отладки обновлена:', this.config);
  }

  public получитьСтатус(): any {
    return {
      подключен: this.подключен,
      serverUrl: this.config.serverUrl,
      метрикВОчереди: this.метрикиПроизводительности.length,
      мониторингАктивен: {
        производительность: !!this.интервалСбораМетрик,
        ошибки: this.config.enableErrorTracking,
        сеть: this.config.enableNetworkMonitoring
      }
    };
  }
}

// Глобальный экземпляр клиента отладки
let клиентОтладки: КлиентОтладки;

// Автоматическая инициализация в браузере
if (typeof window !== 'undefined') {
  // Проверяем, включена ли отладка
  const отладкаВключена = 
    localStorage.getItem('debug-enabled') === 'true' ||
    window.location.search.includes('debug=true') ||
    process.env.NODE_ENV === 'development';

  if (отладкаВключена) {
    клиентОтладки = new КлиентОтладки({
      enablePerformanceMonitoring: true,
      enableErrorTracking: true,
      enableNetworkMonitoring: true
    });

    // Экспортируем в глобальную область для отладки
    (window as any).debugClient = клиентОтладки;
  }
}

export { клиентОтладки };