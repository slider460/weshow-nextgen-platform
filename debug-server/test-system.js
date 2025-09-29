#!/usr/bin/env node

/**
 * Простой тест системы отладки
 * Проверяет основные компоненты перед запуском
 */

import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';

console.log('🧪 Запуск тестирования системы отладки...\n');

const tests = [
  {
    name: 'Проверка структуры файлов',
    test: async () => {
      const requiredFiles = [
        'server.ts',
        'websocket.ts',
        'monitoring/performance.ts',
        'monitoring/errors.ts',
        'monitoring/network.ts',
        'testing/scheduler.ts',
        'testing/runner.ts',
        'autonomous/error-detector.ts',
        'self-healing/healing-system.ts',
        'database/models.ts'
      ];

      for (const file of requiredFiles) {
        try {
          await fs.access(path.join('.', file));
          console.log(`  ✅ ${file}`);
        } catch (error) {
          throw new Error(`Отсутствует файл: ${file}`);
        }
      }
    }
  },

  {
    name: 'Проверка зависимостей',
    test: async () => {
      try {
        const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
        const requiredDeps = ['express', 'socket.io', 'sqlite3', '@playwright/test'];
        
        for (const dep of requiredDeps) {
          if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`  ✅ ${dep}: ${packageJson.dependencies[dep]}`);
          } else {
            throw new Error(`Отсутствует зависимость: ${dep}`);
          }
        }
      } catch (error) {
        throw new Error(`Ошибка чтения package.json: ${error.message}`);
      }
    }
  },

  {
    name: 'Проверка портов',
    test: async () => {
      const checkPort = (port) => {
        return new Promise((resolve) => {
          const net = require('net');
          const server = net.createServer();
          
          server.listen(port, () => {
            server.once('close', () => {
              resolve(true);
            });
            server.close();
          });
          
          server.on('error', () => {
            resolve(false);
          });
        });
      };

      const ports = [3001, 5173];
      for (const port of ports) {
        const available = await checkPort(port);
        if (available) {
          console.log(`  ✅ Порт ${port} доступен`);
        } else {
          console.log(`  ⚠️ Порт ${port} занят`);
        }
      }
    }
  },

  {
    name: 'Проверка TypeScript компиляции',
    test: async () => {
      return new Promise((resolve, reject) => {
        const tsc = spawn('npx', ['tsc', '--noEmit'], { stdio: 'pipe' });
        
        let output = '';
        tsc.stdout.on('data', (data) => output += data);
        tsc.stderr.on('data', (data) => output += data);
        
        tsc.on('close', (code) => {
          if (code === 0) {
            console.log(`  ✅ TypeScript компиляция успешна`);
            resolve();
          } else {
            console.log(`  ❌ Ошибки TypeScript:\n${output}`);
            reject(new Error('TypeScript compilation failed'));
          }
        });
      });
    }
  },

  {
    name: 'Проверка dashboard файлов',
    test: async () => {
      const dashboardFiles = [
        '../debug-dashboard/index.html',
        '../debug-dashboard/dashboard.js'
      ];

      for (const file of dashboardFiles) {
        try {
          await fs.access(path.join('.', file));
          console.log(`  ✅ ${file}`);
        } catch (error) {
          throw new Error(`Отсутствует файл dashboard: ${file}`);
        }
      }
    }
  }
];

// Запуск тестов
let passed = 0;
let failed = 0;

for (const testCase of tests) {
  try {
    console.log(`\n🔍 ${testCase.name}:`);
    await testCase.test();
    passed++;
    console.log(`  ✅ Пройден`);
  } catch (error) {
    failed++;
    console.log(`  ❌ Провален: ${error.message}`);
  }
}

console.log(`\n📊 Результаты тестирования:`);
console.log(`  ✅ Пройдено: ${passed}`);
console.log(`  ❌ Провалено: ${failed}`);
console.log(`  📈 Успешность: ${Math.round((passed / tests.length) * 100)}%`);

if (failed === 0) {
  console.log(`\n🎉 Все тесты пройдены! Система готова к запуску.`);
  console.log(`\n🚀 Для запуска выполните:`);
  console.log(`   npm install  # Установка зависимостей`);
  console.log(`   npm run dev  # Запуск сервера отладки`);
} else {
  console.log(`\n⚠️ Обнаружены проблемы. Устраните их перед запуском.`);
  process.exit(1);
}