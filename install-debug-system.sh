#!/bin/bash

echo "🚀 Установка системы автоматической отладки WeShow..."
echo

# Проверка node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установите Node.js 18+ и повторите попытку."
    exit 1
fi

# Проверка npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не найден. Установите npm и повторите попытку."
    exit 1
fi

echo "✅ Node.js $(node --version) найден"
echo "✅ npm $(npm --version) найден"
echo

# Установка основных зависимостей
echo "📦 Установка основных зависимостей..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки основных зависимостей"
    exit 1
fi
echo "✅ Основные зависимости установлены"
echo

# Переход в директорию сервера отладки
cd debug-server

# Установка зависимостей сервера отладки
echo "📦 Установка зависимостей сервера отладки..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки зависимостей сервера отладки"
    exit 1
fi
echo "✅ Зависимости сервера отладки установлены"
echo

# Сборка TypeScript
echo "🔨 Компиляция TypeScript..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Ошибка компиляции TypeScript"
    exit 1
fi
echo "✅ TypeScript скомпилирован"
echo

# Установка Playwright браузеров
echo "🌐 Установка Playwright браузеров..."
npx playwright install
if [ $? -ne 0 ]; then
    echo "⚠️ Ошибка установки Playwright браузеров (необязательно для основной функциональности)"
fi
echo "✅ Playwright браузеры установлены"
echo

# Возврат в корневую директорию
cd ..

# Создание директории для базы данных
mkdir -p debug-server/data

# Запуск тестов системы
echo "🧪 Запуск тестов системы..."
cd debug-server
node test-system.js
test_result=$?
cd ..

if [ $test_result -eq 0 ]; then
    echo
    echo "🎉 Установка завершена успешно!"
    echo
    echo "📋 Команды для запуска:"
    echo "  npm run debug:all     # Запустить всё (приложение + отладку)"
    echo "  npm run dev           # Запустить только основное приложение"
    echo "  npm run debug:server  # Запустить только сервер отладки"
    echo
    echo "🌐 После запуска доступно по адресам:"
    echo "  Основное приложение:    http://localhost:5173"
    echo "  Dashboard отладки:      http://localhost:3001/dashboard"
    echo
    echo "📚 Дополнительная информация в файле DEBUG_SYSTEM_README.md"
else
    echo
    echo "⚠️ Установка завершена с предупреждениями."
    echo "Проверьте вывод тестов выше для устранения проблем."
fi