import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

interface КонфигБД {
  type: 'sqlite' | 'postgresql';
  host?: string;
  port?: number;
  database: string;
  username?: string;
  password?: string;
}

// Интерфейсы для таблиц
export interface МетрикаПроизводительности {
  id?: number;
  url: string;
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  interactionToNextPaint: number;
  memoryUsed?: number;
  memoryTotal?: number;
  networkLatency?: number;
  renderTime?: number;
  bundleSize?: number;
  userAgent: string;
  timestamp: Date;
  sessionId?: string;
}

export interface ЗаписьОшибки {
  id?: number;
  message: string;
  stack: string;
  componentStack?: string;
  url: string;
  line?: number;
  column?: number;
  userAgent: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'javascript' | 'network' | 'render' | 'memory' | 'permission';
  resolved: boolean;
  occurrences: number;
  firstSeen: Date;
  lastSeen: Date;
  sessionId?: string;
  userId?: string;
  buildVersion?: string;
  context?: string; // JSON строка
}

export interface РезультатТеста {
  id?: number;
  testName: string;
  status: 'passed' | 'failed' | 'skipped' | 'timeout';
  duration: number;
  browser: string;
  error?: string;
  screenshot?: string;
  timestamp: Date;
  buildVersion?: string;
  environment?: string;
}

export interface СетеваяМетрика {
  id?: number;
  url: string;
  method: string;
  status: number;
  duration: number;
  requestSize?: number;
  responseSize?: number;
  userAgent: string;
  timestamp: Date;
  error?: string;
  sessionId?: string;
}

export interface Алерт {
  id?: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  component: string;
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
  metadata?: string; // JSON строка
}

export class DatabaseManager {
  private config: КонфигБД;
  private db?: Database;

  constructor(config: КонфигБД) {
    this.config = config;
  }

  public async initialize(): Promise<void> {
    console.log('🗄️ Инициализация базы данных...');

    if (this.config.type === 'sqlite') {
      await this.инициализироватьSQLite();
    } else {
      throw new Error('PostgreSQL пока не поддерживается');
    }

    await this.создатьТаблицы();
    await this.создатьИндексы();

    console.log('✅ База данных инициализирована');
  }

  private async инициализироватьSQLite(): Promise<void> {
    const dbPath = path.resolve(this.config.database);
    
    this.db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Настройки для производительности SQLite
    await this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA cache_size = -64000;
      PRAGMA temp_store = MEMORY;
      PRAGMA mmap_size = 268435456;
    `);
  }

  private async создатьТаблицы(): Promise<void> {
    if (!this.db) throw new Error('База данных не инициализирована');

    // Таблица метрик производительности
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS performance_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        pageLoadTime INTEGER NOT NULL,
        firstContentfulPaint INTEGER NOT NULL,
        largestContentfulPaint INTEGER NOT NULL,
        cumulativeLayoutShift REAL NOT NULL,
        interactionToNextPaint INTEGER NOT NULL,
        memoryUsed INTEGER,
        memoryTotal INTEGER,
        networkLatency INTEGER,
        renderTime INTEGER,
        bundleSize INTEGER,
        userAgent TEXT NOT NULL,
        timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        sessionId TEXT
      )
    `);

