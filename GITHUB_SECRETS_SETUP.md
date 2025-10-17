# 🔐 Настройка GitHub Secrets для автодеплоя

## 📋 Необходимые секреты в GitHub:

### 1. VERCEL_TOKEN
- **Значение:** `X6UhOtSde4tFgUoJdCUWNSXy`
- **Описание:** Токен Vercel для авторизации

### 2. VERCEL_ORG_ID  
- **Значение:** `team_uPkbNyzAyFVsnn6jbifmbeq6`
- **Описание:** ID организации Vercel

### 3. VERCEL_PROJECT_ID
- **Значение:** `prj_JlcovjVv0jyaEGq8uCpAWjBdlD1n`
- **Описание:** ID проекта weshow-v2

## 🛠️ Как добавить секреты в GitHub:

1. Перейдите в репозиторий: https://github.com/slider460/weshow-nextgen-platform
2. Нажмите **Settings** (вкладка справа)
3. В левом меню выберите **Secrets and variables** → **Actions**
4. Нажмите **New repository secret**
5. Добавьте каждый секрет по очереди:
   - Name: `VERCEL_TOKEN`, Value: `X6UhOtSde4tFgUoJdCUWNSXy`
   - Name: `VERCEL_ORG_ID`, Value: `team_uPkbNyzAyFVsnn6jbifmbeq6`
   - Name: `VERCEL_PROJECT_ID`, Value: `prj_JlcovjVv0jyaEGq8uCpAWjBdlD1n`

## ✅ Проверка:

После добавления всех секретов:
1. Сделайте любой коммит в ветку `main`
2. GitHub Actions автоматически запустит деплой
3. Проверьте статус в разделе **Actions** репозитория

## 🔗 Полезные ссылки:

- **GitHub Actions:** https://github.com/slider460/weshow-nextgen-platform/actions
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Проект weshow-v2:** https://vercel.com/alexs-projects-4c8cf20f/weshow-v2
