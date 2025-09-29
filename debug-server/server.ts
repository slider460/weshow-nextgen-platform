import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { WebSocketManager } from './websocket.js';
import { PerformanceMonitor } from './monitoring/performance.js';
import { ErrorHandler } from './monitoring/errors.js';
import { NetworkMonitor } from './monitoring/network.js';
import { TestScheduler } from './testing/scheduler.js';
import { DatabaseManager } from './database/models.js';
import { АвтономныйМонитор } from './autonomous/error-detector.js';
import { СистемаСамоисцеления } from './self-healing/healing-system.js';

interface КонфигСервераОтладки {
  port: number;
  corsOrigins: string[];
  database: {
    type: 'sqlite' | 'postgresql';
    host?: string;
    port?: number;
    database: string;
    username?: string;
    password?: string;
  };
  monitoring: {
    intervalMs: number;
    metricsRetentionDays: number;
  };
  testing: {
    autoRunInterval: number;
    browsers: string[];
  };
}

export class СерверОтладки {
  private app: express.Application;
  private server: http.Server;
  private io: SocketIOServer;
  private wsManager: WebSocketManager;
  private performanceMonitor: PerformanceMonitor;
  private errorHandler: ErrorHandler;
  private networkMonitor: NetworkMonitor;
  private testScheduler: TestScheduler;
  private dbManager: DatabaseManager;
  private автономныйМонитор: АвтономныйМонитор;
  private системаСамоисцеления: СистемаСамоисцеления;
  private config: КонфигСервераОтладки;

  constructor(config: КонфигСервераОтладки) {
    this.config = config;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: config.corsOrigins,
        methods: ['GET', 'POST']
      }
    });

    this.initializeComponents();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
  }

  private initializeComponents(): void {
    this.dbManager = new DatabaseManager(this.config.database);
    this.wsManager = new WebSocketManager(this.io);
    this.performanceMonitor = new PerformanceMonitor(this.wsManager);
    this.errorHandler = new ErrorHandler(this.wsManager);
    this.networkMonitor = new NetworkMonitor(this.wsManager);
    this.testScheduler = new TestScheduler(this.config.testing);
    this.автономныйМонитор = new АвтономныйМонитор();
    this.системаСамоисцеления = new СистемаСамоисцеления();
  }

  private setupMiddleware(): void {
    this.app.use(cors({
      origin: this.config.corsOrigins,
      credentials: true
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    // API маршруты для получения метрик
    this.app.get('/api/metrics/performance', async (req, res) => {
      try {
        const metrics = await this.performanceMonitor.getMetrics();
        res.json(metrics);
      } catch (error) {
        res.status(500).json({ error: 'Ошибка получения метрик производительности' });
      }
    });

    this.app.get('/api/metrics/errors', async (req, res) => {
      try {
        const errors = await this.errorHandler.getRecentErrors();
        res.json(errors);
      } catch (error) {
        res.status(500).json({ error: 'Ошибка получения логов ошибок' });
      }
    });

    this.app.get('/api/tests/results', async (req, res) => {
      try {
        const results = await this.testScheduler.getLatestResults();
        res.json(results);
      } catch (error) {
        res.status(500).json({ error: 'Ошибка получения результатов тестов' });
      }
    });

    // API для отправки данных с клиента
    this.app.post('/api/metrics/performance', async (req, res) => {
      try {
        await this.performanceMonitor.recordMetrics(req.body);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: 'Ошибка записи метрик' });
      }
    });

    this.app.post('/api/errors/report', async (req, res) => {
      try {
        await this.errorHandler.reportError(req.body);
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: 'Ошибка записи ошибки' });
      }
    });

    // Управление тестами
    this.app.post('/api/tests/run', async (req, res) => {
      try {
        const result = await this.testScheduler.runTests(req.body.testSuite);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: 'Ошибка запуска тестов' });
      }
    });

    // Системная информация
    this.app.get('/api/system/health', async (req, res) => {
      try {
        const health = await this.системаСамоисцеления.проверитьЗдоровьеСистемы();
        res.json(health);
      } catch (error) {
        res.status(500).json({ error: 'Ошибка проверки состояния системы' });
      }
    });

    // Статические файлы для dashboard
    this.app.use('/dashboard', express.static('../debug-dashboard'));
  }

  private setupWebSocket(): void {
    this.wsManager.setupEventHandlers();
    
    // Подключение автономного мониторинга к WebSocket
    this.автономныйМонитор.onErrorDetected((error) => {
      this.wsManager.broadcastToClients('autonomous-error-detected', error);
    });

    this.автономныйМонитор.onAutoFixAttempt((fixAttempt) => {
      this.wsManager.broadcastToClients('auto-fix-attempt', fixAttempt);
    });
  }

  public async start(): Promise<void> {
    try {
      // Инициализация базы данных
      await this.dbManager.initialize();
      
      // Запуск мониторинга
      await this.startMonitoring();
      
      // Запуск автономной системы
      await this.автономныйМонитор.начатьМониторинг();
      
      // Запуск системы самоисцеления
      await this.системаСамоисцеления.непрерывноМониторитьЗдоровье();
      
      // Запуск сервера
      this.server.listen(this.config.port, () => {
        console.log(`🔧 Сервер отладки запущен на порту ${this.config.port}`);
        console.log(`📊 Dashboard доступен по адресу: http://localhost:${this.config.port}/dashboard`);
      });
    } catch (error) {
      console.error('Ошибка запуска сервера отладки:', error);
      process.exit(1);
    }
  }

  private async startMonitoring(): void {
    // Запуск планировщика тестов
    await this.testScheduler.start();
    
    // Запуск мониторинга производительности
    this.performanceMonitor.startMonitoring();
    
    // Запуск сетевого мониторинга
    this.networkMonitor.startMonitoring();
    
    console.log('✅ Все системы мониторинга запущены');
  }

  public async stop(): Promise<void> {
    console.log('🛑 Остановка сервера отладки...');
    
    await this.testScheduler.stop();
    await this.performanceMonitor.stop();
    await this.networkMonitor.stop();
    await this.автономныйМонитор.остановитьМониторинг();
    await this.dbManager.close();
    
    this.server.close();
    console.log('✅ Сервер отладки остановлен');
  }
}

// Конфигурация по умолчанию
const defaultConfig: КонфигСервераОтладки = {
  port: 3001,
  corsOrigins: ['http://localhost:5173', 'http://localhost:3000'],
  database: {
    type: 'sqlite',
    database: './debug-data.db'
  },
  monitoring: {
    intervalMs: 5000,
    metricsRetentionDays: 30
  },
  testing: {
    autoRunInterval: 1800000, // 30 минут
    browsers: ['chromium', 'firefox', 'webkit']
  }
};

// Запуск сервера, если файл выполняется напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  const сервер = new СерверОтладки(defaultConfig);
  
  process.on('SIGTERM', async () => {
    await сервер.stop();
    process.exit(0);
  });
  
  process.on('SIGINT', async () => {
    await сервер.stop();
    process.exit(0);
  });
  
  сервер.start().catch(console.error);
}