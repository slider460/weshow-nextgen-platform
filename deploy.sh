#!/bin/bash

echo "🚀 Начинаем деплой WeShow NextGen Platform..."

# Сборка проекта
echo "📦 Собираем проект..."
npm run build

# Создаем ветку gh-pages если её нет
echo "🌿 Создаем ветку gh-pages..."
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Очищаем ветку
echo "🧹 Очищаем ветку gh-pages..."
git rm -rf . 2>/dev/null || true

# Копируем собранные файлы
echo "📁 Копируем собранные файлы..."
cp -r dist/* .

# Добавляем все файлы
echo "➕ Добавляем файлы в git..."
git add .

# Коммитим изменения
echo "💾 Коммитим изменения..."
git commit -m "🚀 Деплой: $(date)"

# Пушим на GitHub
echo "📤 Пушим на GitHub..."
git push origin gh-pages --force

# Возвращаемся на основную ветку
echo "🔄 Возвращаемся на основную ветку..."
git checkout main

echo "✅ Деплой завершен! Сайт доступен по адресу:"
echo "🌐 https://slider460.github.io/weshow-nextgen-platform/"
echo ""
echo "💡 Не забудьте включить GitHub Pages в настройках репозитория!"