    // Таблица ошибок
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS errors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT NOT NULL,
        stack TEXT,
        componentStack TEXT,
        url TEXT NOT NULL,
        line INTEGER,
        column INTEGER,
        userAgent TEXT NOT NULL,
        timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
        type TEXT NOT NULL CHECK (type IN ('javascript', 'network', 'render', 'memory', 'permission')),
        resolved BOOLEAN NOT NULL DEFAULT FALSE,
        occurrences INTEGER NOT NULL DEFAULT 1,
        firstSeen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        lastSeen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        sessionId TEXT,
        userId TEXT,
        buildVersion TEXT,
        context TEXT
      )
    `);

    // Таблица результатов тестов
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        testName TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('passed', 'failed', 'skipped', 'timeout')),
        duration INTEGER NOT NULL,
        browser TEXT NOT NULL,
        error TEXT,
        screenshot TEXT,
        timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        buildVersion TEXT,
        environment TEXT
      )
    `);

    // Таблица сетевых метрик
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS network_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        method TEXT NOT NULL,
        status INTEGER NOT NULL,
        duration INTEGER NOT NULL,
        requestSize INTEGER,
        responseSize INTEGER,
        userAgent TEXT NOT NULL,
        timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        error TEXT,
        sessionId TEXT
      )
    `);

    // Таблица алертов
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL CHECK (type IN ('critical', 'warning', 'info')),
        message TEXT NOT NULL,
        component TEXT NOT NULL,
        timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        resolved BOOLEAN NOT NULL DEFAULT FALSE,
        resolvedAt DATETIME,
        metadata TEXT
      )
    `);

    // Таблица сессий
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        userAgent TEXT,
        startTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        endTime DATETIME,
        pageViews INTEGER DEFAULT 0,
        errorsCount INTEGER DEFAULT 0,
        lastActivity DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  private async создатьИндексы(): Promise<void> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const индексы = [
      // Индексы для метрик производительности
      'CREATE INDEX IF NOT EXISTS idx_performance_timestamp ON performance_metrics(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_performance_url ON performance_metrics(url)',
      'CREATE INDEX IF NOT EXISTS idx_performance_session ON performance_metrics(sessionId)',
      
      // Индексы для ошибок
      'CREATE INDEX IF NOT EXISTS idx_errors_timestamp ON errors(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_errors_severity ON errors(severity)',
      'CREATE INDEX IF NOT EXISTS idx_errors_resolved ON errors(resolved)',
      'CREATE INDEX IF NOT EXISTS idx_errors_url ON errors(url)',
      
      // Индексы для тестов
      'CREATE INDEX IF NOT EXISTS idx_tests_timestamp ON test_results(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_tests_status ON test_results(status)',
      'CREATE INDEX IF NOT EXISTS idx_tests_browser ON test_results(browser)',
      
      // Индексы для сетевых метрик
      'CREATE INDEX IF NOT EXISTS idx_network_timestamp ON network_metrics(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_network_status ON network_metrics(status)',
      'CREATE INDEX IF NOT EXISTS idx_network_url ON network_metrics(url)',
      
      // Индексы для алертов
      'CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(type)',
      'CREATE INDEX IF NOT EXISTS idx_alerts_resolved ON alerts(resolved)'
    ];

    for (const индекс of индексы) {
      await this.db.exec(индекс);
    }
  }

  // Методы для метрик производительности
  public async сохранитьМетрикуПроизводительности(метрика: МетрикаПроизводительности): Promise<number> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const result = await this.db.run(`
      INSERT INTO performance_metrics (
        url, pageLoadTime, firstContentfulPaint, largestContentfulPaint,
        cumulativeLayoutShift, interactionToNextPaint, memoryUsed, memoryTotal,
        networkLatency, renderTime, bundleSize, userAgent, timestamp, sessionId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      метрика.url,
      метрика.pageLoadTime,
      метрика.firstContentfulPaint,
      метрика.largestContentfulPaint,
      метрика.cumulativeLayoutShift,
      метрика.interactionToNextPaint,
      метрика.memoryUsed,
      метрика.memoryTotal,
      метрика.networkLatency,
      метрика.renderTime,
      метрика.bundleSize,
      метрика.userAgent,
      метрика.timestamp.toISOString(),
      метрика.sessionId
    ]);

    return result.lastID!;
  }

  public async получитьМетрикиПроизводительности(
    лимит: number = 100,
    смещение: number = 0,
    фильтр?: { url?: string; sessionId?: string; с?: Date; по?: Date }
  ): Promise<МетрикаПроизводительности[]> {
    if (!this.db) throw new Error('База данных не инициализирована');

    let запрос = 'SELECT * FROM performance_metrics WHERE 1=1';
    const параметры: any[] = [];

    if (фильтр?.url) {
      запрос += ' AND url LIKE ?';
      параметры.push(`%${фильтр.url}%`);
    }

    if (фильтр?.sessionId) {
      запрос += ' AND sessionId = ?';
      параметры.push(фильтр.sessionId);
    }

    if (фильтр?.с) {
      запрос += ' AND timestamp >= ?';
      параметры.push(фильтр.с.toISOString());
    }

    if (фильтр?.по) {
      запрос += ' AND timestamp <= ?';
      параметры.push(фильтр.по.toISOString());
    }

    запрос += ' ORDER BY timestamp DESC LIMIT ? OFFSET ?';
    параметры.push(лимит, смещение);

    const результаты = await this.db.all(запрос, параметры);
    
    return результаты.map(этапреобразоватьМетрикуПроизводительности);
  }

  // Методы для ошибок
  public async сохранитьОшибку(ошибка: ЗаписьОшибки): Promise<number> {
    if (!this.db) throw new Error('База данных не инициализирована');

    // Проверяем, есть ли уже такая ошибка
    const существующая = await this.db.get(`
      SELECT id, occurrences FROM errors 
      WHERE message = ? AND url = ? AND resolved = FALSE
    `, [ошибка.message, ошибка.url]);

    if (существующая) {
      // Обновляем существующую ошибку
      await this.db.run(`
        UPDATE errors 
        SET occurrences = occurrences + 1, lastSeen = ? 
        WHERE id = ?
      `, [ошибка.timestamp.toISOString(), существующая.id]);
      
      return существующая.id;
    } else {
      // Создаем новую запись
      const result = await this.db.run(`
        INSERT INTO errors (
          message, stack, componentStack, url, line, column, userAgent,
          timestamp, severity, type, resolved, occurrences, firstSeen, 
          lastSeen, sessionId, userId, buildVersion, context
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        ошибка.message,
        ошибка.stack,
        ошибка.componentStack,
        ошибка.url,
        ошибка.line,
        ошибка.column,
        ошибка.userAgent,
        ошибка.timestamp.toISOString(),
        ошибка.severity,
        ошибка.type,
        ошибка.resolved,
        ошибка.occurrences,
        ошибка.firstSeen.toISOString(),
        ошибка.lastSeen.toISOString(),
        ошибка.sessionId,
        ошибка.userId,
        ошибка.buildVersion,
        ошибка.context
      ]);

      return result.lastID!;
    }
  }

  public async получитьОшибки(
    лимит: number = 50,
    фильтр?: { severity?: string; resolved?: boolean; с?: Date; по?: Date }
  ): Promise<ЗаписьОшибки[]> {
    if (!this.db) throw new Error('База данных не инициализирована');

    let запрос = 'SELECT * FROM errors WHERE 1=1';
    const параметры: any[] = [];

    if (фильтр?.severity) {
      запрос += ' AND severity = ?';
      параметры.push(фильтр.severity);
    }

    if (фильтр?.resolved !== undefined) {
      запрос += ' AND resolved = ?';
      параметры.push(фильтр.resolved);
    }

    if (фильтр?.с) {
      запрос += ' AND timestamp >= ?';
      параметры.push(фильтр.с.toISOString());
    }

    if (фильтр?.по) {
      запрос += ' AND timestamp <= ?';
      параметры.push(фильтр.по.toISOString());
    }

    запрос += ' ORDER BY lastSeen DESC LIMIT ?';
    параметры.push(лимит);

    const результаты = await this.db.all(запрос, параметры);
    
    return результаты.map(преобразоватьОшибку);
  }

  // Методы для результатов тестов
  public async сохранитьРезультатТеста(тест: РезультатТеста): Promise<number> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const result = await this.db.run(`
      INSERT INTO test_results (
        testName, status, duration, browser, error, screenshot,
        timestamp, buildVersion, environment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      тест.testName,
      тест.status,
      тест.duration,
      тест.browser,
      тест.error,
      тест.screenshot,
      тест.timestamp.toISOString(),
      тест.buildVersion,
      тест.environment
    ]);

    return result.lastID!;
  }

  // Методы для сетевых метрик
  public async сохранитьСетевуюМетрику(метрика: СетеваяМетрика): Promise<number> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const result = await this.db.run(`
      INSERT INTO network_metrics (
        url, method, status, duration, requestSize, responseSize,
        userAgent, timestamp, error, sessionId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      метрика.url,
      метрика.method,
      метрика.status,
      метрика.duration,
      метрика.requestSize,
      метрика.responseSize,
      метрика.userAgent,
      метрика.timestamp.toISOString(),
      метрика.error,
      метрика.sessionId
    ]);

    return result.lastID!;
  }

  // Методы для алертов
  public async сохранитьАлерт(алерт: Алерт): Promise<number> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const result = await this.db.run(`
      INSERT INTO alerts (type, message, component, timestamp, resolved, metadata)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      алерт.type,
      алерт.message,
      алерт.component,
      алерт.timestamp.toISOString(),
      алерт.resolved,
      алерт.metadata
    ]);

    return result.lastID!;
  }

  // Аналитические методы
  public async получитьСтатистикуПроизводительности(период: Date): Promise<any> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const результат = await this.db.get(`
      SELECT 
        AVG(pageLoadTime) as avgPageLoadTime,
        AVG(firstContentfulPaint) as avgFCP,
        AVG(largestContentfulPaint) as avgLCP,
        AVG(cumulativeLayoutShift) as avgCLS,
        COUNT(*) as totalMeasurements,
        COUNT(DISTINCT sessionId) as uniqueSessions
      FROM performance_metrics 
      WHERE timestamp >= ?
    `, [период.toISOString()]);

    return результат;
  }

  public async получитьСтатистикуОшибок(период: Date): Promise<any> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const результат = await this.db.all(`
      SELECT 
        severity,
        type,
        COUNT(*) as count,
        SUM(occurrences) as totalOccurrences
      FROM errors 
      WHERE timestamp >= ?
      GROUP BY severity, type
      ORDER BY totalOccurrences DESC
    `, [период.toISOString()]);

    return результат;
  }

  // Очистка старых данных
  public async очиститьСтарыеДанные(днейХранения: number = 30): Promise<void> {
    if (!this.db) throw new Error('База данных не инициализирована');

    const cutoffDate = new Date(Date.now() - дней * 24 * 60 * 60 * 1000);
    const cutoffString = cutoffDate.toISOString();

    const таблицыДляОчистки = [
      'performance_metrics',
      'network_metrics', 
      'test_results'
    ];

    for (const таблица of таблицыДляОчистки) {
      const result = await this.db.run(
        `DELETE FROM ${таблица} WHERE timestamp < ?`,
        [cutoffString]
      );
      
      console.log(`🧹 Удалено ${result.changes} записей из таблицы ${таблица}`);
    }

    // Для ошибок и алертов удаляем только решенные
    const errorsResult = await this.db.run(
      'DELETE FROM errors WHERE timestamp < ? AND resolved = TRUE',
      [cutoffString]
    );
    
    const alertsResult = await this.db.run(
      'DELETE FROM alerts WHERE timestamp < ? AND resolved = TRUE',
      [cutoffString]
    );

    console.log(`🧹 Удалено ${errorsResult.changes} решенных ошибок`);
    console.log(`🧹 Удалено ${alertsResult.changes} решенных алертов`);

    // Оптимизируем базу данных
    await this.db.exec('VACUUM');
  }

  public async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      console.log('🗄️ Соединение с базой данных закрыто');
    }
  }
}

// Вспомогательные функции преобразования
function преобразоватьМетрикуПроизводительности(строка: any): МетрикаПроизводительности {
  return {
    ...строка,
    timestamp: new Date(строка.timestamp),
    cumulativeLayoutShift: parseFloat(строка.cumulativeLayoutShift)
  };
}

function преобразоватьОшибку(строка: any): ЗаписьОшибки {
  return {
    ...строка,
    timestamp: new Date(строка.timestamp),
    firstSeen: new Date(строка.firstSeen),
    lastSeen: new Date(строка.lastSeen),
    resolved: Boolean(строка.resolved),
    context: строка.context ? JSON.parse(строка.context) : undefined
  };
}