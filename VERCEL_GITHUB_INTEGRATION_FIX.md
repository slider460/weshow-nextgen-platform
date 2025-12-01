# Исправление интеграции Vercel с GitHub

## Проблема
После переподключения репозитория webhook не отображается в GitHub → Settings → Webhooks, и автодеплой не работает.

## Причина
Vercel использует **GitHub App интеграцию**, а не традиционные webhooks. GitHub App не отображается в разделе Webhooks, но работает через GitHub App события.

## Решение

### Шаг 1: Проверка GitHub App интеграции

1. Откройте GitHub: https://github.com/settings/installations
2. Найдите **"Vercel"** в списке установленных приложений
3. Проверьте, что Vercel имеет доступ к репозиторию `slider460/weshow-nextgen-platform`

### Шаг 2: Если Vercel App не установлен

1. Откройте Vercel Dashboard: https://vercel.com/dashboard
2. Перейдите в **Settings** → **Git**
3. Нажмите **"Connect Git Repository"**
4. Выберите **GitHub** как провайдера
5. Авторизуйтесь и предоставьте необходимые права
6. Выберите репозиторий `slider460/weshow-nextgen-platform`

### Шаг 3: Проверка прав доступа

В GitHub:
1. Settings → Applications → Installed GitHub Apps
2. Найдите Vercel
3. Нажмите "Configure"
4. Убедитесь, что репозиторий `weshow-nextgen-platform` выбран и имеет права:
   - ✅ Read access to code
   - ✅ Read and write access to pull requests
   - ✅ Read access to metadata

### Шаг 4: Альтернативное решение - GitHub Actions

Если GitHub App интеграция не работает, можно использовать GitHub Actions:

1. Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

2. Получите токены в Vercel:
   - VERCEL_TOKEN: Vercel Dashboard → Settings → Tokens
   - VERCEL_ORG_ID: `.vercel/project.json` → `orgId`
   - VERCEL_PROJECT_ID: `.vercel/project.json` → `projectId`

3. Добавьте секреты в GitHub:
   - Repository → Settings → Secrets and variables → Actions
   - Добавьте все три секрета

## Проверка работы

После настройки:
1. Сделайте push в `main`:
   ```bash
   git commit --allow-empty -m "test: проверка автодеплоя"
   git push origin main
   ```

2. Проверьте деплои:
   - Vercel Dashboard → Deployments (должен появиться новый деплой)
   - Или через CLI: `vercel ls`

## Текущий статус

- ✅ Репозиторий подключен в Vercel
- ✅ Production Branch: `main`
- ⚠️ GitHub App интеграция требует проверки
- ⚠️ Автодеплой не работает (нужна настройка GitHub App)



