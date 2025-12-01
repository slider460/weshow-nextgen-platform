# 🆕 Создание нового проекта Vercel с нуля

## 📋 Пошаговая инструкция

### Шаг 1: Создание нового проекта в Vercel

1. **Откройте** https://vercel.com/new (через VPN)
2. **Войдите** в аккаунт (если не авторизованы)
3. **Нажмите** "Add New..." → "Project"
4. **Импортируйте** репозиторий:
   - Выберите `slider460/weshow-nextgen-platform`
   - Или введите: `https://github.com/slider460/weshow-nextgen-platform`

### Шаг 2: Настройка проекта

**Framework Preset:** `Vite`

**Build Settings:**
- **Root Directory:** `./` (оставьте пустым)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

**Environment Variables:**
✅ **ВАЖНО:** Переменные окружения НЕ требуются!
- Проект полностью локальный, Supabase не используется
- Все данные хранятся локально в проекте
- **НЕ добавляйте** `VITE_SUPABASE_URL` или `VITE_SUPABASE_ANON_KEY`

### Шаг 3: Настройка Git интеграции

1. **Settings** → **Git**
2. Убедитесь, что:
   - **Production Branch:** `main`
   - **Auto-deploy** включен ✅
   - Репозиторий подключен: `slider460/weshow-nextgen-platform`

### Шаг 4: Настройка домена

1. **Settings** → **Domains**
2. Добавьте домен: `weshow.su`
3. Следуйте инструкциям по настройке DNS

### Шаг 5: Первый деплой

1. Нажмите **"Deploy"**
2. Дождитесь завершения (2-5 минут)
3. Проверьте сайт на https://www.weshow.su

## 🔄 Альтернатива: Использование существующего проекта

Если хотите использовать существующий проект, но переподключить его:

1. **Settings** → **Git** → **Disconnect**
2. Затем **Connect Git Repository**
3. Выберите `slider460/weshow-nextgen-platform`
4. Настройте Production Branch: `main`
5. Включите Auto-deploy

## 📝 После настройки

После создания проекта:
- ✅ Скопируйте **Project ID** и **Org ID** из Settings → General
- ✅ Обновите секреты в GitHub (если используете GitHub Actions)
- ✅ Проверьте, что автодеплой работает

## 🎯 Проверка работы

После настройки сделайте тестовый коммит:
```bash
git commit --allow-empty -m "test: проверка автодеплоя"
git push origin main
```

Должен автоматически запуститься деплой в Vercel.

