# Настройка автодеплоя для weshow-nextgen-platform

## Текущая конфигурация

- **Git Repository**: `https://github.com/slider460/weshow-nextgen-platform.git`
- **Vercel Project**: `weshow-nextgen-platform`
- **Production URL**: `https://www.weshow.su`
- **Production Branch**: `main`

## Настройка автодеплоя через Vercel Dashboard

### Шаг 1: Проверка Git интеграции

1. Откройте [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект `weshow-nextgen-platform`
3. Перейдите в **Settings** → **Git**
4. Убедитесь, что подключен репозиторий:
   - **Repository**: `slider460/weshow-nextgen-platform`
   - **Production Branch**: `main`
   - **Framework Preset**: `Vite`

### Шаг 2: Настройка Production Branch

1. В разделе **Settings** → **Git**:
   - **Production Branch**: `main` (должна быть выбрана)
   - **Auto-deploy**: Включено (галочка должна быть установлена)

### Шаг 3: Настройка Build & Development Settings

1. Перейдите в **Settings** → **General**
2. Проверьте настройки:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

### Шаг 4: Настройка Environment Variables (если нужны)

1. Перейдите в **Settings** → **Environment Variables**
2. Добавьте необходимые переменные окружения (если есть)

### Шаг 5: Проверка Webhook

1. Перейдите в **Settings** → **Git**
2. Проверьте, что webhook настроен:
   - В GitHub репозитории должен быть webhook на `api.vercel.com`
   - Проверить можно в GitHub: **Settings** → **Webhooks**

## Автоматическое развертывание

После настройки:

- ✅ **Push в `main`** → автоматический деплой в Production
- ✅ **Pull Request** → автоматический Preview деплой
- ✅ **Merge в `main`** → автоматический деплой в Production

## Проверка работы автодеплоя

1. Сделайте небольшое изменение в коде
2. Закоммитьте и запушьте в `main`:
   ```bash
   git add .
   git commit -m "test: проверка автодеплоя"
   git push origin main
   ```
3. Через 1-2 минуты проверьте:
   - Vercel Dashboard → Deployments (должен появиться новый деплой)
   - Production URL (изменения должны отобразиться)

## Текущий статус

- ✅ Git репозиторий настроен
- ✅ Vercel проект создан и привязан
- ✅ Production branch: `main`
- ⚠️ Требуется проверка Git интеграции в Vercel Dashboard

## Команды для проверки

```bash
# Проверить текущий remote
git remote -v

# Проверить текущую ветку
git branch

# Проверить статус
git status

# Проверить последние коммиты
git log --oneline -5

# Проверить Vercel проекты
vercel project ls

# Проверить деплои
vercel ls
```



