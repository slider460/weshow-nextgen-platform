#!/bin/bash

echo "🚀 Начинаем развертывание weshow.su..."

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Запустите скрипт из корневой директории проекта."
    exit 1
fi

# Собираем проект
echo "📦 Собираем проект..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке проекта"
    exit 1
fi

echo "✅ Проект успешно собран"

# Проверяем, что dist директория существует
if [ ! -d "dist" ]; then
    echo "❌ Ошибка: директория dist не найдена"
    exit 1
fi

echo "📁 Содержимое dist директории:"
ls -la dist/

echo ""
echo "🎯 Готово к развертыванию!"
echo ""
echo "Для развертывания на Vercel:"
echo "1. Перейдите на https://vercel.com"
echo "2. Войдите в свой аккаунт"
echo "3. Нажмите 'New Project'"
echo "4. Импортируйте репозиторий: https://github.com/slider460/weshow-nextgen-platform"
echo "5. Выберите ветку: working-version"
echo "6. Настройте домен: weshow.su"
echo ""
echo "Или используйте команду: npx vercel --prod"
echo ""

# Показываем информацию о проекте
echo "📋 Информация о проекте:"
echo "   Название: weshow-nextgen-platform"
echo "   Версия: $(node -p "require('./package.json').version")"
echo "   Домен: weshow.su"
echo "   Репозиторий: https://github.com/slider460/weshow-nextgen-platform"
echo "   Ветка: working-version"