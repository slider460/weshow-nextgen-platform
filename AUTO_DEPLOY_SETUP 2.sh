#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🔄 Автоматическая настройка деплоя на Vercel     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Проверка Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Устанавливаю Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI: $(vercel --version)"
echo ""

# Логин в Vercel
echo "🔐 Запускаю авторизацию Vercel..."
echo "   (Откроется браузер для входа через GitHub)"
echo ""
vercel login

echo ""
echo "🚀 Настраиваю проект..."
echo ""

# Создание .vercel директории если нет
mkdir -p .vercel

# Настройка проекта
vercel link --yes

echo ""
echo "📝 Настраиваю environment variables..."
echo ""

# Добавление env переменных
vercel env add VITE_SUPABASE_URL production << 'ENVEOF'
https://zbykhdjqrtqftfitbvbt.supabase.co
ENVEOF

vercel env add VITE_SUPABASE_ANON_KEY production << 'ENVEOF'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE
ENVEOF

echo ""
echo "🚀 Запускаю production деплой..."
echo ""

vercel --prod

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✅ АВТОДЕПЛОЙ НАСТРОЕН! ✅              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🎉 Теперь каждый 'git push origin main' будет автоматически"
echo "   деплоиться на production!"
echo ""
echo "🌐 Проверь свой сайт в Vercel Dashboard:"
echo "   https://vercel.com/dashboard"
echo ""
echo "📌 Чтобы добавить домен weshow.su:"
echo "   vercel domains add weshow.su"
echo ""

