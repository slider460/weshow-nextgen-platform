#!/bin/bash

echo "🔍 Проверка статуса репозитория WeShow NextGen Platform..."
echo ""

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: Запустите скрипт из корневой папки проекта"
    exit 1
fi

echo "📋 Информация о репозитории:"
echo "================================"

# Текущая ветка
echo "🌿 Текущая ветка:"
git branch --show-current
echo ""

# Все ветки
echo "🌿 Все ветки:"
git branch -a
echo ""

# Статус
echo "📊 Статус Git:"
git status --short
echo ""

# Последние коммиты
echo "📝 Последние коммиты:"
git log --oneline -5
echo ""

# Remote репозитории
echo "🌐 Remote репозитории:"
git remote -v
echo ""

# Проверка файлов
echo "📁 Ключевые файлы:"
if [ -f "package.json" ]; then echo "✅ package.json"; else echo "❌ package.json"; fi
if [ -f "vercel.json" ]; then echo "✅ vercel.json"; else echo "❌ vercel.json"; fi
if [ -f ".github/workflows/deploy.yml" ]; then echo "✅ GitHub Actions workflow"; else echo "❌ GitHub Actions workflow"; fi
if [ -d "src" ]; then echo "✅ src/ директория"; else echo "❌ src/ директория"; fi
if [ -d "dist" ]; then echo "✅ dist/ директория"; else echo "❌ dist/ директория"; fi
echo ""

# Проверка сборки
echo "🔨 Проверка сборки:"
if npm run build > /dev/null 2>&1; then
    echo "✅ Проект собирается успешно"
else
    echo "❌ Ошибка при сборке проекта"
    echo "Запустите 'npm run build' для деталей"
fi
echo ""

# Рекомендации
echo "💡 Рекомендации для Vercel:"
echo "================================"
echo "1. Убедитесь, что вы на ветке 'main'"
echo "2. Проверьте, что все файлы закоммичены"
echo "3. Убедитесь, что репозиторий публичный"
echo "4. Попробуйте пересоздать проект в Vercel"
echo "5. Используйте правильные настройки:"
echo "   - Framework Preset: Other"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "   - Install Command: npm install"
echo ""

echo "🔗 Полезные ссылки:"
echo "- GitHub репозиторий: https://github.com/slider460/weshow-nextgen-platform"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Инструкция по устранению неполадок: VERCEL_TROUBLESHOOTING.md"
echo ""

echo "✅ Проверка завершена!"
