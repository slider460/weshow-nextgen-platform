#!/bin/bash

echo "🚀 Автоматический деплой на weshow.su"
echo "═══════════════════════════════════════"

# Переменные (измени под свой сервер!)
SERVER_USER="root"  # Измени на своего пользователя
SERVER_HOST="weshow.su"
SERVER_PATH="/var/www/weshow"  # Измени на свой путь

echo ""
echo "📦 Проверка production build..."

# Проверка что dist существует
if [ ! -d "dist" ]; then
    echo "❌ Папка dist не найдена! Запустите: npm run build"
    exit 1
fi

echo "✅ Build найден (dist/)"

echo ""
echo "🌐 Подключение к серверу: $SERVER_USER@$SERVER_HOST"
echo ""

# Создаем .env на сервере (если не существует)
echo "📝 Создание .env на сервере..."
ssh $SERVER_USER@$SERVER_HOST << 'ENDSSH'
cd /var/www/weshow

if [ ! -f ".env" ]; then
    echo "Создаем .env файл..."
    cat > .env << 'EOF'
VITE_SUPABASE_URL=https://zbykhdjqrtqftfitbvbt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE
EOF
    echo "✅ .env создан"
else
    echo "✅ .env уже существует"
fi
ENDSSH

echo ""
echo "📤 Копирование файлов на сервер..."

# Синхронизация dist с сервером
rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.env' \
    dist/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

if [ $? -eq 0 ]; then
    echo "✅ Файлы успешно скопированы!"
else
    echo "❌ Ошибка копирования файлов"
    exit 1
fi

echo ""
echo "🔄 Перезапуск сервера..."

# Перезапуск на сервере (PM2 или systemd)
ssh $SERVER_USER@$SERVER_HOST << 'ENDSSH'
cd /var/www/weshow

# Попробуем PM2
if command -v pm2 &> /dev/null; then
    pm2 restart weshow 2>/dev/null || pm2 restart all
    echo "✅ PM2: Сервер перезапущен"
# Попробуем systemd
elif systemctl is-active --quiet weshow; then
    sudo systemctl restart weshow
    echo "✅ Systemd: Сервер перезапущен"
else
    echo "⚠️  Не удалось определить тип сервера. Перезапустите вручную."
fi
ENDSSH

echo ""
echo "═══════════════════════════════════════"
echo "🎉 Деплой завершен!"
echo ""
echo "🌐 Проверь сайт: https://weshow.su"
echo ""


