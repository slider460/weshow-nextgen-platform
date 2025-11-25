# 🔑 НАСТРОЙКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ В VERCEL

## ПРОБЛЕМА
Vercel не видит переменные окружения Supabase, поэтому сайт показывает ошибки:
- `⚠️ ОШИБКА: Supabase credentials не найдены!`
- `Error: supabaseUrl is required.`

## РЕШЕНИЕ

### 1. Откройте Vercel Dashboard
Перейдите на: https://vercel.com/dashboard

### 2. Выберите проект
Найдите проект: `weshow-nextgen-platform`

### 3. Перейдите в Settings
- Нажмите на название проекта
- Выберите вкладку "Settings"
- В левом меню выберите "Environment Variables"

### 4. Добавьте переменные

**Переменная #1:**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://zbykhdjqrtqftfitbvbt.supabase.co`
- **Environment:** Production ✅

**Переменная #2:**
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE`
- **Environment:** Production ✅

### 5. Сохраните и пересоберите
- Нажмите "Save"
- Перейдите в "Deployments"
- Нажмите "Redeploy" на последнем деплое

## ПРОВЕРКА
После настройки проверьте:
- https://www.weshow.su/
- https://weshow-nextgen-platform.vercel.app/

Ошибки Supabase должны исчезнуть!
