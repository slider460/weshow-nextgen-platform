# 🔧 Альтернативные решения: Webhook не создается автоматически

## Проблема
После 5 переподключений webhook не создается автоматически, и при авторизации нет выбора между OAuth и GitHub App.

## Решение 1: Установить Vercel GitHub App напрямую

1. **Откройте:** https://github.com/apps/vercel
2. **Нажмите "Configure"** или "Install"
3. **Выберите:**
   - **"Only select repositories"**
   - Выберите: `slider460/weshow-nextgen-platform`
4. **Установите приложение**
5. **После установки:**
   - Вернитесь в Vercel Dashboard → Settings → Git
   - Попробуйте подключить репозиторий снова
   - Теперь должен использоваться GitHub App вместо OAuth

## Решение 2: Использовать Deploy Hook (временное решение)

Пока webhook не работает, можно использовать Deploy Hook для ручного деплоя:

1. **В Vercel Dashboard:**
   - Settings → Git → Deploy Hooks (или Settings → Deploy Hooks)
   - Нажмите "Create Hook"
   - Название: "Manual Deploy"
   - Branch: `main`
   - Создайте hook

2. **Использование:**
   - После каждого push выполняйте:
   ```bash
   curl -X POST YOUR_DEPLOY_HOOK_URL
   ```
   - Или используйте GitHub Actions для автоматического вызова

## Решение 3: GitHub Actions для автоматического деплоя

Создайте GitHub Actions workflow, который будет деплоить при push:

1. **Создайте файл:** `.github/workflows/auto-deploy.yml`
2. **Содержимое:**
   ```yaml
   name: Auto Deploy to Vercel
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Deploy to Vercel
           uses: amondnet/vercel-action@v25
           with:
             vercel-token: ${{ secrets.VERCEL_TOKEN }}
             vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
             vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
             vercel-args: '--prod --yes'
   ```
3. **Добавьте secrets в GitHub:**
   - Settings → Secrets and variables → Actions
   - Добавьте: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## Решение 4: Проверить правильный webhook URL

Возможно, URL должен быть другим. Попробуйте:

1. **Проверьте в Vercel Dashboard:**
   - Settings → Git → возможно там показывается правильный webhook URL
   - Или проверьте через Vercel CLI: `vercel inspect`

2. **Альтернативные форматы URL:**
   - `https://api.vercel.com/v1/integrations/github-webhook`
   - `https://api.vercel.com/v1/integrations/github-webhook?projectId=prj_JlcovjVv0jyaEGq8uCpAWjBdlD1n`
   - Может потребоваться секрет (secret) для webhook

## Рекомендация

Начните с **Решение 1** - установите Vercel GitHub App напрямую, это должно решить проблему с автоматическим созданием webhook.

