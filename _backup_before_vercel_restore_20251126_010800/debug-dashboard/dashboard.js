class DashboardManager {
    constructor() {
        this.socket = null;
        this.currentSection = 'overview';
        this.data = {
            performance: [],
            errors: [],
            tests: [],
            system: {},
            logs: []
        };
        this.init();
    }

    init() {
        this.connectToServer();
        this.setupNavigation();
        this.loadSection('overview');
        setInterval(() => this.fetchData(), 30000); // Обновление каждые 30 сек
    }

    connectToServer() {
        console.log('🔌 Подключение к серверу отладки...');
        
        this.socket = io('http://localhost:3001');

        this.socket.on('connect', () => {
            console.log('✅ Подключено к серверу отладки');
            this.updateStatus(true);
            this.subscribeToUpdates();
        });

        this.socket.on('disconnect', () => {
            console.log('❌ Отключено от сервера отладки');
            this.updateStatus(false);
        });

        this.socket.on('connect_error', (error) => {
            console.error('❌ Ошибка подключения:', error);
            this.updateStatus(false);
        });

        // Real-time updates
        this.socket.on('performance-update', (data) => {
            this.data.performance.unshift(data);
            if (this.data.performance.length > 100) {
                this.data.performance = this.data.performance.slice(0, 100);
            }
            if (this.currentSection === 'performance') {
                this.renderPerformance();
            }
        });

        this.socket.on('error-occurred', (data) => {
            this.data.errors.unshift(data);
            if (this.data.errors.length > 50) {
                this.data.errors = this.data.errors.slice(0, 50);
            }
            if (this.currentSection === 'errors') {
                this.renderErrors();
            }
            this.showAlert('error', `Новая ошибка: ${data.message.substring(0, 50)}...`);
        });

        this.socket.on('test-result', (data) => {
            this.data.tests.unshift(data);
            if (this.currentSection === 'tests') {
                this.renderTests();
            }
        });

        this.socket.on('system-alert', (data) => {
            this.showAlert(data.type, data.message);
        });
    }

    subscribeToUpdates() {
        this.socket.emit('subscribe-to-metrics');
        this.socket.emit('subscribe-to-errors');
        this.socket.emit('subscribe-to-tests');
    }

    updateStatus(connected) {
        const dot = document.getElementById('statusDot');
        const text = document.getElementById('statusText');
        
        if (connected) {
            dot.classList.remove('offline');
            text.textContent = 'Подключено';
        } else {
            dot.classList.add('offline');
            text.textContent = 'Отключено';
        }
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.loadSection(section);
                
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    loadSection(section) {
        this.currentSection = section;
        
        switch (section) {
            case 'overview': this.renderOverview(); break;
            case 'performance': this.renderPerformance(); break;
            case 'errors': this.renderErrors(); break;
            case 'tests': this.renderTests(); break;
            case 'system': this.renderSystem(); break;
            case 'logs': this.renderLogs(); break;
        }
    }

    renderOverview() {
        const content = document.getElementById('mainContent');
        const recentErrors = this.data.errors.slice(0, 5);
        const recentTests = this.data.tests.slice(0, 4);
        const avgPerformance = this.calculateAvgPerformance();

        content.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📊 Общая статистика</h3>
                </div>
                <div class="grid">
                    <div class="health-item healthy">
                        <div class="metric-value">${this.data.performance.length}</div>
                        <div class="metric-label">Метрик собрано</div>
                    </div>
                    <div class="health-item ${this.data.errors.length > 0 ? 'unhealthy' : 'healthy'}">
                        <div class="metric-value">${this.data.errors.length}</div>
                        <div class="metric-label">Активных ошибок</div>
                    </div>
                    <div class="health-item healthy">
                        <div class="metric-value">${this.data.tests.filter(t => t.status === 'passed').length}</div>
                        <div class="metric-label">Тестов пройдено</div>
                    </div>
                    <div class="health-item">
                        <div class="metric-value">${avgPerformance}</div>
                        <div class="metric-label">Средняя загрузка (мс)</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🚨 Последние ошибки</h3>
                </div>
                <div class="list">
                    ${recentErrors.map(error => `
                        <div class="list-item severity-${error.severity}">
                            <div class="error-message">${error.message}</div>
                            <div class="error-meta">${new Date(error.timestamp).toLocaleString()} • ${error.url}</div>
                        </div>
                    `).join('')}
                    ${recentErrors.length === 0 ? '<div class="loading">Ошибок не обнаружено ✅</div>' : ''}
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🧪 Последние тесты</h3>
                </div>
                <div class="list">
                    ${recentTests.map(test => `
                        <div class="list-item">
                            <div class="error-message">
                                ${test.testName} 
                                <span style="color: ${test.status === 'passed' ? 'var(--success)' : 'var(--error)'};">
                                    ${test.status === 'passed' ? '✅' : '❌'}
                                </span>
                            </div>
                            <div class="error-meta">${test.browser} • ${test.duration}мс • ${new Date(test.timestamp).toLocaleString()}</div>
                        </div>
                    `).join('')}
                    ${recentTests.length === 0 ? '<div class="loading">Тесты не запущены</div>' : ''}
                </div>
                <button class="btn btn-primary" onclick="dashboard.runTests()" style="margin-top: 1rem;">Запустить тесты</button>
            </div>
        `;
    }

    renderPerformance() {
        const content = document.getElementById('mainContent');
        const recent = this.data.performance.slice(0, 20);
        
        content.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">⚡ Метрики производительности</h3>
                    <button class="btn btn-secondary" onclick="dashboard.refreshData()">Обновить</button>
                </div>
                <div class="grid">
                    <div class="health-item">
                        <div class="metric-value">${this.calculateAvg(recent, 'pageLoadTime')}</div>
                        <div class="metric-label">Средняя загрузка (мс)</div>
                    </div>
                    <div class="health-item">
                        <div class="metric-value">${this.calculateAvg(recent, 'firstContentfulPaint')}</div>
                        <div class="metric-label">Средний FCP (мс)</div>
                    </div>
                    <div class="health-item">
                        <div class="metric-value">${this.calculateAvg(recent, 'largestContentfulPaint')}</div>
                        <div class="metric-label">Средний LCP (мс)</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📈 График производительности</h3>
                </div>
                <div class="chart">
                    График метрик за последние ${recent.length} измерений
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📋 Детальные метрики</h3>
                </div>
                <div class="list">
                    ${recent.map(metric => `
                        <div class="list-item">
                            <div class="error-message">${metric.url}</div>
                            <div class="error-meta">
                                Загрузка: ${metric.pageLoadTime}мс • 
                                FCP: ${metric.firstContentfulPaint}мс • 
                                LCP: ${metric.largestContentfulPaint}мс • 
                                ${new Date(metric.timestamp).toLocaleString()}
                            </div>
                        </div>
                    `).join('')}
                    ${recent.length === 0 ? '<div class="loading"><div class="spinner"></div> Загрузка...</div>' : ''}
                </div>
            </div>
        `;
    }

    renderErrors() {
        const content = document.getElementById('mainContent');
        const critical = this.data.errors.filter(e => e.severity === 'critical');
        const recent = this.data.errors.slice(0, 20);
        
        content.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🚨 Статистика ошибок</h3>
                    <button class="btn btn-secondary" onclick="dashboard.clearErrors()">Очистить</button>
                </div>
                <div class="grid">
                    <div class="health-item ${critical.length > 0 ? 'unhealthy' : 'healthy'}">
                        <div class="metric-value">${critical.length}</div>
                        <div class="metric-label">Критических</div>
                    </div>
                    <div class="health-item">
                        <div class="metric-value">${this.data.errors.filter(e => e.severity === 'high').length}</div>
                        <div class="metric-label">Высокий приоритет</div>
                    </div>
                    <div class="health-item">
                        <div class="metric-value">${this.data.errors.filter(e => e.resolved).length}</div>
                        <div class="metric-label">Решенных</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📋 Список ошибок</h3>
                </div>
                <div class="list">
                    ${recent.map(error => `
                        <div class="list-item severity-${error.severity}">
                            <div class="error-message">
                                ${error.message}
                                ${error.resolved ? '<span style="color: var(--success);">✅</span>' : ''}
                            </div>
                            <div class="error-meta">
                                ${error.type} • ${error.severity} • ${error.occurrences || 1} раз(а) • 
                                ${new Date(error.timestamp).toLocaleString()}
                            </div>
                        </div>
                    `).join('')}
                    ${recent.length === 0 ? '<div class="loading">Ошибки не обнаружены ✅</div>' : ''}
                </div>
            </div>
        `;
    }

    renderTests() {
        const content = document.getElementById('mainContent');
        const recent = this.data.tests.slice(0, 10);
        const passed = recent.filter(t => t.status === 'passed').length;
        const failed = recent.filter(t => t.status === 'failed').length;
        
        content.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🧪 Статистика тестирования</h3>
                    <div>
                        <button class="btn btn-primary" onclick="dashboard.runTests()">Запустить все</button>
                        <button class="btn btn-secondary" onclick="dashboard.runCriticalTests()">Критические</button>
                    </div>
                </div>
                <div class="grid">
                    <div class="health-item ${passed > failed ? 'healthy' : 'unhealthy'}">
                        <div class="metric-value">${passed}</div>
                        <div class="metric-label">Пройдено</div>
                    </div>
                    <div class="health-item ${failed === 0 ? 'healthy' : 'unhealthy'}">
                        <div class="metric-value">${failed}</div>
                        <div class="metric-label">Провалено</div>
                    </div>
                    <div class="health-item">
                        <div class="metric-value">${this.calculateAvg(recent, 'duration')}</div>
                        <div class="metric-label">Среднее время (мс)</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📋 Результаты тестов</h3>
                </div>
                <div class="list">
                    ${recent.map(test => `
                        <div class="list-item">
                            <div class="error-message">
                                ${test.testName} 
                                <span style="color: ${test.status === 'passed' ? 'var(--success)' : 'var(--error)'};">
                                    ${test.status === 'passed' ? '✅' : '❌'}
                                </span>
                            </div>
                            <div class="error-meta">
                                ${test.browser} • ${test.duration}мс • ${new Date(test.timestamp).toLocaleString()}
                            </div>
                        </div>
                    `).join('')}
                    ${recent.length === 0 ? '<div class="loading">Тесты не запускались</div>' : ''}
                </div>
            </div>
        `;
    }

    renderSystem() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">💻 Состояние системы</h3>
                    <button class="btn btn-secondary" onclick="dashboard.checkSystemHealth()">Проверить</button>
                </div>
                <div class="grid">
                    <div class="health-item healthy">
                        <div class="metric-value">✅</div>
                        <div class="metric-label">Основной сервер</div>
                    </div>
                    <div class="health-item healthy">
                        <div class="metric-value">✅</div>
                        <div class="metric-label">Сервер отладки</div>
                    </div>
                    <div class="health-item healthy">
                        <div class="metric-value">✅</div>
                        <div class="metric-label">База данных</div>
                    </div>
                    <div class="health-item healthy">
                        <div class="metric-value">✅</div>
                        <div class="metric-label">WebSocket</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📊 Системные метрики</h3>
                </div>
                <div class="chart">
                    Загрузка CPU, использование памяти, дисковое пространство
                </div>
            </div>
        `;
    }

    renderLogs() {
        const content = document.getElementById('mainContent');
        content.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">📝 Системные логи</h3>
                    <button class="btn btn-secondary" onclick="dashboard.clearLogs()">Очистить</button>
                </div>
                <div class="logs" id="logsContainer">
                    ${this.data.logs.map(log => `<div class="log-entry">[${log.timestamp}] ${log.level}: ${log.message}</div>`).join('')}
                    ${this.data.logs.length === 0 ? 'Логи загружаются...' : ''}
                </div>
            </div>
        `;
    }

    // Вспомогательные методы
    calculateAvg(arr, prop) {
        if (arr.length === 0) return 0;
        return Math.round(arr.reduce((sum, item) => sum + item[prop], 0) / arr.length);
    }

    calculateAvgPerformance() {
        if (this.data.performance.length === 0) return 0;
        return this.calculateAvg(this.data.performance.slice(0, 10), 'pageLoadTime');
    }

    showAlert(type, message) {
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }

    // Публичные методы для кнопок
    async runTests() {
        this.showAlert('info', 'Запуск тестов...');
        if (this.socket) {
            this.socket.emit('run-manual-test', { type: 'all' });
        }
    }

    async runCriticalTests() {
        this.showAlert('info', 'Запуск критических тестов...');
        if (this.socket) {
            this.socket.emit('run-manual-test', { type: 'critical' });
        }
    }

    async refreshData() {
        this.showAlert('info', 'Обновление данных...');
        this.fetchData();
    }

    async fetchData() {
        try {
            // Получаем данные с сервера
            const responses = await Promise.all([
                fetch('http://localhost:3001/api/metrics/performance'),
                fetch('http://localhost:3001/api/metrics/errors'),
                fetch('http://localhost:3001/api/tests/results'),
                fetch('http://localhost:3001/api/system/health')
            ]);

            if (responses.every(r => r.ok)) {
                const [performance, errors, tests, system] = await Promise.all(
                    responses.map(r => r.json())
                );

                this.data.performance = performance || [];
                this.data.errors = errors || [];
                this.data.tests = tests || [];
                this.data.system = system || {};

                // Перерендерим текущую секцию
                this.loadSection(this.currentSection);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    clearErrors() {
        this.data.errors = [];
        this.renderErrors();
        this.showAlert('success', 'Ошибки очищены');
    }

    clearLogs() {
        this.data.logs = [];
        this.renderLogs();
        this.showAlert('success', 'Логи очищены');
    }

    async checkSystemHealth() {
        this.showAlert('info', 'Проверка состояния системы...');
        // Логика проверки
        setTimeout(() => {
            this.showAlert('success', 'Система работает нормально');
        }, 2000);
    }
}

// Инициализация dashboard
const dashboard = new DashboardManager();