# 🔄 Настройка автодеплоя на weshow.su

**Дата:** 10 октября 2025  
**Репозиторий:** github.com/slider460/weshow-nextgen-platform

---

## ✅ У ТЕБЯ УЖЕ ЕСТЬ КОНФИГИ!

Найдено:
- ✅ `vercel.json` - конфигурация Vercel
- ✅ `netlify.toml` - конфигурация Netlify

Выбери платформу и настроим!

---

## 🚀 VERCEL (Рекомендуется для React)

### Шаг 1: Войди в Vercel

1. Открой: https://vercel.com
2. Войди через GitHub аккаунт

### Шаг 2: Импорт проекта

1. Нажми **"Add New Project"**
2. Выбери репозиторий: `slider460/weshow-nextgen-platform`
3. Нажми **"Import"**

### Шаг 3: Настройки проекта

**Framework Preset:** `Vite`

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Root Directory:** `./` (оставь пустым)

### Шаг 4: Environment Variables

⚠️ **КРИТИЧНО!** Добавь переменные окружения:

Нажми **"Environment Variables"** и добавь:

```
Ключ: VITE_SUPABASE_URL
Значение: https://zbykhdjqrtqftfitbvbt.supabase.co
```

```
Ключ: VITE_SUPABASE_ANON_KEY
Значение: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE
```

❌ **НЕ ДОБАВЛЯЙ** `VITE_SUPABASE_SERVICE_KEY` - это небезопасно!

### Шаг 5: Настройка домена

1. Перейди в **Settings** → **Domains**
2. Добавь домен: `weshow.su`
3. Настрой DNS записи (Vercel покажет инструкции)

### Шаг 6: Deploy!

1. Нажми **"Deploy"**
2. Подожди 2-5 минут
3. Vercel автоматически задеплоит!

### Шаг 7: Автодеплой настроен!

После этого:
- ✅ Каждый `git push origin main` → автоматический деплой
- ✅ Vercel покажет preview URL
- ✅ Production деплой на weshow.su

---

## 🌐 NETLIFY (Альтернатива)

### Шаг 1: Войди в Netlify

1. Открой: https://app.netlify.com
2. Войди через GitHub

### Шаг 2: Импорт проекта

1. Нажми **"Add new site"** → **"Import an existing project"**
2. Выбери **GitHub**
3. Найди репозиторий: `slider460/weshow-nextgen-platform`
4. Нажми **"Deploy"**

### Шаг 3: Build Settings

```
Build command: npm run build
Publish directory: dist
```

### Шаг 4: Environment Variables

⚠️ **КРИТИЧНО!** Добавь в **Site settings** → **Environment variables**:

```
VITE_SUPABASE_URL = https://zbykhdjqrtqftfitbvbt.supabase.co
VITE_SUPABASE_ANON_KEY = твой_ключ
```

### Шаг 5: Домен

1. **Site settings** → **Domain management**
2. **Add custom domain** → `weshow.su`
3. Настрой DNS

### Шаг 6: Deploy!

Netlify автоматически задеплоит проект!

---

## 🔧 ЧЕРЕЗ CLI (Быстрый вариант)

### Vercel CLI:

```bash
# Установи Vercel CLI
npm install -g vercel

# Залогинься
vercel login

# Создай .env для production
cat > .vercel/.env.production.local << 'EOF'
VITE_SUPABASE_URL=https://zbykhdjqrtqftfitbvbt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE
EOF

# Деплой на production
vercel --prod

# Настрой домен
vercel domains add weshow.su
```

### Netlify CLI:

```bash
# Установи Netlify CLI
npm install -g netlify-cli

# Залогинься
netlify login

# Инициализируй проект
netlify init

# Деплой
netlify deploy --prod
```

---

## 📋 ПРОВЕРКА АВТОДЕПЛОЯ

После настройки проверь:

```bash
# 1. Сделай тестовый коммит
echo "# Test" >> README.md
git add README.md
git commit -m "test: проверка автодеплоя"
git push origin main

# 2. Через 2-5 минут проверь:
# - Dashboard Vercel/Netlify
# - https://weshow.su

# 3. Если сайт обновился - автодеплой работает! ✅
```

---

## 🎯 РЕКОМЕНДАЦИЯ

**Я рекомендую Vercel, потому что:**
- ✅ Бесплатный для личных проектов
- ✅ Отличная интеграция с GitHub
- ✅ Автоматический SSL
- ✅ Edge Network (быстро по всему миру)
- ✅ Preview deployments для каждого PR
- ✅ Zero-config для Vite/React

**Настройка занимает 5 минут!**

---

## ⚠️ ВАЖНО

После настройки автодеплоя:
1. ✅ Настрой Environment Variables
2. ✅ Добавь домен weshow.su
3. ✅ Проверь что деплой прошел успешно
4. ✅ Откат всегда доступен через Vercel/Netlify UI

---

**Готов настроить? Скажи какую платформу выбираешь! 🚀**

