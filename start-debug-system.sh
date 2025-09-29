#!/bin/bash

echo "🚀 Запуск системы автоматической отладки WeShow..."
echo

# Проверка, установлены ли зависимости
if [ ! -d "node_modules" ] || [ ! -d "debug-server/node_modules" ]; then
    echo "⚠️ Зависимости не установлены. Запускаем установку..."
    ./install-debug-system.sh
    if [ $? -ne 0 ]; then
        echo "❌ Ошибка установки зависимостей"
        exit 1
    fi
    echo
fi

# Запуск системы с использованием concurrently
echo "🔧 Запуск основного приложения и сервера отладки..."
echo "🌐 Основное приложение будет доступно по адресу: http://localhost:5173"
echo "📊 Dashboard отладки будет доступен по адресу: http://localhost:3001/dashboard"
echo "🛑 Для остановки нажмите Ctrl+C"
echo

# Запуск с concurrently для параллельного запуска
npx concurrently \
    --names "APP,DEBUG" \
    --prefix name \
    --prefix-colors "blue.bold,magenta.bold" \
    "npm run dev" \
    "npm run debug:server"

if [ $? -eq 0 ]; then
    echo
    echo "✅ Система успешно запущена!"
else
    echo
    echo "❌ Ошибка запуска системы"
    exit 1
fi