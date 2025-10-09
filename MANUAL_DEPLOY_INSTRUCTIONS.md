# 🚀 Ручная инструкция по деплою на weshow.su

**Дата:** 10 октября 2025  
**Версия:** v1.2.0

---

## 🎯 У ТЕБЯ ЕСТЬ 3 ВАРИАНТА ДЕПЛОЯ

### ✅ ВАРИАНТ 1: SSH Деплой (Рекомендуется)

Если у тебя есть SSH доступ к weshow.su:

```bash
# 1. Подключись к серверу
ssh user@weshow.su

# 2. Перейди в папку проекта
cd /var/www/weshow  # или твой путь

# 3. Получи обновления с GitHub
git pull origin main

# 4. КРИТИЧНО! Создай .env файл (если еще нет)
nano .env
```

**Вставь в `.env`:**
```env
VITE_SUPABASE_URL=https://zbykhdjqrtqftfitbvbt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE
```

**Продолжи:**
```bash
# 5. Установи зависимости
npm install

# 6. Собери production
npm run build

# 7. Перезапусти сервер
pm2 restart weshow
# ИЛИ
sudo systemctl restart weshow
# ИЛИ (если другой способ)
# перезапусти вручную
```

---

### ✅ ВАРИАНТ 2: Автоматический скрипт (SSH)

Если у тебя есть SSH, используй готовый скрипт:

```bash
# Отредактируй deploy-to-server.sh (укажи свои данные):
nano deploy-to-server.sh

# Измени:
# SERVER_USER="твой_пользователь"
# SERVER_HOST="weshow.su"
# SERVER_PATH="/путь/к/проекту"

# Запусти:
chmod +x deploy-to-server.sh
./deploy-to-server.sh
```

---

### ✅ ВАРИАНТ 3: Vercel/Netlify (Автодеплой)

Если у тебя настроен Vercel или Netlify:

#### Vercel:
1. Зайди на https://vercel.com/dashboard
2. Найди проект `weshow-nextgen-platform`
3. Он автоматически задеплоится с GitHub!
4. Или вручную: нажми "Deploy" → "main branch"

**Настрой Environment Variables в Vercel:**
- `VITE_SUPABASE_URL` = `https://zbykhdjqrtqftfitbvbt.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `твой_ключ`

#### Netlify:
1. Зайди на https://app.netlify.com/
2. Найди проект
3. Автодеплой с GitHub или кнопка "Deploy"

**Настрой Environment Variables в Netlify:**
- `VITE_SUPABASE_URL` = `https://zbykhdjqrtqftfitbvbt.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `твой_ключ`

---

## ⚠️ КРИТИЧНО! ПЕРЕД ДЕПЛОЕМ

### На production сервере ОБЯЗАТЕЛЬНО:

✅ **Создать `.env` файл**
```env
VITE_SUPABASE_URL=https://zbykhdjqrtqftfitbvbt.supabase.co
VITE_SUPABASE_ANON_KEY=твой_anon_key
```

❌ **НЕ добавляй `SERVICE_ROLE_KEY` в production клиенте!**

---

## 📋 ПРОВЕРКА ПОСЛЕ ДЕПЛОЯ

После деплоя проверь:

```bash
# 1. Открой сайт
https://weshow.su

# 2. Открой DevTools (F12) → Console
# Не должно быть ошибок!

# 3. Проверь:
✓ Главная страница загружается
✓ Логотипы клиентов отображаются
✓ Портфолио (кейсы) загружается
✓ Каталог оборудования (68 единиц)
✓ Админ панель работает
✓ Формы отправляются

# 4. Проверь производительность (F12 → Lighthouse):
✓ Performance Score > 90
✓ LCP < 2.5s
✓ CLS < 0.1
```

---

## 🐛 ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ

### Проблема: "Cannot connect to Supabase"
**Решение:** Проверь что `.env` создан с правильными ключами

### Проблема: "404 Not Found"
**Решение:** Проверь настройки rewrites в nginx/apache

### Проблема: Белый экран
**Решение:** 
1. Проверь консоль браузера (F12)
2. Проверь что все файлы скопированы
3. Проверь права на файлы: `chmod -R 755 dist/`

---

## 📞 ПОДДЕРЖКА

**GitHub:** https://github.com/slider460/weshow-nextgen-platform  
**Branch:** main  
**Commit:** b37f9b7d

**Документация:**
- `DEPLOY_TO_PRODUCTION.md` - полная инструкция
- `SECURITY.md` - правила безопасности
- `RELEASE_v1.2.0_COMPLETE.md` - release notes

---

**Готово к деплою! Выбери удобный вариант! 🚀**

