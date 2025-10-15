#!/bin/bash

# Скрипт для установки переменных окружения Supabase

echo "🔧 Настройка переменных окружения Supabase..."

# Экспортируем переменные окружения для текущей сессии
export VITE_SUPABASE_URL="https://zbykhdjqrtqftfitbvbt.supabase.co"
export VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE"

echo "✅ Переменные окружения установлены:"
echo "VITE_SUPABASE_URL: $VITE_SUPABASE_URL"
echo "VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY:0:20}..."

echo ""
echo "🚀 Теперь запустите сервер разработки:"
echo "npm run dev"
echo ""
echo "📝 Или используйте эту команду для запуска с переменными:"
echo "VITE_SUPABASE_URL=\"$VITE_SUPABASE_URL\" VITE_SUPABASE_ANON_KEY=\"$VITE_SUPABASE_ANON_KEY\" npm run dev"
