import { Server as SocketIOServer, Socket } from 'socket.io';

interface ИнформацияОбОшибке {
  message: string;
  stack: string;
  componentStack?: string;
  url: string;
  timestamp: Date;
  userAgent: string;
}

interface МетрикиПроизводительности {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  interactionToNextPaint: number;
}

interface РезультатТеста {
  testName: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
}

interface ИнформацияОбАлерте {
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  component: string;
}

interface СобытияWebSocket {
  'error-occurred': ИнформацияОбОшибке;
  'performance-update': МетрикиПроизводительности;
  'test-result': РезультатТеста;
  'system-alert': ИнформацияОбАлерте;
  'autonomous-error-detected': any;
  'auto-fix-attempt': any;
  'health-check': any;
}

export class WebSocketManager {
  private io: SocketIOServer;
  private connectedClients: Map<string, Socket> = new Map();

  constructor(io: SocketIOServer) {
    this.io = io;
  }

  public setupEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`📡 Новое WebSocket подключение: ${socket.id}`);
      this.connectedClients.set(socket.id, socket);

      this.handleClientConnection(socket);

      socket.on('disconnect', () => {
        console.log(`📡 WebSocket отключение: ${socket.id}`);
        this.connectedClients.delete(socket.id);
      });

      // Обработчики событий от клиента
      socket.on('subscribe-to-metrics', (data) => {
        socket.join('metrics-room');
        console.log(`📊 Клиент ${socket.id} подписался на метрики`);
      });

      socket.on('subscribe-to-errors', (data) => {
        socket.join('errors-room');
        console.log(`🚨 Клиент ${socket.id} подписался на ошибки`);
      });

      socket.on('subscribe-to-tests', (data) => {
        socket.join('tests-room');
        console.log(`🧪 Клиент ${socket.id} подписался на тесты`);
      });

      socket.on('request-dashboard-data', async () => {
        try {
          const dashboardData = await this.gatherDashboardData();
          socket.emit('dashboard-data', dashboardData);
        } catch (error) {
          socket.emit('error', { message: 'Ошибка загрузки данных dashboard' });
        }
      });

      socket.on('run-manual-test', async (testConfig) => {
        try {
          socket.emit('test-started', { testName: testConfig.name });
          // Логика запуска теста будет добавлена в TestScheduler
        } catch (error) {
          socket.emit('test-error', { error: error.message });
        }
      });
    });
  }

  private handleClientConnection(socket: Socket): void {
    // Отправляем начальные данные новому клиенту
    this.sendInitialData(socket);

    // Настраиваем периодическую отправку данных
    const interval = setInterval(() => {
      this.sendHeartbeat(socket);
    }, 30000); // Каждые 30 секунд

    socket.on('disconnect', () => {
      clearInterval(interval);
    });
  }

  private async sendInitialData(socket: Socket): Promise<void> {
    try {
      const initialData = {
        timestamp: new Date(),
        status: 'connected',
        availableRooms: ['metrics-room', 'errors-room', 'tests-room']
      };
      
      socket.emit('connection-established', initialData);
    } catch (error) {
      console.error('Ошибка отправки начальных данных:', error);
    }
  }

  private sendHeartbeat(socket: Socket): void {
    socket.emit('heartbeat', {
      timestamp: new Date(),
      serverTime: process.uptime()
    });
  }

  public broadcastToClients<K extends keyof СобытияWebSocket>(
    event: K,
    data: СобытияWebSocket[K]
  ): void {
    this.io.emit(event, data);
  }

  public broadcastToRoom<K extends keyof СобытияWebSocket>(
    room: string,
    event: K,
    data: СобытияWebSocket[K]
  ): void {
    this.io.to(room).emit(event, data);
  }

  public sendToClient<K extends keyof СобытияWebSocket>(
    clientId: string,
    event: K,
    data: СобытияWebSocket[K]
  ): void {
    const socket = this.connectedClients.get(clientId);
    if (socket) {
      socket.emit(event, data);
    }
  }

  private async gatherDashboardData(): Promise<any> {
    // Эта функция будет собирать данные для dashboard
    // Интеграция с другими компонентами будет добавлена позже
    return {
      timestamp: new Date(),
      metrics: {
        activeConnections: this.connectedClients.size,
        serverUptime: process.uptime()
      },
      recent: {
        errors: [],
        tests: [],
        performance: {}
      }
    };
  }

  public getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }

  public isClientConnected(clientId: string): boolean {
    return this.connectedClients.has(clientId);
  }

  public disconnectClient(clientId: string): void {
    const socket = this.connectedClients.get(clientId);
    if (socket) {
      socket.disconnect();
      this.connectedClients.delete(clientId);
    }
  }

  public disconnectAllClients(): void {
    this.connectedClients.forEach((socket) => {
      socket.disconnect();
    });
    this.connectedClients.clear();
  }
}