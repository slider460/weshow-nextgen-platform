#!/bin/bash

echo "🔒 Восстановление резервной версии WeShow NextGen Platform..."
echo ""

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: Запустите скрипт из корневой папки проекта"
    exit 1
fi

echo "📋 Доступные резервные версии:"
echo "1. v1.0.0-stable (рекомендуется)"
echo "2. backup-v1.0.0-stable"
echo "3. Коммит cd7a5ee8"
echo ""

read -p "Выберите версию для восстановления (1-3): " choice

case $choice in
    1)
        echo "🔄 Восстанавливаем версию v1.0.0-stable..."
        git checkout v1.0.0-stable
        ;;
    2)
        echo "🔄 Восстанавливаем версию backup-v1.0.0-stable..."
        git checkout backup-v1.0.0-stable
        ;;
    3)
        echo "🔄 Восстанавливаем коммит cd7a5ee8..."
        git checkout cd7a08bc5
        ;;
    *)
        echo "❌ Неверный выбор. Выход."
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    echo "✅ Версия успешно восстановлена!"
    echo ""
    echo "📦 Устанавливаем зависимости..."
    npm install
    
    echo "🔨 Собираем проект..."
    npm run build
    
    echo "🚀 Запускаем локальный сервер..."
    echo "Сайт будет доступен по адресу: http://localhost:8081/"
    npm run dev
else
    echo "❌ Ошибка при восстановлении версии"
    exit 1
fi
