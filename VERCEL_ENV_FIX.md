# 🔧 ИСПРАВЛЕНИЕ ПЕРЕМЕННЫХ ОКРУЖЕНИЯ В VERCEL

## 🚨 ПРОБЛЕМА
Сайт показывает ошибки в консоли:
- `❌ ОШИБКА: Supabase credentials не найдены!`
- `Error: supabaseUrl is required.`

## ✅ РЕШЕНИЕ

### 1. Откройте Vercel Dashboard
Перейдите на: https://vercel.com/dashboard

### 2. Выберите проект
Найдите проект: `weshow-nextgen-platform`

### 3. Перейдите в Settings → Environment Variables
- Нажмите на название проекта
- Выберите вкладку "Settings"
- В левом меню выберите "Environment Variables"

### 4. Добавьте переменные (точно как указано):

**Переменная #1:**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://zbykhdjqrtqftfitbvbt.supabase.co`
- **Environment:** Production ✅

**Переменная #2:**
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE`
- **Environment:** Production ✅

## 🔧 ИСПРАВЛЕНИЯ В КОДЕ
- Удалены захардкоженные URL Supabase из всех файлов
- Все API файлы теперь используют переменные окружения
- Добавлена расширенная диагностика переменных окружения

### 5. Сохраните и пересоберите
- Нажмите "Save"
- Перейдите в "Deployments"
- Нажмите "Redeploy" на последнем деплое

## 🔍 ПРОВЕРКА
После настройки проверьте:
- https://www.weshow.su/
- https://weshow-nextgen-platform.vercel.app/

В консоли должно появиться:
```
=== ПРОВЕРКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ ===
VITE_SUPABASE_URL: https://zbykhdjqrtqftfitbvbt.supabase.co
VITE_SUPABASE_ANON_KEY: НАЙДЕНА
=====================================
✅ Все переменные Supabase найдены!
```

## ⚠️ ВАЖНО
- Убедитесь, что переменные добавлены именно для **Production** среды
- После добавления обязательно сделайте **Redeploy**
- Проверьте, что имена переменных точно совпадают (с префиксом `VITE_`)
