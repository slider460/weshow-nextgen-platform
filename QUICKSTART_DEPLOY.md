# ⚡ Быстрый старт: Деплой за 5 минут

**Версия:** v1.2.0  
**Дата:** 10 октября 2025

---

## 🎯 САМЫЙ ПРОСТОЙ СПОСОБ: Vercel через браузер

### ✅ ШАГ 1: Открой Vercel (30 сек)

1. Открой: **https://vercel.com**
2. Нажми **"Sign Up"** или **"Login"**
3. Войди через **GitHub** аккаунт

### ✅ ШАГ 2: Импорт проекта (1 мин)

1. На главной странице нажми **"Add New..."** → **"Project"**
2. Найди репозиторий: **`slider460/weshow-nextgen-platform`**
3. Нажми **"Import"**

### ✅ ШАГ 3: Настройки (2 мин)

**Framework Preset:** Автоматически определится как `Vite`

**Build Settings** (обычно автозаполнены):
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Нажми **"Deploy"** (пока без env переменных)

### ✅ ШАГ 4: Env Variables (1 мин)

Пока идет первый деплой:

1. Перейди в **Settings** → **Environment Variables**
2. Добавь:

```
Name: VITE_SUPABASE_URL
Value: https://zbykhdjqrtqftfitbvbt.supabase.co
```

```
Name: VITE_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE
```

3. Нажми **"Save"**

### ✅ ШАГ 5: Редеплой с env (30 сек)

1. Перейди в **Deployments**
2. Нажми **"..."** → **"Redeploy"** на последнем деплое
3. Подожди 2 минуты

### ✅ ШАГ 6: Домен weshow.su (опционально)

1. **Settings** → **Domains**
2. **Add Domain** → введи `weshow.su`
3. Vercel покажет DNS настройки
4. Добавь A/CNAME записи у своего DNS провайдера

---

## 🎉 ГОТОВО!

После этого:
- ✅ Каждый `git push origin main` = автоматический деплой
- ✅ Preview deployments для PR
- ✅ Rollback одной кнопкой
- ✅ SSL сертификат автоматически

---

## 📱 АЛЬТЕРНАТИВА: Через CLI

Если хочешь через командную строку:

```bash
# Запусти скрипт
./AUTO_DEPLOY_SETUP.sh

# ИЛИ вручную:
npx vercel login
npx vercel --prod
```

---

## 🔍 ПРОВЕРКА

После деплоя:
1. Открой URL который покажет Vercel (например: `weshow-nextgen-platform.vercel.app`)
2. Проверь:
   - ✅ Главная страница загружается
   - ✅ Нет ошибок в консоли (F12)
   - ✅ Логотипы клиентов отображаются
   - ✅ Данные из Supabase загружаются

---

## ⚠️ ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ

**Ошибка: "Cannot connect to Supabase"**
→ Проверь Environment Variables в Vercel Settings

**Ошибка: "Build failed"**
→ Проверь Build Command: должен быть `npm run build`

**Белый экран**
→ Проверь консоль браузера (F12)
→ Проверь Output Directory: должен быть `dist`

---

## 📞 ПОДДЕРЖКА

**Vercel Docs:** https://vercel.com/docs  
**GitHub:** https://github.com/slider460/weshow-nextgen-platform  

---

**Время настройки: 5 минут! Начинай с Шага 1! 🚀**


